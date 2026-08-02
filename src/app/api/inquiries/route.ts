import { NextResponse } from "next/server";
import { z } from "zod";
import { submitContactInquiry } from "@/features/inquiries/repositories/inquiry-repository";
import { checkRateLimit } from "@/lib/rate-limit";

const inquiryInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(8, "Phone number is invalid").max(20),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  message: z.string().min(5, "Message must be at least 5 characters").max(2000),
  inquiry_type: z.enum(["general", "quote_follow_up", "service_issue", "partnership"]).optional(),
});

export async function POST(request: Request) {
  // Rate limiting check (§8)
  const clientIp = request.headers.get("x-forwarded-for") ?? "anonymous-client";
  const limit = checkRateLimit(`inquiry-${clientIp}`, { windowMs: 60_000, maxRequests: 5 });

  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many inquiries submitted. Please wait a minute before trying again." },
      { status: 429 }
    );
  }

  try {
    const rawBody = await request.json();
    const validatedInput = inquiryInputSchema.parse(rawBody);

    const inquiry = await submitContactInquiry({
      name: validatedInput.name,
      phone: validatedInput.phone,
      email: validatedInput.email || undefined,
      message: validatedInput.message,
      inquiry_type: validatedInput.inquiry_type,
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: err.issues[0]?.message ?? "Invalid form input" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Inquiry submission failed. Please try again." },
      { status: 400 }
    );
  }
}
