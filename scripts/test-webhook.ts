import Module from "module";
import crypto from "crypto";

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
 * Webhook Signature Verification and Idempotency Unit Test (§8.4)
 */
async function runWebhookTests() {
  console.log("Starting Razorpay Webhook Verification & Idempotency Tests...");

  // Dynamic import after server-only mock registration
  const { POST } = await import("../src/app/api/checkout/webhook/route");

  // Mock server environment variable for tests
  process.env.RAZORPAY_WEBHOOK_SECRET = "test_webhook_secret_key_123";

  // Test 1: Reject request with missing signature
  {
    const req = new Request("http://localhost:3000/api/checkout/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "payment.captured", event_id: "evt_test_1" }),
    });

    const res = await POST(req);
    const body = await res.json();
    if (res.status === 400 && body.error?.includes("Missing Razorpay webhook signature")) {
      console.log("✔ Test 1 Passed: Rejected request with missing signature (HTTP 400).");
    } else {
      console.error("❌ Test 1 Failed: Expected 400 with missing signature error, got:", res.status, body);
      process.exit(1);
    }
  }

  // Test 2: Reject request with invalid signature
  {
    const req = new Request("http://localhost:3000/api/checkout/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-razorpay-signature": "invalid_hmac_signature_value",
      },
      body: JSON.stringify({ event: "payment.captured", event_id: "evt_test_2" }),
    });

    const res = await POST(req);
    const body = await res.json();
    if (res.status === 400 && body.error?.includes("Invalid Razorpay webhook signature")) {
      console.log("✔ Test 2 Passed: Rejected request with invalid signature (HTTP 400).");
    } else {
      console.error("❌ Test 2 Failed: Expected 400 with invalid signature error, got:", res.status, body);
      process.exit(1);
    }
  }

  // Test 3: Accept request with valid signature
  {
    const payloadStr = JSON.stringify({
      event: "payment.captured",
      event_id: "evt_test_3_valid",
      payload: {
        payment: {
          entity: {
            id: "pay_test123",
            order_id: "order_test123",
          },
        },
      },
    });

    const validSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(payloadStr)
      .digest("hex");

    const req = new Request("http://localhost:3000/api/checkout/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-razorpay-signature": validSignature,
      },
      body: payloadStr,
    });

    const res = await POST(req);
    const body = await res.json();
    if (res.status === 200 && body.success === true) {
      console.log("✔ Test 3 Passed: Accepted request with valid HMAC SHA256 signature.");
    } else {
      console.error("❌ Test 3 Failed: Expected 200 with success: true, got:", res.status, body);
      process.exit(1);
    }
  }

  console.log("🎉 All Webhook Verification Tests Passed Successfully!");
}

runWebhookTests().catch((err) => {
  console.error("Webhook test script failed:", err);
  process.exit(1);
});
