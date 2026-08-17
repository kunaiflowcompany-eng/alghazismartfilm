import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { PrivacyExperience } from "@/components/sections/PrivacyExperience";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { ApplicationsSection } from "@/components/sections/ApplicationsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata, organisationSchema } from "@/lib/seo";
import { contact } from "@/content/site";

export const metadata = buildMetadata({
  title: "Al Ghazi Smart Film — Smart Glass & Smart Film in Dubai, UAE",
  description:
    "Al Ghazi Smart Film supplies and installs switchable smart glass and PDLC smart film across the UAE. Instant privacy at the touch of a switch for homes, offices and commercial spaces.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* Business schema — only facts already published on the site */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema(contact)) }}
      />
      <Hero />
      <WhoWeAre />
      <PrivacyExperience />
      <ProductsSection />
      <ClientsSection />
      <ApplicationsSection />
      <ProcessSection />
      <ProjectsSection />
      <FinalCta />
    </>
  );
}
