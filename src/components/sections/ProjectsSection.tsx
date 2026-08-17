"use client";

import { useLocale } from "@/components/i18n/LanguageProvider";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getProjects } from "@/content/localized";
import { getDictionary } from "@/i18n";

/**
 * Shared Projects section — rendered identically on Home and About Us.
 * There is deliberately no standalone /projects page.
 */
export function ProjectsSection({ variant = "home" }: { variant?: "home" | "about" }) {
  const locale = useLocale();
  const d = getDictionary(locale);
  const t = d.projects;
  const projects = getProjects(locale);
  return (
    <section className="section-y bg-near-black">
      <Container size="wide">
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={variant === "about" ? t.eyebrowAbout : t.eyebrowHome} tone="light" size="lg" accent={t.headingAccent}>
            {t.headingBefore}
          </SectionHeading>
          <div className="flex max-w-[38ch] flex-col items-start gap-6">
            <p className="text-warm-white/60">{variant === "about" ? t.introAbout : t.introHome}</p>
            <Button href={"/contact"} variant="outline-dark">
              {d.common.discussProject}
            </Button>
          </div>
        </div>

        <ul className="mt-12 grid gap-px border border-line-dark bg-[rgba(247,245,240,0.14)] sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {projects.map((project, i) => (
            <li
              key={project.id}
              className="reveal group relative bg-near-black"
              data-reveal-delay={i * 90}
            >
              <article>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="scrim-bottom absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-65"
                  />
                  <span className="absolute left-5 top-5 text-[0.7rem] font-semibold tabular-nums tracking-[0.18em] text-warm-white/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 px-5 py-6">
                  <div>
                    <h3 className="display-sm text-warm-white">{project.title}</h3>
                    <p className="mt-2 text-[0.82rem] text-warm-white/50">
                      {project.scope}
                      {project.location && ` · ${project.location}`}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 h-px w-8 shrink-0 bg-orange transition-[width] duration-500 ease-[var(--ease-brand)] group-hover:w-12"
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
