# 0006. Shiprocket Logistics Integration & Trigger Point

## Context
Hardware orders transitioning to `paid` status must generate shipping tracking numbers (AWB codes) via Shiprocket API without blocking synchronous user response times.

## Decision
We wrapped Shiprocket operations in a dedicated service layer (`src/features/commerce/services/shiprocket.ts`) that validates credentials and surfaces clear errors when credentials are missing. Shipment triggers run upon `payment.captured` status confirmation or via manual admin trigger in `/admin/orders`.

## Consequences
- **Positive:** System gracefully handles missing or simulated Shiprocket API credentials without crashing order workflows.
- **Negative:** Requires storing shipment tracking IDs on the order row.
