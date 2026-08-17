"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { getProducts } from "@/content/localized";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** Sticky in-page index for the product bands. */
export function ProductNav({ locale }: { locale: Locale }) {
  const products = getProducts(locale);
  const t = getDictionary(locale).productDetail;
  const [active, setActive] = useState(products[0].slug);

  useEffect(() => {
    const sections = products
      .map((p) => document.getElementById(p.slug))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [products]);

  return (
    <nav
      aria-label={t.productIndex}
      className="sticky top-[72px] z-30 border-b border-line bg-warm-white/95 backdrop-blur-md lg:top-[84px]"
    >
      <Container size="wide">
        <ul className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto py-2">
          {products.map((p) => {
            const isActive = active === p.slug;
            return (
              <li key={p.slug} className="shrink-0">
                <a
                  href={`#${p.slug}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "inline-block whitespace-nowrap rounded-xs px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                    isActive ? "bg-charcoal text-warm-white" : "text-ink-muted hover:text-orange",
                  )}
                >
                  {p.shortName}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
