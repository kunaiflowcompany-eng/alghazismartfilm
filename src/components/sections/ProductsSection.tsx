"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { AutoVideo } from "@/components/media/AutoVideo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ControlMethods } from "@/components/sections/ControlMethods";
import { hasSmartControls, type Product } from "@/content/products";
import { getProducts } from "@/content/localized";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/cn";

function ProductCard({ product, feature = false }: { product: Product; feature?: boolean }) {
  const locale = useLocale();
  const href = `/products#${product.slug}`;
  const t = getDictionary(locale).common;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-white transition-colors duration-500 hover:border-line-strong">
      <div className={cn("relative w-full overflow-hidden", feature ? "aspect-[16/10]" : "aspect-[4/3]")}>
        {product.media.kind === "video" ? (
          <AutoVideo
            src={product.media.src}
            srcSm={product.media.srcSm}
            poster={product.media.poster}
            alt={product.media.alt}
            className="h-full w-full"
          />
        ) : (
          <Image
            src={product.media.src}
            alt={product.media.alt}
            fill
            sizes={feature ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, 33vw"}
            className="object-cover transition-transform duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.04]"
          />
        )}
        <span className="absolute left-5 top-5 rounded-xs bg-near-black/80 px-2.5 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-warm-white backdrop-blur-sm">
          {product.family}
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col gap-4", feature ? "p-7 lg:p-9" : "p-6")}>
        <h3 className={cn(feature ? "display-md" : "display-sm", "text-ink-strong")}>
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>

        <p className={cn("text-ink-muted", feature ? "lead" : "text-[0.9rem] leading-relaxed")}>
          {product.summary}
        </p>

        <ul className="mt-auto flex flex-col gap-2.5 pt-2">
          {product.benefits.slice(0, 3).map((b) => (
            <li key={b} className="flex gap-3 text-[0.85rem] leading-snug text-ink-muted">
              <span aria-hidden="true" className="mt-2 h-px w-3.5 shrink-0 bg-orange" />
              {b}
            </li>
          ))}
        </ul>

        {hasSmartControls(product.slug) && <ControlMethods variant="card" />}

        <span className="mt-3 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-orange">
          {t.exploreProduct}
          <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1">
            <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" />
          </svg>
        </span>
      </div>
    </article>
  );
}

export function ProductsSection() {
  const locale = useLocale();
  const d = getDictionary(locale);
  const t = d.productsSection;
  const products = getProducts(locale);
  const [smartGlass, smartFilm, ...others] = products;

  // Coloured Smart Film is shown on the Products page only, not on the Home page.
  const rest = others.filter((p) => p.slug !== "coloured-smart-film");

  return (
    <section className="section-y bg-warm-white">
      <Container size="wide">
        <div className="reveal flex flex-col items-center gap-5 text-center">
          <SectionHeading eyebrow={t.eyebrow} align="center" size="lg" accent={t.headingAccent}>
            {t.headingBefore}
          </SectionHeading>
          <p className="lead max-w-[54ch] text-ink-muted">{t.lead}</p>
        </div>

        {/* All four cards share one grid so sizing, image height, padding and
            content positioning are identical across every row. */}
        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2">
          {[smartGlass, smartFilm, ...rest].map((p, i) => (
            <div key={p.slug} className="reveal relative" data-reveal-delay={(i % 2) * 100}>
              <ProductCard product={p} feature />
            </div>
          ))}
        </div>

        <div className="reveal mt-12 flex justify-center">
          <Button href={"/products"} variant="outline" size="lg">
            {d.common.exploreAllProducts}
          </Button>
        </div>
      </Container>
    </section>
  );
}
