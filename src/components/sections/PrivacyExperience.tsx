"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { getDictionary } from "@/i18n";

/**
 * The core brand device: clear ⟷ privacy.
 *
 * `reveal` is the percentage of the frame showing the CLEAR state, so 100 is
 * fully clear (charcoal) and 0 is fully private (orange). Drag the divider or
 * use the segmented control; both write to the same value.
 */
export function PrivacyExperience() {
  const locale = useLocale();
  const t = getDictionary(locale).privacy;
  const [reveal, setReveal] = useState(52);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setReveal(Math.min(100, Math.max(0, pct)));
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setReveal((v) => Math.max(0, v - step));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setReveal((v) => Math.min(100, v + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setReveal(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setReveal(100);
    }
  };

  const isClear = reveal > 50;

  return (
    <section className="section-y bg-warm-white">
      <Container size="wide">
        <div className="reveal flex flex-col items-center gap-5 text-center">
          <SectionHeading eyebrow={t.eyebrow} align="center" size="lg" accent={t.headingAccent}>
            {t.headingBefore}
          </SectionHeading>
          <p className="lead max-w-[52ch] text-ink-muted">{t.lead}</p>
        </div>

        {/* Comparison frame */}
        <div className="reveal mt-12 lg:mt-16" data-reveal-delay="80">
          <div
            ref={frameRef}
            className={cn(
              "relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-sm bg-charcoal sm:aspect-[16/9] lg:aspect-[21/9]",
              dragging ? "cursor-grabbing" : "cursor-grab",
            )}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              setDragging(true);
              setFromClientX(e.clientX);
            }}
            onPointerMove={(e) => dragging && setFromClientX(e.clientX)}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
          >
            {/* Private state sits underneath */}
            <Image
              src="/media/img/privacy-frosted.webp"
              alt={t.frostedAlt}
              fill
              sizes="(max-width: 1560px) 100vw, 1560px"
              className="object-cover"
              priority={false}
            />

            {/* Clear state is clipped to the reveal position */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}
            >
              <Image
                src="/media/img/privacy-clear.webp"
                alt={t.clearAlt}
                fill
                sizes="(max-width: 1560px) 100vw, 1560px"
                className="object-cover"
              />
            </div>

            {/* State captions */}
            <span
              className={cn(
                "pointer-events-none absolute left-4 top-4 rounded-xs bg-charcoal/85 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-warm-white backdrop-blur-sm transition-opacity duration-300 sm:left-6 sm:top-6",
                reveal > 14 ? "opacity-100" : "opacity-0",
              )}
            >{t.clear}</span>
            <span
              className={cn(
                "pointer-events-none absolute right-4 top-4 rounded-xs bg-orange px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white transition-opacity duration-300 sm:right-6 sm:top-6",
                reveal < 86 ? "opacity-100" : "opacity-0",
              )}
            >{t.private}</span>

            {/* Divider + handle */}
            <div
              className="pointer-events-none absolute inset-y-0 w-px bg-warm-white/90 shadow-[0_0_0_1px_rgba(17,19,21,0.18)]"
              style={{ left: `${reveal}%` }}
            >
              <div
                role="slider"
                tabIndex={0}
                aria-label={t.sliderLabel}
                aria-labelledby={labelId}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(reveal)}
                aria-valuetext={`${Math.round(reveal)}${t.valueText}`}
                onKeyDown={onKeyDown}
                className="pointer-events-auto absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-warm-white text-charcoal shadow-[0_2px_14px_rgba(17,19,21,0.28)] transition-transform duration-200 hover:scale-105 active:cursor-grabbing"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                  <path
                    d="M9 6 4 12l5 6M15 6l5 6-5 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="square"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Segmented control */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <p id={labelId} className="sr-only">
              {t.groupLabel}
            </p>
            <div
              role="group"
              aria-labelledby={labelId}
              className="inline-flex rounded-xs border border-line p-1"
            >
              <button
                type="button"
                onClick={() => setReveal(100)}
                aria-pressed={isClear}
                className={cn(
                  "inline-flex items-center gap-2.5 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                  isClear ? "bg-charcoal text-warm-white" : "text-ink-muted hover:text-ink",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors duration-300",
                    isClear ? "bg-warm-white" : "bg-ink-soft/50",
                  )}
                />
                {t.clear}
              </button>
              <button
                type="button"
                onClick={() => setReveal(0)}
                aria-pressed={!isClear}
                className={cn(
                  "inline-flex items-center gap-2.5 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                  !isClear ? "bg-orange text-white" : "text-ink-muted hover:text-ink",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors duration-300",
                    !isClear ? "bg-white" : "bg-ink-soft/50",
                  )}
                />
                {t.private}
              </button>
            </div>
            <p className="text-[0.8rem] text-ink-soft">
              {t.noteBefore}<span className="font-semibold text-ink">{t.noteStrong}</span>{t.noteAfter}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
