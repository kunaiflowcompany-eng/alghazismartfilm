"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";
import { getDictionary } from "@/i18n";

/** Capability icons stay in code — only the wording is translated. */
const icons = [
  <>
    <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M4 20 20 4" />
  </>,
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
  </>,
  <>
    <path d="M12 2.8 20 6v6.2c0 4.6-3.3 7.9-8 9.2-4.7-1.3-8-4.6-8-9.2V6l8-3.2Z" />
    <path d="m8.8 12 2.3 2.3 4.4-4.6" />
  </>,
  <>
    <path d="M3 10.4 12 3l9 7.4V21H3V10.4Z" />
    <path d="M9.4 21v-6.2h5.2V21" />
  </>,
  <>
    <path d="M3.4 9.4h3.3L11 5.9v12.2L6.7 14.6H3.4z" />
    <path d="M14.6 9.2a4 4 0 0 1 0 5.6" />
    <path d="M17.4 6.5a7.7 7.7 0 0 1 0 11" />
    <path d="M21 4.4 13.9 19.6" />
  </>,
];

export function WhoWeAre() {
  const locale = useLocale();
  const d = getDictionary(locale);
  const t = d.whoWeAre;

  return (
    <section className="section-y bg-warm-white">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
          {/* Copy — sits after the image on desktop */}
          <div className="reveal order-2 flex flex-col gap-7" data-reveal-delay="140">
            <SectionHeading
              eyebrow={t.eyebrow}
              size="lg"
              accent={t.headingAccent}
              after={t.headingAfter}
            >
              {t.headingBefore}
            </SectionHeading>

            <div className="flex flex-col gap-5 text-ink-muted">
              <p className="lead">{t.p1}</p>
              <p>{t.p2}</p>
            </div>

            <TextLink href={"/about"}>{d.common.moreAboutUs}</TextLink>
          </div>

          {/* Image */}
          <div className="reveal reveal-media relative order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src="/media/img/workshop.webp"
                alt={t.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-4 start-8 hidden h-16 w-px bg-orange lg:block"
            />
          </div>
        </div>

        {/* Capability rail */}
        <ul className="mt-16 grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 xl:grid-cols-5">
          {t.capabilities.map((c, i) => (
            <li
              key={c.title}
              className="reveal flex flex-col gap-4 bg-warm-white px-1 pt-8 pb-8 sm:px-6 lg:px-7 lg:pb-0"
              data-reveal-delay={i * 80}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-7 w-7 text-orange"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {icons[i]}
              </svg>
              <h3 className="display-sm text-ink-strong">{c.title}</h3>
              <p className="text-[0.88rem] leading-relaxed text-ink-muted">{c.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
