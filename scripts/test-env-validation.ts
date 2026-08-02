import { validateProductionEnv, isProduction } from "../src/config/env";

async function runEnvValidationTests() {
  console.log("Starting Environment Centralization & Startup Validation Tests...");

  // Test 1: non-production mode does NOT throw even if keys are missing
  (process.env as Record<string, string>).NODE_ENV = "development";
  console.assert(isProduction() === false, "isProduction() should return false in development");

  try {
    validateProductionEnv();
    console.log("✔ Test 1 Passed: validateProductionEnv() does not throw in development mode.");
  } catch (err) {
    console.error("❌ Test 1 Failed: validateProductionEnv() threw in development:", err);
    process.exit(1);
  }

  // Test 2: production mode WITH missing keys MUST throw fatal startup error
  (process.env as Record<string, string>).NODE_ENV = "production";
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.RAZORPAY_KEY_ID;
  delete process.env.RAZORPAY_KEY_SECRET;
  delete process.env.RAZORPAY_WEBHOOK_SECRET;

  console.assert(isProduction() === true, "isProduction() should return true in production");

  try {
    validateProductionEnv();
    console.error("❌ Test 2 Failed: validateProductionEnv() did NOT throw when production keys were missing!");
    process.exit(1);
  } catch (err) {
    if (err instanceof Error && err.message.includes("[FATAL STARTUP ERROR]")) {
      console.log("✔ Test 2 Passed: validateProductionEnv() strictly threw fatal error in production when keys were missing.");
    } else {
      console.error("❌ Test 2 Failed with unexpected error type:", err);
      process.exit(1);
    }
  }

  // Test 3: production mode WITH all keys present passes cleanly
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test_role_key";
  process.env.RAZORPAY_KEY_ID = "test_key_id";
  process.env.RAZORPAY_KEY_SECRET = "test_key_secret";
  process.env.RAZORPAY_WEBHOOK_SECRET = "test_webhook_secret";

  try {
    validateProductionEnv();
    console.log("✔ Test 3 Passed: validateProductionEnv() passes cleanly when all required keys are populated in production.");
  } catch (err) {
    console.error("❌ Test 3 Failed: validateProductionEnv() threw when all keys were populated:", err);
    process.exit(1);
  }

  // Reset environment
  (process.env as Record<string, string>).NODE_ENV = "development";
  console.log("🎉 Environment Validation Tests Passed!");
}

runEnvValidationTests().catch((err) => {
  console.error("Env validation test script failed:", err);
  process.exit(1);
});
