"use client";

import { useState } from "react";
import {
  ClipboardList,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Lock,
  Clock,
  Printer,
  DollarSign,
  Package,
} from "lucide-react";

type QuoteStatus = "Draft" | "Locked & Versioned" | "Order Completed";

type QuoteRecord = {
  id: string;
  quoteNumber: string;
  customerName: string;
  district: string;
  itemCount: number;
  subtotal: string;
  gst: string;
  total: string;
  status: QuoteStatus;
  createdAt: string;
};

const initialQuotes: QuoteRecord[] = [
  {
    id: "1",
    quoteNumber: "QT-2026-891",
    customerName: "Rakesh Mohanty",
    district: "Bhubaneswar",
    itemCount: 4,
    subtotal: "₹24,100",
    gst: "₹4,338",
    total: "₹28,438",
    status: "Locked & Versioned",
    createdAt: "2026-08-01 14:30",
  },
  {
    id: "2",
    quoteNumber: "QT-2026-890",
    customerName: "Sunita Patnaik",
    district: "Cuttack",
    itemCount: 8,
    subtotal: "₹52,000",
    gst: "₹9,360",
    total: "₹61,360",
    status: "Order Completed",
    createdAt: "2026-07-31 11:15",
  },
  {
    id: "3",
    quoteNumber: "QT-2026-889",
    customerName: "Anil Sahoo",
    district: "Puri",
    itemCount: 2,
    subtotal: "₹12,500",
    gst: "₹2,250",
    total: "₹14,750",
    status: "Draft",
    createdAt: "2026-07-30 17:45",
  },
  {
    id: "4",
    quoteNumber: "QT-2026-888",
    customerName: "Priya Jena",
    district: "Rourkela",
    itemCount: 6,
    subtotal: "₹41,200",
    gst: "₹7,416",
    total: "₹48,616",
    status: "Locked & Versioned",
    createdAt: "2026-07-29 09:20",
  },
];

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRecord[]>(initialQuotes);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuotes = quotes.filter(
    (q) =>
      q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary-700" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Quote & Order Operations
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track user quotes, locked versions, GST breakdowns, and regional order status.
          </p>
        </div>
      </div>

      {/* Datatable */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Quote #, Customer, or District..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-primary-600"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4">Quote Ref</th>
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4">District</th>
              <th className="py-3.5 px-4">Items</th>
              <th className="py-3.5 px-4">Total (Inc GST)</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredQuotes.map((q) => (
              <tr key={q.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3.5 px-4 font-mono text-xs font-bold text-primary-700">
                  {q.quoteNumber}
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-900">{q.customerName}</td>
                <td className="py-3.5 px-4 text-xs text-slate-600">{q.district}</td>
                <td className="py-3.5 px-4 text-xs text-slate-600">{q.itemCount} items</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{q.total}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      q.status === "Order Completed"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : q.status === "Locked & Versioned"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {q.status === "Locked & Versioned" && <Lock className="h-3 w-3" />}
                    {q.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-medium transition">
                    View Specs
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
