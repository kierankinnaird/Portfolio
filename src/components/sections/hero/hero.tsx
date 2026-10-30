import { site } from "@/content/site";

import { HeroName } from "./hero-name";
import { HeroPortrait } from "./hero-portrait";
import { HeroTagline } from "./hero-tagline";

// The longest name line drives the display size (see .name-fit in tokens.css).
const nameChars = Math.max(site.name.first.length, site.name.last.length);

export function Hero() {
  return (
    <section className="px-gutter max-w-content mx-auto flex min-h-svh w-full flex-col items-center pt-64 pb-96">
      <div className="@container flex w-full flex-1 items-center justify-center">
        <div
          className="name-fit relative"
          style={{ "--name-chars": nameChars } as React.CSSProperties}
        >
          <HeroName />
          <HeroPortrait />
        </div>
      </div>
      <HeroTagline />
    </section>
  );
}
