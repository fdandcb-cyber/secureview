import { createSupabaseServerClient } from "@/lib/supabase/server";
import { QuoteSchema, type Quote, type QuoteItem } from "../schemas";
import { getPublishedProductBySlug } from "@/features/products/repositories/product-repository";

const memoryQuotes: Record<string, Quote> = {
  "default-quote": {
    id: "default-quote",
    user_id: null,
    session_token: "guest-token-123",
    status: "draft",
    notes: "Residential 4MP IP Surveillance Setup",
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    items: [
      {
        id: "qi-1",
        quote_id: "default-quote",
        product_id: "p-1",
        quantity: 4,
        unit_price_inr: 3200,
        productName: "Hikvision DS-2CD1043G2-I (4MP Bullet)",
        modelNumber: "DS-2CD1043G2-I",
        lineTotalInr: 12800,
      },
      {
        id: "qi-2",
        quote_id: "default-quote",
        product_id: "p-2",
        quantity: 1,
        unit_price_inr: 6500,
        productName: "Hikvision DS-7604NXI-K1/4P (4ch NVR)",
        modelNumber: "DS-7604NXI-K1/4P",
        lineTotalInr: 6500,
      },
      {
        id: "qi-3",
        quote_id: "default-quote",
        product_id: "p-3",
        quantity: 1,
        unit_price_inr: 4800,
        productName: "WD Purple 2TB Surveillance Hard Drive",
        modelNumber: "WD23PURZ",
        lineTotalInr: 4800,
      },
    ],
    subtotalInr: 24100,
    gstInr: 4338,
    totalInr: 28438,
  },
};

export async function getQuote(quoteId: string = "default-quote"): Promise<Quote> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: quoteData, error } = await supabase
      .from("quotes")
      .select(`
        *,
        quote_items (
          *,
          products (name, model_number, base_price_inr)
        )
      `)
      .eq("id", quoteId)
      .single();

    if (!error && quoteData) {
      const items: QuoteItem[] = (quoteData.quote_items || []).map((item: any) => {
        const unitPrice = Number(item.unit_price_inr || item.products?.base_price_inr || 0);
        const quantity = Number(item.quantity || 1);
        return {
          id: item.id,
          quote_id: item.quote_id,
          product_id: item.product_id,
          quantity,
          unit_price_inr: unitPrice,
          productName: item.products?.name ?? "CCTV Component",
          modelNumber: item.products?.model_number ?? "N/A",
          lineTotalInr: unitPrice * quantity,
        };
      });

      const subtotalInr = items.reduce((sum, i) => sum + (i.lineTotalInr || 0), 0);
      const gstInr = Math.round(subtotalInr * 0.18);
      const totalInr = subtotalInr + gstInr;

      return QuoteSchema.parse({
        id: quoteData.id,
        user_id: quoteData.user_id,
        session_token: quoteData.session_token,
        status: quoteData.status,
        notes: quoteData.notes,
        expires_at: quoteData.expires_at,
        created_at: quoteData.created_at,
        items,
        subtotalInr,
        gstInr,
        totalInr,
      });
    }
  } catch (err) {
    // Fallback to memory quote
  }

  const fallback = memoryQuotes[quoteId] ?? memoryQuotes["default-quote"];
  return QuoteSchema.parse(fallback);
}

export async function createQuote(notes?: string): Promise<Quote> {
  const newId = `qt-${Date.now()}`;
  const newQuote: Quote = {
    id: newId,
    user_id: null,
    session_token: `token-${Date.now()}`,
    status: "draft",
    notes: notes ?? "New Quote Draft",
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    items: [],
    subtotalInr: 0,
    gstInr: 0,
    totalInr: 0,
  };

  memoryQuotes[newId] = newQuote;
  return newQuote;
}
