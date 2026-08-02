/**
 * Lightweight sliding-window rate limiter for publicly writable endpoints (§8).
 * Tracks request counts per key (IP / identifier) within a time window.
 */
type RateLimitOptions = {
  windowMs?: number; // Time window in milliseconds (default: 60,000ms = 1 minute)
  maxRequests?: number; // Max requests permitted in the window (default: 10)
};

type RateLimitRecord = {
  count: number;
  resetTime: number;
};

const trackerMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(
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
