import type { SiteContent } from "@/types/content";

// Surname is inferred from the git identity, not supplied by Kieran: confirm.
export const site = {
  name: {
    first: "Kieran",
    last: "Kinnaird",
  },
  tagline:
    "Fourth year MSci Computer Science student on Placement at NMC Energy",
  // Alt text is written from the photo, not supplied by Kieran: confirm.
  portrait: {
    src: "/images/profile/portrait.jpg",
    alt: "Kieran, head and shoulders, with curly brown hair, wearing a grey zip-neck jumper against a plain grey background",
    width: 640,
    height: 1088,
  },
  socials: [],
} satisfies SiteContent;

export const fullName = `${site.name.first} ${site.name.last}`;
