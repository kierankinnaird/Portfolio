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
    alt: "Kieran, head and shoulders, with curly brown hair, wearing a grey zip-neck jumper against a black background",
    width: 1086,
    height: 1448,
  },
  // Email and GitHub are carried over from the previous site: confirm.
  email: "kieran.kinnaird@mail.com",
  socials: [{ label: "GitHub", href: "https://github.com/kierankinnaird" }],
} satisfies SiteContent;

export const fullName = `${site.name.first} ${site.name.last}`;
