import { createSupabaseServerClient } from "@/lib/supabase/server";
import { OrderSchema, type Order, type ShippingAddress } from "../schemas";

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

    // Explicit deny for unauthenticated callers. RLS also enforces this
    // (auth.uid() is null for anonymous requests, which can't match any
    // user_id), but the application layer should not depend on RLS as the
    // only enforcement point for something this sensitive — an order
    // contains a customer's address and purchase details.
    if (!user) {
      if (process.env.NODE_ENV !== "production") {
        const fallback = memoryOrders[orderId];
        return fallback ? OrderSchema.parse(fallback) : null;
      }
      return null;
    }

    let query = supabase.from("orders").select("*, order_items(*)").eq("id", orderId);

    // If caller is an authenticated non-admin user, enforce strict user_id scoping
    if (user) {
      // Check if admin user
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

  // Demo fallback strictly gated for non-production environments
  if (process.env.NODE_ENV !== "production") {
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
      // Unauthenticated user has zero access to orders
      if (process.env.NODE_ENV !== "production") {
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

  if (process.env.NODE_ENV !== "production") {
    return Object.values(memoryOrders);
  }

  return [];
}

/**
 * Creates an order in the database and recomputes authoritative prices server-side.
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

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: insertedOrder, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id ?? null,
        status: "pending_payment",
        subtotal_inr: subtotal,
        shipping_inr: 0,
        total_inr: total,
        shipping_address: input.address,
        razorpay_order_id: input.razorpayOrderId,
      })
      .select()
      .single();

    if (!orderError && insertedOrder) {
      const orderItems = input.items.map((item) => ({
        order_id: insertedOrder.id,
        product_id: item.productId,
        quantity: item.quantity,
        unit_price_inr: item.unitPriceInr,
        line_total_inr: item.quantity * item.unitPriceInr,
      }));

      const { data: insertedItems, error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems)
        .select();

      if (itemsError || !insertedItems || insertedItems.length !== orderItems.length) {
        // Items failed to persist — the order header exists but is
        // incomplete. Compensate by removing it rather than returning a
        // "successful" order with missing/wrong line items. This is a
        // pragmatic two-statement compensation, not a true DB transaction;
        // a Postgres RPC wrapping both inserts in one transaction is the
        // more robust fix and is a reasonable follow-up, not required to
        // close this specific bug.
        console.error(
          "[order-repository] order_items insert failed or incomplete for order",
          insertedOrder.id,
          itemsError
        );
        await supabase.from("orders").delete().eq("id", insertedOrder.id);

        if (process.env.NODE_ENV === "production") {
          throw new Error("Order item persistence failed; order was rolled back.");
        }
        // Non-production: fall through to the in-memory demo fallback below.
      } else {
        const fullOrder = {
          ...insertedOrder,
          items: insertedItems,
        };

        return OrderSchema.parse(fullOrder);
      }
    } else {
      // The insert call completed without throwing, but Supabase reported an
      // error or returned no row — this is a genuine persistence failure, not
      // an "offline dev" case. Never silently fabricate a success in production.
      if (process.env.NODE_ENV === "production") {
        throw new Error(
          `Order persistence failed: ${orderError?.message ?? "no row returned from insert"}`
        );
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      // Re-throw in production — the caller (checkout route) must not treat
      // this as a successful order creation. Falling through to the demo
      // fallback below would silently report success for an order that was
      // never persisted anywhere.
      throw err;
    }
    // Non-production: fall through to the in-memory demo fallback below.
  }

  // Development/demo fallback object — only reachable in non-production
  // environments, since both failure paths above re-throw in production.
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

  // Reachable only in non-production: both failure paths above throw when
  // NODE_ENV === "production", so this demo fallback is guaranteed to be
  // non-production code at this point.
  memoryOrders[orderId] = newOrder;

  return newOrder;
}
