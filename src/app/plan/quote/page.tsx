import { getQuote } from "@/features/quotes/repositories/quote-repository";
import { QuoteClient } from "./quote-client";

export default async function QuotePage() {
  const quote = await getQuote("default-quote");

  return <QuoteClient initialQuote={quote} />;
}
