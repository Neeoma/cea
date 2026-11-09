import type { MetadataRoute } from "next";
import { academy } from "@/data/academy";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/portal", "/login", "/api/"],
      },
    ],
    sitemap: `${academy.url}/sitemap.xml`,
    host: academy.url,
  };
}
