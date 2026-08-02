import type { Metadata } from "next";
import { listPublishedArticles } from "@/features/knowledge/repositories/knowledge-repository";
import { LearnClient } from "./learn-client";

export const metadata: Metadata = {
  title: "Learn — CCTV & Security Knowledge Base",
  description:
    "Understand CCTV cameras, DVRs, NVRs, PoE, storage, and security system design — explained in plain language with tables, checklists, and calculators.",
};

export default async function LearnPage() {
  const articles = await listPublishedArticles();

  return <LearnClient articles={articles} />;
}
