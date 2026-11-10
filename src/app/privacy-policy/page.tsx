import { PageHero } from "@/components/sections/PageHero";
import { PrivacyPolicyContent } from "@/components/sections/PrivacyPolicyContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Al Ghazi Smart Film collects, uses, shares and stores the personal information you send us through this website, WhatsApp or a Facebook and Instagram lead form.",
  path: "/privacy-policy",
  image: "/media/img/hero-contact.webp",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero page="privacy" image="/media/img/hero-contact.webp" />
      <PrivacyPolicyContent />
    </>
  );
}
