import { z } from "zod";

export const QuoteItemSchema = z.object({
  id: z.string(),
  quote_id: z.string(),
  product_id: z.string(),
  quantity: z.number().min(1),
  unit_price_inr: z.number(),
  productName: z.string().optional(),
  modelNumber: z.string().optional(),
  lineTotalInr: z.number().optional(),
});

export const QuoteSchema = z.object({
  id: z.string(),
  user_id: z.string().nullable().optional(),
  session_token: z.string().nullable().optional(),
  status: z.enum(["draft", "sent", "accepted", "expired"]),
  notes: z.string().nullable().optional(),
  expires_at: z.string(),
  created_at: z.string(),
  items: z.array(QuoteItemSchema).default([]),
  subtotalInr: z.number().default(0),
  gstInr: z.number().default(0),
  totalInr: z.number().default(0),
});

export type QuoteItem = z.infer<typeof QuoteItemSchema>;
export type Quote = z.infer<typeof QuoteSchema>;
