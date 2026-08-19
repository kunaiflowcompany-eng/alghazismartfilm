"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import Image from "next/image";
import { AutoVideo } from "@/components/media/AutoVideo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ColourSelector } from "@/components/sections/ColourSelector";
import { ControlMethods } from "@/components/sections/ControlMethods";
import { hasSmartControls, type Product } from "@/content/products";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/cn";

/**
 * Full product presentation — one alternating editorial band per product.
 * Reused for every product so the range stays visually consistent.
 */
export function ProductDetail({ product, index }: { product: Product; index: number }) {
  const locale = useLocale();
  const d = getDictionary(locale);
  const t = d.productDetail;
  const flipped = index % 2 === 1;
  const onWhite = index % 2 === 1;

  return (
    <section
      id={product.slug}
      aria-labelledby={`${product.slug}-title`}
      className={cn("section-y scroll-mt-24", onWhite ? "bg-white" : "bg-warm-white")}
    >
      <Container size="wide">
        <div
          className={cn(
            "grid items-start gap-10 lg:gap-16",
            product.colourVariants ? "lg:grid-cols-[1.15fr_1fr]" : "lg:grid-cols-2",
          )}
        >
          {/* Media — pinned while the longer copy column scrolls past it */}
          <div className={cn("reveal lg:sticky lg:top-40", flipped && "lg:order-2")}>
            {product.colourVariants ? (
              <ColourSelector variants={product.colourVariants} />
            ) : product.media.kind === "video" ? (
              <AutoVideo
                src={product.media.src}
                srcSm={product.media.srcSm}
                poster={product.media.poster}
                alt={product.media.alt}
                className="aspect-[4/3] w-full rounded-sm"
              />
            ) : (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                <Image
                  src={product.media.src}
                  alt={product.media.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            )}

            {/* Supporting gallery */}
            {product.gallery && (
              <ul className="mt-4 grid grid-cols-2 gap-4">
                {product.gallery.map((g) => (
                  <li key={g.src} className="relative aspect-[3/2] overflow-hidden rounded-sm">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Copy */}
          <div className={cn("reveal flex flex-col gap-7", flipped && "lg:order-1")} data-reveal-delay="100">
            <div className="flex flex-col gap-5">
              <Eyebrow>{product.family}</Eyebrow>
              <h2 id={`${product.slug}-title`} className="display-lg max-w-[16ch] text-ink-strong">
                {product.name}
              </h2>
            </div>

            <p className="lead text-ink">{product.summary}</p>

            <div className="flex flex-col gap-4 text-ink-muted">
              {product.description.map((para) => (
                <p key={para.slice(0, 30)}>{para}</p>
              ))}
            </div>

            {product.badges && (
              <ul className="flex flex-wrap gap-2">
                {product.badges.map((b) => (
                  <li
                    key={b}
                    className="rounded-xs border border-line px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-muted"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {/* Benefits */}
            <div className="flex flex-col gap-4 border-t border-line pt-7">
              <h3 className="eyebrow text-ink-soft">{t.keyBenefits}</h3>
              <ul className="flex flex-col gap-3">
                {product.benefits.map((b) => (
                  <li key={b} className="flex gap-3.5 text-[0.92rem] leading-relaxed text-ink-muted">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-orange" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Control methods — switchable products only */}
            {hasSmartControls(product.slug) && <ControlMethods />}

            {/* Specifications — only where verified data exists */}
            {product.specs && (
              <div className="flex flex-col gap-4 border-t border-line pt-7">
                <h3 className="eyebrow text-ink-soft">{t.specifications}</h3>
                <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
                  {product.specs.map((s) => (
                    <div key={s.label} className={cn("px-4 py-4", onWhite ? "bg-white" : "bg-warm-white")}>
                      <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-ink-soft">{s.label}</dt>
                      <dd className="display-sm mt-1.5 text-orange">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Applications */}
            <div className="flex flex-col gap-4 border-t border-line pt-7">
              <h3 className="eyebrow text-ink-soft">{t.whereUsed}</h3>
              <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
                {product.applications.map((a) => (
                  <li key={a} className="text-[0.88rem] text-ink-muted">
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button href={`/contact?product=${encodeURIComponent(product.name)}`}>
                {d.common.requestQuote}
              </Button>
              <Button href={"/applications"} variant="outline" withArrow={false}>
                {d.common.seeItInPlace}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
