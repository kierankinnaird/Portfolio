**UNDER CONSTRUCTION**

portfolio/
├── public/
│   ├── images/
│   │   ├── profile/            portrait.jpg (+ alt sizes)
│   │   ├── projects/           one folder per project
│   │   └── og/                 social share image
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── app/                    routes only, kept thin
│   │   ├── layout.tsx          font, theme provider, metadata, header/footer
│   │   ├── page.tsx            home: composes the hero and later sections
│   │   ├── globals.css         Tailwind import + design tokens
│   │   ├── not-found.tsx
│   │   ├── about/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── education/page.tsx
│   │   ├── writing/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── contact/page.tsx
│   │
│   ├── components/
│   │   ├── ui/                 primitives: button.tsx, link.tsx
│   │   ├── layout/             site-header.tsx, site-menu.tsx,
│   │   │                       site-footer.tsx, theme-toggle.tsx
│   │   ├── motion/             blur-text.tsx, reveal.tsx
│   │   └── sections/
│   │       └── hero/           hero.tsx, hero-name.tsx, hero-portrait.tsx,
│   │                           hero-tagline.tsx, scroll-cue.tsx, index.ts
│   │
│   ├── content/                all words and data, no JSX
│   │   ├── site.ts             name, tagline, location, social links
│   │   ├── navigation.ts       menu items
│   │   ├── projects/           one .mdx file per project
│   │   └── writing/            one .mdx file per post
│   │
│   ├── hooks/                  use-in-view.ts, use-click-outside.ts
│   ├── lib/                    cn.ts, fonts.ts, metadata.ts
│   ├── styles/                 tokens.css (colour, type scale, spacing)
│   └── types/                  content.ts
│
├── docs/
│   ├── design-system.md        type scale, 8pt spacing, colours, contrast
│   └── decisions.md            why each choice was made
│
├── .gitignore, .editorconfig, .prettierrc
├── eslint.config.mjs, tsconfig.json (alias "@/" → src/)
├── next.config.ts, package.json, README.md