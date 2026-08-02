import { validateProductionEnv } from "@/config/env";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    validateProductionEnv();
  }
}
