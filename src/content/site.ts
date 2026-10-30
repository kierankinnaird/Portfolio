import type { SiteContent } from "@/types/content";

// Surname is inferred from the git identity, not supplied by Kieran: confirm.
export const site = {
  name: {
    first: "Kieran",
    last: "Kinnaird",
  },
  tagline:
    "Fourth year MSci Computer Science student on Placement at NMC Energy",
  socials: [],
} satisfies SiteContent;

export const fullName = `${site.name.first} ${site.name.last}`;
