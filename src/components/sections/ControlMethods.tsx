"use client";

import Image from "next/image";
import { useLocale } from "@/components/i18n/LanguageProvider";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/cn";

/**
 * Control methods for the switchable products — mobile app and smart remote.
 *
 * The two device renders are supplied brand assets, used as-is. They carry
 * their own transparency, so each sits on a small white tile with a hairline
 * edge: the white remote body stays readable on both the warm-white and white
 * section grounds without recolouring the artwork.
 *
 * `card` is the compact form used inside the Home page product cards;
 * `detail` matches the bordered blocks on the Products page.
 */
const methods = [
  { key: "mobileApp", src: "/media/icons/control-mobile-app.png", w: 90, h: 180 },
  { key: "smartRemote", src: "/media/icons/control-smart-remote.png", w: 66, h: 180 },
] as const;

export function ControlMethods({ variant = "detail" }: { variant?: "card" | "detail" }) {
  const locale = useLocale();
  const t = getDictionary(locale).controls;
  const card = variant === "card";

  const items = methods.map((m) => (
    <li key={m.key} className="flex items-center gap-3">
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-xs border border-line bg-white",
          card ? "h-9 w-9" : "h-11 w-11",
        )}
      >
        <Image
          src={m.src}
          alt=""
          width={m.w}
          height={m.h}
          className={cn("w-auto object-contain", card ? "h-6" : "h-7")}
        />
      </span>
      <span
        className={cn(
          "font-semibold uppercase tracking-[0.14em] text-ink-muted",
          card ? "text-[0.68rem]" : "text-[0.72rem]",
        )}
      >
        {t[m.key]}
      </span>
    </li>
  ));

  if (card) {
    return (
      <ul className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-4">
        {items}
      </ul>
    );
  }

  return (
    <div className="flex flex-col gap-4 border-t border-line pt-7">
      <h3 className="eyebrow text-ink-soft">{t.title}</h3>
      <ul className="flex flex-wrap gap-x-9 gap-y-4">{items}</ul>
      <p className="text-[0.88rem] leading-relaxed text-ink-muted">{t.lead}</p>
    </div>
  );
}
