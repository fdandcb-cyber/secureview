import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  CheckCircle2,
  XCircle,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "CCTV Warranty Guidance",
  description:
    "How CCTV warranty works, what voids it, channel-dependent eligibility, and how to check warranty status by brand.",
};

const warrantyFacts = [
  {
    title: "Warranty is channel-dependent, not just brand-dependent",
    description:
      "A genuine Hikvision camera bought from an unauthorized seller may be refused warranty service by Hikvision's official service center. The product is real, but the purchase channel isn't recognized. This is a channel policy, not a defect issue.",
    type: "warning" as const,
  },
  {
    title: "Warranty period starts from manufacture date, not purchase date",
    description:
      "Some brands start the warranty clock from the date of manufacture (printed on the box), not from your purchase date. Old stock sitting in a warehouse can arrive with months already consumed. Always check the manufacture date before buying.",
    type: "warning" as const,
  },
  {
    title: "Online serial number verification is available for most brands",
    description:
      "Hikvision, Dahua, and CP Plus all offer online warranty-check tools where you can enter a serial number and verify coverage. Do this before purchasing if possible — the seller should be willing to share serial numbers.",
    type: "info" as const,
  },
  {
    title: "Physical damage and power surge are the most common exclusions",
    description:
      "Water ingress from improper installation (even on an IP67 camera), power surges from unstable mains supply without a UPS, and physical impact are the three most common reasons warranty claims are rejected — and none of them are manufacturing defects.",
    type: "warning" as const,
  },
] as const;

const brandPolicies = [
  {
    brand: "Hikvision",
    standardWarranty: "2 years",
    extendedAvailable: "Up to 5 years (on select models)",
    onlineTool: "https://www.hikvision.com/en/support/warranty-policy/",
    claimProcess: "Through authorized service center. Invoice + serial number required. RMA process for replacement units.",
    notes: "Products purchased from unauthorized channels may not be eligible. Verify seller authorization before purchase.",
  },
  {
    brand: "Dahua",
    standardWarranty: "2 years",
    extendedAvailable: "3 years on select enterprise models",
    onlineTool: "https://www.dahuasecurity.com/support/warrantyQuery",
    claimProcess: "Through authorized distributor or direct support. Invoice mandatory. Cross-ship available for enterprise accounts.",
    notes: "Warranty valid only for India-region products. Products intended for other regions (different firmware/specs) may not be serviceable.",
  },
  {
    brand: "CP Plus",
    standardWarranty: "2 years",
    extendedAvailable: "Up to 3 years on select models",
    onlineTool: "https://www.cpplusworld.com/warranty-check",
    claimProcess: "Through nationwide service center network. Invoice or CP Plus registration proof required.",
    notes: "Wide service network in India. Registration on CP Plus portal recommended immediately after purchase.",
  },
  {
    brand: "Western Digital (Purple)",
    standardWarranty: "3 years",
    extendedAvailable: "No",
    onlineTool: "https://support.wdc.com/warranty/warrantystatus.aspx",
    claimProcess: "Online RMA through WD support portal. Prepaid shipping for replacement.",
    notes: "Warranty applies to WD Purple (surveillance) line only. Desktop drives (Blue/Green) have different terms.",
  },
  {
    brand: "Seagate (SkyHawk)",
    standardWarranty: "3 years",
    extendedAvailable: "5 years on SkyHawk AI series",
    onlineTool: "https://www.seagate.com/support/warranty-and-replacements/",
    claimProcess: "Online RMA. Seagate handles return shipping in most cases.",
    notes: "SkyHawk drives include Seagate Rescue data recovery service (limited). Verify model-specific terms.",
  },
] as const;

const dosDonts = {
  dos: [
    "Keep the original invoice — it's required for every warranty claim",
    "Register the product on the manufacturer's portal immediately after purchase",
    "Use a UPS/surge protector to prevent power-related damage",
    "Install outdoor cameras with proper weatherproof junction boxes",
    "Note the serial number and model number before installation (it's on the label)",
    "Check warranty status online before purchase if the seller can share the serial",
  ],
  donts: [
    "Don't assume marketplace purchases are automatically warranty-eligible",
    "Don't open or modify the device housing — this voids warranty on most brands",
    "Don't install IP67 cameras without ensuring cable entry points are properly sealed",
    "Don't ignore the 'manufacture date' printed on the box — warranty may start from there",
    "Don't use third-party firmware or unauthorized factory reset tools",
    "Don't delay claims — some brands have a short window after failure for reporting",
  ],
} as const;

export default function WarrantyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
        Warranty Guidance
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        How CCTV warranty actually works
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
        What&apos;s covered, what voids it, why the purchase channel matters,
        and how to verify warranty status before you buy — brand by brand.
      </p>

      {/* Key facts */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-950">
          What most buyers don&apos;t know
        </h2>
        <div className="mt-4 space-y-4">
          {warrantyFacts.map(({ title, description, type }) => (
            <div
              key={title}
              className={`rounded-card border p-5 ${
                type === "warning"
                  ? "border-warning-500/20 bg-warning-500/5"
                  : "border-primary-600/20 bg-primary-50"
              }`}
            >
              <div className="flex items-start gap-3">
                {type === "warning" ? (
                  <AlertTriangle
                    className="mt-0.5 h-5 w-5 shrink-0 text-warning-500"
                    aria-hidden="true"
                  />
                ) : (
                  <FileText
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-700"
                    aria-hidden="true"
                  />
                )}
                <div>
                  <h3 className="text-sm font-semibold text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand policies */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-950">
          Warranty policies by brand
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Summary of current policies — always confirm directly with the
          manufacturer for the latest terms.
        </p>

        <div className="mt-6 space-y-4">
          {brandPolicies.map((policy) => (
            <details
              key={policy.brand}
              className="group rounded-card border border-slate-200 bg-white"
            >
              <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-slate-950 hover:text-primary-700">
                <span className="flex items-center gap-3">
                  <ShieldCheck
                    className="h-5 w-5 text-primary-700"
                    aria-hidden="true"
                  />
                  {policy.brand}
                </span>
                <span className="text-xs font-normal text-slate-500">
                  {policy.standardWarranty} standard
                </span>
              </summary>
              <div className="border-t border-slate-200 px-5 pb-5 pt-4 text-sm">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Standard warranty
                    </p>
                    <p className="mt-1 text-slate-950">{policy.standardWarranty}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Extended available
                    </p>
                    <p className="mt-1 text-slate-950">{policy.extendedAvailable}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Claim process
                  </p>
                  <p className="mt-1 text-slate-700">{policy.claimProcess}</p>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Important notes
                  </p>
                  <p className="mt-1 text-slate-700">{policy.notes}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Dos and Don'ts */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-slate-950">
          Warranty dos and don&apos;ts
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-card border border-success-600/20 bg-success-600/5 p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-success-600">
              <CheckCircle2 className="h-4 w-4" />
              Do
            </h3>
            <ul className="mt-4 space-y-3">
              {dosDonts.dos.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-danger-600/20 bg-danger-600/5 p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-danger-600">
              <XCircle className="h-4 w-4" />
              Don&apos;t
            </h3>
            <ul className="mt-4 space-y-3">
              {dosDonts.donts.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-card border border-slate-200 bg-primary-50 p-8">
        <h2 className="text-base font-semibold text-slate-950">
          Need warranty-related help?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Our verified service centers can help with warranty claims for
          authorized brands. Find one near you.
        </p>
        <Link
          href="/service"
          className="mt-4 inline-flex items-center gap-1 rounded-control bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
        >
          Find service centers
          <ChevronRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
