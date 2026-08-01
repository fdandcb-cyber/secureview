import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SecureView collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
        Legal
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-slate-500">
        Last updated: August 1, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-base font-semibold text-slate-950">
            1. Information We Collect
          </h2>
          <p className="mt-3">
            We collect information you provide directly — such as your name,
            email address, phone number, and messages when you create an
            account, submit a contact form, or build a quote. We also collect
            usage data automatically, including pages visited, calculators used,
            comparisons saved, and device/browser information.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            2. How We Use Your Information
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>To provide and improve our platform features — comparisons, calculators, quotes, and service directory.</li>
            <li>To process orders and coordinate with shipping and payment providers (Razorpay, Shiprocket).</li>
            <li>To connect you with verified local service centers and installers when you request it.</li>
            <li>To send transactional communications — order confirmations, quote updates, warranty reminders.</li>
            <li>To analyze usage patterns and improve content quality and relevance.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            3. Information Sharing
          </h2>
          <p className="mt-3">
            We do not sell your personal information. We share data only with:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li><strong>Payment processors</strong> (Razorpay) to complete transactions.</li>
            <li><strong>Shipping partners</strong> (Shiprocket) to deliver orders.</li>
            <li><strong>Verified service centers</strong> when you explicitly request a service connection.</li>
            <li><strong>Infrastructure providers</strong> (Vercel, Supabase) for hosting and data storage.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            4. Data Storage & Security
          </h2>
          <p className="mt-3">
            Your data is stored securely using Supabase (PostgreSQL) with
            Row Level Security policies. We use HTTPS encryption for all data
            in transit and follow industry-standard practices for data at rest.
            Access to production data is restricted to authorized team members
            only.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            5. Cookies & Analytics
          </h2>
          <p className="mt-3">
            We use essential cookies for authentication and session management.
            We use analytics to understand how the platform is used and improve
            content. We do not use third-party advertising cookies or trackers.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            6. Your Rights
          </h2>
          <p className="mt-3">You have the right to:</p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Access, correct, or delete your personal information.</li>
            <li>Export your saved comparisons, calculations, and quotes.</li>
            <li>Opt out of non-essential communications.</li>
            <li>Request deletion of your account and associated data.</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:privacy@secureview.in"
              className="text-primary-700 hover:underline"
            >
              privacy@secureview.in
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            7. Changes to This Policy
          </h2>
          <p className="mt-3">
            We may update this policy to reflect changes in our practices or for
            legal, operational, or regulatory reasons. We&apos;ll notify
            registered users of material changes via email. The &quot;last
            updated&quot; date at the top of this page indicates when the most
            recent changes were made.
          </p>
        </section>

        <section className="rounded-card border border-slate-200 bg-white p-6">
          <h2 className="text-base font-semibold text-slate-950">
            Questions?
          </h2>
          <p className="mt-2">
            If you have questions about this privacy policy or how we handle
            your data, reach out at{" "}
            <a
              href="mailto:privacy@secureview.in"
              className="text-primary-700 hover:underline"
            >
              privacy@secureview.in
            </a>{" "}
            or through our{" "}
            <a href="/contact" className="text-primary-700 hover:underline">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
