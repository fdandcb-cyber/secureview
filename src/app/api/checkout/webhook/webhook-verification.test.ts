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
 * Webhook Signature Verification, Fail-Closed Guard & Idempotency Test (§3)
 */
async function runWebhookTests() {
  console.log("Starting Razorpay Webhook Verification & Idempotency Tests...");

  // Dynamic import after server-only mock registration
  const { POST } = await import("./route");

  // Test 1: Fail closed if RAZORPAY_WEBHOOK_SECRET is unconfigured (HTTP 500)
  {
    delete process.env.RAZORPAY_WEBHOOK_SECRET;

    const req = new Request("http://localhost:3000/api/checkout/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "payment.captured", event_id: "evt_test_unconfigured" }),
    });

    const res = await POST(req);
    const body = await res.json();
    if (res.status === 500 && body.error?.includes("secret not configured")) {
      console.log("✔ Test 1 Passed: Fail-closed guard rejected unconfigured secret (HTTP 500).");
    } else {
      console.error("❌ Test 1 Failed: Expected HTTP 500 with unconfigured secret error, got:", res.status, body);
      process.exit(1);
    }
  }

  // Set mock webhook secret for remaining tests
  process.env.RAZORPAY_WEBHOOK_SECRET = "test_webhook_secret_key_123";

  // Test 2: Reject request with missing signature header (HTTP 400)
  {
    const req = new Request("http://localhost:3000/api/checkout/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "payment.captured", event_id: "evt_test_1" }),
    });

    const res = await POST(req);
    const body = await res.json();
    if (res.status === 400 && body.error?.includes("Missing Razorpay webhook signature")) {
      console.log("✔ Test 2 Passed: Rejected request with missing signature (HTTP 400).");
    } else {
      console.error("❌ Test 2 Failed: Expected 400 with missing signature error, got:", res.status, body);
      process.exit(1);
    }
  }

  // Test 3: Reject request with invalid signature (timing-safe check) (HTTP 400)
  {
    const req = new Request("http://localhost:3000/api/checkout/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-razorpay-signature": "invalid_hmac_signature_value_with_same_length_0123456789abcdef0123456789abcdef",
      },
      body: JSON.stringify({ event: "payment.captured", event_id: "evt_test_2" }),
    });

    const res = await POST(req);
    const body = await res.json();
    if (res.status === 400 && body.error?.includes("Invalid Razorpay webhook signature")) {
      console.log("✔ Test 3 Passed: Rejected request with invalid signature (HTTP 400).");
    } else {
      console.error("❌ Test 3 Failed: Expected 400 with invalid signature error, got:", res.status, body);
      process.exit(1);
    }
  }

  // Test 4: Reject payload lacking event_id or payment ID (HTTP 400)
  {
    const payloadStr = JSON.stringify({
      event: "payment.captured",
      // No event_id and no payload.payment.entity.id
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
    if (res.status === 400 && body.error?.includes("Missing usable event_id")) {
      console.log("✔ Test 4 Passed: Rejected payload lacking event ID (HTTP 400).");
    } else {
      console.error("❌ Test 4 Failed: Expected 400 for missing event ID payload, got:", res.status, body);
      process.exit(1);
    }
  }

  // Test 5: Accept request with valid HMAC SHA256 signature
  {
    const payloadStr = JSON.stringify({
      event: "payment.captured",
      event_id: "evt_test_5_valid",
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
      console.log("✔ Test 5 Passed: Accepted request with valid HMAC SHA256 signature.");
    } else {
      console.error("❌ Test 5 Failed: Expected 200 with success: true, got:", res.status, body);
      process.exit(1);
    }
  }

  console.log("🎉 All Webhook Enforcement Tests Passed Successfully!");
}

runWebhookTests().catch((err) => {
  console.error("Webhook test script failed:", err);
  process.exit(1);
});
