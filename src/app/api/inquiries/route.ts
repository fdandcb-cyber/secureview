import { NextResponse } from "next/server";
import { submitContactInquiry } from "@/features/inquiries/repositories/inquiry-repository";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const inquiry = await submitContactInquiry(body);
    return NextResponse.json({ success: true, inquiry });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Inquiry submission failed" },
      { status: 400 }
    );
  }
}
