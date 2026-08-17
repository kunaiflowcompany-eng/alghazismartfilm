"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/i18n";

/** Icons stay in code — only the wording is translated. */
const icons = [
  // Message bubble — you get in touch
  <>
    <path d="M4 5h16v11H8l-4 3.5V5Z" />
    <path d="M8.5 9.2h7M8.5 12.4h4.5" />
  </>,
  // Clipboard with a check — we specify and quote
  <>
    <path d="M9 4.5h6v2.4H9z" />
    <path d="M15 5.7h3.2V20H5.8V5.7H9" />
    <path d="m9.2 13.2 2 2 3.6-3.9" />
  </>,
  // Squeegee/blade on glass — our team installs
  <>
    <path d="M3.5 20.5h17" />
    <path d="M6.2 17.4 15.6 8l2.6 2.6-9.4 9.4H6.2v-2.6Z" />
    <path d="m15.6 8 1.8-1.8a1.7 1.7 0 0 1 2.4 0l.2.2a1.7 1.7 0 0 1 0 2.4L18.2 10.6" />
  </>,
];

export function ProcessSection() {
  const locale = useLocale();
  const t = getDictionary(locale).process;

  return (
    <section className="section-y-sm bg-white">
      <Container size="wide">
        <div className="reveal flex flex-col items-center gap-5 text-center">
          <SectionHeading eyebrow={t.eyebrow} align="center" accent={t.headingAccent}>
            {t.headingBefore}
          </SectionHeading>
        </div>

        <ol className="mt-12 grid gap-px border-t border-line bg-line lg:grid-cols-3">
          {t.steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal flex flex-col gap-4 bg-white px-1 pt-9 pb-9 sm:px-7 lg:px-8 lg:pb-2"
              data-reveal-delay={i * 100}
            >
              <div className="flex items-center gap-4">
                <span className="display-md leading-none text-orange tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-8 w-8 shrink-0 text-orange"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons[i]}
                </svg>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
              </div>
              <h3 className="display-sm text-ink-strong">{step.title}</h3>
              <p className="max-w-[38ch] text-[0.9rem] leading-relaxed text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
