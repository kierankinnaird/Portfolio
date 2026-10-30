import Image from "next/image";

import { site } from "@/content/site";

// The one intentional off-grid element (section 4): centred on the gap between
// the two name lines and layered above the text. This is the resting capsule.
// When motion is allowed it is hidden and the same photo in the About section
// takes over from exactly here (see ScrollExpand), so it is decorative: the
// photo's accessible name lives once, on the About copy.
export function HeroPortrait() {
  const { src, width, height } = site.portrait;

  return (
    <div
      data-hero-capsule
      aria-hidden="true"
      className="portrait-frame hero-capsule absolute top-1/2 left-1/2 z-10"
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        priority
        sizes="(max-width: 767px) 300px, 460px"
        className="portrait-photo"
      />
    </div>
  );
}
