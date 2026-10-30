import Image from "next/image";

import { site } from "@/content/site";

// The one intentional off-grid element (section 4): centred on the gap between
// the two name lines and layered above the text. Width/height keep the box
// reserved, so there is no layout shift.
export function HeroPortrait() {
  const { src, alt, width, height } = site.portrait;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority
      sizes="clamp(44px, 9.5vw, 129px)"
      className="aspect-portrait w-portrait absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover transition-transform duration-300 motion-safe:hover:scale-104"
    />
  );
}
