"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappHref } from "@/content/site";
import { getDictionary } from "@/i18n";

type Variant = "home" | "products" | "applications" | "about";

/**
 * Closing conversion band.
 *
 * The headline is stored as explicit parts per locale rather than a string plus
 * a word to highlight — that keeps the orange emphasis exact instead of relying
 * on a substring match, which does not survive translation.
 */
export function FinalCta({ variant = "home" }: { variant?: Variant }) {
  const locale = useLocale();
  const d = getDictionary(locale);
  const copy = d.finalCta[variant];

  return (
    <section className="border-y border-line bg-white">
      <Container size="wide">
        <div className="reveal flex flex-col gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <div className="flex flex-col gap-3">
            <h2 className="display-lg max-w-[20ch] text-ink-strong">
              {copy.before}
              <span className="text-orange">{copy.accent}</span>
              {copy.after}
            </h2>
            <p className="max-w-[46ch] text-ink-muted">{copy.body}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href={"/contact"} size="lg">
              {d.common.getQuote}
            </Button>
            <Button href={whatsappHref} external variant="whatsapp" size="lg">
              {d.common.chatWhatsApp}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
