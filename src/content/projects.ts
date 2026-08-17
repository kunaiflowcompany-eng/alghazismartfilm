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
    title: "Branded Office Partition",
    location: "",
    scope: "Frosted Sticker Film",
    image: "/media/img/project-1.webp",
    alt: "Office glass partition with a frosted film pattern and applied brand mark",
  },
  {
    id: "project-2",
    title: "Executive Suite Glazing",
    location: "",
    scope: "Frosted Sticker Film",
    image: "/media/img/project-2.webp",
    alt: "Glazed executive office with frosted branding applied to the partition",
  },
  {
    id: "project-3",
    title: "Meeting Room Privacy Wall",
    location: "",
    scope: "Privacy Film Installation",
    image: "/media/img/project-3.webp",
    alt: "Meeting room enclosed by a full-height frosted privacy partition with a sliding door",
  },
];
