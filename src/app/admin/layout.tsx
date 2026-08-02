import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  MapPin,
  FileText,
  ClipboardList,
  MessageSquare,
  Sliders,
  ShieldAlert,
  ArrowLeft,
  Settings,
  Bell,
  UserCheck,
} from "lucide-react";

import { requireAdmin } from "@/lib/auth/require-admin";
import { BRAND } from "@/config/brand";

const adminNav = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Products Catalog", href: "/admin/products", icon: Package },
  { label: "Service Centers (Odisha)", href: "/admin/service-centers", icon: MapPin },
  { label: "Knowledge CMS", href: "/admin/cms", icon: FileText },
  { label: "Quotes & Orders", href: "/admin/quotes", icon: ClipboardList },
  { label: "Contact Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Site-Wide Content Control", href: "/admin/site-content", icon: Sliders },
] as const;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminUser = await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Admin Banner */}
      <div className="bg-slate-950 text-white px-4 py-2 text-xs flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wide">{BRAND.siteName.toUpperCase()} ADMIN CONSOLE</span>
          <span className="text-slate-400">| Role: {adminUser.role.toUpperCase()}</span>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1 text-slate-300 hover:text-white transition text-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Public Site
        </Link>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
          <div className="p-4 border-b border-slate-800">
            <Link href="/admin" className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary-600" />
              Connectz Admin
            </Link>
            <p className="text-[11px] text-slate-400 mt-0.5">Control Center & CMS</p>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {adminNav.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white transition text-slate-300"
              >
                <Icon className="h-4 w-4 text-primary-600 shrink-0" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-emerald-400" />
              <div>
                <p className="font-semibold text-slate-200 capitalize">{adminUser.role} Account</p>
                <p className="text-[10px] text-slate-400 truncate max-w-[160px]">{adminUser.email}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Admin Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Sub-header */}
          <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="font-medium text-slate-900">Admin Portal</span>
              <span>/</span>
              <span>Odisha Multi-District Platform</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 relative"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary-700" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Settings"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </header>

          {/* Main Viewport */}
          <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
