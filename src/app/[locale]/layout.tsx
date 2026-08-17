import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Barlow_Condensed, Inter, Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/util/Reveal";
import { site } from "@/content/site";
import { getDictionary } from "@/i18n";
import { dirOf, isLocale, locales, type Locale } from "@/i18n/config";
import "../globals.css";

/* --- Latin type: the approved brand pairing --------------------------------- */
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

/* --- Arabic type ------------------------------------------------------------
   Barlow Condensed and Inter carry no Arabic glyphs, so Arabic would fall back
   to a system font and break the type hierarchy. Cairo mirrors the heavy,
   architectural display voice; IBM Plex Sans Arabic mirrors Inter's body tone.
   These only take effect under [lang="ar"] (see globals.css).                  */
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active: Locale = isLocale(locale) ? locale : "en";
  const isAr = active === "ar";

  return {
    metadataBase: new URL(site.url),
    title: {
      default: isAr ? "الغازي للفيلم الذكي — تقنية الخصوصية الذكية" : `${site.name} — ${site.tagline}`,
      template: isAr ? `%s — الغازي للفيلم الذكي` : `%s — ${site.name}`,
    },
    description: getDictionary(active).footer.description,
    alternates: {
      canonical: `/${active}`,
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_AE" : "en_AE",
      siteName: site.name,
      description: getDictionary(active).footer.description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#111315",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const fonts = `${barlowCondensed.variable} ${inter.variable} ${cairo.variable} ${plexArabic.variable}`;

  return (
    // suppressHydrationWarning: the inline script below adds `js` to this
    // element before React hydrates, which is an expected className mismatch.
    <html lang={locale} dir={dirOf(locale)} className={fonts} suppressHydrationWarning>
      <head>
        {/*
          Marks scripting as available before first paint. Scroll reveals are
          gated on this, so content stays visible if JS is off or fails.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }}
        />
      </head>
      <body className="antialiased">
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <Reveal />
      </body>
    </html>
  );
}
