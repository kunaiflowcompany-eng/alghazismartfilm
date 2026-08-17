import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { PrivacyExperience } from "@/components/sections/PrivacyExperience";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { ApplicationsSection } from "@/components/sections/ApplicationsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { isLocale } from "@/i18n/config";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Hero locale={locale} />
      <WhoWeAre locale={locale} />
      <PrivacyExperience locale={locale} />
      <ProductsSection locale={locale} />
      <ClientsSection locale={locale} />
      <ApplicationsSection locale={locale} />
      <ProcessSection locale={locale} />
      <ProjectsSection locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
