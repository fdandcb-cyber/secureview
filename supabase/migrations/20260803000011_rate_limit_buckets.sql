-- Migration: Rate Limiting Buckets & Atomic Function
-- Description: Creates rate_limit_buckets table and an atomic upsert function check_rate_limit_bucket
-- to manage sliding window rate limits across serverless instances.

CREATE TABLE IF NOT EXISTS public.rate_limit_buckets (
  bucket_key TEXT PRIMARY KEY,
  request_count INT NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Atomic PL/pgSQL function to evaluate rate limit & cleanup expired buckets
CREATE OR REPLACE FUNCTION public.check_rate_limit_bucket(
  p_bucket_key TEXT,
  p_window_ms INT,
  p_max_requests INT
)
RETURNS TABLE (
  allowed BOOLEAN,
  remaining INT,
  reset_time_ms BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_now TIMESTAMPTZ := NOW();
  v_window_start TIMESTAMPTZ;
  v_count INT;
  v_reset_time_ms BIGINT;
  v_window_interval INTERVAL := (p_window_ms || ' milliseconds')::INTERVAL;
BEGIN
  -- Opportunistic cleanup of expired buckets (> 1 hour old)
  DELETE FROM public.rate_limit_buckets
  WHERE window_start < (v_now - INTERVAL '1 hour');

  SELECT window_start, request_count
  INTO v_window_start, v_count
  FROM public.rate_limit_buckets
  WHERE bucket_key = p_bucket_key;

  IF NOT FOUND OR (v_now >= v_window_start + v_window_interval) THEN
    -- Initialize or reset window
    INSERT INTO public.rate_limit_buckets (bucket_key, request_count, window_start)
    VALUES (p_bucket_key, 1, v_now)
    ON CONFLICT (bucket_key) DO UPDATE
    SET request_count = 1, window_start = EXCLUDED.window_start;

    v_reset_time_ms := (EXTRACT(EPOCH FROM (v_now + v_window_interval)) * 1000)::BIGINT;
    RETURN QUERY SELECT TRUE, p_max_requests - 1, v_reset_time_ms;
  ELSE
    v_reset_time_ms := (EXTRACT(EPOCH FROM (v_window_start + v_window_interval)) * 1000)::BIGINT;

    IF v_count >= p_max_requests THEN
      RETURN QUERY SELECT FALSE, 0, v_reset_time_ms;
    ELSE
      UPDATE public.rate_limit_buckets
      SET request_count = request_count + 1
      WHERE bucket_key = p_bucket_key;

      RETURN QUERY SELECT TRUE, p_max_requests - (v_count + 1), v_reset_time_ms;
    END IF;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.check_rate_limit_bucket TO authenticated, anon;
