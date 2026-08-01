import { z } from "zod";

export const BrandSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  logo_url: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true),
});

export const CategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  parent_id: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  sort_order: z.number().default(0),
});

export const SpecFieldSchema = z.object({
  id: z.string(),
  category_id: z.string(),
  key: z.string(),
  label: z.string(),
  plain_language_explainer: z.string(),
  field_type: z.enum(["text", "number", "boolean", "enum", "range"]),
  unit: z.string().nullable().optional(),
  enum_options: z.array(z.string()).nullable().optional(),
  is_comparison_default: z.boolean().default(false),
  sort_order: z.number().default(0),
});

export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  brand_id: z.string(),
  category_id: z.string(),
  name: z.string(),
  model_number: z.string(),
  short_description: z.string(),
  long_description: z.string().nullable().optional(),
  status: z.enum(["draft", "published", "discontinued"]),
  base_price_inr: z.number(),
  warranty_months: z.number().default(12),
  warranty_terms: z.string().nullable().optional(),
  is_verified_spec: z.boolean().default(true),
  primary_image_url: z.string().nullable().optional(),
});

export const ProductSpecValueSchema = z.object({
  id: z.string(),
  product_id: z.string(),
  spec_field_id: z.string(),
  value_text: z.string().nullable().optional(),
  value_number: z.number().nullable().optional(),
  value_boolean: z.boolean().nullable().optional(),
  source: z.enum(["manufacturer", "verified_test", "editorial"]),
});

export const ResolvedSpecValueSchema = z.object({
  fieldKey: z.string(),
  fieldLabel: z.string(),
  plainLanguageExplainer: z.string(),
  fieldType: z.enum(["text", "number", "boolean", "enum", "range"]),
  unit: z.string().nullable().optional(),
  isComparisonDefault: z.boolean(),
  displayValue: z.string(),
  rawValue: z.union([z.string(), z.number(), z.boolean()]),
  source: z.enum(["manufacturer", "verified_test", "editorial"]),
});

export const ProductWithSpecsSchema = ProductSchema.extend({
  brandName: z.string(),
  categoryName: z.string(),
  categorySlug: z.string(),
  resolvedSpecs: z.array(ResolvedSpecValueSchema),
});

export type Brand = z.infer<typeof BrandSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type SpecField = z.infer<typeof SpecFieldSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductSpecValue = z.infer<typeof ProductSpecValueSchema>;
export type ResolvedSpecValue = z.infer<typeof ResolvedSpecValueSchema>;
export type ProductWithSpecs = z.infer<typeof ProductWithSpecsSchema>;
