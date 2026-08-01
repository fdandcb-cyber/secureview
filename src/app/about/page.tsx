import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SecureView",
  description:
    "We explain CCTV and security technology in plain language, verify local service centers, and help Odisha buyers make informed decisions.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
        About Us
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Built for Odisha, designed to scale
      </h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-700">
        <p>
          SecureView started from a simple frustration: buying a CCTV system in
          Odisha meant trusting a marketplace listing with no context —
          unclear warranty terms, unverifiable cable and hard-disk quality, and
          nobody to call when the installation goes wrong.
        </p>

        <p>
          We&apos;re building the platform we wished existed: one that explains
          specifications in plain language, runs the calculations your property
          actually needs, and connects you to service centers we&apos;ve
          personally verified — starting across Odisha districts.
        </p>

        <section className="rounded-card border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-950">Our promise</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-primary-700" />
              <span>
                <strong className="text-slate-950">Education first.</strong>{" "}
                Every recommendation explains <em>why</em>, shows alternatives,
                and exposes the reasoning — never a single &quot;best pick&quot;
                with no context.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-primary-700" />
              <span>
                <strong className="text-slate-950">Not biased, not forced.</strong>{" "}
                Sponsored placement is structurally separated from comparison and
                recommendation logic — always labeled, never hidden.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-primary-700" />
              <span>
                <strong className="text-slate-950">Verified local service.</strong>{" "}
                Service center listings are checked by us, not self-reported.
                Authorization status, brand coverage, and resolution outcomes
                are tracked — not just star ratings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-primary-700" />
              <span>
                <strong className="text-slate-950">Transparent calculators.</strong>{" "}
                Every calculation shows the formula, inputs, and assumptions.
                No black-box numbers — you can verify and adjust everything.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-950">
            Why Odisha first?
          </h2>
          <p className="mt-3">
            Security technology adoption is growing fast across tier-2 and
            tier-3 cities in Odisha — homes, retail shops, warehouses, and
            farmlands. But the gap between what&apos;s available online and
            what&apos;s actually serviceable locally is enormous. A camera bought
            from a marketplace seller in Mumbai with no Odisha service
            authorization is effectively unwarranted for a buyer in Cuttack.
          </p>
          <p className="mt-3">
            We start here because we know the districts, the installers, and the
            real-world challenges (monsoon weatherproofing, power instability,
            long cable runs across compounds). The platform is designed to scale
            nationally, but the trust layer has to be built one region at a time
            — and Odisha is home.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-950">
            What we&apos;re building
          </h2>
          <p className="mt-3">
            A modular web platform with interconnected engines: Knowledge,
            Product Specifications, Compatibility, Comparison, Calculators, AI
            Advisor, Quote Builder, Commerce, and — most importantly — a
            verified Service Directory that no national marketplace can
            replicate at the district level.
          </p>
          <p className="mt-3">
            This isn&apos;t an ERP. It&apos;s not internal tooling. It&apos;s a
            customer-facing product that earns trust by being genuinely useful
            before it ever asks you to buy something.
          </p>
        </section>
      </div>
    </div>
  );
}
