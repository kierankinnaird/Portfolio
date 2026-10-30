"use client";

import { smoothScrollToHash } from "@/lib/scroll";

// A real link to the next section, as the spec requires (the reference's was
// a button that did nothing). Two motions, kept on separate elements so they
// compose: the chevron drops and returns on a timer as an idle hint, and the
// whole cue drifts down and fades with the scroll progress (--expand), going
// with the portrait's journey. It is hidden once the hero has opened.
// "Scroll" in the visible label is part of the accessible name.
export function ScrollCue() {
  // A plain click scrolls there over time so the portrait's journey plays;
  // modified clicks and no-JS fall back to the normal anchor jump.
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    if (smoothScrollToHash("#about")) event.preventDefault();
  };

  return (
    <a
      href="#about"
      onClick={onClick}
      aria-label="Scroll to About"
      className="scroll-cue min-h-hit min-w-hit fade-on-expand absolute bottom-24 left-1/2 -translate-x-1/2"
    >
      <span className="cue-drift min-h-hit flex flex-col items-center justify-center">
        <span className="text-small tracking-label text-ink-muted uppercase">
          Scroll
        </span>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 5l6 6 6-6" />
        </svg>
      </span>
    </a>
  );
}
