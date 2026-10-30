const MIN_DURATION = 700;
const MAX_DURATION = 2200;
// Milliseconds per pixel travelled: long enough that the portrait's journey
// reads as motion instead of a blur.
const MS_PER_PX = 0.8;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Where the page should be scrolled to for an in-page anchor, honouring the
// target's scroll-margin like the browser does. Null if there is no target.
function scrollPositionForHash(hash: string): number | null {
  const target = hash.length > 1 ? document.querySelector(hash) : null;
  if (!target) return null;

  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return Math.min(
    Math.max(target.getBoundingClientRect().top + window.scrollY - margin, 0),
    max,
  );
}

// Jumps to the anchor in the URL, if any. The browser does this itself on
// load, but before ScrollExpand has made the hero tall, so it lands short of
// where the anchor ends up. Call once the layout is final.
export function jumpToCurrentHash() {
  const to = scrollPositionForHash(window.location.hash);
  if (to !== null) window.scrollTo(0, to);
}

// Scrolls to an in-page anchor over time, so scroll-driven effects play on the
// way instead of being skipped by the browser's instant jump. Returns false
// when there is nothing to scroll to, so the caller can let the link behave
// normally. Reduced motion jumps. Any wheel, touch, key or pointer input hands
// control straight back to the visitor.
export function smoothScrollToHash(hash: string): boolean {
  const to = scrollPositionForHash(hash);
  if (to === null) return false;

  const from = window.scrollY;
  const distance = to - from;

  history.pushState(null, "", hash);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || Math.abs(distance) < 2) {
    window.scrollTo(0, to);
    return true;
  }

  const duration = Math.min(
    Math.max(Math.abs(distance) * MS_PER_PX, MIN_DURATION),
    MAX_DURATION,
  );
  const started = performance.now();
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
      window.removeEventListener(type, stop);
    }
  };
  for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
    window.addEventListener(type, stop, { passive: true });
  }

  const step = (now: number) => {
    const progress = Math.min((now - started) / duration, 1);
    window.scrollTo(0, from + distance * easeInOutCubic(progress));
    if (progress < 1) frame = requestAnimationFrame(step);
    else stop();
  };
  frame = requestAnimationFrame(step);
  return true;
}
