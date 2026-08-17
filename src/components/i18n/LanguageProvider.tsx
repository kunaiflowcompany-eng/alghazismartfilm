"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { defaultLocale, dirOf, isLocale, type Locale } from "@/i18n/config";

/**
 * Client-side language state.
 *
 * URLs are locale-free (`/products`, never `/en/products`), so the active
 * language lives here rather than in the route. English is what the server
 * renders and what search engines index; a returning visitor's Arabic choice is
 * restored from localStorage.
 *
 * Implemented as an external store via `useSyncExternalStore` — that is the
 * React-sanctioned way to read browser state without a setState-in-effect.
 */

const STORAGE_KEY = "ag-locale";

const listeners = new Set<() => void>();
let cached: Locale | null = null;

function readStored(): Locale {
  if (cached) return cached;
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    stored = null;
  }
  cached = stored && isLocale(stored) ? stored : defaultLocale;
  return cached;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

/** Applies language + direction to <html>. Nothing else is touched. */
function applyToDocument(locale: Locale) {
  const el = document.documentElement;
  el.lang = locale;
  el.dir = dirOf(locale);
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, readStored, () => defaultLocale);
}

export function useLanguage(): { locale: Locale; setLocale: (next: Locale) => void } {
  const locale = useLocale();

  const setLocale = useCallback((next: Locale) => {
    cached = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — language still applies for this session */
    }
    applyToDocument(next);
    listeners.forEach((l) => l());
  }, []);

  return { locale, setLocale };
}

/**
 * Keeps <html lang/dir> in step with the active language. The bootstrap script
 * below already handles the pre-paint case; this covers hydration and switches.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  useEffect(() => {
    applyToDocument(locale);
  }, [locale]);

  return <>{children}</>;
}

/**
 * Runs before first paint so a returning Arabic visitor never sees a
 * left-to-right flash while React hydrates.
 */
export const localeBootstrapScript = `(function(){try{var l=localStorage.getItem('${STORAGE_KEY}');if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl';}}catch(e){}})();`;
