import type { Metadata } from "next";

import { fullName, site } from "@/content/site";

// Pages set only their own title; the template appends the name.
export const siteMetadata: Metadata = {
  title: { default: fullName, template: `%s | ${fullName}` },
  description: site.tagline,
  // SVG for modern browsers; the ICO covers anything that still asks for it.
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
  },
};
