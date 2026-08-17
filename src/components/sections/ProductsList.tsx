"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { getProducts } from "@/content/localized";

/** Renders every product band in the active language. */
export function ProductsList() {
  const locale = useLocale();
  const products = getProducts(locale);

  return (
    <>
      {products.map((product, i) => (
        <ProductDetail key={product.slug} product={product} index={i} />
      ))}
    </>
  );
}
