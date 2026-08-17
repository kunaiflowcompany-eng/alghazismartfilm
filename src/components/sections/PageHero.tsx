import Image from "next/image";
import { AutoVideo } from "@/components/media/AutoVideo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

type Media =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; srcSm: string; poster: string; alt: string };

/** Compact page header used by every page except Home. */
export function PageHero({
  eyebrow,
  title,
  accent,
  after,
  intro,
  media,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  after?: string;
  intro?: string;
  media: Media;
}) {
  return (
    /* Compact full-width banner (~400–480px on desktop), not a full-screen hero */
    <section className="relative isolate flex min-h-[400px] items-center overflow-hidden bg-near-black pb-10 pt-28 sm:min-h-[430px] lg:min-h-[470px] lg:pb-12 lg:pt-32">
      {media.kind === "video" ? (
        <div className="absolute inset-0 -z-10">
          <AutoVideo
            eager
            src={media.src}
            srcSm={media.srcSm}
            poster={media.poster}
            alt={media.alt}
            className="h-full w-full"
          />
        </div>
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
      )}

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-near-black/50 lg:hidden" />
      <div aria-hidden="true" className="scrim-left absolute inset-0 -z-10 hidden lg:block" />

      <Container size="wide">
        <div className="max-w-[46rem]">
          <Eyebrow tone="light" className="mb-6">
            {eyebrow}
          </Eyebrow>
          <h1 className="display-lg text-warm-white">
            {title}
            {accent && <span className="text-orange">{accent}</span>}
            {after}
          </h1>
          {intro && <p className="lead mt-6 max-w-[52ch] text-warm-white/70">{intro}</p>}
        </div>
      </Container>
    </section>
  );
}
