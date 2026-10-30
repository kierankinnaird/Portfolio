"use client";

import { useEffect, useRef } from "react";

interface ScrollExpandProps {
  children: React.ReactNode;
}

// Pinned scroll for the opening stage, as a multiple of the stage height. The
// track height in globals.css (.expand-track[data-ready]) is 1 stage + this,
// so change them together.
const OPEN_DISTANCE = 1;

// Opened shape: a circle this fraction of the stage height across.
const OPEN_SIZE = 0.36;

// Photo height as a multiple of its frame: tight on the capsule (matches the
// signed-off hero crop), a little looser in the opened circle.
const PHOTO_K_CAPSULE = 1.12;
const PHOTO_K_OPEN = 1.35;

// The photo starts docking when its column is this far (in stage heights)
// below the middle of the screen, and has arrived this far before reaching it.
const DOCK_RUNWAY = 0.6;
const DOCK_MARGIN = 0.1;

// The About text starts to appear once the photo is this far docked.
const DOCK_TEXT_FROM = 0.6;

// Past this opening progress the hero's controls are faded out.
const COVERED_AT = 0.4;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);
const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

// Pins the hero for a stretch of normal page scroll, then turns the scroll
// position into the portrait's journey: from the hero capsule, open to a
// circle, hold mid-screen while the hero leaves, then glide into the About
// column. The browser keeps handling scrolling, so keyboard, touch and
// assistive tech behave as on any other page. Everything visual is CSS fed by
// the values set here.
export function ScrollExpand({ children }: ScrollExpandProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const root = document.documentElement;
    // The photo's two homes live in other sections; find them by data attribute.
    const capsule = stage?.querySelector<HTMLElement>("[data-hero-capsule]");
    const slot = document.querySelector<HTMLElement>("[data-portrait-slot]");
    const traveller = document.querySelector<HTMLElement>("[data-traveller]");
    const about = document.querySelector<HTMLElement>("[data-about]");
    if (!track || !stage || !capsule || !slot || !traveller || !about) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    // Too short a screen (a phone on its side) cannot fit the pinned hero.
    const tallEnough = window.matchMedia("(min-height: 32rem)");
    let enabled = false;
    let frame = 0;

    // Measured once per resize: the capsule's size and where its centre sits
    // relative to the middle of the stage. Both are scroll-invariant.
    let capsuleW = 0;
    let capsuleH = 0;
    let offsetX = 0;
    let offsetY = 0;
    let stageW = 0;
    let stageH = 0;

    const measure = () => {
      const stageBox = stage.getBoundingClientRect();
      const capsuleBox = capsule.getBoundingClientRect();
      stageW = stageBox.width;
      stageH = stageBox.height;
      capsuleW = capsuleBox.width;
      capsuleH = capsuleBox.height;
      offsetX = capsuleBox.left + capsuleW / 2 - (stageBox.left + stageW / 2);
      offsetY = capsuleBox.top + capsuleH / 2 - (stageBox.top + stageH / 2);
    };

    const update = () => {
      frame = 0;
      if (!enabled) return;

      // Opening: 0 at the top of the page, 1 once the pinned stretch is done.
      const opened = clamp(
        -track.getBoundingClientRect().top / (stageH * OPEN_DISTANCE),
      );
      const openSize = Math.min(stageH * OPEN_SIZE, stageW * 0.9);

      // Where the photo is if it only ever opened: capsule over the name,
      // easing to the middle of the screen as it becomes a circle.
      const openW = lerp(capsuleW, openSize, opened);
      const openH = lerp(capsuleH, openSize, opened);
      const openX = stageW / 2 + offsetX * (1 - opened);
      const openY = stageH / 2 + offsetY * (1 - opened);
      const openK = lerp(PHOTO_K_CAPSULE, PHOTO_K_OPEN, opened);

      // Docking: how far the About column has risen towards the middle of the
      // screen. The slot is never transformed, so its box is its true place.
      const slotBox = slot.getBoundingClientRect();
      const slotX = slotBox.left + slotBox.width / 2;
      const slotY = slotBox.top + slotBox.height / 2;
      const runway = stageH * DOCK_RUNWAY;
      const margin = stageH * DOCK_MARGIN;
      const raw = clamp((stageH / 2 + runway - slotY) / (runway - margin));
      const docked = raw * raw * (3 - 2 * raw);

      const width = lerp(openW, slotBox.width, docked);
      const height = lerp(openH, slotBox.height, docked);
      const centreX = lerp(openX, slotX, docked);
      const centreY = lerp(openY, slotY, docked);

      traveller.style.setProperty("--tw", `${width}px`);
      traveller.style.setProperty("--th", `${height}px`);
      traveller.style.setProperty("--tx", `${centreX - slotX}px`);
      traveller.style.setProperty("--ty", `${centreY - slotY}px`);
      traveller.style.setProperty("--tr", `${Math.min(width, height) / 2}px`);
      traveller.style.setProperty(
        "--photo-k",
        lerp(openK, PHOTO_K_CAPSULE, docked).toFixed(4),
      );
      // The text waits until the photo is mostly in, so it never fades up
      // underneath it.
      about.style.setProperty(
        "--dock",
        clamp((docked - DOCK_TEXT_FROM) / (1 - DOCK_TEXT_FROM)).toFixed(4),
      );
      track.style.setProperty("--expand", opened.toFixed(4));
      track.dataset.covered = String(opened > COVERED_AT);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const clear = () => {
      for (const name of [
        "--tw",
        "--th",
        "--tx",
        "--ty",
        "--tr",
        "--photo-k",
      ]) {
        traveller.style.removeProperty(name);
      }
      about.style.removeProperty("--dock");
      track.style.setProperty("--expand", "0");
      delete track.dataset.ready;
      delete track.dataset.covered;
      delete root.dataset.journey;
    };

    const sync = () => {
      enabled = motion.matches && tallEnough.matches;
      if (!enabled) {
        clear();
        return;
      }
      track.dataset.ready = "true";
      measure();
      update();
      // Values first, then the switch, so the swap from the static capsule is
      // seamless: the photo is already exactly over it.
      root.dataset.journey = "on";
    };

    const resize = new ResizeObserver(() => {
      if (!enabled) return;
      measure();
      schedule();
    });
    resize.observe(stage);
    resize.observe(slot);

    motion.addEventListener("change", sync);
    tallEnough.addEventListener("change", sync);
    window.addEventListener("scroll", schedule, { passive: true });
    // The name block moves a little once the font swaps in.
    document.fonts?.ready.then(() => {
      if (enabled) {
        measure();
        schedule();
      }
    });
    sync();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resize.disconnect();
      motion.removeEventListener("change", sync);
      tallEnough.removeEventListener("change", sync);
      window.removeEventListener("scroll", schedule);
      clear();
    };
  }, []);

  return (
    <div ref={trackRef} className="expand-track relative">
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden">
        {children}
      </div>
    </div>
  );
}
