import Image from "next/image";

import { site } from "@/content/site";

// The photo's home. The slot holds the space in the About column; the
// traveller inside it is what ScrollExpand moves over the hero and then lets
// settle here. Eager loading matters: it can be on screen before this section
// is anywhere near the viewport, and lazy loading goes by layout position.
export function AboutPortrait() {
  const { src, alt, width, height } = site.portrait;

  return (
    <div data-portrait-slot className="portrait-slot">
      <div data-traveller className="portrait-frame traveller">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority
          sizes="(max-width: 767px) 300px, 460px"
          className="portrait-photo"
        />
      </div>
    </div>
  );
}
