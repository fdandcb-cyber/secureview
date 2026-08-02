/**
 * Single Source of Truth for Brand & Business Configuration.
 *
 * Rule: No component, page, or service should hardcode literal brand strings,
 * phone numbers, support emails, or domain names. Import from `BRAND` instead.
 */
export const BRAND = {
  siteName: "Connectz Learning Center",
  supportEmail: "support@connectzss.shop",
  domain: "connectzss.store",
  siteUrl: "https://connectzss.store",
  mobile: "+91 78094 65102",
  mobileHref: "tel:+917809465102",
  officeLocation: "Cuttack, Odisha",
  adminLoginEmail: "connectzsalesandservices@gmail.com",
} as const;
