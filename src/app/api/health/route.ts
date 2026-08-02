import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Production Health-check Endpoint (§14)
 * Returns minimal status without leaking internal database error messages or stack traces.
 */
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.getSession();

    if (error) {
      console.error("[Health Check Error] Supabase session error:", error);
      return NextResponse.json(
        {
          status: "degraded",
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[Health Check Error] Connectivity failure:", err);
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
