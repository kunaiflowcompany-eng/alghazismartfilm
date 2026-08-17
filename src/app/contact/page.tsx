import { PageHero } from "@/components/sections/PageHero";
import { ContactContent } from "@/components/sections/ContactContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us — Ras Al Khor, Dubai",
  description:
    "Talk to Al Ghazi Smart Film in Ras Al Khor, Dubai. Call, WhatsApp or send an enquiry about smart glass, smart film or interior surface protection film.",
  path: "/contact",
  image: "/media/img/hero-contact.webp",
});

export default function ContactPage() {
  return (
    <>
      <PageHero page="contact" image="/media/img/hero-contact.webp" />
      <ContactContent />
    </>
  );
}
