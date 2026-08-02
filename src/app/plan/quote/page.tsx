"use client";

import { useState } from "react";
import {
  ClipboardList,
  Plus,
  Trash2,
  Download,
  Share2,
  Printer,
} from "lucide-react";

type QuoteItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

const initialItems: QuoteItem[] = [
  { id: "1", name: "Hikvision DS-2CD1043G2-I (4MP IP Bullet)", quantity: 4, unitPrice: 3200 },
  { id: "2", name: "Hikvision DS-7604NXI-K1/4P (4ch NVR w/ PoE)", quantity: 1, unitPrice: 6500 },
  { id: "3", name: "WD Purple 2TB (WD23PURZ)", quantity: 1, unitPrice: 4800 },
  { id: "4", name: "Cat6 UTP Pure Copper Cable (per 100m)", quantity: 2, unitPrice: 2300 },
];

const addableProducts = [
  { name: "Hikvision DS-2CD1043G2-I (4MP IP Bullet)", unitPrice: 3200 },
  { name: "Dahua DH-IPC-HDW1439T1-A-LED (4MP Full-Color)", unitPrice: 3800 },
  { name: "CP Plus CP-UNC-TA41L3-D (4MP Bullet)", unitPrice: 2600 },
  { name: "Hikvision DS-7604NXI-K1/4P (4ch NVR)", unitPrice: 6500 },
  { name: "Hikvision DS-7608NXI-K2/8P (8ch NVR)", unitPrice: 9500 },
  { name: "WD Purple 2TB (WD23PURZ)", unitPrice: 4800 },
  { name: "WD Purple 4TB (WD43PURZ)", unitPrice: 8900 },
  { name: "Seagate SkyHawk 4TB (ST4000VX016)", unitPrice: 8900 },
  { name: "TP-Link TL-SG1005P (5-port PoE Switch)", unitPrice: 3100 },
  { name: "Cat6 UTP Pure Copper Cable (per 100m)", unitPrice: 2300 },
  { name: "APC BX1100C-IN UPS (1100VA)", unitPrice: 5400 },
  { name: "RJ45 Connectors (pack of 50)", unitPrice: 250 },
  { name: "Junction Box (weather-rated)", unitPrice: 180 },
  { name: "HDMI Cable 2m", unitPrice: 350 },
];

export default function QuotePage() {
  const [items, setItems] = useState<QuoteItem[]>(initialItems);
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
    setItems((prev) => [
      ...prev,
      {
        id: `item-${prev.length + 1}-${Math.random().toString(36).substring(2, 7)}`,
        name: product.name,
        quantity: 1,
        unitPrice: product.unitPrice,
      },
    ]);
    setShowAddMenu(false);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
        Quote Builder
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Your system quote
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
        Add or remove items, adjust quantities, and see real-time totals.
        Quotes are versioned — once accepted, the price and configuration
        are locked.
      </p>

      {/* Quote items */}
      <div className="mt-8 rounded-card border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span className="col-span-5">Item</span>
            <span className="col-span-2 text-center">Qty</span>
            <span className="col-span-2 text-right">Unit Price</span>
            <span className="col-span-2 text-right">Total</span>
            <span className="col-span-1" />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center gap-4 px-6 py-4"
            >
              <span className="col-span-5 text-sm font-medium text-slate-950">
                {item.name}
              </span>
              <div className="col-span-2 flex items-center justify-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-control border border-slate-200 text-sm text-slate-700 hover:border-primary-600"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold text-slate-950">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-control border border-slate-200 text-sm text-slate-700 hover:border-primary-600"
                >
                  +
                </button>
              </div>
              <span className="col-span-2 text-right text-sm text-slate-700">
                ₹{item.unitPrice.toLocaleString("en-IN")}
              </span>
              <span className="col-span-2 text-right text-sm font-semibold text-slate-950">
                ₹{(item.quantity * item.unitPrice).toLocaleString("en-IN")}
              </span>
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="text-slate-400 transition hover:text-danger-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add item */}
        <div className="border-t border-slate-200 px-6 py-4">
          <div className="relative">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="flex items-center gap-2 rounded-control border border-dashed border-slate-300 px-4 py-2 text-sm font-medium text-slate-500 transition hover:border-primary-600 hover:text-primary-700"
            >
              <Plus className="h-4 w-4" />
              Add item
            </button>

            {showAddMenu && (
              <div className="absolute left-0 top-12 z-20 max-h-64 w-96 overflow-y-auto rounded-card border border-slate-200 bg-white shadow-lg">
                {addableProducts.map((product) => (
                  <button
                    key={product.name}
                    onClick={() => addItem(product)}
                    className="block w-full px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-primary-50 hover:text-primary-700"
                  >
                    <span className="font-medium">{product.name}</span>
                    <span className="ml-2 text-slate-500">
                      ₹{product.unitPrice.toLocaleString("en-IN")}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="mt-6 rounded-card border border-slate-200 bg-white p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-700">Subtotal</span>
            <span className="font-medium text-slate-950">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-700">GST (18%)</span>
            <span className="font-medium text-slate-950">
              ₹{gst.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="border-t border-slate-200 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-slate-950">
                Total
              </span>
              <span className="text-xl font-semibold text-primary-700">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 rounded-control bg-primary-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600">
          <ClipboardList className="h-4 w-4" />
          Save Quote
        </button>
        <button className="inline-flex items-center gap-2 rounded-control border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-primary-600 hover:text-primary-700">
          <Printer className="h-4 w-4" />
          Print
        </button>
        <button className="inline-flex items-center gap-2 rounded-control border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-primary-600 hover:text-primary-700">
          <Download className="h-4 w-4" />
          Download PDF
        </button>
        <button className="inline-flex items-center gap-2 rounded-control border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-primary-600 hover:text-primary-700">
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>

      {/* Note */}
      <p className="mt-6 text-xs text-slate-500">
        Prices shown are indicative and subject to change. Once a quote is
        accepted, the configuration and pricing are locked for 7 days. Shipping
        costs will be calculated at checkout based on your delivery location.
      </p>
    </div>
  );
}
