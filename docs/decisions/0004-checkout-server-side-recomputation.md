# 0004. Server-Side Checkout Total Recomputation

## Context
Payment security requires that order totals submitted to payment gateways (Razorpay) are never derived from client-provided input values (which can be tampered with in transit or via browser dev tools).

## Decision
All order checkout calculations (`POST /api/checkout/create-order`) read live database unit prices from `products`, apply quantity multipliers, calculate 18% GST server-side, and generate the payment token based exclusively on the recomputed server total.

## Consequences
- **Positive:** Guaranteed protection against price tampering; client manipulation attempts are impossible.
- **Negative:** Requires extra database queries during order creation.
