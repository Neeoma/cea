import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, Pill, Section } from "@/components/ui/primitives";
import { articleBySlug, articles } from "@/data/content";
import { academy } from "@/data/academy";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/resources/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: academy.name },
    publisher: { "@type": "Organization", name: academy.name, url: academy.url },
    mainEntityOfPage: `${academy.url}/resources/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <article className="relative pt-32 pb-20 sm:pt-40">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_at_30%_0%,rgba(0,217,255,0.1),transparent_60%)]" />
        <div className="container-cea">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-cyan"
          >
            <ArrowLeft className="h-3 w-3" /> All resources
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="cyan">{article.category}</Pill>
              <Badge>{article.level}</Badge>
              <span className="flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted">
                <Clock className="h-3 w-3" /> {article.readMinutes} min read
              </span>
            </div>
            <h1 className="display-lg mt-5 text-ink">{article.title}</h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-[1.0625rem]">
              {article.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-3 border-y border-white/[0.07] py-3">
              <div className="h-8 w-8 rounded-full border border-cyan/25 bg-cyan/[0.07]" />
              <div>
                <p className="text-[0.8125rem] text-ink/85">Cyber Elias Academy</p>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">
                  {new Date(article.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 max-w-3xl">
            {article.body.map((section, i) => (
              <section key={section.h} className="mb-9">
                <h2 className="flex items-baseline gap-3 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  <span className="font-mono text-[0.7rem] text-cyan/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.h}
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-[1.75] text-muted">{section.p}</p>
              </section>
            ))}

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-cyan">
                practical next step
              </p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/85">
                Reading gets you oriented. Working a scenario with an instructor at your shoulder is
                what changes your capability.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <Button href="/cyber-lab" size="sm" icon>
                  Try the Cyber Lab
                </Button>
                <Button href="/programmes" variant="secondary" size="sm">
                  Browse programmes
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-white/[0.07] pt-10">
            <h2 className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
              Continue reading
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/resources/${a.slug}`}
                  className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-cyan/30"
                >
                  <Pill tone="neutral">{a.category}</Pill>
                  <h3 className="mt-3 font-display text-[0.9375rem] font-bold leading-snug text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[0.75rem] leading-relaxed text-muted">
                    {a.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
