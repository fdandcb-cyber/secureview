import { requireSuperAdmin } from "@/lib/auth/require-admin";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShieldCheck, UserCheck, Lock } from "lucide-react";

type AdminUserRecord = {
  id: string;
  email: string;
  role: "admin" | "editor";
  createdAt: string;
};

const adminUsersList: AdminUserRecord[] = [
  {
    id: "admin-1",
    email: "connectzsalesandservices@gmail.com",
    role: "admin",
    createdAt: "2026-08-01",
  },
  {
    id: "admin-2",
    email: "editor@secureview.in",
    role: "editor",
    createdAt: "2026-08-02",
  },
];

export default async function SuperAdminSettingsPage() {
  const superAdminInfo = await requireSuperAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-danger-600" />
            <h1 className="text-xl font-bold text-slate-900">
              Admin Users & Access Control (Super Admin Only)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Gated strictly for role = &apos;admin&apos;. Editor accounts cannot access or alter permissions here.
          </p>
        </div>
        <Badge tone="danger">Super Admin Access: {superAdminInfo.email}</Badge>
      </div>

      <Card className="p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          Active Authorized Platform Administrators
        </h2>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
          {adminUsersList.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{user.email}</p>
                  <p className="text-xs text-slate-500">Registered {user.createdAt}</p>
                </div>
              </div>
              <Badge tone={user.role === "admin" ? "primary" : "neutral"}>
                {user.role.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
