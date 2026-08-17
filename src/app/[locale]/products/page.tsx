import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { ProductNav } from "@/components/sections/ProductNav";
import { FinalCta } from "@/components/sections/FinalCta";
import { getProducts } from "@/content/localized";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : "en");
  return { title: t.nav.products, description: t.pageHero.products.intro };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale).pageHero.products;
  const products = getProducts(locale);

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        accent={t.accent}
        intro={t.intro}
        media={{ kind: "image", src: "/media/img/hero-products.webp", alt: t.alt }}
      />

      <ProductNav locale={locale} />

      {products.map((product, i) => (
        <ProductDetail key={product.slug} product={product} index={i} locale={locale} />
      ))}

      <FinalCta locale={locale} variant="products" />
    </>
  );
}
