export interface SiteContent {
  name: {
    first: string;
    last: string;
  };
  tagline: string;
  portrait: ImageContent;
  location?: string;
  socials: SocialLink[];
}

export interface ImageContent {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}
