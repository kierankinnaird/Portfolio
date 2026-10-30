import type { NavItem } from "@/types/content";

// A section is added here only once its page is built, so the menu never
// links to something unfinished.
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];
