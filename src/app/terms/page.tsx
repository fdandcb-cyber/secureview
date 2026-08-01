import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions governing use of the SecureView CCTV & Security Knowledge Platform.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
        Legal
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-slate-500">
        Last updated: August 1, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-base font-semibold text-slate-950">
            1. About These Terms
          </h2>
          <p className="mt-3">
            These Terms of Service (&quot;Terms&quot;) govern your use of
            SecureView (&quot;the Platform&quot;), a CCTV and security
            technology knowledge, comparison, and commerce platform operated
            from Odisha, India. By using the Platform, you agree to these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            2. Platform Services
          </h2>
          <p className="mt-3">The Platform provides:</p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Educational content about CCTV and security technology (knowledge base, guides, glossary).</li>
            <li>Product specifications, comparisons, and compatibility information.</li>
            <li>Calculators for storage, PoE budget, power/UPS, cable, and bandwidth sizing.</li>
            <li>A directory of verified service centers and installers across Odisha.</li>
            <li>Quote generation, product ordering, and shipping coordination.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            3. Accuracy of Information
          </h2>
          <p className="mt-3">
            We make every effort to present accurate, up-to-date product
            specifications, prices, and service center information. However:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Product specifications are sourced from manufacturers and verified where marked — always confirm current availability and pricing before purchase.</li>
            <li>Calculator results are based on stated assumptions and formulas — they are sizing tools, not engineering certifications.</li>
            <li>Service center verification reflects status at the time of our last check — authorization and availability may change.</li>
            <li>Comparisons and recommendations are evidence-based and not influenced by paid placement — sponsored content is always clearly labeled and structurally separated.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            4. User Accounts
          </h2>
          <p className="mt-3">
            Some features (saved comparisons, quotes, order history, warranty
            tracking) require account creation. You are responsible for
            maintaining the confidentiality of your login credentials and for
            all activity under your account.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            5. Orders & Payments
          </h2>
          <p className="mt-3">
            Orders placed through the Platform are processed via Razorpay.
            Prices are displayed in Indian Rupees (₹) and include applicable
            GST unless stated otherwise. Shipping is handled through Shiprocket
            and delivery timelines depend on your location and courier
            availability.
          </p>
          <p className="mt-3">
            We reserve the right to cancel or refuse orders due to pricing
            errors, stock unavailability, or suspected fraud. In such cases,
            full refunds will be issued to the original payment method.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            6. Warranty & Returns
          </h2>
          <p className="mt-3">
            Products sold through SecureView carry the manufacturer&apos;s
            warranty. Warranty terms, eligibility, and claim procedures vary by
            brand and product — we display these clearly on each product page
            and in your order confirmation. Our warranty guidance section
            provides general information but does not constitute a warranty
            itself.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            7. Service Directory
          </h2>
          <p className="mt-3">
            The Service Directory lists installers and service centers verified
            by the SecureView team. Verification means we have confirmed the
            business exists, checked brand authorization status where
            applicable, and assessed basic service capability. It does not
            constitute a guarantee of service quality, pricing, or outcomes.
            We track resolution feedback but are not a party to any agreement
            between you and a service provider.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            8. Intellectual Property
          </h2>
          <p className="mt-3">
            Content on this Platform — including articles, guides, calculator
            formulas, comparison frameworks, and design — is the property of
            SecureView unless otherwise attributed. Product names, logos, and
            images belong to their respective manufacturers.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            9. Limitation of Liability
          </h2>
          <p className="mt-3">
            The Platform is provided &quot;as is.&quot; While we strive for
            accuracy and reliability, we do not warrant uninterrupted service or
            error-free content. SecureView&apos;s liability for any claim
            arising from your use of the Platform is limited to the amount you
            paid for the specific product or service in question.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            10. Governing Law
          </h2>
          <p className="mt-3">
            These Terms are governed by the laws of India. Any disputes arising
            from the use of this Platform shall be subject to the jurisdiction
            of the courts in Bhubaneswar, Odisha.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-950">
            11. Changes to Terms
          </h2>
          <p className="mt-3">
            We may update these Terms as the Platform evolves. Material changes
            will be communicated to registered users via email. Continued use of
            the Platform after changes constitutes acceptance of the updated
            Terms.
          </p>
        </section>

        <section className="rounded-card border border-slate-200 bg-white p-6">
          <h2 className="text-base font-semibold text-slate-950">
            Questions about these terms?
          </h2>
          <p className="mt-2">
            Contact us at{" "}
            <a
              href="mailto:legal@secureview.in"
              className="text-primary-700 hover:underline"
            >
              legal@secureview.in
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
