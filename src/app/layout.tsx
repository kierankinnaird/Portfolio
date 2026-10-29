import type { Metadata } from "next";
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
