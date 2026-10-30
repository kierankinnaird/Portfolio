import { BlurText } from "@/components/motion/blur-text";
import { fullName, site } from "@/content/site";

// One h1 for the whole name. The per-letter spans inside BlurText are
// aria-hidden, so the aria-label is what assistive tech announces.
export function HeroName() {
  const { first, last } = site.name;

  return (
    <h1
      aria-label={fullName}
      className="text-display text-name text-center uppercase"
    >
      <span className="block">
        <BlurText text={first} unit="letter" />
      </span>
      <span className="block">
        <BlurText text={last} unit="letter" startIndex={first.length} />
      </span>
    </h1>
  );
}
