import type { Metadata } from "next";
import "@fontsource-variable/tasa-orbiter";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { DEFAULT_THEME, themeInitScript } from "@/lib/theme";
import "./globals.css";

// Placeholder metadata; replaced by lib/metadata.ts once content/site.ts exists.
export const metadata: Metadata = {
  title: "Portfolio",
};

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
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
