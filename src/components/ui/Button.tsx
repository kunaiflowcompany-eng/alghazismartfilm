import Link from "next/link";
import { cn } from "@/lib/cn";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type Variant = "primary" | "outline" | "outline-dark" | "ghost" | "whatsapp";
type Size = "md" | "lg";

/*
 * NOTE: `base` below sets `inline-flex`. Do not pass display utilities such as
 * `hidden` through `className` — they carry the same specificity and Tailwind's
 * output order decides the winner, so the button stays visible. Wrap the button
 * in an element that carries the responsive display instead.
 */

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-xs font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] " +
  "transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-brand)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary: "bg-orange text-white hover:bg-orange-hover",
  // For light (warm white) surfaces
  outline: "border border-line-strong text-ink hover:border-charcoal hover:bg-charcoal hover:text-warm-white",
  // For dark surfaces
  "outline-dark":
    "border border-line-dark-strong text-warm-white hover:border-warm-white hover:bg-warm-white hover:text-charcoal",
  ghost: "text-ink hover:text-orange",
  // Official WhatsApp green, used wherever the WhatsApp action appears
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-hover",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6",
  lg: "h-[3.25rem] px-8",
};

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-3 w-3 shrink-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1"
    >
      <path
        d="M1 8h13M9 3l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
    </svg>
  );
}

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
};

export function Button({
  href,
  external,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = true,
  ...rest
}: CommonProps & {
  href: string;
  external?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isWhatsApp = variant === "whatsapp";
  const content = (
    <>
      {isWhatsApp && <WhatsAppIcon className="h-[1.15em] w-[1.15em] shrink-0" />}
      {children}
      {withArrow && !isWhatsApp && <Arrow />}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

export function ButtonSubmit({
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = true,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}

/** Text link with an animated orange rule — used for "Explore product" style actions */
export function TextLink({
  href,
  children,
  className,
  tone = "light",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
        tone === "light" ? "text-orange hover:text-orange-hover" : "text-orange hover:text-white",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-[width] duration-400 ease-[var(--ease-brand)] group-hover:w-full" />
      </span>
      <Arrow />
    </Link>
  );
}
