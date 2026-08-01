import { z } from "zod";

export const ShippingAddressSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(10),
  addressLine1: z.string().min(5),
  addressLine2: z.string().optional(),
  city: z.string().min(2),
  district: z.string().min(2),
  state: z.string().default("Odisha"),
  pincode: z.string().length(6),
});

export const OrderItemSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  product_id: z.string(),
  quantity: z.number().min(1),
  unit_price_inr: z.number(),
  line_total_inr: z.number(),
  productName: z.string().optional(),
});

export const OrderSchema = z.object({
  id: z.string(),
  user_id: z.string().nullable().optional(),
  status: z.enum([
    "pending_payment",
    "paid",
    "failed",
    "fulfilled",
    "cancelled",
    "refunded",
  ]),
  subtotal_inr: z.number(),
  shipping_inr: z.number().default(0),
  total_inr: z.number(),
  shipping_address: ShippingAddressSchema,
  razorpay_order_id: z.string().nullable().optional(),
  razorpay_payment_id: z.string().nullable().optional(),
  shipment_tracking_id: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  items: z.array(OrderItemSchema).default([]),
});

export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
