"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ShoppingBag, Save, Printer } from "lucide-react";

type LineItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export function AdminQuoteDetailClient({ quoteId }: { quoteId: string }) {
  const [status, setStatus] = useState<"draft" | "sent" | "accepted" | "expired">("draft");
  const [internalNotes, setInternalNotes] = useState("Phone inquiry discount requested — 5% offline deal approved.");
  const [items, setItems] = useState<LineItem[]>([
    { id: "1", name: "Hikvision DS-2CD1043G2-I (4MP Bullet)", quantity: 4, unitPrice: 3000 },
    { id: "2", name: "Hikvision DS-7604NXI-K1/4P (4ch NVR)", quantity: 1, unitPrice: 6200 },
    { id: "3", name: "WD Purple 2TB Surveillance Hard Drive", quantity: 1, unitPrice: 4500 },
  ]);

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handlePriceChange = (id: string, newPrice: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unitPrice: newPrice } : item))
    );
  };

  const handleConvertToOrder = () => {
    setStatus("accepted");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <Link
            href="/admin/quotes"
            className="text-xs font-semibold text-primary-700 hover:underline flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Quotes List
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900 font-mono">
              Quote #{quoteId.toUpperCase()}
            </h1>
            <Badge tone={status === "accepted" ? "success" : "neutral"}>
              STATUS: {status.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-1.5" /> Print PDF Quote
          </Button>
          <Button variant="primary" onClick={handleConvertToOrder}>
            <ShoppingBag className="h-4 w-4 mr-1.5" /> Convert to Active Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Items Table */}
          <Card className="p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Quote Line Items</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2">Item Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Unit Price (₹)</th>
                    <th className="py-2 text-right">Line Total (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 font-medium text-slate-900">{item.name}</td>
                      <td className="py-3 text-center">{item.quantity}</td>
                      <td className="py-3 text-right">
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handlePriceChange(item.id, Number(e.target.value))}
                          className="w-24 text-right ml-auto text-xs py-1"
                        />
                      </td>
                      <td className="py-3 text-right font-bold text-slate-900">
                        ₹{(item.quantity * item.unitPrice).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-xs text-right">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (18%):</span>
                <span className="font-semibold">₹{gst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-950 pt-2 border-t border-slate-200">
                <span>Grand Total:</span>
                <span className="text-primary-700">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900">Internal Admin Notes</h2>
            <textarea
              rows={4}
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              className="w-full text-xs p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-600"
            />
            <Button variant="secondary" size="sm" className="w-full">
              <Save className="h-3.5 w-3.5 mr-1" /> Save Internal Note
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
