import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ContactInquiry = {
  id: string;
  user_id: string | null;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  inquiry_type: "general" | "quote_follow_up" | "service_issue" | "partnership";
  status: "new" | "in_progress" | "resolved";
  assigned_to: string | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
};

const memoryInquiries: ContactInquiry[] = [
  {
    id: "inq-101",
    user_id: "demo-user",
    name: "Ramesh Jena",
    phone: "9861012345",
    email: "ramesh.jena@gmail.com",
    message: "Need site survey for 8-camera commercial setup in Saheed Nagar, Bhubaneswar.",
    inquiry_type: "quote_follow_up",
    status: "in_progress",
    assigned_to: null,
    internal_notes: "Followed up via phone on Aug 1.",
    created_at: "2026-08-01T09:30:00Z",
    updated_at: "2026-08-01T11:00:00Z",
  },
  {
    id: "inq-102",
    user_id: "demo-user",
    name: "Priyanka Mishra",
    phone: "9937088990",
    email: "priyanka@mishratraders.com",
    message: "Inquiring about CP Plus authorized warranty service center in Cuttack.",
    inquiry_type: "service_issue",
    status: "new",
    assigned_to: null,
    internal_notes: null,
    created_at: "2026-08-02T08:15:00Z",
    updated_at: "2026-08-02T08:15:00Z",
  },
];

export async function submitContactInquiry(input: {
  name: string;
  phone: string;
  email?: string;
  message: string;
  inquiry_type?: ContactInquiry["inquiry_type"];
}): Promise<ContactInquiry> {
  const newInquiry: ContactInquiry = {
    id: `inq-${Date.now()}`,
    user_id: null,
    name: input.name,
    phone: input.phone,
    email: input.email ?? null,
    message: input.message,
    inquiry_type: input.inquiry_type ?? "general",
    status: "new",
    assigned_to: null,
    internal_notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("contact_inquiries")
      .insert({
        name: input.name,
        phone: input.phone,
        email: input.email ?? null,
        message: input.message,
        inquiry_type: input.inquiry_type ?? "general",
      })
      .select()
      .single();

    if (!error && data) {
      return data as ContactInquiry;
    }
  } catch {
    // Fallback to memory array
  }

  memoryInquiries.unshift(newInquiry);
  return newInquiry;
}

export async function listUserInquiries(): Promise<ContactInquiry[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data as ContactInquiry[];
      }
    }
  } catch {
    // Fallback
  }

  return memoryInquiries;
}

export async function listAllInquiriesForAdmin(): Promise<ContactInquiry[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data as ContactInquiry[];
    }
  } catch {
    // Fallback
  }

  return memoryInquiries;
}
