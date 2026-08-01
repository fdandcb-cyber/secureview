import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the SecureView team for questions about CCTV systems, service center verification, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
        Contact
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Get in touch
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
        Have a question about CCTV systems, want to get your service center
        verified, or interested in partnering with us? We&apos;d love to hear
        from you.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
        {/* Contact form */}
        <div className="lg:col-span-3">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-slate-950"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  className="mt-2 w-full rounded-control border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-950 placeholder:text-slate-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-slate-950"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-control border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-950 placeholder:text-slate-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-sm font-medium text-slate-950"
              >
                Subject
              </label>
              <select
                id="contact-subject"
                name="subject"
                className="mt-2 w-full rounded-control border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-950 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20"
              >
                <option value="">Select a topic</option>
                <option value="general">General inquiry</option>
                <option value="product">Product question</option>
                <option value="service-verification">
                  Service center verification
                </option>
                <option value="partnership">Partnership / dealership</option>
                <option value="technical">Technical support</option>
                <option value="feedback">Feedback or suggestion</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-slate-950"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                className="mt-2 w-full rounded-control border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-950 placeholder:text-slate-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20"
                placeholder="Tell us how we can help..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-control bg-primary-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20"
            >
              Send message
            </button>
          </form>
        </div>

        {/* Contact details */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-card border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-950">
              Contact information
            </h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-700"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-slate-950">Email</p>
                  <a
                    href="mailto:hello@secureview.in"
                    className="text-sm text-primary-700 hover:underline"
                  >
                    hello@secureview.in
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-700"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-slate-950">Phone</p>
                  <a
                    href="tel:+917008000000"
                    className="text-sm text-primary-700 hover:underline"
                  >
                    +91 70080 00000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-700"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-slate-950">Office</p>
                  <p className="text-sm text-slate-500">
                    Bhubaneswar, Odisha
                    <br />
                    India — 751001
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-700"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-slate-950">
                    Business hours
                  </p>
                  <p className="text-sm text-slate-500">
                    Mon – Sat: 9:00 AM – 7:00 PM IST
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-card border border-slate-200 bg-primary-50 p-6">
            <h2 className="text-base font-semibold text-slate-950">
              Want to get your service center listed?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              We manually verify every service center before listing. If you
              operate a CCTV installation or service business in Odisha,
              reach out — we&apos;ll walk you through our verification process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
