import { PageHero } from "@/components/sections/PageHero";
import { ApplicationsDetail } from "@/components/sections/ApplicationsDetail";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Applications — Residential, Office, Healthcare & Retail",
  description:
    "Where switchable privacy glass is used: villas and penthouses, boardrooms and offices, hospital consultation rooms, showrooms and hotel lobbies across the UAE.",
  path: "/applications",
  image: "/media/img/hero-applications.webp",
});

export default function ApplicationsPage() {
  return (
    <>
      <PageHero page="applications" image="/media/img/hero-applications.webp" />
      <ApplicationsDetail />
      <FinalCta variant="applications" />
    </>
  );
}
