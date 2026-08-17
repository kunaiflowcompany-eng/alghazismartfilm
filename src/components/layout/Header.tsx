"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappHref } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/cn";

export function Header() {
  const locale = useLocale();
  const t = getDictionary(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const nav = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.products, href: "/products" },
    { label: t.nav.applications, href: "/applications" },
    { label: t.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the body while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => {
    const full = href;
    return href === "/" ? pathname === full : pathname.startsWith(full);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:bg-orange focus:px-4 focus:py-2 focus:text-[0.75rem] focus:font-semibold focus:uppercase focus:tracking-widest focus:text-white"
      >
        {t.common.skipToContent}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-500 ease-[var(--ease-brand)]",
          scrolled || open
            ? "border-line-dark bg-near-black/95 backdrop-blur-md"
            : "border-transparent bg-gradient-to-b from-near-black/70 to-transparent",
        )}
      >
        <Container size="wide">
          <div className="flex h-[72px] items-center justify-between gap-4 lg:h-[84px] lg:gap-6">
            <Link href={"/"} aria-label={t.common.homeAria} className="shrink-0">
              <Image
                src="/media/brand/logo-full-ondark.png"
                alt="Al Ghazi Smart Film"
                width={340}
                height={340}
                priority
                className="h-11 w-auto lg:h-[52px]"
              />
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-7 xl:gap-9">
                {nav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "relative py-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                          active ? "text-orange" : "text-warm-white/85 hover:text-warm-white",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute -bottom-0.5 start-0 h-px bg-orange transition-[width] duration-400 ease-[var(--ease-brand)]",
                            active ? "w-full" : "w-0",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2.5">
              <span className="hidden md:block">
                <LanguageSwitcher />
              </span>

              <span className="hidden xl:block">
                <Button href={"/contact"} size="md">
                  {t.common.getQuote}
                </Button>
              </span>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.common.whatsappAria}
                className="hidden h-11 w-11 items-center justify-center rounded-xs bg-whatsapp text-white transition-colors duration-300 hover:bg-whatsapp-hover sm:inline-flex"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </a>

              {/* Mobile trigger */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? t.common.closeMenu : t.common.openMenu}
                className="flex h-11 w-11 items-center justify-center rounded-xs border border-line-dark-strong text-warm-white lg:hidden"
              >
                <span className="relative block h-3.5 w-5">
                  <span
                    className={cn(
                      "absolute start-0 block h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-brand)]",
                      open ? "top-1/2 rotate-45" : "top-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute start-0 top-1/2 block h-px w-full bg-current transition-opacity duration-200",
                      open ? "opacity-0" : "opacity-100",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute start-0 block h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-brand)]",
                      open ? "top-1/2 -rotate-45" : "bottom-0",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile drawer */}
      <div id="mobile-nav" hidden={!open} className="fixed inset-0 z-40 bg-near-black lg:hidden">
        <Container className="flex h-full flex-col pt-[92px] pb-10">
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
            <ul className="flex flex-col">
              {nav.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="border-b border-line-dark">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-baseline gap-4 py-5 font-display text-[2rem] font-extrabold uppercase leading-none tracking-tight transition-colors",
                        active ? "text-orange" : "text-warm-white",
                      )}
                    >
                      <span className="eyebrow text-orange/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <div className="flex justify-center md:hidden">
              <LanguageSwitcher />
            </div>
            <Button
              href={"/contact"}
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {t.common.getQuote}
            </Button>
            <Button
              href={whatsappHref}
              external
              variant="whatsapp"
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {t.common.chatWhatsApp}
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
