import { createSupabasePrivilegedClient } from "@/lib/supabase/server-privileged";

/**
 * Shared Postgres-backed rate limiter with sliding window & atomic PL/pgSQL upsert (§2).
 * Operates against rate_limit_buckets table across serverless instances, with in-memory fallback.
 */
export type RateLimitOptions = {
  windowMs?: number; // Time window in milliseconds (default: 60,000ms = 1 minute)
  maxRequests?: number; // Max requests permitted in the window (default: 10)
};

type RateLimitRecord = {
  count: number;
  resetTime: number;
};

const trackerMap = new Map<string, RateLimitRecord>();

export async function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): Promise<{ allowed: boolean; remaining: number; resetTimeMs: number }> {
  const windowMs = options.windowMs ?? 60_000;
  const maxRequests = options.maxRequests ?? 10;

  try {
    const supabaseAdmin = createSupabasePrivilegedClient();
    const { data, error } = await supabaseAdmin.rpc("check_rate_limit_bucket", {
      p_bucket_key: identifier,
      p_window_ms: windowMs,
      p_max_requests: maxRequests,
    });

    if (!error && data && data.length > 0) {
      const res = data[0];
      return {
        allowed: Boolean(res.allowed),
        remaining: Number(res.remaining),
        resetTimeMs: Number(res.reset_time_ms),
      };
    }
  } catch {
    // Fallback to local memory tracker on DB connection or offline environment
  }

  return checkRateLimitSync(identifier, options);
}

export function checkRateLimitSync(
  identifier: string,
  options: RateLimitOptions = {}
): { allowed: boolean; remaining: number; resetTimeMs: number } {
  const windowMs = options.windowMs ?? 60_000;
  const maxRequests = options.maxRequests ?? 10;
  const now = Date.now();

  const record = trackerMap.get(identifier);

  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs;
    trackerMap.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: maxRequests - 1, resetTimeMs: resetTime };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTimeMs: record.resetTime };
  }

  record.count += 1;
  trackerMap.set(identifier, record);
  return { allowed: true, remaining: maxRequests - record.count, resetTimeMs: record.resetTime };
}
