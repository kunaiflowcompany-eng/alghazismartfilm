"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { contact, site, whatsappHref } from "@/content/site";
import { getProducts } from "@/content/localized";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { socialIcons } from "@/components/ui/SocialIcons";
import { getDictionary } from "@/i18n";

function Icon({ d, circle }: { d: string; circle?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {circle && <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />}
    </svg>
  );
}

export function Footer() {
  const locale = useLocale();
  const t = getDictionary(locale);
  const year = new Date().getFullYear();
  const social = contact.social.filter((s) => s.href);
  const products = getProducts(locale);

  const nav = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.products, href: "/products" },
    { label: t.nav.applications, href: "/applications" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="bg-near-black text-warm-white">
      <Container size="wide">
        <div className="grid gap-12 border-b border-line-dark py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-10 lg:py-20">
          {/* Brand */}
          <div className="flex flex-col items-start gap-6">
            <Image
              src="/media/brand/logo-full-ondark.png"
              alt={site.name}
              width={340}
              height={340}
              className="h-16 w-auto"
            />
            <p className="max-w-[34ch] text-[0.92rem] leading-relaxed text-warm-white/60">
              {t.footer.description}
            </p>
            {social.length > 0 && (
              <ul className="flex gap-2.5">
                {social.map((s) => {
                  const SocialIcon = socialIcons[s.label];
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-xs border border-line-dark text-warm-white/70 transition-colors duration-300 hover:border-orange hover:text-orange"
                      >
                        {SocialIcon ? (
                          <SocialIcon className="h-[18px] w-[18px]" />
                        ) : (
                          <span className="text-[0.7rem] font-semibold uppercase">{s.label[0]}</span>
                        )}
                        <span className="sr-only">{s.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className="display-sm mb-6 text-warm-white">{t.footer.quickLinks}</h2>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.92rem] text-warm-white/60 transition-colors duration-300 hover:text-orange"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label={t.footer.products}>
            <h2 className="display-sm mb-6 text-warm-white">{t.footer.products}</h2>
            <ul className="flex flex-col gap-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products#${p.slug}`}
                    className="text-[0.92rem] text-warm-white/60 transition-colors duration-300 hover:text-orange"
                  >
                    {p.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="display-sm mb-6 text-warm-white">{t.footer.contact}</h2>
            <ul className="flex flex-col gap-4 text-[0.92rem] text-warm-white/60">
              <li className="flex gap-3">
                <Icon d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" circle />
                <address className="not-italic leading-relaxed">
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                  <br />
                  {contact.address.city}, {contact.address.country}
                </address>
              </li>
              <li className="flex gap-3">
                <Icon d="M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L15 13l4 1.5V18a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 3.2 6.2 2 2 0 0 1 5 4Z" />
                <a href={contact.phone.href} dir="ltr" className="transition-colors hover:text-orange">
                  {contact.phone.display}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon d="M3 5h18v14H3zM3 6l9 6 9-6" />
                <a href={contact.email.href} dir="ltr" className="break-all transition-colors hover:text-orange">
                  {contact.email.display}
                </a>
              </li>
              <li className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-orange"
                >
                  {t.common.chatWhatsApp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-7 text-[0.78rem] text-warm-white/40 sm:flex-row">
          <p>
            © {year} {site.legalName}. {t.footer.rights}
          </p>
          <p>{t.footer.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
