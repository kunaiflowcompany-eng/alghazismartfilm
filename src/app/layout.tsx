import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/util/Reveal";
import { LanguageProvider, localeBootstrapScript } from "@/components/i18n/LanguageProvider";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/seo";
import { defaultLocale, dirOf } from "@/i18n/config";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — Smart Glass & Smart Film in Dubai, UAE`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#111315",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = `${barlowCondensed.variable} ${inter.variable} ${cairo.variable} ${plexArabic.variable}`;

  return (
    // Server always renders English — that is the indexed language. A returning
    // Arabic visitor's choice is re-applied by the bootstrap script and provider.
    // suppressHydrationWarning: those scripts mutate lang/dir/class before React
    // hydrates, which is an expected mismatch.
    <html
      lang={defaultLocale}
      dir={dirOf(defaultLocale)}
      className={fonts}
      suppressHydrationWarning
    >
      <head>
        {/*
          Marks scripting as available before first paint. Scroll reveals are
          gated on this, so content stays visible if JS is off or fails.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }}
        />
        {/* Restores a stored Arabic choice before paint so there is no LTR flash */}
        <script dangerouslySetInnerHTML={{ __html: localeBootstrapScript }} />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LanguageProvider>
        <Reveal />
      </body>
    </html>
  );
}
