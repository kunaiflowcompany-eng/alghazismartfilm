"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { getDictionary } from "@/i18n";

/**
 * The core brand device: clear ⟷ privacy.
 *
 * `reveal` is the percentage of the frame showing the CLEAR state, so 100 is
 * fully clear (charcoal) and 0 is fully private (orange). Drag the divider or
 * hit the On/Off control; both write to the same value.
 *
 * Privacy starts ON, so the frame opens fully private.
 */
export function PrivacyExperience() {
  const locale = useLocale();
  const t = getDictionary(locale).privacy;
  const [reveal, setReveal] = useState(0);
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

  /* Privacy is "on" whenever the frame is showing more private than clear, so
     dragging the divider keeps the control in step with the image. */
  const isOn = reveal <= 50;

  /* The thumb travels to the button for the current state and stays there — the
     press is a one-shot on arrival, never a return to a resting pose. Skipped on
     first paint so the remote simply loads already switched on. */
  const [pressing, setPressing] = useState(false);
  const settled = useRef(false);
  useEffect(() => {
    if (!settled.current) {
      settled.current = true;
      return;
    }
    setPressing(true);
    const id = window.setTimeout(() => setPressing(false), 640);
    return () => window.clearTimeout(id);
  }, [isOn]);

  return (
    // Not `section-y`: the top is tightened a little and the bottom a lot,
    // because the remote's faded forearm now occupies the lower whitespace.
    <section className="bg-warm-white pt-[clamp(3.5rem,6.5vw,6.5rem)] pb-[clamp(1.5rem,2.5vw,2.75rem)]">
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

          {/* Single On/Off control — one button, two states */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <p id={labelId} className="sr-only">
              {t.groupLabel}
            </p>

            {/* The halo is a sibling, not a shadow, so the pulse never reflows the column */}
            <span className="privacy-toggle-wrap relative inline-flex">
              <span
                aria-hidden="true"
                className={cn(
                  "privacy-toggle-halo pointer-events-none absolute inset-0 rounded-full transition-colors duration-300",
                  isOn ? "bg-orange/35" : "bg-charcoal/25",
                )}
              />
              <button
                type="button"
                role="switch"
                aria-checked={isOn}
                aria-labelledby={labelId}
                onClick={() => setReveal(isOn ? 100 : 0)}
                className={cn(
                  "privacy-toggle relative block h-[52px] w-[152px] rounded-full transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4",
                  isOn
                    ? "bg-orange focus-visible:outline-orange"
                    : "bg-charcoal focus-visible:outline-charcoal",
                )}
              >
                {/* Knob — logical inset so it slides the correct way in Arabic too */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white shadow-[0_2px_8px_rgba(17,19,21,0.3)] transition-[inset-inline-start] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ insetInlineStart: isOn ? "106px" : "6px" }}
                />
                {/* Label sits in whichever half the knob is not occupying */}
                <span
                  className="absolute top-1/2 w-[100px] -translate-y-1/2 text-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-[inset-inline-start] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ insetInlineStart: isOn ? "6px" : "46px" }}
                >
                  {isOn ? t.on : t.off}
                </span>
              </button>
            </span>

            <p className="text-[0.8rem] text-ink-soft">
              {t.noteBefore}<span className="font-semibold text-ink">{t.noteStrong}</span>{t.noteAfter}
            </p>

            {/*
              Remote demo. Decorative only — the switch above is the single
              control, so this is aria-hidden and takes no pointer events.

              Geometry is measured, not eyeballed. In the remote artwork the
              four rules sit at 20.1 / 30.6 / 41.3 / 51.5% of the body height,
              so the ON cell is 20.1–30.6% and the OFF cell 41.3–51.5%. The
              fingertip sits at 95.4% across / 0% down its own frame. Hand size
              (2.02x the remote width) and the fingertip targets come from the
              supplied reference composites, matched by finger-width profile.

              Everything is expressed against the stage width so the whole
              composition — finger entering from the lower left, remote to the
              right — scales as one unit. Physical `left`/`ml` rather than
              logical, because the artwork itself does not mirror in Arabic.
            */}
            <figure
              aria-hidden="true"
              className={cn(
                // The remote sits at 81.28% across the stage, so the stage is
                // pulled left by 31.28% of its own width to park the remote
                // dead under the switch. The finger simply follows it left.
                "pointer-events-none mx-auto -translate-x-[31.28%]",
                // Fixed px, not %: percentage padding resolves against the
                // parent container's width, not the stage's, which blew the
                // reserved space out to 421px and left a huge hole below.
                "mt-10 w-[250px] pb-[84px] sm:w-[320px] sm:pb-[108px] lg:mt-12 lg:w-[380px] lg:pb-[128px]",
              )}
            >
              <div className="relative">
                {/* Remote — in flow, so it sets the stage height */}
                <div className="relative ml-[62.56%] w-[37.44%]">
                  <Image
                    src="/media/img/remote.png"
                    alt=""
                    width={300}
                    height={824}
                    sizes="142px"
                    className="block h-auto w-full"
                  />
                  <span
                    className={cn(
                      "privacy-btn-glow privacy-btn-glow--on absolute",
                      isOn ? "opacity-100" : "opacity-0",
                      isOn && pressing && "privacy-btn-flash",
                    )}
                    style={{ left: "12.65%", width: "75.05%", top: "20.1%", height: "10.5%" }}
                  />
                  <span
                    className={cn(
                      "privacy-btn-glow privacy-btn-glow--off absolute",
                      isOn ? "opacity-0" : "opacity-100",
                      !isOn && pressing && "privacy-btn-flash",
                    )}
                    style={{ left: "12.65%", width: "75.05%", top: "41.3%", height: "10.2%" }}
                  />
                </div>

                {/* Finger — max-w-none, the global img reset would clamp it */}
                <Image
                  src="/media/img/remote-finger.png"
                  alt=""
                  width={580}
                  height={710}
                  sizes="287px"
                  className={cn(
                    "privacy-finger absolute w-[75.59%] max-w-none transition-[top] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    pressing && "privacy-finger-press",
                  )}
                  style={{ left: "0%", top: isOn ? "20.5%" : "42.3%" }}
                />
              </div>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
