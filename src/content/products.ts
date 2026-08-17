/* ============================================================================
   PRODUCTS
   ----------------------------------------------------------------------------
   Technical specifications below are taken verbatim from the supplied Al Ghazi
   Group company profile PDF. Products without a `specs` block have no supplied
   specification data — do not add numbers here unless they are verified.
   ========================================================================== */

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  /** Short label for compact UI (cards, dropdowns, nav) */
  shortName: string;
  /** Family label — Coloured Smart Film sits inside the Smart Film family */
  family: string;
  summary: string;
  description: string[];
  benefits: string[];
  applications: string[];
  specs?: Spec[];
  badges?: string[];
  media:
    | { kind: "video"; src: string; srcSm: string; poster: string; alt: string }
    | { kind: "image"; src: string; alt: string };
  gallery?: { src: string; alt: string }[];
  /** Enables the colour-variant selector on the Products page */
  colourVariants?: { name: string; hex: string; src: string; alt: string }[];
};

export const products: Product[] = [
  {
    slug: "smart-glass",
    name: "Smart Glass",
    shortName: "Smart Glass",
    family: "Switchable Glazing",
    summary:
      "Laminated switchable glass that turns from clear to private in milliseconds — privacy built into the architecture itself.",
    description: [
      "Smart Glass is a laminated glass product consisting of a Polymer Dispersed Liquid Crystal (PDLC) and Suspended Particle Device (SPD) film sandwiched between two layers of glass and two layers of conductive interlayers.",
      "Because the film is concealed inside the glass unit, the result is a single architectural element with no visible hardware, no moving parts and nothing to maintain.",
    ],
    benefits: [
      "High clarity — the film sits directly between two glass layers for optimal transparency",
      "Suitable for outdoor and commercial settings as privacy and projection screens",
      "Longer lifespan, with the PDLC film fully concealed within the sandwiched glass",
      "Easy to clean, finished with a protective layer of silicon",
      "Seamless integration into the architecture",
    ],
    applications: ["Residential", "Hospitality", "Commercial", "Healthcare", "Retail", "Transportation"],
    badges: ["3 Years Warranty", "Modular Design", "Smart Home Integration"],
    media: {
      kind: "video",
      src: "/media/video/smart-glass.mp4",
      srcSm: "/media/video/smart-glass-sm.mp4",
      poster: "/media/video/smart-glass-poster.jpg",
      alt: "Smart Glass switching from clear to private in a beachfront villa living room",
    },
    gallery: [
      { src: "/media/img/privacy-clear.webp", alt: "Villa glazing in the clear state" },
      { src: "/media/img/privacy-frosted.webp", alt: "The same villa glazing switched to private" },
    ],
  },
  {
    slug: "smart-film",
    name: "Smart Film",
    shortName: "Smart Film",
    family: "Retrofit Privacy",
    summary:
      "Self-adhesive PDLC film that converts your existing glass into switchable privacy glass — installed in place, with no glazing replaced.",
    description: [
      "Your existing glass can be converted to switchable privacy glass with our self-adhesive films. These films have the same switchable properties as laminated privacy glass and are installed by our own team.",
      "Powered by PDLC technology, they transform glass from the moment they are installed onto almost any existing window, partition or door. Films are precisely installed so that all wires and busbars are hidden with frames or other trimming solutions, creating a uniform and finished appearance.",
      "A scratch-resistant coating gives the film durability in daily use.",
    ],
    benefits: [
      "Retrofits onto existing windows, partitions and doors",
      "Instant privacy — no curtains, blinds or roller shades",
      "No moving parts, so nothing to tangle, wear out or get stuck",
      "Easy to clean with an occasional wipe down",
      "Wires and busbars concealed for a finished appearance",
    ],
    applications: ["Corporate offices", "Meeting rooms", "Residential", "Healthcare", "Retail"],
    specs: [
      { label: "Maximum size", value: "1.8 × 6 metres" },
      { label: "Minimum size", value: "200 mm × 200 mm" },
      { label: "Power consumption", value: "5 W / m²" },
      { label: "Light transmittance", value: "90% total" },
      { label: "UV block", value: "99.5%" },
      { label: "Switch speed", value: "6 ms" },
    ],
    badges: ["5 Years Warranty", "Custom Design", "Smart Home Integration"],
    media: {
      kind: "video",
      src: "/media/video/smart-film.mp4",
      srcSm: "/media/video/smart-film-sm.mp4",
      poster: "/media/video/smart-film-poster.jpg",
      alt: "Smart Film switching an office glass partition from clear to opaque",
    },
  },
  {
    slug: "coloured-smart-film",
    name: "Coloured Smart Film",
    shortName: "Coloured Smart Film",
    family: "A Smart Film variant",
    summary:
      "The same switchable technology in a range of architectural tints — privacy, shading and colour as one design decision.",
    description: [
      "Coloured Smart Film belongs to the Smart Film family and shares its switchable behaviour. Instead of switching between clear and white, it switches between clear and a saturated architectural tint.",
      "Segmenting and patterning allow privacy to be controlled in selected areas of a single glass panel — so you can screen part of a partition, embed a logo or slogan, or build stripes and other decorative treatments into the glazing.",
    ],
    benefits: [
      "Ultra-low haze",
      "18 million+ on/off cycles and 10,000 constant “on” hours with no need for a break",
      "Compatible for lamination with any type of glass, large panels and curved glass",
      "Segmenting and patterning allows privacy control in selected areas of glass",
      "Controller prevents burnout, and allows glass to be kept on 24/7",
      "0–10 V, DMX or RS485 integration available for home automation systems",
    ],
    applications: ["Corporate branding", "Executive offices", "Hospitality", "Feature partitions"],
    media: {
      kind: "image",
      src: "/media/img/colour-graphite.webp",
      alt: "Coloured Smart Film partition in a penthouse office overlooking the Dubai skyline",
    },
    colourVariants: [
      {
        name: "Graphite",
        hex: "#3a3f45",
        src: "/media/img/colour-graphite.webp",
        alt: "Penthouse glass partition tinted graphite",
      },
      {
        name: "Bronze",
        hex: "#8a6236",
        src: "/media/img/colour-bronze.webp",
        alt: "Penthouse glass partition tinted bronze",
      },
      {
        name: "Emerald",
        hex: "#0f6b52",
        src: "/media/img/colour-emerald.webp",
        alt: "Penthouse glass partition tinted emerald green",
      },
      {
        name: "Sapphire",
        hex: "#1d4f86",
        src: "/media/img/colour-sapphire.webp",
        alt: "Penthouse glass partition tinted sapphire blue",
      },
    ],
  },
  {
    slug: "frosted-sticker-film",
    name: "Frosted Sticker Film",
    shortName: "Frosted Sticker Film",
    family: "Applied Graphics",
    summary:
      "Permanent frosted graphics applied to glass — for privacy, wayfinding, safety marking and branded partitions.",
    description: [
      "Frosted Sticker Film is applied directly to existing glass to create a permanently obscured surface. It is cut to your design, so a single partition can carry a full frost, a banded privacy zone, a geometric pattern or your identity.",
      "It is the practical choice where privacy does not need to switch: reception glazing, meeting-room bands, stairwell balustrades and decorative screens.",
    ],
    benefits: [
      "Cut to any custom design, pattern or logo",
      "Diffuses sightlines while letting daylight through",
      "Applied to existing glass with no glazing replaced",
      "Doubles as manifestation marking on full-height glass",
      "A cost-effective route to permanent privacy",
    ],
    applications: ["Reception glazing", "Meeting rooms", "Hotel lobbies", "Retail", "Balustrades"],
    media: {
      kind: "image",
      src: "/media/img/frosted-install.webp",
      alt: "Al Ghazi installer applying a geometric frosted film pattern to an office glass partition",
    },
    gallery: [
      {
        src: "/media/img/frosted-geometric.webp",
        alt: "Frosted sticker film in a geometric pattern across an office glass partition",
      },
      {
        src: "/media/img/frosted-botanical.webp",
        alt: "Decorative botanical frosted film on curved glass screens in a hotel lobby",
      },
    ],
  },
  {
    slug: "surface-protection-film",
    name: "Surface Protection Film (Interior PPF)",
    shortName: "Surface Protection Film",
    family: "Interior PPF",
    summary:
      "A virtually invisible protective layer for marble, stone, timber and high-touch interior surfaces.",
    description: [
      "Interior paint protection film is applied over finished surfaces to take the daily wear that would otherwise reach the material underneath — kitchen islands, reception desks, dining tables, joinery and lift lobbies.",
      "The film is optically clear, so the stone veining, timber grain or lacquer finish reads exactly as the designer intended.",
    ],
    benefits: [
      "Shields against scratches, scuffs and surface staining",
      "Optically clear — the original finish stays visible",
      "Applied on site to finished interiors",
      "Suited to high-traffic and high-touch surfaces",
      "Protects the value of specified stone and joinery",
    ],
    applications: ["Kitchen surfaces", "Reception desks", "Dining tables", "Joinery", "Hospitality interiors"],
    media: {
      kind: "image",
      src: "/media/img/ppf-install.webp",
      alt: "Al Ghazi technicians applying interior surface protection film to a marble table",
    },
    gallery: [
      { src: "/media/img/ppf-kitchen.webp", alt: "Protected marble kitchen island in a Dubai penthouse" },
      { src: "/media/img/ppf-reception.webp", alt: "Protected reception desk in a waterfront lobby" },
    ],
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

/** Options for the Get a Quote "Select Product" field */
export const productOptions = products.map((p) => p.name);
