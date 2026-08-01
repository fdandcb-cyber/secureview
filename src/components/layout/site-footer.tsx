import Link from "next/link";

const footerColumns = [
  {
    title: "Learn",
    links: [
      { label: "Encyclopedia", href: "/learn" },
      { label: "Buying guides", href: "/learn/guides" },
      { label: "Glossary", href: "/learn/glossary" },
      { label: "Troubleshooting", href: "/learn/troubleshooting" },
    ],
  },
  {
    title: "Plan & Compare",
    links: [
      { label: "Requirement wizard", href: "/plan" },
      { label: "Calculators", href: "/plan/calculators" },
      { label: "Compare products", href: "/compare" },
    ],
  },
  {
    title: "Service (Odisha)",
    links: [
      { label: "Find a service center", href: "/service" },
      { label: "Warranty guidance", href: "/service/warranty" },
      { label: "Buying online: what to check", href: "/learn/guides/online-marketplace-risks" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold text-slate-950">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-950"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <p>
            Recommendations are evidence-based and not sponsored placement.
            Product specifications shown are verified where marked; always
            confirm current price and availability before purchase.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} SecureView. Built for Odisha, made to scale.
          </p>
        </div>
      </div>
    </footer>
  );
}
