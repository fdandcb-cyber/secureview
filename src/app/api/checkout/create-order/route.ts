import { NextResponse } from "next/server";
import { z } from "zod";
import Razorpay from "razorpay";
import { getServerEnv } from "@/config/env";
import { ShippingAddressSchema } from "@/features/commerce/schemas";
import { createOrderServerSide } from "@/features/commerce/repositories/order-repository";
import { getPublishedProductById } from "@/features/products/repositories/product-repository";

import { checkRateLimit } from "@/lib/rate-limit";

const CreateOrderInputSchema = z.object({
  quoteId: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
  ),
  shippingAddress: ShippingAddressSchema,
});

/**
 * POST /api/checkout/create-order
 * Validates product prices strictly against the database, recomputes totals server-side,
 * and creates a Razorpay payment order.
 */
export async function POST(request: Request) {
  // Rate limiting check (§8)
  const clientIp = request.headers.get("x-forwarded-for") ?? "anonymous-client";
  const limit = await checkRateLimit(`checkout-${clientIp}`, { windowMs: 60_000, maxRequests: 5 });

  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many checkout requests. Please wait a minute before trying again." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const parsed = CreateOrderInputSchema.parse(body);

    if (parsed.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Order items array cannot be empty." },
        { status: 400 }
      );
    }

    // Step 1: Discard client-submitted prices & look up real prices from database
    const validatedItems: Array<{
      productId: string;
      quantity: number;
      unitPriceInr: number;
    }> = [];

    for (const item of parsed.items) {
      const product = await getPublishedProductById(item.productId);
      if (!product || product.status !== "published") {
        return NextResponse.json(
          {
            success: false,
            error: `Product not found or not published: ${item.productId}`,
          },
          { status: 400 }
        );
      }

      validatedItems.push({
        productId: product.id,
        quantity: item.quantity,
        unitPriceInr: product.base_price_inr,
      });
    }

    // Step 2: Recompute subtotal, GST, and total strictly server-side
    const subtotal = validatedItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPriceInr,
      0
    );
    const gst = Math.round(subtotal * 0.18);
    const calculatedTotalInr = subtotal + gst;

    // Step 3: Call Razorpay API with server credentials (fail loudly if unconfigured)
    const serverEnv = getServerEnv();
    if (!serverEnv.RAZORPAY_KEY_ID || !serverEnv.RAZORPAY_KEY_SECRET) {
      throw new Error(
        "Razorpay payment gateway credentials not configured (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET missing). Payments disabled."
      );
    }

    const razorpay = new Razorpay({
      key_id: serverEnv.RAZORPAY_KEY_ID,
      key_secret: serverEnv.RAZORPAY_KEY_SECRET,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: calculatedTotalInr * 100, // Amount in paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    const order = await createOrderServerSide({
      items: validatedItems,
      address: parsed.shippingAddress,
      razorpayOrderId: razorpayOrder.id,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amountInr: calculatedTotalInr,
      currency: "INR",
      message: "Order created successfully with server-verified DB prices.",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid request.", issues: err.issues },
        { status: 400 }
      );
    }

    console.error("[checkout/create-order] Order creation failed:", err);
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't process your order right now. Please try again in a moment.",
      },
      { status: 502 }
    );
  }
}
