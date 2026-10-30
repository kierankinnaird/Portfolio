// A real link to the next section, as the spec requires (the reference's was
// a button that did nothing). The chevron drops and returns (globals.css) and
// the cue is hidden once the hero has opened up. "Scroll" in the visible label
// is part of the accessible name.
export function ScrollCue() {
  return (
    <a
      href="#about"
      aria-label="Scroll to About"
      className="scroll-cue min-h-hit min-w-hit fade-on-expand absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center"
    >
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
    </a>
  );
}
