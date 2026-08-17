"use client";

import Image from "next/image";
import { useLocale } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/i18n";

type PageKey = "about" | "products" | "applications" | "contact";

/**
 * Compact full-width banner (~400–480px on desktop) used by every page except
 * Home. Copy comes from the dictionary for the active language; the image is
 * fixed per page.
 */
export function PageHero({ page, image }: { page: PageKey; image: string }) {
  const locale = useLocale();
  const t = getDictionary(locale).pageHero[page];

  return (
    <section className="relative isolate flex min-h-[400px] items-center overflow-hidden bg-near-black pb-10 pt-28 sm:min-h-[430px] lg:min-h-[470px] lg:pb-12 lg:pt-32">
      <Image
        src={image}
        alt={t.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-near-black/50 lg:hidden" />
      <div aria-hidden="true" className="scrim-left absolute inset-0 -z-10 hidden lg:block" />

      <Container size="wide">
        <div className="max-w-[46rem]">
          <Eyebrow tone="light" className="mb-6">
            {t.eyebrow}
          </Eyebrow>
          <h1 className="display-lg text-warm-white">
            {t.title}
            <span className="text-orange">{t.accent}</span>
          </h1>
          <p className="lead mt-6 max-w-[52ch] text-warm-white/70">{t.intro}</p>
        </div>
      </Container>
    </section>
  );
}
