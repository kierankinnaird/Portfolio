"use client";

import { Fragment } from "react";

import { useInView } from "@/hooks/use-in-view";

type BlurTextUnit = "letter" | "word";

interface BlurTextProps {
  text: string;
  unit: BlurTextUnit;
  // Offsets the stagger so a second line starts after the first finishes.
  startIndex?: number;
  className?: string;
}

// Visual only. The parent element must carry the accessible name (for the
// hero, aria-label on the h1), so every unit is hidden from screen readers.
export function BlurText({
  text,
  unit,
  startIndex = 0,
  className,
}: BlurTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const units = unit === "letter" ? Array.from(text) : text.split(" ");

  return (
    <span
      ref={ref}
      className={className}
      data-blur-text={unit}
      data-revealed={inView}
    >
      {units.map((value, index) => (
        <Fragment key={index}>
          <span
            aria-hidden="true"
            className="blur-unit"
            style={
              { "--reveal-index": startIndex + index } as React.CSSProperties
            }
          >
            {value}
          </span>
          {unit === "word" && index < units.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
