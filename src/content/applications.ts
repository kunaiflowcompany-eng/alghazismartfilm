/* ============================================================================
   APPLICATIONS — where the technology is used.
   Each entry is backed by a supplied Al Ghazi video asset.
   ========================================================================== */

export type Application = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  detail: string[];
  points: string[];
  video: { src: string; srcSm: string; poster: string; alt: string };
};

export const applications: Application[] = [
  {
    slug: "residential",
    name: "Residential",
    headline: "Privacy without losing the view",
    summary:
      "Villas, penthouses and family homes where floor-to-ceiling glazing is the point — and privacy still has to be instant.",
    detail: [
      "In a home, glass is what makes the space feel open. Curtains and blinds solve privacy by taking that away, and they collect dust while they do it.",
      "Switchable glazing keeps the architecture intact. Living areas, bedrooms, bathrooms and poolside glazing move from open to private in a moment, and back again.",
    ],
    points: [
      "Poolside and terrace glazing",
      "Bedroom and en-suite partitions",
      "Living areas with full-height glass",
      "Integrates with home automation",
    ],
    video: {
      src: "/media/video/residential.mp4",
      srcSm: "/media/video/residential-sm.mp4",
      poster: "/media/video/residential-poster.jpg",
      alt: "Penthouse living room glazing switching to private, overlooking the coastline",
    },
  },
  {
    slug: "corporate",
    name: "Corporate & Offices",
    headline: "A boardroom that closes itself",
    summary:
      "Meeting rooms, executive offices and open-plan floors that need to be transparent by default and confidential on demand.",
    detail: [
      "An office runs on visibility. A boardroom runs on discretion. Switchable partitions let the same room do both without anyone standing up to draw a blind.",
      "Films can be segmented, so one partition can screen a single zone, and can carry your identity when the glass is switched on.",
    ],
    points: [
      "Boardrooms and meeting pods",
      "Executive and HR offices",
      "Segmented partitions and branding",
      "Projection surface when switched on",
    ],
    video: {
      src: "/media/video/corporate.mp4",
      srcSm: "/media/video/corporate-sm.mp4",
      poster: "/media/video/corporate-poster.jpg",
      alt: "Boardroom partition switching to private during a meeting, with the Dubai skyline behind",
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "Dignity, on a hygienic surface",
    summary:
      "Consultation rooms, treatment bays and wards where patient privacy has to be immediate and the surface has to stay clean.",
    detail: [
      "Fabric curtains around a bed are a cleaning problem and a slow one. Switchable glazing gives the same privacy in milliseconds and wipes down like any other glass surface.",
      "With no pulleys, strings, fixtures or chains, there is nothing to wear out, tangle up or get stuck between rooms.",
    ],
    points: [
      "Consultation and treatment rooms",
      "Wards and recovery bays",
      "Wipe-clean, no fabric",
      "Instant patient privacy",
    ],
    video: {
      src: "/media/video/healthcare.mp4",
      srcSm: "/media/video/healthcare-sm.mp4",
      poster: "/media/video/healthcare-poster.jpg",
      alt: "Hospital consultation room glazing switching to private around a patient",
    },
  },
  {
    slug: "commercial",
    name: "Commercial & Public Spaces",
    headline: "Presence when you want it",
    summary:
      "Retail, hospitality, showrooms, malls and lobbies where the same glass has to sell, screen and stage by turns.",
    detail: [
      "In a retail or hospitality setting, glazing does more than divide space. Switched off it is a shopfront; switched on it is a private consultation room or a projection surface.",
      "The same panel can present product during the day and close for a private client appointment in the evening.",
    ],
    points: [
      "Showrooms and retail frontage",
      "Hotel lobbies and lounges",
      "Private client rooms",
      "Projection and display surfaces",
    ],
    video: {
      src: "/media/video/commercial.mp4",
      srcSm: "/media/video/commercial-sm.mp4",
      poster: "/media/video/commercial-poster.jpg",
      alt: "Luxury showroom glazing switching to private around a client consultation",
    },
  },
];
