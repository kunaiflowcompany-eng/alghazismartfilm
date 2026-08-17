/**
 * English UI strings — the source dictionary.
 *
 * Every string rendered by a component lives here. `ar.ts` must mirror this
 * shape exactly; TypeScript enforces it via the `Dictionary` type.
 *
 * Product names, "PDLC" and "Interior PPF" stay in Latin script in both
 * languages, per the brand's own product naming.
 */
export const en = {
  nav: {
    home: "Home",
    about: "About Us",
    products: "Products",
    applications: "Applications",
    contact: "Contact Us",
  },

  common: {
    getQuote: "Get a Quote",
    chatWhatsApp: "Chat on WhatsApp",
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    whatsappAria: "Chat with Al Ghazi Smart Film on WhatsApp",
    homeAria: "Al Ghazi Smart Film — home",
    exploreProduct: "Explore product",
    exploreAllProducts: "Explore all products",
    allApplications: "All applications",
    discussProject: "Discuss your project",
    discussSpace: "Discuss this space",
    requestQuote: "Request a quote",
    seeItInPlace: "See it in place",
    moreAboutUs: "More about us",
    languageLabel: "Language",
  },

  hero: {
    eyebrow: "Instant Privacy · Modern Living",
    titleBefore: "Smart glass & ",
    titleAccent: "smart film",
    titleAfter: " solutions for modern spaces",
    lead: "Switchable privacy, UV and heat control, and premium comfort across residential, commercial and corporate interiors in the UAE — all with a touch.",
    stats: [
      { v: "6 ms", k: "Switch speed" },
      { v: "99.5%", k: "UV block" },
      { v: "5 W/m²", k: "Power draw" },
      { v: "90%", k: "Light transmittance" },
    ],
  },

  whoWeAre: {
    eyebrow: "Who We Are",
    headingBefore: "Redefining spaces with ",
    headingAccent: "Smart Privacy",
    headingAfter: " Technology",
    p1: "We supply and install switchable smart glass and PDLC smart film across the UAE — for homes, offices and commercial spaces.",
    p2: "Conventional glass forces a trade-off: privacy, or the blinds and curtains that spoil a clean interior. Smart film removes it, giving glass an inbuilt privacy system you switch on in an instant.",
    imageAlt: "Al Ghazi technicians laminating smart film onto glass in the company workshop",
    capabilities: [
      { title: "Instant Privacy", body: "Clear to private in 6 milliseconds — no blinds, no curtains, no waiting." },
      { title: "UV & Heat Protection", body: "99.5% UV block reduces glare and protects interior finishes from fading." },
      { title: "Premium Quality", body: "High-performance PDLC film with up to a 5-year warranty and no moving parts." },
      { title: "Smart Integration", body: "Works with home and building automation — 0–10 V, DMX and RS485 available." },
    ],
  },

  privacy: {
    eyebrow: "See the difference",
    headingBefore: "One touch. Complete ",
    headingAccent: "Privacy.",
    lead: "The same villa, the same glazing, one instruction. Drag the divider to move between states, or switch it yourself.",
    clear: "Clear",
    private: "Private",
    sliderLabel: "Reveal the clear glass state",
    groupLabel: "Glass privacy state",
    noteBefore: "Switching takes ",
    noteStrong: "6 milliseconds",
    noteAfter: ".",
    valueText: "% clear",
    clearAlt: "The same villa glazing in the clear state, fully transparent",
    frostedAlt: "Villa glazing switched to the private state, fully obscured",
  },

  productsSection: {
    eyebrow: "Our Products",
    headingBefore: "Advanced solutions for ",
    headingAccent: "Every Need",
    lead: "Switchable glazing, retrofit film, applied graphics and surface protection — specified, supplied and installed by one team.",
  },

  clients: {
    eyebrow: "Trusted across the UAE",
    headingBefore: "Our clients & ",
    headingAccent: "Partners",
    lead: "Developers, hospitality groups, healthcare providers and public venues that have specified Al Ghazi film and glass.",
    rowOne: "Clients and partners, part one",
    rowTwo: "Clients and partners, part two",
  },

  applicationsSection: {
    eyebrow: "Designed for every environment",
    headingBefore: "Where innovation meets ",
    headingAccent: "Everyday Life",
    lead: "One technology, four very different briefs — from a family villa to a hospital consultation room.",
  },

  process: {
    eyebrow: "Our Process",
    headingBefore: "Three easy ",
    headingAccent: "Steps",
    steps: [
      {
        title: "Tell us your need",
        body: "Share the space, the glazing and what you need it to do. A photograph and rough dimensions are enough to start.",
      },
      {
        title: "Expert consultation",
        body: "We recommend the right product — switchable glass, retrofit film, applied graphics or surface protection — and quote against your glazing.",
      },
      {
        title: "Professional installation",
        body: "Our own team installs on site, concealing wiring and busbars behind frames and trims for a finished, uniform result.",
      },
    ],
  },

  projects: {
    eyebrowHome: "Our Projects",
    eyebrowAbout: "Our Work",
    headingBefore: "Projects that define our ",
    headingAccent: "Standards",
    introHome: "A selection of installations across offices, meeting rooms and private interiors in the UAE.",
    introAbout: "Installations delivered across offices, meeting rooms and private interiors in the UAE.",
  },

  finalCta: {
    home: {
      before: "Ready to ",
      accent: "transform",
      after: " your space?",
      body: "Tell us about your glazing and we will come back with the right product and a quotation.",
    },
    products: {
      before: "Not sure ",
      accent: "which product",
      after: " fits?",
      body: "Send us a photograph of the glazing and rough dimensions. We will tell you what will work and what it will cost.",
    },
    applications: {
      before: "Have ",
      accent: "a space",
      after: " in mind?",
      body: "Tell us what the room needs to do and we will specify the right product for it.",
    },
    about: {
      before: "Let's talk about ",
      accent: "your space",
      after: ".",
      body: "Whether it is a single partition or a full floor, we will specify it properly.",
    },
  },

  footer: {
    quickLinks: "Quick Links",
    products: "Products",
    contact: "Contact Us",
    rights: "All rights reserved.",
    tagline: "Smart glass · Smart film · Surface protection · United Arab Emirates",
    description:
      "Al Ghazi Smart Film supplies and installs switchable smart glass, PDLC smart film, frosted sticker film and interior surface protection film for residential, commercial and corporate spaces across the UAE.",
  },

  pageHero: {
    about: {
      eyebrow: "About Us",
      title: "The specialist in ",
      accent: "switchable glass",
      intro: "Al Ghazi Smart Film brings instant privacy, light control and surface protection to modern interiors across the United Arab Emirates.",
      alt: "The Al Ghazi team preparing a glass panel in the workshop",
    },
    products: {
      eyebrow: "Our Products",
      title: "Advanced solutions for ",
      accent: "every need",
      intro: "Switchable glazing, retrofit privacy film, applied graphics and interior surface protection — one range, one installation team.",
      alt: "An office glass partition fitted with smart film in the private state",
    },
    applications: {
      eyebrow: "Applications",
      title: "Where innovation meets ",
      accent: "everyday life",
      intro: "The same switchable technology, applied to four very different briefs.",
      alt: "A hotel lobby with switchable glass partitions to the meeting rooms",
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Get a ",
      accent: "quote",
      intro: "Tell us about the space. We will recommend the right product and come back with a price.",
      alt: "An Al Ghazi team member taking a call at the office",
    },
  },

  productDetail: {
    keyBenefits: "Key benefits",
    specifications: "Specifications",
    whereUsed: "Where it is used",
    chooseTint: "Choose a film tint",
    productIndex: "Product index",
  },

  about: {
    story: {
      eyebrow: "Our Story",
      headingBefore: "Changing the ",
      headingAccent: "privacy landscape",
      p1: "An essential contemporary design element, glass separates interior spaces without blocking natural light or obstructing your view.",
      p2: "There are trade-offs, however. Conventional glass sacrifices privacy, or it requires blinds, curtains and roller shades that detract from an otherwise pristine aesthetic — and that collect dirt and dust while they do it.",
      p3: "Smart film radically changes that. It gives glass an inbuilt privacy system that can be activated or turned off with the flick of a switch. Going from clear glass to translucent becomes as easy as turning on a light. With no pulleys, strings, fixtures or chains, there is nothing to wear out, tangle up or get stuck.",
      p4: "We supply and install that technology across the UAE — as laminated smart glass in new glazing, as retrofit film on glass that is already in place, and alongside frosted graphics and interior surface protection.",
      ctaProducts: "Explore our products",
      ctaContact: "Talk to us",
      imageAlt: "The Al Ghazi Smart Film team at the company office",
    },
    strengths: {
      eyebrow: "Why Al Ghazi",
      headingBefore: "A team that ",
      headingAccent: "does one thing well",
      intro: "Everything we install is a variation on the same idea: control what glass shows, and protect the surfaces around it.",
      items: [
        {
          title: "Specialists, not generalists",
          body: "Switchable glass and film is what we do. That focus is why our installations are clean and our advice is specific to your glazing.",
        },
        {
          title: "Supply and install in-house",
          body: "One team surveys, specifies and installs — so wiring, busbars and trims are resolved on site rather than left to another trade.",
        },
        {
          title: "Built on PDLC technology",
          body: "High-performance polymer dispersed liquid crystal film, engineered for millions of switching cycles and continuous operation.",
        },
        {
          title: "Working across the UAE",
          body: "Villas, corporate floors, hospitals, hotels and public venues — residential through to large commercial fit-outs.",
        },
      ],
    },
    owner: {
      eyebrow: "Leadership",
      placeholderLabel: "Owner photo",
      placeholderHint: "Add a portrait and set owner.photo in content/site.ts",
    },
  },

  contact: {
    formEyebrow: "Request a quotation",
    formHeadingBefore: "Five fields. That is ",
    formHeadingAccent: "all we need.",
    directEyebrow: "Direct",
    directHeading: "Talk to us now",
    call: "Call",
    office: "Office",
    phone: "Phone",
    whatsapp: "WhatsApp",
    email: "Email",
    hours: "Opening hours",
    followUs: "Follow us",
    mapEyebrow: "Find us",
    mapHeadingBefore: "Our ",
    mapHeadingAccent: "location",
    openInMaps: "Open in Google Maps",
    mapTitle: "Al Ghazi Smart Film office location on Google Maps",
    hoursRows: [
      { days: "Monday – Saturday", time: "9:00 – 18:00" },
      { days: "Sunday", time: "Closed" },
    ],
  },

  form: {
    name: "Name",
    phone: "Phone",
    email: "Email",
    product: "Select product",
    message: "Message",
    namePlaceholder: "Your full name",
    phonePlaceholder: "+971 __ ___ ____",
    emailPlaceholder: "you@company.com",
    choose: "Choose a product",
    messagePlaceholder:
      "Tell us about the glazing — where it is, roughly how large, and what you need it to do.",
    send: "Send request",
    sending: "Sending…",
    idle: "We reply to every enquiry.",
    success: "Thank you — your request has been received. Our team will be in touch shortly.",
    error: "Sorry, that did not send. Please try again, or reach us on WhatsApp.",
  },

  notFound: {
    eyebrow: "Error 404",
    titleBefore: "This page is ",
    titleAccent: "not clear",
    body: "The page you were looking for does not exist. Let us switch you back to something visible.",
    home: "Back to home",
    products: "View products",
  },
};

export type Dictionary = typeof en;
