/* ============================================================================
   SITE-WIDE CONTENT & CONTACT DETAILS
   ----------------------------------------------------------------------------
   This is the single place to edit brand, contact and navigation content.

   ⚠ CONTACT DETAILS — PLEASE VERIFY BEFORE GOING LIVE
   Address and phone below are taken verbatim from the supplied Al Ghazi Group
   company profile PDF (page 14). Items marked NEEDS_CONFIRMATION were not
   present in any supplied asset and are placeholders.
   See CONTENT-TO-CONFIRM.md in the project root.
   ========================================================================== */

export const site = {
  name: "Al Ghazi Smart Film",
  legalName: "Al Ghazi Smart Film",
  tagline: "Smart Privacy Technology for Modern Spaces",
  description:
    "Al Ghazi Smart Film supplies and installs switchable smart glass, PDLC smart film, frosted sticker film and interior surface protection film for residential, commercial and corporate spaces across the UAE.",
  url: "https://alghazismartfilm.com",
};

export const contact = {
  /** Source: official Al Ghazi Smart Film brand poster (contact strip) */
  address: {
    line1: "Office No. 13B",
    line2: "Ras Al Khor Industrial Area 2",
    city: "Dubai",
    country: "United Arab Emirates",
  },
  /** Source: official Al Ghazi Smart Film brand poster + banner */
  phone: {
    display: "+971 54 247 5540",
    href: "tel:+971542475540",
  },
  /** NEEDS_CONFIRMATION — assumed same line as the phone number above */
  whatsapp: {
    display: "+971 54 247 5540",
    number: "971542475540",
    message: "Hello Al Ghazi Smart Film, I would like to request a quotation.",
  },
  /**
   * NEEDS_CONFIRMATION — the brand poster shows the website (alghazismartfilm.com)
   * but no email address. The account email seen in supplied assets is
   * alghazismartfilm@gmail.com; info@alghazismartfilm.com is the assumed
   * business address. Confirm which should be published.
   */
  email: {
    display: "info@alghazismartfilm.com",
    href: "mailto:info@alghazismartfilm.com",
  },
  /** NEEDS_CONFIRMATION — trading hours were not supplied in any asset */
  hours: [
    { days: "Monday – Saturday", time: "9:00 – 18:00" },
    { days: "Sunday", time: "Closed" },
  ],
  /**
   * The brand poster shows Facebook, Instagram and LinkedIn icons but no URLs.
   * The Instagram handle appears as @alghazismartfilm in supplied assets.
   * Add the full URLs here and the icons will appear in the footer.
   */
  social: [
    /** Handle @alghazismartfilm, taken from the supplied account screenshot */
    { label: "Instagram", href: "https://www.instagram.com/alghazismartfilm" },
    /** Page URL supplied by the client */
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61592985217760" },
    { label: "LinkedIn", href: "" },
  ],
};

/** Google Maps place for the office — link supplied by the client */
export const mapsLink = "https://maps.app.goo.gl/Nd4tXT4aBYjoUiuh9";
export const mapsEmbed =
  "https://www.google.com/maps?q=25.1797295,55.3521215&hl=en&z=16&output=embed";

export const whatsappHref = `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(
  contact.whatsapp.message,
)}`;

/* ----------------------------------------------------------------------------
   OWNER / LEADERSHIP — ⚠ EDITABLE PLACEHOLDER
   No owner name, title, portrait or quote was supplied with the project assets.
   Fill these in and drop a portrait at public/media/brand/owner.jpg, then set
   `photo` to "/media/brand/owner.jpg". While `photo` is empty the About page
   renders a clearly-marked placeholder panel instead of a broken image.
   -------------------------------------------------------------------------- */
export const owner = {
  name: "Ankit Kumar",
  role: "Founder & Managing Director",
  photo: "/media/brand/owner.webp",
  /** No pull-quote was supplied. While this is empty the quote line is hidden. */
  quote: "",
  bio: "Ankit Kumar is the Founder and Managing Director of AL GHAZI SMART FILM, with over 5 years of experience in the smart glass industry. His work focuses on delivering modern privacy and smart glass solutions with a strong emphasis on quality and precision. He has worked across multiple international markets and brings extensive practical experience to the company.",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "Contact Us", href: "/contact" },
] as const;
