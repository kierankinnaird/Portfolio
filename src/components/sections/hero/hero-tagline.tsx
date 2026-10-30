import { BlurText } from "@/components/motion/blur-text";
import { site } from "@/content/site";

export function HeroTagline() {
  return (
    <p className="text-lead text-ink-muted max-w-measure fade-on-expand text-center text-balance">
      {/* The animated words are aria-hidden, so the real text is provided here. */}
      <span className="sr-only">{site.tagline}</span>
      <BlurText text={site.tagline} unit="word" />
    </p>
  );
}
