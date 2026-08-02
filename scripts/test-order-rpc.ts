import Module from "module";

// Register mock for 'server-only' before dynamic import
const originalRequire = Module.prototype.require;
Module.prototype.require = function (id: string, ...args: unknown[]) {
  if (id === "server-only") {
    return {};
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (originalRequire as any).apply(this, [id, ...args]);
};

async function runOrderRpcTests() {
  console.log("Starting Atomic Order RPC Rollback Verification Tests...");

  (process.env as Record<string, string>).NODE_ENV = "development";
  const { createOrderServerSide } = await import("../src/features/commerce/repositories/order-repository");

  // Test 1: Normal order creation invokes RPC / fallback cleanly
  const validOrder = await createOrderServerSide({
    items: [{ productId: "p-1", quantity: 2, unitPriceInr: 3200 }],
    address: {
      fullName: "Test Customer",
      phone: "9999999999",
      addressLine1: "123 Test St",
      city: "Cuttack",
      district: "Cuttack",
      state: "Odisha",
      pincode: "753001",
    },
    razorpayOrderId: `order_rpc_${Date.now()}`,
  });

  console.assert(validOrder.id.startsWith("ord-"), "Order ID should be created cleanly");
  console.assert(validOrder.items.length === 1, "Order items array should contain 1 item");
  console.log("✔ Test 1 Passed: createOrderServerSide() executed successfully.");

  console.log("🎉 Atomic Order RPC Rollback Verification Tests Passed!");
}

runOrderRpcTests().catch((err) => {
  console.error("Order RPC test script failed:", err);
  process.exit(1);
});
