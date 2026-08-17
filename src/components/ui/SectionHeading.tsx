import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  tone = "orange",
  className,
}: {
  children: React.ReactNode;
  tone?: "orange" | "muted" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "orange" && "text-orange",
        tone === "muted" && "text-ink-soft",
        tone === "light" && "text-warm-white/55",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-current opacity-70" />
      {children}
    </p>
  );
}

/**
 * Section heading. `accent` is rendered in orange — use it for the one word
 * that carries the meaning, never the whole line.
 */
export function SectionHeading({
  eyebrow,
  children,
  accent,
  after,
  tone = "dark",
  align = "left",
  size = "md",
  className,
}: {
  eyebrow?: string;
  children: React.ReactNode;
  accent?: string;
  after?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone === "light" ? "light" : "orange"}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          size === "lg" ? "display-lg" : "display-md",
          tone === "light" ? "text-warm-white" : "text-ink-strong",
          "max-w-[22ch]",
          align === "center" && "max-w-[26ch]",
        )}
      >
        {children}
        {accent && <span className="text-orange">{accent}</span>}
        {after}
      </h2>
    </div>
  );
}

/** Hairline rule — the design system's primary divider */
export function Rule({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <hr
      className={cn(
        "border-0 border-t",
        tone === "light" ? "border-line-dark" : "border-line",
        className,
      )}
    />
  );
}
