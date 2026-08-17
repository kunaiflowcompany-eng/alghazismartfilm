import Link from "next/link";
import { AutoVideo } from "@/components/media/AutoVideo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getApplications } from "@/content/localized";
import { getDictionary } from "@/i18n";
import { localePath, type Locale } from "@/i18n/config";

/** Compact, media-led applications grid used on the Home page. */
export function ApplicationsSection({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.applicationsSection;
  const applications = getApplications(locale);
  return (
    <section className="section-y bg-warm-white">
      <Container size="wide">
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t.eyebrow} size="lg" accent={t.headingAccent}>
            {t.headingBefore}
          </SectionHeading>
          <div className="flex max-w-[36ch] flex-col items-start gap-6">
            <p className="text-ink-muted">{t.lead}</p>
            <Button href={localePath("/applications", locale)} variant="outline">
              {d.common.allApplications}
            </Button>
          </div>
        </div>

        {/* Two rows of two on the Home page */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-5">
          {applications.map((app, i) => (
            <li key={app.slug} className="reveal" data-reveal-delay={(i % 2) * 90}>
              <Link
                href={`${localePath("/applications", locale)}#${app.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-white transition-colors duration-500 hover:border-line-strong"
              >
                <AutoVideo
                  src={app.video.src}
                  srcSm={app.video.srcSm}
                  poster={app.video.poster}
                  alt={app.video.alt}
                  className="aspect-[4/3] w-full"
                >
                  <div
                    aria-hidden="true"
                    className="scrim-bottom absolute inset-0 opacity-55 transition-opacity duration-500 group-hover:opacity-75"
                  />
                </AutoVideo>

                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <h3 className="display-sm text-ink-strong transition-colors duration-300 group-hover:text-orange">
                    {app.name}
                  </h3>
                  <p className="text-[0.88rem] leading-relaxed text-ink-muted">{app.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
