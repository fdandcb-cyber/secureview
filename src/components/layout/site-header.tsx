import Link from "next/link";
import { Search, ClipboardList, User } from "lucide-react";

const primaryNav = [
  { label: "Learn", href: "/learn" },
  { label: "Products", href: "/products" },
  { label: "Compare", href: "/compare" },
  { label: "Plan", href: "/plan" },
  { label: "Service", href: "/service" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-lg font-semibold tracking-tight text-slate-950"
        >
          SecureView<span className="text-primary-700">.</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex md:items-center md:gap-1"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-control px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search the knowledge base and catalog"
            className="flex h-10 w-10 items-center justify-center rounded-control text-slate-700 hover:bg-slate-50 hover:text-slate-950 md:w-auto md:gap-2 md:px-3"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            <span className="hidden text-sm font-medium md:inline">
              Search
            </span>
          </Link>

          <Link
            href="/plan/quote"
            aria-label="View your saved quote"
            className="flex h-10 w-10 items-center justify-center rounded-control text-slate-700 hover:bg-slate-50 hover:text-slate-950 md:w-auto md:gap-2 md:px-3"
          >
            <ClipboardList className="h-5 w-5" aria-hidden="true" />
            <span className="hidden text-sm font-medium md:inline">
              Quote
            </span>
          </Link>

          <Link
            href="/account"
            aria-label="Your account"
            className="flex h-10 w-10 items-center justify-center rounded-control bg-slate-950 text-white hover:bg-slate-700"
          >
            <User className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
