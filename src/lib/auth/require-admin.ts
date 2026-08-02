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
 * Validates user session via Supabase Auth and verifies record in `admin_users` DB table.
 * Redirects to `/login` if unauthenticated or unauthorized.
 */
export async function requireAdmin(): Promise<AdminSessionInfo> {
  // WARNING: DEV_BYPASS_ADMIN_AUTH is strictly disabled in production builds!
  if (process.env.NODE_ENV !== "production" && process.env.DEV_BYPASS_ADMIN_AUTH === "true") {
    console.warn(
      "WARNING: DEV_BYPASS_ADMIN_AUTH is enabled. Bypassing Supabase admin authentication guard for local offline development. This must NEVER be set in any deployed environment!"
    );
    return {
      userId: "dev-admin-id",
      email: "connectzsalesandservices@gmail.com",
      role: "admin",
    };
  }

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
      email: user.email ?? "connectzsalesandservices@gmail.com",
      role,
    };
  } catch (err) {
    if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
      throw err;
    }
    // Fail closed: Redirect to login on any authentication or database error
    redirect("/login?error=Admin+access+required");
  }
}

/**
 * Strict authorization guard for super-admin actions (e.g., managing admin users).
 * Requires role = 'admin' specifically; blocks 'editor' roles.
 */
export async function requireSuperAdmin(): Promise<AdminSessionInfo> {
  const adminInfo = await requireAdmin();

  if (adminInfo.role !== "admin") {
    redirect("/admin?error=Super+admin+access+required");
  }

  return adminInfo;
}
