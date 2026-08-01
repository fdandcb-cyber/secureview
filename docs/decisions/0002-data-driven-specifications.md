# 0002. Data-Driven Specification Schema

## Context
Security camera and recorder specifications vary widely across categories (MP, FOV, IR Range, PoE class, SATA bays). Hardcoding table columns for every spec creates fragile database schemas requiring migrations for every new feature.

## Decision
We implemented a `spec_fields` + `product_spec_values` EAV-like pattern scoped per category. Every `spec_field` mandates a `plain_language_explainer` field to ensure plain-language education is enforced at the database level.

## Consequences
- **Positive:** New product categories and spec parameters can be added dynamically without SQL migrations. Every spec carries an educational explanation.
- **Negative:** Requires mapping joined rows into resolved spec objects in the repository layer.
