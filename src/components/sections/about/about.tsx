import { about } from "@/content/about";

import { AboutPortrait } from "./about-portrait";

// Photo on the left, text on the right, on the same 12-column grid as Contact.
// A full-height section so the photo can settle at the middle of the screen.
export function About() {
  return (
    <section
      id="about"
      data-about
      aria-labelledby="about-heading"
      className="px-gutter max-w-content mx-auto flex min-h-svh scroll-mt-64 items-center py-128"
    >
      <div className="grid w-full items-center gap-48 md:grid-cols-12">
        <div className="md:col-span-4">
          <AboutPortrait />
        </div>

        <div className="about-text flex flex-col gap-24 md:col-span-8">
          <h2
            id="about-heading"
            className="text-small tracking-label text-ink-muted uppercase"
          >
            {about.heading}
          </h2>
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? "text-title max-w-3xl"
                  : "text-lead text-ink-muted max-w-measure"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
