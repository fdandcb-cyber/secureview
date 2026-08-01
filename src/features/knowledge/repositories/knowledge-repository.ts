import { createSupabaseServerClient } from "@/lib/supabase/server";

export type KnowledgeArticle = {
  id: string;
  slug: string;
  title: string;
  category: "guide" | "glossary" | "faq" | "troubleshooting";
  body_markdown: string;
  status: "published" | "draft" | "archived";
  read_time_minutes: number;
};

const fallbackArticles: Record<string, KnowledgeArticle> = {
  "online-marketplace-risks": {
    id: "1",
    slug: "online-marketplace-risks",
    title: "Online Marketplace Risks: What to Check Before You Buy",
    category: "guide",
    body_markdown: "Seller authenticity, warranty eligibility, cable/HDD quality, and after-sales gaps — an honest, non-alarmist guide to buying CCTV equipment from Amazon, Flipkart, or any online marketplace.",
    status: "published",
    read_time_minutes: 8,
  },
  "ip-vs-analog-guide": {
    id: "2",
    slug: "ip-vs-analog-guide",
    title: "IP Cameras vs Analog: Which Is Right for You?",
    category: "guide",
    body_markdown: "Resolution, cabling, cost, and future-proofing compared side by side with honest trade-offs.",
    status: "published",
    read_time_minutes: 7,
  },
};

export async function getArticleBySlug(slug: string): Promise<KnowledgeArticle | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("knowledge_articles")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (!error && data) {
      return data as KnowledgeArticle;
    }
  } catch (err) {
    // Graceful fallback
  }

  return fallbackArticles[slug] ?? null;
}
