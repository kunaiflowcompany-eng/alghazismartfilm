import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { socialIcons } from "@/components/ui/SocialIcons";
import { contact, mapsEmbed, mapsLink, whatsappHref } from "@/content/site";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : "en");
  return { title: t.nav.contact, description: t.pageHero.contact.intro };
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 border-t border-line py-6">
      <h3 className="eyebrow text-ink-soft">{label}</h3>
      <div className="text-[0.98rem] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const d = getDictionary(locale);
  const t = d.contact;
  const hero = d.pageHero.contact;
  const social = contact.social.filter((s) => s.href);

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        accent={hero.accent}
        intro={hero.intro}
        media={{ kind: "image", src: "/media/img/hero-contact.webp", alt: hero.alt }}
      />

      <section className="section-y bg-warm-white">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
            {/* Form */}
            <div className="reveal">
              <div className="flex flex-col gap-5">
                <Eyebrow>{t.formEyebrow}</Eyebrow>
                <h2 className="display-md max-w-[18ch] text-ink-strong">
                  {t.formHeadingBefore}
                  <span className="text-orange">{t.formHeadingAccent}</span>
                </h2>
              </div>

              <div className="mt-9 rounded-sm border border-line bg-white p-6 sm:p-9">
                <Suspense fallback={<div className="h-[32rem]" aria-hidden="true" />}>
                  <QuoteForm locale={locale} />
                </Suspense>
              </div>
            </div>

            {/* Details */}
            <aside className="reveal flex flex-col" data-reveal-delay="100">
              <div className="flex flex-col gap-5">
                <Eyebrow>{t.directEyebrow}</Eyebrow>
                <h2 className="display-md max-w-[14ch] text-ink-strong">{t.directHeading}</h2>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button href={whatsappHref} external variant="whatsapp" size="lg">
                  {d.common.chatWhatsApp}
                </Button>
                <Button href={contact.phone.href} variant="outline" size="lg" withArrow={false}>
                  {t.call} <span dir="ltr">{contact.phone.display}</span>
                </Button>
              </div>

              <div className="mt-10 flex flex-col">
                <Detail label={t.office}>
                  <address className="not-italic">
                    {contact.address.line1}
                    <br />
                    {contact.address.line2}
                    <br />
                    {contact.address.city}, {contact.address.country}
                  </address>
                </Detail>

                <Detail label={t.phone}>
                  <a href={contact.phone.href} dir="ltr" className="inline-block transition-colors hover:text-orange">
                    {contact.phone.display}
                  </a>
                </Detail>

                <Detail label={t.whatsapp}>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-orange"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-orange" />
                    <span dir="ltr">{contact.whatsapp.display}</span>
                  </a>
                </Detail>

                <Detail label={t.email}>
                  <a href={contact.email.href} dir="ltr" className="inline-block break-all transition-colors hover:text-orange">
                    {contact.email.display}
                  </a>
                </Detail>

                <Detail label={t.hours}>
                  <ul className="flex flex-col gap-1">
                    {t.hoursRows.map((h) => (
                      <li key={h.days} className="flex justify-between gap-6">
                        <span className="text-ink-muted">{h.days}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </Detail>

                {social.length > 0 && (
                  <Detail label={t.followUs}>
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
                                <span className="text-[0.7rem] font-semibold uppercase">{s.label[0]}</span>
                              )}
                              <span className="sr-only">{s.label}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </Detail>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Location map */}
      <section aria-labelledby="map-title" className="border-t border-line bg-white">
        <Container size="wide" className="py-14 lg:py-20">
          <div className="reveal flex flex-col gap-5">
            <Eyebrow>{t.mapEyebrow}</Eyebrow>
            <h2 id="map-title" className="display-md max-w-[16ch] text-ink-strong">
              {t.mapHeadingBefore}
              <span className="text-orange">{t.mapHeadingAccent}</span>
            </h2>
          </div>

          <div className="reveal mt-9 overflow-hidden rounded-sm border border-line">
            <iframe
              src={mapsEmbed}
              title={t.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[320px] w-full border-0 sm:h-[420px] lg:h-[480px]"
            />
          </div>

          <div className="reveal mt-6">
            <Button href={mapsLink} external variant="outline">
              {t.openInMaps}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
