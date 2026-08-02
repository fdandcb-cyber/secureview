import { spawnSync } from "child_process";
import path from "path";

const testFiles = [
  "src/features/calculators/storage/calculator-engine.test.ts",
  "scripts/test-auth-guard.ts",
  "scripts/test-checkout-price-validation.ts",
  "scripts/test-webhook.ts",
  "scripts/test-order-rpc.ts",
  "scripts/test-rate-limiter.ts",
  "scripts/test-env-validation.ts",
];

console.log("==========================================");
console.log("  Running Full Connectz Test Suite");
console.log("==========================================\n");

let passedCount = 0;
let failedCount = 0;

for (const file of testFiles) {
  const filePath = path.resolve(process.cwd(), file);
  console.log(`\n--- Running ${file} ---`);

  const result = spawnSync("npx", ["tsx", filePath], {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });

  if (result.status === 0) {
    passedCount++;
  } else {
    failedCount++;
    console.error(`❌ Suite failed at ${file}`);
    process.exit(1);
  }
}

console.log("\n==========================================");
console.log(`🎉 ALL TEST SUITES PASSED! (${passedCount}/${testFiles.length} passed, ${failedCount} failed)`);
console.log("==========================================");
