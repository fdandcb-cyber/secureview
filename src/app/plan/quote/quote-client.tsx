"use client";

import { useState } from "react";
import Link from "next/link";
import { ClipboardList, Plus, Trash2, Printer } from "lucide-react";
import type { Quote } from "@/features/quotes/schemas";

const addableProducts = [
  { name: "Hikvision DS-2CD1043G2-I (4MP IP Bullet)", unitPrice: 3200 },
  { name: "Dahua DH-IPC-HDW1439T1-A-LED (4MP Full-Color)", unitPrice: 3800 },
  { name: "CP Plus CP-UNC-TA41L3-D (4MP Bullet)", unitPrice: 2600 },
  { name: "Hikvision DS-7604NXI-K1/4P (4ch NVR)", unitPrice: 6500 },
  { name: "WD Purple 2TB (WD23PURZ)", unitPrice: 4800 },
  { name: "Cat6 UTP Pure Copper Cable (per 100m)", unitPrice: 2300 },
];

export function QuoteClient({ initialQuote }: { initialQuote: Quote }) {
  const [items, setItems] = useState(
    initialQuote.items.map((i) => ({
      id: i.id,
      name: i.productName ?? "CCTV Component",
      quantity: i.quantity,
      unitPrice: i.unit_price_inr,
    }))
  );
  const [showAddMenu, setShowAddMenu] = useState(false);

  const updateQuantity = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addItem = (product: { name: string; unitPrice: number }) => {
    const existing = items.find((i) => i.name === product.name);
    if (existing) {
      updateQuantity(existing.id, existing.quantity + 1);
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: `item-${Date.now()}`,
          name: product.name,
          quantity: 1,
          unitPrice: product.unitPrice,
        },
      ]);
    }
    setShowAddMenu(false);
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-2">
            <ClipboardList className="h-4 w-4" /> Quote Sizing Builder
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            System Sizing Quote Estimator
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Customize camera quantities, recorder channels, and cabling to build your verified quote breakdown.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/plan/quote/${initialQuote.id}/print`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition"
          >
            <Printer className="h-4 w-4" /> Printable PDF
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Component</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Unit Price</th>
                  <th className="py-3 px-4 text-right">Total</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-slate-950">{item.name}</td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="w-14 px-2 py-1 border border-slate-200 rounded text-center font-bold text-xs"
                      />
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-slate-600">
                      ₹{item.unitPrice.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-950">
                      ₹{(item.quantity * item.unitPrice).toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-slate-400 hover:text-danger-600 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 bg-white rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-50 transition shadow-sm"
            >
              <Plus className="h-4 w-4 text-primary-700" /> Add Additional Component
            </button>

            {showAddMenu && (
              <div className="absolute top-12 left-0 z-20 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-2 max-h-60 overflow-y-auto space-y-1">
                {addableProducts.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => addItem(p)}
                    className="w-full text-left p-2 hover:bg-slate-50 rounded-lg text-xs flex justify-between items-center"
                  >
                    <span className="font-semibold text-slate-900 truncate pr-2">{p.name}</span>
                    <span className="text-slate-500 font-mono">₹{p.unitPrice}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary Card */}
        <div>
          <div className="bg-slate-900 text-white p-6 rounded-xl space-y-6 shadow-xl sticky top-24">
            <h2 className="text-base font-bold border-b border-slate-800 pb-3">
              Cost Summary
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal ({items.length} items):</span>
                <span className="font-semibold text-white">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>GST (18% Estimated):</span>
                <span className="font-semibold text-white">₹{gst.toLocaleString("en-IN")}</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-bold">
                <span>Estimated Total:</span>
                <span className="text-primary-400">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="block w-full text-center py-2.5 px-4 bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold rounded-lg transition shadow-md"
            >
              Request Technician Site Review →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
