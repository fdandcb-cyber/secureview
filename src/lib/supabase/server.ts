import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { publicEnv } from "@/config/env";

/**
 * Use this in server components, route handlers, and server actions ONLY.
 * The `"server-only"` import makes any accidental client-side import
 * fail the build instead of silently shipping server code to the browser.
 *
 * Still uses the anon key + user session (via cookies) — RLS still applies.
 * This is NOT the service-role client. See server-privileged.ts for that,
 * and treat that file as a much higher-risk boundary.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL ?? "",
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component with no request context to mutate.
            // Safe to ignore if you have middleware refreshing sessions.
          }
        },
      },
    }
  );
}
