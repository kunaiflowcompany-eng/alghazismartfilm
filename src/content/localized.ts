/* ============================================================================
   LOCALE-AWARE CONTENT RESOLVERS
   ----------------------------------------------------------------------------
   English files stay the source of structure (slugs, media, ordering); the
   Arabic overlays in ar.ts are merged over them field by field.
   ========================================================================== */

import { products, type Product } from "./products";
import { applications, type Application } from "./applications";
import { projects, type Project } from "./projects";
import { owner } from "./site";
import { productsAr, applicationsAr, projectsAr, colourNamesAr, ownerAr } from "./ar";
import type { Locale } from "@/i18n/config";

export function getProducts(locale: Locale): Product[] {
  if (locale === "en") return products;
  return products.map((p) => {
    const overlay = productsAr[p.slug] ?? {};
    const merged: Product = { ...p, ...overlay };
    if (p.colourVariants) {
      merged.colourVariants = p.colourVariants.map((v) => ({
        ...v,
        name: colourNamesAr[v.name] ?? v.name,
      }));
    }
    return merged;
  });
}

export function getApplications(locale: Locale): Application[] {
  if (locale === "en") return applications;
  return applications.map((a) => ({ ...a, ...(applicationsAr[a.slug] ?? {}) }));
}

export function getProjects(locale: Locale): Project[] {
  if (locale === "en") return projects;
  return projects.map((p) => ({ ...p, ...(projectsAr[p.id] ?? {}) }));
}

export function getOwner(locale: Locale) {
  if (locale === "en") return owner;
  return { ...owner, ...ownerAr };
}

/** Options for the quote form's product select — names stay in Latin script */
export function getProductOptions(locale: Locale): string[] {
  return getProducts(locale).map((p) => p.name);
}
