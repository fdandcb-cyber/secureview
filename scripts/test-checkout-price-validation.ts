import Module from "module";

// Register mock for 'server-only' before dynamic import of server-only modules
const originalRequire = Module.prototype.require;
Module.prototype.require = function (id: string, ...args: unknown[]) {
  if (id === "server-only") {
    return {};
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (originalRequire as any).apply(this, [id, ...args]);
};

/**
 * Checkout Price Validation Unit Test (§2)
 */
async function runCheckoutPriceValidationTests() {
  console.log("Starting Checkout Price Validation Tests...");

  // Mock server environment variable for Razorpay keys during tests
  process.env.RAZORPAY_KEY_ID = "rzp_test_mock_key_id";
  process.env.RAZORPAY_KEY_SECRET = "rzp_test_mock_key_secret";

  // Mock Razorpay SDK addResources method before dynamic import of route
  const RazorpayModule = await import("razorpay");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (RazorpayModule.default.prototype as any).addResources = function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.orders = {
      create: async (params: { amount: number; currency: string }) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({
          id: `order_mock_${Math.random().toString(36).substring(2, 9)}`,
          entity: "order",
          amount: params.amount,
          amount_paid: 0,
          amount_due: params.amount,
          currency: params.currency,
          receipt: `rcpt_mock_${Date.now()}`,
          status: "created",
          attempts: 0,
          notes: [],
          created_at: Math.floor(Date.now() / 1000),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any),
    };
  };

  // Dynamic import of route handler
  const { POST } = await import("../src/app/api/checkout/create-order/route");

  // Test 1: Price Tampering Attempt
  // Product 'hikvision-ds-2cd1043g2-i' real base price is ₹3,200.
  // We submit a request trying to buy 2 units at ₹1 each (trying to pay ₹2 instead of ₹6,400 + GST = ₹7,552).
  {
    const req = new Request("http://localhost:3000/api/checkout/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          {
            productId: "hikvision-ds-2cd1043g2-i",
            quantity: 2,
            unitPriceInr: 1, // Tampered client price — MUST BE DISCARDED
          },
        ],
        shippingAddress: {
          fullName: "Rakesh Mohanty",
          phone: "9437012345",
          addressLine1: "Plot 102, Saheed Nagar",
          city: "Bhubaneswar",
          district: "Khordha",
          state: "Odisha",
          pincode: "751007",
        },
      }),
    });

    const res = await POST(req);
    const body = await res.json();

    // Expected subtotal: 2 * 3200 = 6400. GST (18%): 1152. Total: 7552.
    const expectedServerTotal = 6400 + 1152;

    if (res.status === 200 && body.amountInr === expectedServerTotal) {
      console.log(
        `✔ Test 1 Passed: Client price tampering rejected. Server enforced real DB total (₹${body.amountInr} instead of tampered ₹2).`
      );
    } else {
      console.error(
        `❌ Test 1 Failed: Expected HTTP 200 with server total ₹${expectedServerTotal}, got status ${res.status}:`,
        body
      );
      process.exit(1);
    }
  }

  // Test 2: Reject non-existent product
  {
    const req = new Request("http://localhost:3000/api/checkout/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          {
            productId: "non-existent-fake-camera-slug",
            quantity: 1,
          },
        ],
        shippingAddress: {
          fullName: "Test User",
          phone: "9437012345",
          addressLine1: "Test St",
          city: "Cuttack",
          district: "Cuttack",
          state: "Odisha",
          pincode: "753001",
        },
      }),
    });

    const res = await POST(req);
    const body = await res.json();

    if (res.status === 400 && body.error?.includes("Product not found")) {
      console.log("✔ Test 2 Passed: Rejected non-existent product ID (HTTP 400).");
    } else {
      console.error("❌ Test 2 Failed: Expected 400 for fake product ID, got:", res.status, body);
      process.exit(1);
    }
  }

  console.log("🎉 All Checkout Price Validation Tests Passed Successfully!");
}

runCheckoutPriceValidationTests().catch((err) => {
  console.error("Checkout price validation test failed:", err);
  process.exit(1);
});
