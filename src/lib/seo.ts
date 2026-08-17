import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * SEO for the clean, locale-free URL structure.
 *
 * English is the indexed language, so every canonical is the plain path — never
 * /en or /ar. Each page self-references its own canonical.
 */

export const SITE_URL = site.url; // https://alghazismartfilm.com

/** The complete public route list — the single source for the sitemap. */
export const routes = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/applications", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
];

const OG_IMAGE = "/media/video/hero-poster.jpg";

export function buildMetadata({
  title,
  description,
  path,
  image = OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_AE",
      siteName: site.name,
      title,
      description,
      url,
      images: [{ url: image, width: 1600, height: 900, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Organisation / LocalBusiness schema for the homepage.
 * Only facts already published on the site are included.
 */
export function organisationSchema(contact: {
  address: { line1: string; line2: string; city: string; country: string };
  phone: { display: string };
  email: { display: string };
  social: { label: string; href: string }[];
}) {
  const sameAs = contact.social.filter((s) => s.href).map((s) => s.href);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: SITE_URL,
    image: `${SITE_URL}${OG_IMAGE}`,
    description: site.description,
    telephone: contact.phone.display,
    email: contact.email.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.line1,
      addressLocality: contact.address.line2,
      addressRegion: contact.address.city,
      addressCountry: "AE",
    },
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    makesOffer: [
      "Smart Glass",
      "Smart Film",
      "Coloured Smart Film",
      "Frosted Sticker Film",
      "Surface Protection Film (Interior PPF)",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name, areaServed: "United Arab Emirates" },
    })),
  };
}
