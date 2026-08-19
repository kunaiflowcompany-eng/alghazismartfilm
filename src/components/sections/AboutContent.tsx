"use client";

import Image from "next/image";
import { useLocale } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { socialIcons } from "@/components/ui/SocialIcons";
import { contact } from "@/content/site";
import { getDictionary } from "@/i18n";

/** Icons stay in code — only the wording is translated. */
const strengthIcons = [
  <>
    <circle cx="12" cy="12" r="8.2" />
    <circle cx="12" cy="12" r="4.4" />
    <circle cx="12" cy="12" r="1" />
  </>,
  <>
    <circle cx="9" cy="8.4" r="3" />
    <path d="M3.6 19.4a5.6 5.6 0 0 1 10.8 0" />
    <path d="M16.2 6.1a3 3 0 0 1 0 5.7" />
    <path d="M17.4 14.5a5.6 5.6 0 0 1 3 4.9" />
  </>,
  <>
    <path d="M12 3.2 21 7.5 12 11.8 3 7.5l9-4.3Z" />
    <path d="m3 12 9 4.3 9-4.3" />
    <path d="m3 16.5 9 4.3 9-4.3" />
  </>,
  <>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </>,
];

export function AboutContent() {
  const locale = useLocale();
  const d = getDictionary(locale);
  const story = d.about.story;
  const strengths = d.about.strengths;
  const social = contact.social.filter((s) => s.href);

  return (
    <>
      {/* Story */}
      <section className="section-y bg-warm-white">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
            <div className="reveal reveal-media relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src="/media/img/team.webp"
                  alt={story.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="reveal order-1 flex flex-col gap-7 lg:order-2" data-reveal-delay="100">
              <SectionHeading eyebrow={story.eyebrow} size="lg" accent={story.headingAccent}>
                {story.headingBefore}
              </SectionHeading>

              <div className="flex flex-col gap-5 text-ink-muted">
                <p className="lead text-ink">{story.p1}</p>
                <p>{story.p2}</p>
                <p>{story.p3}</p>
                <p>{story.p4}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/products">{story.ctaProducts}</Button>
                <Button href="/contact" variant="outline" withArrow={false}>
                  {story.ctaContact}
                </Button>
              </div>

              {/* Social — same glyphs and button treatment as the Contact page */}
              {social.length > 0 && (
                <div className="flex items-center gap-4 border-t border-line pt-6">
                  <span className="eyebrow text-ink-soft">{d.contact.followUs}</span>
                  <ul className="flex gap-2.5">
                    {social.map((s) => {
                      const SocialIcon = socialIcons[s.label];
                      return (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-xs border border-line text-ink-muted transition-colors duration-300 hover:border-orange hover:text-orange"
                          >
                            {SocialIcon ? (
                              <SocialIcon className="h-[19px] w-[19px]" />
                            ) : (
                              <span className="text-[0.7rem] font-semibold uppercase">
                                {s.label[0]}
                              </span>
                            )}
                            <span className="sr-only">{s.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Strengths */}
      <section className="section-y bg-white">
        <Container size="wide">
          <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow={strengths.eyebrow} size="lg" accent={strengths.headingAccent}>
              {strengths.headingBefore}
            </SectionHeading>
            <p className="max-w-[38ch] text-ink-muted">{strengths.intro}</p>
          </div>

          <ul className="mt-12 grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {strengths.items.map((s, i) => (
              <li
                key={s.title}
                className="reveal flex flex-col gap-4 bg-white px-1 pt-8 pb-8 sm:px-6 lg:px-7 lg:pb-0"
                data-reveal-delay={i * 80}
              >
                <span className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 text-orange"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {strengthIcons[i]}
                  </svg>
                  <span className="display-sm text-orange tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <h3 className="display-sm text-ink-strong">{s.title}</h3>
                <p className="text-[0.88rem] leading-relaxed text-ink-muted">{s.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
