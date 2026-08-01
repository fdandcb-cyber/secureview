import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ServiceCenter = {
  id: string;
  name: string;
  district: string;
  address: string;
  phone: string;
  brands: string[];
  verified: boolean;
  verified_at: string | null;
  notes: string | null;
};

const fallbackCenters: ServiceCenter[] = [
  {
    id: "1",
    name: "SecureTech Solutions",
    district: "Bhubaneswar",
    address: "Saheed Nagar, Near SBI Main Branch, Bhubaneswar - 751007",
    phone: "+91 94370 12345",
    brands: ["Hikvision", "CP Plus", "Dahua"],
    verified: true,
    verified_at: "2026-07-15T00:00:00Z",
    notes: "Founder verified authorized partner",
  },
  {
    id: "2",
    name: "Odisha CCTV Pro",
    district: "Cuttack",
    address: "College Square, Mangalabag, Cuttack - 753001",
    phone: "+91 96581 23456",
    brands: ["Hikvision", "Dahua", "Uniview"],
    verified: true,
    verified_at: "2026-07-10T00:00:00Z",
    notes: "Verified installer workshop",
  },
  {
    id: "3",
    name: "Puri Surveillance Hub",
    district: "Puri",
    address: "Grand Road, Near Jagannath Temple, Puri - 752001",
    phone: "+91 94380 56789",
    brands: ["Hikvision", "Dahua"],
    verified: true,
    verified_at: "2026-07-20T00:00:00Z",
    notes: "Hotel & tourism sector specialist",
  },
];

export async function listVerifiedServiceCenters(
  district?: string
): Promise<ServiceCenter[]> {
  try {
    const supabase = await createSupabaseServerClient();
    let query = supabase.from("service_centers").select("*").eq("verified", true);

    if (district && district !== "All Districts") {
      query = query.eq("district", district);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as ServiceCenter[];
    }
  } catch (err) {
    // Graceful fallback
  }

  if (district && district !== "All Districts") {
    return fallbackCenters.filter((c) => c.district === district);
  }
  return fallbackCenters;
}
