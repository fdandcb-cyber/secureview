import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/features/commerce/repositories/order-repository";
import { BRAND } from "@/config/brand";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type OrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: OrderDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order #${id.toUpperCase()} Details — ${BRAND.siteName}`,
  };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/account/orders" className="hover:text-primary-700">
          Orders
        </Link>
        <span>/</span>
        <span className="text-slate-950 font-medium">{order.id.toUpperCase()}</span>
      </nav>

      <Card className="p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge tone="success">{order.status.toUpperCase()}</Badge>
              {order.shipment_tracking_id && (
                <Badge tone="primary">AWB: {order.shipment_tracking_id}</Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Order Specification #{order.id.toUpperCase()}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Razorpay Order ID: {order.razorpay_order_id ?? "N/A"}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-2xl font-bold text-slate-950 block">
              ₹{order.total_inr.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-slate-500">Total Paid (GST Included)</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="p-4 rounded-control bg-slate-50 border border-slate-200 text-xs space-y-1">
          <span className="font-bold text-slate-950 block text-sm mb-1">
            Shipping Address
          </span>
          <p className="font-medium text-slate-800">{order.shipping_address.fullName}</p>
          <p className="text-slate-600">{order.shipping_address.addressLine1}</p>
          <p className="text-slate-600">
            {order.shipping_address.city}, {order.shipping_address.district},{" "}
            {order.shipping_address.state} — {order.shipping_address.pincode}
          </p>
          <p className="text-slate-600">Phone: {order.shipping_address.phone}</p>
        </div>

        {/* Order Items Table */}
        <table className="w-full text-left border-collapse text-xs mt-4">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-semibold uppercase">
              <th className="py-2.5 px-3 w-1/2">Product Item</th>
              <th className="py-2.5 px-3 text-center">Qty</th>
              <th className="py-2.5 px-3 text-right">Unit Price</th>
              <th className="py-2.5 px-3 text-right">Line Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {order.items.map((item) => (
              <tr key={item.id}>
                <td className="py-3 px-3 font-semibold text-slate-900">
                  {item.productName ?? "CCTV Component"}
                </td>
                <td className="py-3 px-3 text-center">{item.quantity}</td>
                <td className="py-3 px-3 text-right">₹{item.unit_price_inr.toLocaleString("en-IN")}</td>
                <td className="py-3 px-3 text-right font-bold">₹{item.line_total_inr.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
