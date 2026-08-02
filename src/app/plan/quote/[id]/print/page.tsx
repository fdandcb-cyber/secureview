import type { Metadata } from "next";
import { getQuote } from "@/features/quotes/repositories/quote-repository";
import { BRAND } from "@/config/brand";
import { ShieldCheck } from "lucide-react";

type PrintQuotePageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: `Printable System Quote — ${BRAND.siteName}`,
  description: "Official printable CCTV system quote specification and invoice breakdown.",
};

export default async function PrintQuotePage({ params }: PrintQuotePageProps) {
  const { id } = await params;
  const quote = await getQuote(id);

  return (
    <div className="mx-auto max-w-4xl p-8 bg-white text-slate-900 font-sans leading-normal">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-300 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary-700" />
            <h1 className="text-xl font-bold tracking-tight text-slate-950">
              {BRAND.siteName.toUpperCase()} QUOTE
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Odisha Verified Security System Specification & Pricing ({BRAND.supportEmail})
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-mono font-bold text-primary-700">
            REF #: {quote.id.toUpperCase()}
          </p>
          <p className="text-xs text-slate-500">
            Date: {new Date(quote.created_at).toLocaleDateString("en-IN")}
          </p>
          <p className="text-xs text-slate-500">
            Valid Until: {new Date(quote.expires_at).toLocaleDateString("en-IN")}
          </p>
        </div>
      </div>

      {/* Quote Details */}
      <div className="my-6 p-4 rounded bg-slate-50 border border-slate-200 text-xs leading-relaxed space-y-1">
        <p><strong>System Note:</strong> {quote.notes || "Standard Package Specification"}</p>
        <p><strong>Status:</strong> Locked & Versioned Price Snapshot (Includes 18% GST)</p>
      </div>

      {/* Item Table */}
      <table className="w-full text-left border-collapse text-xs mt-6">
        <thead>
          <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold uppercase">
            <th className="py-2.5 px-3 w-1/2">Item Description</th>
            <th className="py-2.5 px-3 text-center">Qty</th>
            <th className="py-2.5 px-3 text-right">Unit Price (INR)</th>
            <th className="py-2.5 px-3 text-right">Line Total (INR)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {quote.items.map((item) => (
            <tr key={item.id}>
              <td className="py-3 px-3">
                <span className="font-bold text-slate-950 block">{item.productName}</span>
                <span className="text-[11px] text-slate-500 font-mono">Model: {item.modelNumber}</span>
              </td>
              <td className="py-3 px-3 text-center font-semibold">{item.quantity}</td>
              <td className="py-3 px-3 text-right">₹{item.unit_price_inr.toLocaleString("en-IN")}</td>
              <td className="py-3 px-3 text-right font-bold">₹{(item.lineTotalInr || 0).toLocaleString("en-IN")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Totals */}
      <div className="mt-8 border-t border-slate-300 pt-4 max-w-xs ml-auto text-xs space-y-2">
        <div className="flex justify-between text-slate-700">
          <span>Subtotal:</span>
          <span className="font-semibold">₹{quote.subtotalInr.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-slate-700">
          <span>GST (18%):</span>
          <span className="font-semibold">₹{quote.gstInr.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-slate-950 border-t border-slate-300 pt-2">
          <span>Total Payable:</span>
          <span className="text-primary-700">₹{quote.totalInr.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="mt-12 pt-6 border-t border-slate-300 text-[11px] text-slate-500 leading-relaxed text-center">
        <p>This is an official computer-generated quote specification issued by {BRAND.siteName}.</p>
        <p>Prices and components are snapshot-locked for 7 days from issue date. Contact: {BRAND.mobile} ({BRAND.supportEmail}).</p>
      </div>
    </div>
  );
}
