/* ============================================================================
   PROJECTS
   ----------------------------------------------------------------------------
   ⚠ EDITABLE PLACEHOLDERS
   No client names, project names or locations were supplied with these three
   photographs. Titles below are neutral descriptions of what is visible in each
   image. Replace `title`, `location` and `scope` with the real details when
   they are confirmed — set `location` to "" to hide that line.

   The same data drives the Projects section on both Home and About Us.
   ========================================================================== */

export type Project = {
  id: string;
  title: string;
  /** Leave empty to hide the location line */
  location: string;
  scope: string;
  image: string;
  alt: string;
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Boardroom Privacy Partition",
    location: "",
    scope: "Smart Film",
    image: "/media/img/project-1.webp",
    alt: "Boardroom enclosed by a full-height switchable partition in its private state, with a sliding door",
  },
  {
    id: "project-2",
    title: "Decorative Glass Enclosure",
    location: "",
    scope: "Frosted Sticker Film",
    image: "/media/img/project-2.webp",
    alt: "Glazed office enclosure with a geometric frosted graphic applied across the partition",
  },
  {
    id: "project-3",
    title: "Waterfront Living Room Glazing",
    location: "",
    scope: "Smart Film",
    image: "/media/img/project-3.webp",
    alt: "Living room glazing switched to the private state beside an open sea-facing terrace",
  },
];
