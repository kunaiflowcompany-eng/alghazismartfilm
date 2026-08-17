import { PageHero } from "@/components/sections/PageHero";
import { ProductsList } from "@/components/sections/ProductsList";
import { ProductNav } from "@/components/sections/ProductNav";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Smart Glass, Smart Film & Surface Protection Film",
  description:
    "Switchable smart glass, PDLC smart film, coloured smart film, frosted sticker film and interior surface protection film — supplied and installed across the UAE.",
  path: "/products",
  image: "/media/img/hero-products.webp",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero page="products" image="/media/img/hero-products.webp" />
      <ProductNav />
      <ProductsList />
      <FinalCta variant="products" />
    </>
  );
}
