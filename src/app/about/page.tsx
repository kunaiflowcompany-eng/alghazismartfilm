import { PageHero } from "@/components/sections/PageHero";
import { AboutContent } from "@/components/sections/AboutContent";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us — Switchable Glass Specialists in the UAE",
  description:
    "Al Ghazi Smart Film specialises in switchable smart glass and PDLC film. We survey, specify and install in-house across villas, offices, hospitals and hotels in the UAE.",
  path: "/about",
  image: "/media/img/hero-about.webp",
});

export default function AboutPage() {
  return (
    <>
      <PageHero page="about" image="/media/img/hero-about.webp" />
      <AboutContent />
      <ProjectsSection variant="about" />
      <ClientsSection />
      <FinalCta variant="about" />
    </>
  );
}
