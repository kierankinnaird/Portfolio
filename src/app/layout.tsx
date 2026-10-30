import type { Metadata } from "next";
import "@fontsource-variable/tasa-orbiter";

import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { siteMetadata } from "@/lib/metadata";
import { DEFAULT_THEME, themeInitScript } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // suppressHydrationWarning: the init script may change data-theme before
    // React hydrates, which is intended.
    <html lang="en" data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <noscript>
          <style>{`.blur-unit{opacity:1;filter:none;transform:none}`}</style>
        </noscript>
      </head>
      <body>
        <ThemeProvider>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
