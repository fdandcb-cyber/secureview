import Link from "next/link";
import { BookOpen, FileText, Languages, Wrench } from "lucide-react";

const sidebarLinks = [
  { label: "Encyclopedia", href: "/learn", icon: BookOpen },
  { label: "Buying Guides", href: "/learn/guides", icon: FileText },
  { label: "Glossary", href: "/learn/glossary", icon: Languages },
  { label: "Troubleshooting", href: "/learn/troubleshooting", icon: Wrench },
] as const;

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <nav
            aria-label="Learn navigation"
            className="sticky top-24 space-y-1"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Learn
            </p>
            {sidebarLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-primary-50 hover:text-primary-700"
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {sidebarLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary-600 hover:text-primary-700"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>

        {/* Content */}
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
