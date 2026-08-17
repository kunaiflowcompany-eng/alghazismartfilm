export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const localeMeta: Record<
  Locale,
  { label: string; name: string; flag: string; short: string }
> = {
  // `name` is what the language selector shows; `label` is the native spelling.
  en: { label: "English", name: "English", flag: "🇺🇸", short: "EN" },
  ar: { label: "العربية", name: "Arabic", flag: "🇦🇪", short: "ع" },
};

/** Prefix an app path with the active locale: ("/about", "ar") → "/ar/about" */
export function localePath(path: string, locale: Locale): string {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}
