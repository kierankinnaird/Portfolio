import { HeroName } from "./hero-name";
import { HeroPortrait } from "./hero-portrait";
import { HeroTagline } from "./hero-tagline";

export function Hero() {
  return (
    <section className="px-gutter max-w-content mx-auto flex min-h-svh w-full flex-col items-center pt-64 pb-96">
      <div className="flex flex-1 items-center">
        <div className="relative">
          <HeroName />
          <HeroPortrait />
        </div>
      </div>
      <HeroTagline />
    </section>
  );
}
