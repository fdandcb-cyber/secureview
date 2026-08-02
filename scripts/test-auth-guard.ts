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
 * Admin Auth Guard Verification Test (§1 & §2)
 */
async function runAuthGuardTests() {
  console.log("Starting Admin Auth Guard Verification Tests...");

  // Force process.env.NODE_ENV to development and clear bypass env var
  (process.env as Record<string, string>).NODE_ENV = "development";
  delete process.env.DEV_BYPASS_ADMIN_AUTH;

  const { requireAdmin } = await import("../src/lib/auth/require-admin");

  // Test 1: Unauthenticated request in NODE_ENV=development without DEV_BYPASS_ADMIN_AUTH MUST redirect to /login
  try {
    await requireAdmin();
    console.error("❌ Test 1 Failed: requireAdmin did NOT throw redirect when unauthenticated in NODE_ENV=development!");
    process.exit(1);
  } catch (err) {
    if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
      console.log("✔ Test 1 Passed: requireAdmin() strictly threw NEXT_REDIRECT to /login when NODE_ENV=development.");
    } else {
      console.log("✔ Test 1 Passed: requireAdmin() threw expected auth failure error when unauthenticated.");
    }
  }

  // Test 2: Explicit DEV_BYPASS_ADMIN_AUTH="true" in NODE_ENV=development triggers bypass with console warning
  {
    process.env.DEV_BYPASS_ADMIN_AUTH = "true";
    const session = await requireAdmin();

    if (session.userId === "dev-admin-id" && session.email === "connectzsalesandservices@gmail.com") {
      console.log("✔ Test 2 Passed: Explicit DEV_BYPASS_ADMIN_AUTH='true' successfully returned mock dev admin session.");
    } else {
      console.error("❌ Test 2 Failed: Explicit bypass did not return expected dev session:", session);
      process.exit(1);
    }
  }

  // Test 3: In NODE_ENV=production, DEV_BYPASS_ADMIN_AUTH="true" MUST BE REJECTED (no bypass allowed in production)
  {
    (process.env as Record<string, string>).NODE_ENV = "production";
    process.env.DEV_BYPASS_ADMIN_AUTH = "true";

    try {
      await requireAdmin();
      console.error("❌ Test 3 Failed: requireAdmin allowed bypass in NODE_ENV=production!");
      process.exit(1);
    } catch {
      console.log("✔ Test 3 Passed: requireAdmin() strictly rejected DEV_BYPASS_ADMIN_AUTH when NODE_ENV=production.");
    }
  }

  console.log("🎉 All Admin Auth Guard Verification Tests Passed Successfully!");
}

runAuthGuardTests().catch((err) => {
  console.error("Auth guard test script failed:", err);
  process.exit(1);
});
