"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2, ShoppingBag, Save, Printer } from "lucide-react";

type LineItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

export default function AdminQuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const quoteId = resolvedParams.id;

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
    alert(`Quote #${quoteId} successfully converted to an Order on behalf of the customer!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/admin/quotes" className="text-slate-400 hover:text-slate-700 transition">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-slate-900">
              Admin Quote Editor — #{quoteId.toUpperCase()}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Adjust line-item pricing (offer custom discounts), log internal notes, or convert directly to an order.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/plan/quote/${quoteId}/print`} target="_blank">
            <Button variant="secondary" size="sm">
              <Printer className="h-4 w-4 mr-1" /> Printable View
            </Button>
          </Link>
          <Button variant="primary" size="sm" onClick={handleConvertToOrder}>
            <ShoppingBag className="h-4 w-4 mr-1" /> Convert to Order
          </Button>
        </div>
      </div>

      {/* Main Quote Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-bold text-slate-900">
                Adjust Line Item Unit Pricing (INR)
              </span>
              <Badge tone={status === "accepted" ? "success" : "warning"}>
                STATUS: {status.toUpperCase()}
              </Badge>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-semibold uppercase">
                  <th className="py-2.5 px-3">Component Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3">Unit Price (INR)</th>
                  <th className="py-2.5 px-3 text-right">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {item.name}
                    </td>
                    <td className="py-3 px-3 text-center">{item.quantity}</td>
                    <td className="py-3 px-3">
                      <Input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handlePriceChange(item.id, Number(e.target.value))}
                        className="w-24 h-8 text-xs font-bold"
                      />
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-950">
                      ₹{(item.quantity * item.unitPrice).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Calculations Summary */}
            <div className="pt-4 border-t border-slate-100 max-w-xs ml-auto text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (18%):</span>
                <span className="font-semibold">₹{gst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-950 border-t border-slate-200 pt-2">
                <span>Adjusted Total:</span>
                <span className="text-primary-700">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Internal Notes */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900">
              Internal Admin Notes & Log
            </h2>
            <p className="text-xs text-slate-500">
              Internal notes logged here are visible only to admin staff.
            </p>
            <textarea
              rows={4}
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              className="w-full p-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-primary-600"
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
