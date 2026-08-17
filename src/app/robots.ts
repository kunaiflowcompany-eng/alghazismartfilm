import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Legacy locale-prefixed paths 308-redirect to the clean URLs; keep
        // crawlers off them so nothing duplicate is requested or indexed.
        disallow: ["/en/", "/ar/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
