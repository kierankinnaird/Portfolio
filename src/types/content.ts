export interface SiteContent {
  name: {
    first: string;
    last: string;
  };
  tagline: string;
  location?: string;
  socials: SocialLink[];
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}
