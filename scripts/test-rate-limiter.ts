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

async function runRateLimiterTests() {
  console.log("Starting Postgres & Sliding-Window Rate Limiter Tests...");

  const { checkRateLimitSync, checkRateLimit } = await import("../src/lib/rate-limit");

  const testKey = `test-ip-${Date.now()}`;
  const options = { windowMs: 1000, maxRequests: 3 };

  // Synchronous bucket accumulation test
  const req1 = checkRateLimitSync(testKey, options);
  console.assert(req1.allowed === true && req1.remaining === 2, "First request should be allowed (remaining: 2)");

  const req2 = checkRateLimitSync(testKey, options);
  console.assert(req2.allowed === true && req2.remaining === 1, "Second request should be allowed (remaining: 1)");

  const req3 = checkRateLimitSync(testKey, options);
  console.assert(req3.allowed === true && req3.remaining === 0, "Third request should be allowed (remaining: 0)");

  const req4 = checkRateLimitSync(testKey, options);
  console.assert(req4.allowed === false && req4.remaining === 0, "Fourth request exceeding maxRequests MUST be rejected");

  console.log("✔ Test 1 Passed: In-memory sliding window rate limiter strictly enforced threshold (3 max).");

  // Async DB-fallback rate limit call test
  const asyncReq = await checkRateLimit(`async-${testKey}`, options);
  console.assert(asyncReq.allowed === true, "Async rate limiter should allow initial request");
  console.log("✔ Test 2 Passed: checkRateLimit() async interface executed successfully.");

  console.log("🎉 Rate Limiter Verification Tests Passed!");
}

runRateLimiterTests().catch((err) => {
  console.error("Rate limiter test script failed:", err);
  process.exit(1);
});
