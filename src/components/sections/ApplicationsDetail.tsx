"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import { AutoVideo } from "@/components/media/AutoVideo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getApplications } from "@/content/localized";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/cn";

/** One editorial band per application sector, in the active language. */
export function ApplicationsDetail() {
  const locale = useLocale();
  const d = getDictionary(locale);
  const applications = getApplications(locale);

  return (
    <>
      {applications.map((app, i) => {
        const flipped = i % 2 === 1;
        const onWhite = i % 2 === 1;
        return (
          <section
            key={app.slug}
            id={app.slug}
            aria-labelledby={`${app.slug}-title`}
            className={cn("section-y scroll-mt-24", onWhite ? "bg-white" : "bg-warm-white")}
          >
            <Container size="wide">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={cn("reveal", flipped && "lg:order-2")}>
                  <AutoVideo
                    src={app.video.src}
                    srcSm={app.video.srcSm}
                    poster={app.video.poster}
                    alt={app.video.alt}
                    className="aspect-[4/3] w-full rounded-sm"
                  />
                </div>

                <div
                  className={cn("reveal flex flex-col gap-7", flipped && "lg:order-1")}
                  data-reveal-delay="100"
                >
                  <div className="flex flex-col gap-5">
                    <Eyebrow>
                      {String(i + 1).padStart(2, "0")} · {app.name}
                    </Eyebrow>
                    <h2 id={`${app.slug}-title`} className="display-lg max-w-[15ch] text-ink-strong">
                      {app.headline}
                    </h2>
                  </div>

                  <p className="lead text-ink">{app.summary}</p>

                  <div className="flex flex-col gap-4 text-ink-muted">
                    {app.detail.map((para) => (
                      <p key={para.slice(0, 30)}>{para}</p>
                    ))}
                  </div>

                  <ul className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
                    {app.points.map((point) => (
                      <li
                        key={point}
                        className={cn(
                          "px-1 py-4 text-[0.88rem] text-ink-muted sm:px-4",
                          onWhite ? "bg-white" : "bg-warm-white",
                        )}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div>
                    <Button href="/contact" variant="outline">
                      {d.common.discussSpace}
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
