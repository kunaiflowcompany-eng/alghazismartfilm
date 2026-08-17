"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { Product } from "@/content/products";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

type Variant = NonNullable<Product["colourVariants"]>[number];

/** Crossfading tint selector for Coloured Smart Film. */
export function ColourSelector({ variants, locale }: { variants: Variant[]; locale: Locale }) {
  const t = getDictionary(locale).productDetail;
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-5">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-charcoal">
        {variants.map((v, i) => (
          <Image
            key={v.name}
            src={v.src}
            alt={v.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority={i === 0}
            className={cn(
              "object-cover transition-opacity duration-700 ease-[var(--ease-brand)]",
              i === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}

        <span className="absolute bottom-4 left-4 rounded-xs bg-near-black/80 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-warm-white backdrop-blur-sm sm:bottom-6 sm:left-6">
          {variants[active].name}
        </span>
      </div>

      <div role="group" aria-label={t.chooseTint} className="flex flex-wrap gap-2.5">
        {variants.map((v, i) => (
          <button
            key={v.name}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={cn(
              "group inline-flex items-center gap-3 rounded-xs border px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
              i === active
                ? "border-charcoal bg-charcoal text-warm-white"
                : "border-line text-ink-muted hover:border-line-strong hover:text-ink",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-4 w-4 rounded-full ring-1 transition-all duration-300",
                i === active ? "ring-warm-white/60" : "ring-line-strong",
              )}
              style={{ backgroundColor: v.hex }}
            />
            {v.name}
          </button>
        ))}
      </div>
    </div>
  );
}
