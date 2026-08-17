"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { getOwner } from "@/content/localized";
import { getDictionary } from "@/i18n";

/**
 * Leadership block.
 *
 * Owner details are placeholders until supplied — see `owner` in content/site.ts.
 * When `owner.photo` is empty a designed placeholder panel is rendered so the
 * layout is complete and obviously awaiting content, rather than broken.
 */
export function OwnerCard() {
  const locale = useLocale();
  const owner = getOwner(locale);
  const t = getDictionary(locale).about.owner;
  return (
    <section className="section-y bg-charcoal">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          {/* Portrait */}
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-sm bg-near-black">
            {owner.photo ? (
              <Image
                src={owner.photo}
                alt={`${owner.name}, ${owner.role}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-5 border border-dashed border-line-dark-strong p-8 text-center">
                <Image
                  src="/media/brand/logo-mark-ondark.png"
                  alt=""
                  width={200}
                  height={130}
                  className="h-14 w-auto opacity-25"
                />
                <p className="eyebrow text-warm-white/40">{t.placeholderLabel}</p>
                <p className="max-w-[24ch] text-[0.8rem] leading-relaxed text-warm-white/30">{t.placeholderHint}</p>
              </div>
            )}
          </div>

          {/* Words */}
          <div className="reveal flex flex-col gap-7" data-reveal-delay="100">
            <Eyebrow tone="light">{t.eyebrow}</Eyebrow>

            {owner.quote && (
              <blockquote className="display-md max-w-[20ch] text-warm-white">
                <p>&ldquo;{owner.quote}&rdquo;</p>
              </blockquote>
            )}

            <p className="max-w-[52ch] text-warm-white/60">{owner.bio}</p>

            <footer className="flex items-center gap-4 border-t border-line-dark pt-6">
              <span aria-hidden="true" className="h-10 w-px bg-orange" />
              <div>
                <p className="display-sm text-warm-white">{owner.name}</p>
                <p className="mt-1 text-[0.82rem] text-warm-white/50">{owner.role}</p>
              </div>
            </footer>
          </div>
        </div>
      </Container>
    </section>
  );
}
