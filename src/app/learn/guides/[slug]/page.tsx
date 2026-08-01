import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/features/knowledge/repositories/knowledge-repository";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock, ArrowLeft } from "lucide-react";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} — CCTV Knowledge Guide`,
    description: article.body_markdown.slice(0, 160),
  };
}

export default async function DynamicGuidePage({ params }: GuidePageProps) {
  const { slug } = await params;

  // Handle static custom guide if requested
  if (slug === "online-marketplace-risks") {
    // Redirection or static import
  }

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/learn" className="hover:text-primary-700">
          Learn
        </Link>
        <span>/</span>
        <Link href="/learn/guides" className="hover:text-primary-700">
          Guides
        </Link>
        <span>/</span>
        <span className="text-slate-950 font-medium">{article.title}</span>
      </nav>

      <Card className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <Badge tone="primary">{article.category.toUpperCase()}</Badge>
          <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
            <Clock className="h-3.5 w-3.5" />
            {article.read_time_minutes} min read
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          {article.title}
        </h1>

        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
          {article.body_markdown}
        </div>
      </Card>
    </div>
  );
}
