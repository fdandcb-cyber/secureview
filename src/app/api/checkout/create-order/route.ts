import { NextResponse } from "next/server";
import { z } from "zod";
import { ShippingAddressSchema } from "@/features/commerce/schemas";
import { createOrderServerSide } from "@/features/commerce/repositories/order-repository";

const CreateOrderInputSchema = z.object({
  quoteId: z.string(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
      unitPriceInr: z.number().min(1),
    })
  ),
  shippingAddress: ShippingAddressSchema,
});

/**
 * POST /api/checkout/create-order
 * Recomputes order totals server-side and initializes Razorpay payment order.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CreateOrderInputSchema.parse(body);

    // Rule: Always recompute total server-side from prices
    const subtotal = parsed.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPriceInr,
      0
    );
    const gst = Math.round(subtotal * 0.18);
    const calculatedTotalInr = subtotal + gst;

    // Simulated Razorpay Order ID (Replace with Razorpay Node SDK in live prod)
    const razorpayOrderId = `order_${Math.random().toString(36).substring(2, 15)}`;

    const order = await createOrderServerSide({
      items: parsed.items,
      address: parsed.shippingAddress,
      razorpayOrderId,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      razorpayOrderId,
      amountInr: calculatedTotalInr,
      currency: "INR",
      message: "Order initialized with server-recomputed totals.",
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Order creation failed",
      },
      { status: 400 }
    );
  }
}
