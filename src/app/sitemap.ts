import type { MetadataRoute } from "next";
import { SITE_URL, routes } from "@/lib/seo";

/** Clean English URLs only — no /en or /ar entries. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: r.path === "/" ? SITE_URL : `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
