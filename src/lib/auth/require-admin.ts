import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminUserRole = "admin" | "editor";

export type AdminSessionInfo = {
  userId: string;
  email: string;
  role: AdminUserRole;
};

/**
 * Server-side authorization guard for admin pages.
 * Gets user session via Supabase Auth and verifies record in `admin_users` DB table.
 * Redirects to `/login` if unauthenticated or unauthorized.
 */
export async function requireAdmin(): Promise<AdminSessionInfo> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      redirect("/login?error=Authentication+required");
    }

    const { data: adminData, error: dbError } = await supabase
      .from("admin_users")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (dbError || !adminData) {
      redirect("/login?error=Admin+access+required");
    }

    const role = (adminData.role ?? "editor") as AdminUserRole;

    return {
      userId: user.id,
      email: user.email ?? "admin@secureview.in",
      role,
    };
  } catch (err) {
    if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
      throw err;
    }
    // Fallback for offline/development demo environment if auth session cookies are unpopulated
    if (process.env.NODE_ENV === "development") {
      return {
        userId: "dev-admin-id",
        email: "connectzsalesandservices@gmail.com",
        role: "admin",
      };
    }
    redirect("/login?error=Admin+access+required");
  }
}

/**
 * Strict authorization guard for super-admin actions (e.g. managing admin users).
 * Requires role = 'admin' specifically; blocks 'editor' roles.
 */
export async function requireSuperAdmin(): Promise<AdminSessionInfo> {
  const adminInfo = await requireAdmin();

  if (adminInfo.role !== "admin") {
    redirect("/admin?error=Super+admin+access+required");
  }

  return adminInfo;
}
