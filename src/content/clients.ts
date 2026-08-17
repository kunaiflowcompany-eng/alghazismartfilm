/* ============================================================================
   CLIENTS & PARTNERS
   ----------------------------------------------------------------------------
   Logos are the supplied files with their white background removed by an
   edge-only flood fill, so interior white detail (EMAAR, The Dubai Mall, HMS)
   is preserved. Logos are never recoloured, redrawn or stretched.

   ⚠ Dubai Airport Freezone (DAFZA) is excluded: the supplied file is cropped
   mid-word and the wordmark reads "Freezne". Drop a corrected file at
   public/media/clients/dafza.png and uncomment the entry below to include it.
   ========================================================================== */

export type Client = { slug: string; name: string; src: string };

export const clients: Client[] = [
  { slug: "emaar", name: "Emaar", src: "/media/clients/emaar.png" },
  { slug: "damac", name: "DAMAC", src: "/media/clients/damac.png" },
  { slug: "omniyat", name: "Omniyat", src: "/media/clients/omniyat.png" },
  { slug: "atlantis", name: "Atlantis, The Palm Dubai", src: "/media/clients/atlantis.png" },
  { slug: "the-dubai-mall", name: "The Dubai Mall", src: "/media/clients/the-dubai-mall.png" },
  { slug: "ibn-battuta-mall", name: "Ibn Battuta Mall", src: "/media/clients/ibn-battuta-mall.png" },
  { slug: "anantara", name: "Anantara Hotels, Resorts & Spas", src: "/media/clients/anantara.png" },
  { slug: "radisson", name: "Radisson Hotel Group", src: "/media/clients/radisson.png" },
  { slug: "ja-the-resort", name: "JA The Resort, Golf Course Dubai", src: "/media/clients/ja-the-resort.png" },
  { slug: "zoya", name: "Zoya Health & Wellbeing Resort", src: "/media/clients/zoya.png" },
  { slug: "arabian-ranches", name: "Arabian Ranches", src: "/media/clients/arabian-ranches.png" },
  { slug: "jafza", name: "Jafza — Jebel Ali Free Zone", src: "/media/clients/jafza.png" },
  { slug: "nmc-health", name: "NMC Health", src: "/media/clients/nmc-health.png" },
  { slug: "medcare", name: "Medcare Hospitals & Medical Centres", src: "/media/clients/medcare.png" },
  { slug: "hms-mirdif", name: "HMS Mirdif Hospital", src: "/media/clients/hms-mirdif.png" },
  { slug: "dubizzle", name: "dubizzle", src: "/media/clients/dubizzle.png" },
  { slug: "dubai-cranes", name: "Dubai Cranes", src: "/media/clients/dubai-cranes.png" },
  { slug: "dubai-driving-center", name: "Dubai Driving Center", src: "/media/clients/dubai-driving-center.png" },
  // { slug: "dafza", name: "Dubai Airport Freezone", src: "/media/clients/dafza.png" },
];
