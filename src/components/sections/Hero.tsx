"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import { AutoVideo } from "@/components/media/AutoVideo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappHref } from "@/content/site";
import { getDictionary } from "@/i18n";

export function Hero() {
  const locale = useLocale();
  const t = getDictionary(locale).hero;
  const c = getDictionary(locale).common;

  return (
    <section className="relative isolate min-h-[92svh] w-full overflow-hidden bg-near-black lg:min-h-[100svh]">
      <div className="absolute inset-0">
        <AutoVideo
          eager
          src="/media/video/hero.mp4"
          srcSm="/media/video/hero-sm.mp4"
          poster="/media/video/hero-poster.jpg"
          alt="An executive office glass partition switching from clear to private"
          className="h-full w-full"
        />
      </div>

      <div aria-hidden="true" className="absolute inset-0 bg-near-black/45 lg:hidden" />
      <div aria-hidden="true" className="scrim-left absolute inset-0 hidden lg:block" />

      <Container
        size="wide"
        className="relative flex min-h-[92svh] items-end pb-16 pt-32 lg:min-h-[100svh] lg:pb-24"
      >
        <div className="max-w-[52rem]">
          <p className="eyebrow mb-7 flex items-center gap-3 text-warm-white/70">
            <span aria-hidden="true" className="h-px w-8 bg-orange" />
            {t.eyebrow}
          </p>

          <h1 className="display-xl text-warm-white">
            {t.titleBefore}
            <span className="text-orange">{t.titleAccent}</span>
            {t.titleAfter}
          </h1>

          <p className="lead mt-7 max-w-[46ch] text-warm-white/75">{t.lead}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button href={"/contact"} size="lg">
              {c.getQuote}
            </Button>
            <Button href={whatsappHref} external variant="whatsapp" size="lg">
              {c.chatWhatsApp}
            </Button>
          </div>
        </div>
      </Container>

      {/* Hairline stat rail */}
      <div className="relative border-t border-line-dark bg-near-black/55 backdrop-blur-sm">
        <Container size="wide">
          <dl className="grid grid-cols-2 divide-line-dark sm:grid-cols-4 sm:divide-x">
            {t.stats.map((s, i) => (
              <div
                key={s.k}
                className={`px-1 py-5 sm:px-6 sm:py-6 ${i < 2 ? "border-b border-line-dark sm:border-b-0" : ""} ${
                  i % 2 === 1 ? "border-s border-line-dark sm:border-s-0" : ""
                }`}
              >
                <dt className="sr-only">{s.k}</dt>
                <dd>
                  <span className="display-sm block text-orange">{s.v}</span>
                  <span className="mt-1.5 block text-[0.72rem] uppercase tracking-[0.14em] text-warm-white/50">
                    {s.k}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
