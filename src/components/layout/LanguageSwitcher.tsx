"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, localeMeta, isLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/**
 * Compact language selector: a single trigger showing the active language,
 * opening a short vertical list of the two options.
 *
 * Switching still works by swapping the locale segment of the current path, so
 * the visitor stays on the same page.
 */
export function LanguageSwitcher({
  locale,
  tone = "dark",
}: {
  locale: Locale;
  tone?: "dark" | "light";
}) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const pathFor = (next: Locale) => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length > 0 && isLocale(parts[0])) parts[0] = next;
    else parts.unshift(next);
    return `/${parts.join("/")}`;
  };

  // Close on outside pointer and on Escape
  useEffect(() => {
    if (!open) return;

    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = localeMeta[locale];
  const dark = tone === "dark";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "inline-flex items-center gap-2 rounded-xs border px-3 py-2 font-sans text-[0.72rem] font-semibold transition-colors duration-300",
          dark
            ? "border-line-dark-strong text-warm-white hover:border-warm-white/60"
            : "border-line text-ink hover:border-line-strong",
        )}
      >
        <span aria-hidden="true" className="text-[0.95rem] leading-none">
          {active.flag}
        </span>
        <span>{active.name}</span>
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className={cn(
            "h-3 w-3 shrink-0 transition-transform duration-300",
            open && "rotate-180",
          )}
        >
          <path d="m3 6 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      </button>

      {open && (
        <ul
          role="menu"
          className={cn(
            "absolute top-[calc(100%+6px)] end-0 z-50 min-w-[10rem] overflow-hidden rounded-xs border py-1 shadow-[0_8px_24px_rgba(17,19,21,0.28)]",
            dark ? "border-line-dark-strong bg-near-black" : "border-line bg-white",
          )}
        >
          {locales.map((code) => {
            const meta = localeMeta[code];
            const isActive = code === locale;
            return (
              <li key={code} role="none">
                <Link
                  role="menuitem"
                  href={pathFor(code)}
                  hrefLang={code}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 font-sans text-[0.72rem] font-semibold transition-colors duration-200",
                    isActive
                      ? "text-orange"
                      : dark
                        ? "text-warm-white/75 hover:bg-warm-white/10 hover:text-warm-white"
                        : "text-ink-muted hover:bg-line/40 hover:text-ink",
                  )}
                >
                  <span aria-hidden="true" className="text-[0.95rem] leading-none">
                    {meta.flag}
                  </span>
                  <span className="flex-1">{meta.name}</span>
                  {isActive && (
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3 shrink-0">
                      <path
                        d="m2.5 8.5 3.5 3.5 7.5-8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                      />
                    </svg>
                  )}
                  <span className="sr-only">{meta.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
