import type { MetadataRoute } from "next";
import { academy } from "@/data/academy";
import { programmes } from "@/data/programmes";
import { articles } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = academy.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, priority: 1, changeFrequency: "weekly", lastModified: now },
    { url: `${base}/about`, priority: 0.9, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/programmes`, priority: 0.95, changeFrequency: "weekly", lastModified: now },
    { url: `${base}/cybersecurity`, priority: 0.9, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/cyber-lab`, priority: 0.85, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/admissions`, priority: 0.9, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/apply`, priority: 0.9, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/learning`, priority: 0.8, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/projects`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/careers`, priority: 0.8, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/community`, priority: 0.7, changeFrequency: "weekly", lastModified: now },
    { url: `${base}/enterprise`, priority: 0.75, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/resources`, priority: 0.8, changeFrequency: "weekly", lastModified: now },
    { url: `${base}/contact`, priority: 0.8, changeFrequency: "monthly", lastModified: now },
    { url: `${base}/verify`, priority: 0.6, changeFrequency: "yearly", lastModified: now },
    { url: `${base}/privacy`, priority: 0.3, changeFrequency: "yearly", lastModified: now },
    { url: `${base}/terms`, priority: 0.3, changeFrequency: "yearly", lastModified: now },
  ];

  const programmeRoutes: MetadataRoute.Sitemap = programmes.map((p) => ({
    url: `${base}/programmes/${p.slug}`,
    priority: 0.85,
    changeFrequency: "monthly",
    lastModified: now,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/resources/${a.slug}`,
    priority: 0.65,
    changeFrequency: "yearly",
    lastModified: new Date(a.date),
  }));

  return [...staticRoutes, ...programmeRoutes, ...articleRoutes];
}
