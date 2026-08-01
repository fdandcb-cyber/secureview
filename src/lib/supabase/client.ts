import { createBrowserClient } from "@supabase/ssr";
import { publicEnv } from "@/config/env";

/**
 * Use this ONLY in client components ("use client").
 * Relies entirely on Postgres Row Level Security for data protection —
 * never assume the anon key alone limits access.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL ?? "",
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );
}
