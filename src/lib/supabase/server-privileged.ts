import "server-only";
import { createClient } from "@supabase/supabase-js";
import { publicEnv } from "@/config/env";
import { getServerEnv } from "@/config/env";

/**
 * ⚠️ HIGH RISK BOUNDARY ⚠️
 *
 * This client BYPASSES Row Level Security using the Supabase service role key.
 *
 * Rules:
 * - Import this ONLY inside route handlers / server actions that perform
 *   trusted, admin-authorized, or system-level operations (e.g. webhook
 *   processing, admin CMS writes, scheduled jobs).
 * - NEVER import this in anything reachable from a user-supplied request
 *   without an explicit authorization check performed first.
 * - NEVER import this in a client component — `server-only` will break the
 *   build if you try, which is intentional.
 */
export function createSupabasePrivilegedClient() {
  const serverEnv = getServerEnv();

  if (!serverEnv.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Refusing to create a privileged client."
    );
  }

  return createClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL ?? "",
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}
