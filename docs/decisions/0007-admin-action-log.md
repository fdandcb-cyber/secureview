# 0007. Audit Logging for Privileged Admin Overrides

## Context
Privileged admin operations (such as manual status overrides for quotes, order cancellations, payment status resyncing, or database record modifications using `server-privileged.ts`) bypass standard RLS policies. Without explicit audit logging, tracking administrative responsibility and diagnosing unauthorized operational changes would be impossible.

## Decision
We enforce an explicit audit logging requirement for all privileged admin actions. Every manual administrative override or server-privileged operation must insert an audit entry into `admin_action_log` recording:
1. `admin_user_id` (the authenticated admin performing the action, verified via `is_admin()`).
2. `action` (e.g. `MANUAL_ORDER_STATUS_OVERRIDE`, `QUOTE_PRICE_ADJUSTMENT`).
3. `target_table` and `target_id`.
4. `notes` detailing the operational reason for the change.

## Consequences
- **Positive:** Complete auditability and operational transparency for all privileged administrative overrides; prevents untraced DB mutations.
- **Negative:** Requires an extra write to `admin_action_log` during privileged server actions.
