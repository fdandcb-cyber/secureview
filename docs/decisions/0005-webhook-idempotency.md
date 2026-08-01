# 0005. Webhook Signature Verification & Idempotency Guard

## Context
Webhooks from payment gateways (Razorpay) can be retried multiple times over unstable network conditions. Without idempotency guards, duplicate webhook events could cause duplicate order state mutations or double fulfillment.

## Decision
We implemented two strict layers:
1. `RAZORPAY_WEBHOOK_SECRET` HMAC-SHA256 signature verification before parsing request payloads.
2. `processed_webhook_events` table tracking `event_id` keys. Retried events are logged, short-circuited, and responded to with 200 OK without reprocessing business logic.

## Consequences
- **Positive:** Immune to duplicate webhook retries and replay attacks.
- **Negative:** Requires storing unique event IDs in Postgres.
