import type { Metadata } from "next";
import Link from "next/link";
import { listOrdersForUser } from "@/features/commerce/repositories/order-repository";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Truck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Your Orders — SecureView Account",
  description: "View past orders, payment status, invoices, and shipment tracking.",
};

export default async function AccountOrdersPage() {
  const orders = await listOrdersForUser();

  const statusTones = {
    pending_payment: "warning" as const,
    paid: "success" as const,
    failed: "danger" as const,
    fulfilled: "success" as const,
    cancelled: "neutral" as const,
    refunded: "neutral" as const,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Order History & Tracking
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your security hardware shipments, invoices, and payment statuses.
          </p>
        </div>
        <Link href="/products">
          <Badge tone="primary">+ New Equipment Order</Badge>
        </Link>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-primary-700 block">
                  ORDER REF: {order.id.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500">
                  Placed on {new Date(order.created_at).toLocaleDateString("en-IN")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Badge tone={statusTones[order.status]}>
                  {order.status.replace("_", " ").toUpperCase()}
                </Badge>
                {order.shipment_tracking_id && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                    <Truck className="h-3.5 w-3.5 text-primary-700" />
                    AWB: {order.shipment_tracking_id}
                  </span>
                )}
              </div>
            </div>

            {/* Address & Items summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-slate-950 block mb-1">
                  Delivery Destination
                </span>
                <p className="text-slate-600">
                  {order.shipping_address.fullName} ({order.shipping_address.phone})
                </p>
                <p className="text-slate-500">
                  {order.shipping_address.addressLine1}, {order.shipping_address.city},{" "}
                  {order.shipping_address.district}, {order.shipping_address.pincode}
                </p>
              </div>

              <div className="text-left md:text-right">
                <span className="font-semibold text-slate-950 block mb-1">
                  Total Amount (GST Included)
                </span>
                <span className="text-xl font-bold text-slate-950 block">
                  ₹{order.total_inr.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""} included
              </span>
              <Link
                href={`/account/orders/${order.id}`}
                className="text-xs font-bold text-primary-700 hover:underline flex items-center gap-1"
              >
                View Order Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
