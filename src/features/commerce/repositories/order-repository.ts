import { createSupabaseServerClient } from "@/lib/supabase/server";
import { OrderSchema, type Order, type ShippingAddress } from "../schemas";
import { isProduction } from "@/config/env";

const memoryOrders: Record<string, Order> = {
  "ord-1001": {
    id: "ord-1001",
    user_id: null,
    status: "paid",
    subtotal_inr: 24100,
    shipping_inr: 0,
    total_inr: 28438,
    shipping_address: {
      fullName: "Rakesh Mohanty",
      phone: "9437012345",
      addressLine1: "Plot 102, Saheed Nagar",
      city: "Bhubaneswar",
      district: "Bhubaneswar",
      state: "Odisha",
      pincode: "751007",
    },
    razorpay_order_id: "order_K7x8Yz12345678",
    razorpay_payment_id: "pay_K7x8Yz87654321",
    shipment_tracking_id: "AWB88991122",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: "oi-1",
        order_id: "ord-1001",
        product_id: "p-1",
        quantity: 4,
        unit_price_inr: 3200,
        line_total_inr: 12800,
        productName: "Hikvision DS-2CD1043G2-I (4MP Bullet)",
      },
      {
        id: "oi-2",
        order_id: "ord-1001",
        product_id: "p-2",
        quantity: 1,
        unit_price_inr: 6500,
        line_total_inr: 6500,
        productName: "Hikvision DS-7604NXI-K1/4P (4ch NVR)",
      },
    ],
  },
};

/**
 * Get an order by ID.
 * Enforces ownership check — non-admin callers can ONLY retrieve orders matching their authenticated user ID.
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Explicit deny for unauthenticated callers
    if (!user) {
      if (!isProduction()) {
        const fallback = memoryOrders[orderId];
        return fallback ? OrderSchema.parse(fallback) : null;
      }
      return null;
    }

    let query = supabase.from("orders").select("*, order_items(*)").eq("id", orderId);

    // If caller is an authenticated non-admin user, enforce strict user_id scoping
    if (user) {
      const { data: adminData } = await supabase
        .from("admin_users")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (!adminData) {
        query = query.eq("user_id", user.id);
      }
    }

    const { data, error } = await query.single();

    if (!error && data) {
      return OrderSchema.parse(data);
    }
  } catch {
    // Database error handling
  }

  if (!isProduction()) {
    const fallback = memoryOrders[orderId];
    return fallback ? OrderSchema.parse(fallback) : null;
  }

  return null;
}

/**
 * List orders for the currently authenticated user.
 * IDOR Fix: Derives the user ID strictly from the server auth session and filters `.eq("user_id", user.id)`.
 */
export async function listOrdersForUser(): Promise<Order[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      if (!isProduction()) {
        return Object.values(memoryOrders);
      }
      return [];
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data.map((d) => OrderSchema.parse(d));
    }
  } catch {
    // Controlled error handling
  }

  if (!isProduction()) {
    return Object.values(memoryOrders);
  }

  return [];
}

/**
 * Creates an order transactionally via Postgres RPC `create_order_with_items` (§1).
 * Server-side recomputation of totals + single atomic Postgres transaction.
 */
export async function createOrderServerSide(input: {
  items: Array<{ productId: string; quantity: number; unitPriceInr: number }>;
  address: ShippingAddress;
  razorpayOrderId: string;
}): Promise<Order> {
  const subtotal = input.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPriceInr,
    0
  );
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const itemsJsonb = input.items.map((item) => ({
    product_id: item.productId,
    quantity: item.quantity,
    unit_price_inr: item.unitPriceInr,
    line_total_inr: item.quantity * item.unitPriceInr,
  }));

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: createdOrder, error: rpcError } = await supabase.rpc(
      "create_order_with_items",
      {
        p_user_id: user?.id ?? null,
        p_subtotal_inr: subtotal,
        p_shipping_inr: 0,
        p_total_inr: total,
        p_shipping_address: input.address,
        p_razorpay_order_id: input.razorpayOrderId,
        p_items: itemsJsonb,
      }
    );

    if (!rpcError && createdOrder) {
      // Fetch full order with items for response validation
      const { data: fullOrderData } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("id", createdOrder.id)
        .single();

      if (fullOrderData) {
        return OrderSchema.parse(fullOrderData);
      }
    }

    if (isProduction()) {
      throw new Error(
        `Order RPC persistence failed: ${rpcError?.message ?? "no row returned from RPC"}`
      );
    }
  } catch (err) {
    if (isProduction()) {
      throw err;
    }
  }

  // Non-production offline demo fallback
  const orderId = `ord-${Date.now()}`;
  const newOrder: Order = {
    id: orderId,
    user_id: null,
    status: "pending_payment",
    subtotal_inr: subtotal,
    shipping_inr: 0,
    total_inr: total,
    shipping_address: input.address,
    razorpay_order_id: input.razorpayOrderId,
    razorpay_payment_id: null,
    shipment_tracking_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    items: input.items.map((item, idx) => ({
      id: `oi-${idx}`,
      order_id: orderId,
      product_id: item.productId,
      quantity: item.quantity,
      unit_price_inr: item.unitPriceInr,
      line_total_inr: item.quantity * item.unitPriceInr,
    })),
  };

  memoryOrders[orderId] = newOrder;
  return newOrder;
}
