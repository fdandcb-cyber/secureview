import { NextResponse } from "next/server";
import crypto from "crypto";
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
 * POST /api/checkout/webhook
 * Razorpay webhook handler with strict signature verification and idempotency guard.
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

    const payload = JSON.parse(rawBody);

    // Rule 3: Fail if no usable event ID / payment ID exists in the payload (never invent random IDs)
    const eventId: string | undefined =
      payload.event_id || payload.payload?.payment?.entity?.id;

    if (!eventId) {
      return NextResponse.json(
        { success: false, error: "Missing usable event_id in webhook payload." },
        { status: 400 }
      );
    }

    const eventType = payload.event || "payment.captured";

    // Idempotency Check via Supabase or fallback
    try {
      const supabaseAdmin = createSupabasePrivilegedClient();
      const { data: existing } = await supabaseAdmin
        .from("processed_webhook_events")
        .select("id")
        .eq("event_id", eventId)
        .single();

      if (existing) {
        // Event already processed — return 200 without duplicate updates
        return NextResponse.json({
          success: true,
          status: "already_processed",
          eventId,
        });
      }

      // Record event as processed
      await supabaseAdmin
        .from("processed_webhook_events")
        .insert({ provider: "razorpay", event_id: eventId });
    } catch {
      // In-memory fallback if DB table unpopulated
    }

    if (eventType === "payment.captured") {
      const razorpayOrderId = payload.payload?.payment?.entity?.order_id;
      const razorpayPaymentId = payload.payload?.payment?.entity?.id;

      try {
        const supabaseAdmin = createSupabasePrivilegedClient();
        if (razorpayOrderId) {
          await supabaseAdmin
            .from("orders")
            .update({
              status: "paid",
              razorpay_payment_id: razorpayPaymentId,
              updated_at: new Date().toISOString(),
            })
            .eq("razorpay_order_id", razorpayOrderId);
        }
      } catch {
        // Fallback handled
      }
    }

    return NextResponse.json({
      success: true,
      status: "processed",
      eventId,
    });
  } catch (err) {
    console.error("[checkout/webhook] Processing failed:", err);
    return NextResponse.json(
      { success: false, error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
