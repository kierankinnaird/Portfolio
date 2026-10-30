import type { Metadata } from "next";

import { fullName, site } from "@/content/site";

export const siteMetadata: Metadata = {
  title: fullName,
  description: site.tagline,
};
