import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Health-check endpoint to verify Supabase connectivity.
 * GET /api/health → { status, supabase, timestamp }
 */
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    // Simple connectivity test — query the auth service
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          supabase: "connection_failed",
          error: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "ok",
      supabase: "connected",
      session: data.session ? "active" : "none",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        supabase: "unreachable",
        error: err instanceof Error ? err.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
