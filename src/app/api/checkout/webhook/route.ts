import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { getServerEnv } from "@/config/env";
import { createSupabasePrivilegedClient } from "@/lib/supabase/server-privileged";

/**
 * Constant-time signature comparison to prevent timing side-channel attacks.
 */
function safeCompareSignatures(expected: string, actual: string): boolean {
  const expectedBuf = Buffer.from(expected, "utf-8");
  const actualBuf = Buffer.from(actual, "utf-8");

  if (expectedBuf.length !== actualBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

/**
 * Minimal strict shape for the Razorpay webhook payloads this handler
 * actually acts on. Unknown event types still need `event` + a payment
 * entity id to be claimable for idempotency; payment.captured additionally
 * needs order_id to know which local order to update.
 */
const RazorpayWebhookPayloadSchema = z.object({
  event: z.string(),
  event_id: z.string().optional(),
  payload: z.object({
    payment: z.object({
      entity: z.object({
        id: z.string(),
        order_id: z.string().optional(),
      }),
    }),
  }),
});

/**
 * POST /api/checkout/webhook
 * Razorpay webhook handler with strict signature verification, strict
 * payload validation, and idempotency that only commits AFTER the critical
 * order-state update succeeds — never before it, and never silently.
 */
export async function POST(request: Request) {
  try {
    const serverEnv = getServerEnv();
    const webhookSecret = serverEnv.RAZORPAY_WEBHOOK_SECRET;

    // Rule 1: Fail closed if RAZORPAY_WEBHOOK_SECRET is not configured
    if (!webhookSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Razorpay webhook secret not configured. Refusing to process payload.",
        },
        { status: 500 }
      );
    }

    const signature = request.headers.get("x-razorpay-signature");
    if (!signature) {
      return NextResponse.json(
        { success: false, error: "Missing Razorpay webhook signature header." },
        { status: 400 }
      );
    }

    const rawBody = await request.text();
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    // Rule 2: Constant-time signature comparison using timingSafeEqual
    if (!safeCompareSignatures(expectedSignature, signature)) {
      return NextResponse.json(
        { success: false, error: "Invalid Razorpay webhook signature." },
        { status: 400 }
      );
    }

    // Rule 3: Strict payload validation — reject anything that doesn't match
    // the expected shape instead of doing raw, uncontrolled property access.
    const parseResult = RazorpayWebhookPayloadSchema.safeParse(JSON.parse(rawBody));
    if (!parseResult.success) {
      console.error("[checkout/webhook] Payload failed validation:", parseResult.error.message);
      return NextResponse.json(
        { success: false, error: "Webhook payload did not match expected shape." },
        { status: 400 }
      );
    }
    const payload = parseResult.data;

    const eventId = payload.event_id || payload.payload.payment.entity.id;
    const eventType = payload.event;

    const supabaseAdmin = createSupabasePrivilegedClient();

    // Idempotency pre-check: has this event already been fully processed?
    // A DB failure HERE fails closed (500) so Razorpay retries — we must
    // not guess whether this is a duplicate when we can't actually check.
    let alreadyProcessed = false;
    try {
      const { data: existing, error } = await supabaseAdmin
        .from("processed_webhook_events")
        .select("id")
        .eq("event_id", eventId)
        .maybeSingle();

      if (error) throw error;
      alreadyProcessed = Boolean(existing);
    } catch (err) {
      console.error("[checkout/webhook] Idempotency pre-check failed:", err);
      return NextResponse.json(
        { success: false, error: "Could not verify webhook idempotency state." },
        { status: 500 }
      );
    }

    if (alreadyProcessed) {
      return NextResponse.json({ success: true, status: "already_processed", eventId });
    }

    // Do the critical, money-affecting work BEFORE claiming the event as
    // processed — never the other way around. If this fails, the event
    // must remain unclaimed so Razorpay's retry can attempt it again.
    if (eventType === "payment.captured") {
      const razorpayOrderId = payload.payload.payment.entity.order_id;
      const razorpayPaymentId = payload.payload.payment.entity.id;

      if (!razorpayOrderId) {
        console.error("[checkout/webhook] payment.captured event missing order_id:", eventId);
        return NextResponse.json(
          { success: false, error: "Payment event missing order_id." },
          { status: 400 }
        );
      }

      const { data: updatedRows, error: updateError } = await supabaseAdmin
        .from("orders")
        .update({
          status: "paid",
          razorpay_payment_id: razorpayPaymentId,
          updated_at: new Date().toISOString(),
        })
        .eq("razorpay_order_id", razorpayOrderId)
        .select("id");

      if (updateError) {
        console.error("[checkout/webhook] Order status update failed:", updateError);
        return NextResponse.json(
          { success: false, error: "Failed to update order status." },
          { status: 500 }
        );
      }

      if (!updatedRows || updatedRows.length === 0) {
        // Signature was valid and the write succeeded, but no local order
        // matched this razorpay_order_id. This is a real problem worth
        // surfacing loudly (not a duplicate, not a soft no-op) — fail so
        // Razorpay retries and this gets investigated if it keeps failing.
        console.error(
          "[checkout/webhook] No matching order for razorpay_order_id:",
          razorpayOrderId
        );
        return NextResponse.json(
          { success: false, error: "No matching order found for this payment." },
          { status: 500 }
        );
      }
    }

    // Only now — after the critical work has genuinely succeeded — claim
    // the event as processed. A failure here just risks one harmless retry
    // (payment.captured update is idempotent: re-setting status to "paid"
    // is a no-op), which is a far safer failure mode than claiming success
    // before the real work happened.
    const { error: claimError } = await supabaseAdmin
      .from("processed_webhook_events")
      .insert({ provider: "razorpay", event_id: eventId });

    if (claimError) {
      console.error("[checkout/webhook] Failed to record processed event:", claimError);
      return NextResponse.json(
        { success: false, error: "Order updated, but failed to record webhook as processed." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, status: "processed", eventId });
  } catch (err) {
    console.error("[checkout/webhook] Processing failed:", err);
    return NextResponse.json(
      { success: false, error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
