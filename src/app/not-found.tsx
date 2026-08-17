"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/i18n";

export default function NotFound() {
  const locale = useLocale();
  const t = getDictionary(locale).notFound;

  return (
    <section className="flex min-h-[80svh] items-center bg-near-black pt-32 pb-20">
      <Container size="wide">
        <div className="flex max-w-[46rem] flex-col gap-7">
          <Eyebrow tone="light">{t.eyebrow}</Eyebrow>
          <h1 className="display-xl text-warm-white">
            {t.titleBefore}
            <span className="text-orange">{t.titleAccent}</span>
          </h1>
          <p className="lead max-w-[46ch] text-warm-white/65">{t.body}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/">{t.home}</Button>
            <Button href="/products" variant="outline-dark">
              {t.products}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
