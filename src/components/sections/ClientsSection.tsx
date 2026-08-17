import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clients, type Client } from "@/content/clients";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/**
 * Trust wall.
 *
 * The section reads dark (design-system charcoal band) while the logos sit on a
 * warm-white inset panel. Supplied logos are full-colour artwork on white; this
 * keeps every mark in its correct colours instead of forcing a monochrome
 * treatment that would flatten EMAAR, The Dubai Mall and HMS Mirdif.
 */
/**
 * Number of identical logo sets on each track.
 *
 * One set is only ~1500px wide, so two copies left the trailing edge empty on
 * displays wider than that. Four copies keep the row filled to ~4500px while the
 * animation still advances exactly one set per cycle.
 *
 * Paired with the `-25%` end position in the `marquee` keyframes — change both
 * together or the loop will jump.
 */
const MARQUEE_COPIES = 4;

/**
 * One scrolling row.
 *
 * Each set carries trailing padding equal to its own inner gap, so the track is
 * exactly MARQUEE_COPIES periods wide and translating one period lands the next
 * set precisely where the previous began — no visible jump or gap.
 */
function LogoRow({
  items,
  direction,
  label,
}: {
  items: Client[];
  direction: "ltr" | "rtl";
  label: string;
}) {
  return (
    <div className="marquee relative overflow-hidden py-5 lg:py-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-warm-white to-transparent lg:w-24"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-warm-white to-transparent lg:w-24"
      />

      <div
        className={`flex w-max ${
          direction === "ltr" ? "marquee-track-reverse" : "marquee-track"
        }`}
      >
        {Array.from({ length: MARQUEE_COPIES }, (_, copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center gap-12 pr-12 lg:gap-16 lg:pr-16"
            aria-hidden={copy > 0}
            aria-label={copy === 0 ? label : undefined}
          >
            {items.map((client) => (
              <li key={`${client.slug}-${copy}`} className="shrink-0">
                <Image
                  src={client.src}
                  alt={copy === 0 ? client.name : ""}
                  aria-hidden={copy > 0}
                  width={200}
                  height={90}
                  className="h-10 w-auto max-w-[9rem] object-contain opacity-80 grayscale-[0.12] transition-[opacity,filter] duration-500 ease-[var(--ease-brand)] hover:opacity-100 hover:grayscale-0 lg:h-12 lg:max-w-[10.5rem]"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function ClientsSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).clients;
  // Exactly two rows, split down the middle
  const half = Math.ceil(clients.length / 2);
  const topRow = clients.slice(0, half);
  const bottomRow = clients.slice(half);

  return (
    <section className="section-y bg-charcoal">
      <Container size="wide">
        <div className="reveal flex flex-col items-center gap-5 text-center">
          <SectionHeading eyebrow={t.eyebrow} tone="light" align="center" size="lg" accent={t.headingAccent}>
            {t.headingBefore}
          </SectionHeading>
          <p className="lead max-w-[54ch] text-warm-white/55">{t.lead}</p>
        </div>
      </Container>

      {/* Full-bleed band — the rows span the whole section width, with no
          container, no rounded panel and no framing around individual logos.
          The light ground is what keeps dark marks (EMAAR, OMNIYAT, DAMAC)
          legible against the charcoal section. */}
      <div className="reveal mt-12 w-full bg-warm-white py-5 lg:mt-16 lg:py-7">
        {/* Top row travels left → right, bottom row right → left */}
        <LogoRow items={topRow} direction="ltr" label={t.rowOne} />
        <LogoRow items={bottomRow} direction="rtl" label={t.rowTwo} />
      </div>
    </section>
  );
}
