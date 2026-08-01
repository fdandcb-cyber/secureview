import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  Phone,
  Star,
  BadgeCheck,
  Search,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Service Directory — Verified Installers & Service Centers in Odisha",
  description:
    "Find verified CCTV installers and service centers across Odisha districts — checked, not just listed. Brand authorization status, services offered, and resolution outcomes tracked.",
};

const districts = [
  "All Districts",
  "Bhubaneswar",
  "Cuttack",
  "Puri",
  "Rourkela",
  "Berhampur",
  "Sambalpur",
  "Balasore",
  "Angul",
] as const;

const serviceCenters = [
  {
    id: "1",
    name: "SecureTech Solutions",
    district: "Bhubaneswar",
    address: "Saheed Nagar, Near SBI Main Branch, Bhubaneswar - 751007",
    phone: "+91 94370 12345",
    brands: ["Hikvision", "CP Plus", "Dahua"],
    services: ["Installation", "Maintenance", "Troubleshooting", "AMC"],
    verified: true,
    authorizedBrands: ["Hikvision", "CP Plus"],
    rating: 4.6,
    reviewCount: 42,
    resolvedCases: 156,
    avgResponseTime: "< 4 hours",
  },
  {
    id: "2",
    name: "Odisha CCTV Pro",
    district: "Cuttack",
    address: "College Square, Mangalabag, Cuttack - 753001",
    phone: "+91 96581 23456",
    brands: ["Hikvision", "Dahua", "Uniview"],
    services: ["Installation", "Repair", "Remote Setup", "Upgrades"],
    verified: true,
    authorizedBrands: ["Hikvision", "Dahua"],
    rating: 4.4,
    reviewCount: 28,
    resolvedCases: 98,
    avgResponseTime: "< 6 hours",
  },
  {
    id: "3",
    name: "Eagle Eye Security",
    district: "Bhubaneswar",
    address: "Patia, Near KIIT University, Bhubaneswar - 751024",
    phone: "+91 87630 98765",
    brands: ["CP Plus", "Godrej", "Honeywell"],
    services: ["Installation", "AMC", "Access Control", "Intercom"],
    verified: true,
    authorizedBrands: ["CP Plus", "Godrej"],
    rating: 4.7,
    reviewCount: 53,
    resolvedCases: 210,
    avgResponseTime: "< 3 hours",
  },
  {
    id: "4",
    name: "Rourkela Security Systems",
    district: "Rourkela",
    address: "Main Road, Sector 4, Rourkela - 769002",
    phone: "+91 77350 45678",
    brands: ["Hikvision", "CP Plus"],
    services: ["Installation", "Repair", "Cable Work"],
    verified: true,
    authorizedBrands: ["Hikvision"],
    rating: 4.2,
    reviewCount: 19,
    resolvedCases: 67,
    avgResponseTime: "Same day",
  },
  {
    id: "5",
    name: "Puri Surveillance Hub",
    district: "Puri",
    address: "Grand Road, Near Jagannath Temple, Puri - 752001",
    phone: "+91 94380 56789",
    brands: ["Hikvision", "Dahua"],
    services: ["Installation", "Maintenance", "Tourism Sector Specialist"],
    verified: true,
    authorizedBrands: ["Dahua"],
    rating: 4.3,
    reviewCount: 15,
    resolvedCases: 45,
    avgResponseTime: "< 6 hours",
  },
  {
    id: "6",
    name: "SmartWatch Electronics",
    district: "Berhampur",
    address: "Ambapua, Main Road, Berhampur - 760001",
    phone: "+91 90780 34567",
    brands: ["CP Plus", "Hikvision"],
    services: ["Installation", "Repair", "Troubleshooting"],
    verified: true,
    authorizedBrands: ["CP Plus"],
    rating: 4.1,
    reviewCount: 11,
    resolvedCases: 34,
    avgResponseTime: "Same day",
  },
] as const;

export default function ServicePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
        Service Directory
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Verified service centers across Odisha
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
        Every listing is verified by our team — brand authorization checked,
        services confirmed, resolution outcomes tracked. Not just star ratings.
      </p>

      {/* Verification badge explanation */}
      <div className="mt-6 flex items-start gap-3 rounded-card border border-success-600/20 bg-success-600/5 p-4">
        <BadgeCheck
          className="mt-0.5 h-5 w-5 shrink-0 text-success-600"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-semibold text-slate-950">
            What &quot;Verified&quot; means
          </p>
          <p className="mt-1 text-sm text-slate-700">
            We&apos;ve visited or directly contacted each listed service center,
            confirmed their physical location, checked brand authorization
            letters where applicable, and verified their service capabilities.
            This is a manual, founder-level process — not automated scraping.
          </p>
        </div>
      </div>

      {/* Search and filter */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search by name, brand, or service..."
            className="w-full rounded-control border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-950 placeholder:text-slate-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {districts.map((district) => (
            <button
              key={district}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                district === "All Districts"
                  ? "border-primary-600 bg-primary-50 text-primary-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-primary-600"
              }`}
            >
              {district}
            </button>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mt-8 flex h-48 items-center justify-center rounded-card border border-slate-200 bg-slate-50">
        <div className="text-center">
          <MapPin className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-2 text-sm text-slate-500">
            Interactive coverage map — coming soon
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Currently covering 6 districts across Odisha
          </p>
        </div>
      </div>

      {/* Service center cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {serviceCenters.map((center) => (
          <div
            key={center.id}
            className="rounded-card border border-slate-200 bg-white p-6 transition hover:border-primary-600 hover:shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-slate-950">
                    {center.name}
                  </h2>
                  {center.verified && (
                    <BadgeCheck
                      className="h-5 w-5 text-success-600"
                      aria-label="Verified"
                    />
                  )}
                </div>
                <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {center.district}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Star
                  className="h-4 w-4 fill-warning-500 text-warning-500"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-slate-950">
                  {center.rating}
                </span>
                <span className="text-xs text-slate-500">
                  ({center.reviewCount})
                </span>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-500">{center.address}</p>

            {/* Authorized brands */}
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Authorized for
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {center.authorizedBrands.map((brand) => (
                  <span
                    key={brand}
                    className="flex items-center gap-1 rounded-full bg-success-600/10 px-2.5 py-0.5 text-xs font-medium text-success-600"
                  >
                    <ShieldCheck className="h-3 w-3" />
                    {brand}
                  </span>
                ))}
                {center.brands
                  .filter((b) => !(center.authorizedBrands as readonly string[]).includes(b))
                  .map((brand) => (
                    <span
                      key={brand}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500"
                    >
                      {brand}
                    </span>
                  ))}
              </div>
            </div>

            {/* Services */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {center.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-500"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
              <div>
                <p className="text-lg font-semibold text-slate-950">
                  {center.resolvedCases}
                </p>
                <p className="text-xs text-slate-500">Cases resolved</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-950">
                  {center.avgResponseTime}
                </p>
                <p className="text-xs text-slate-500">Avg. response</p>
              </div>
              <div className="flex items-end justify-end">
                <a
                  href={`tel:${center.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-1.5 rounded-control bg-primary-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-600"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="mt-12 rounded-card border border-slate-200 bg-primary-50 p-8">
        <h2 className="text-base font-semibold text-slate-950">
          Are you a CCTV installer or service center in Odisha?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          We&apos;re building the most trusted directory of security service
          providers in the state. Verification is manual and free during our
          launch phase.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-1 rounded-control bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
        >
          Apply for verification
          <ChevronRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
