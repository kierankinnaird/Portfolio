# Personal Website: Design Documentation

Instructions and specification for Claude Code. Read this whole file before writing any code. Anything marked **LOCKED** must not be changed without asking. Anything marked **OPEN** needs a decision from Kieran before you build that part: ask, don't assume.

**IMPORTANT**

Ensure this is developed iteratively. Code like a genuine web developer. Ensure that you are liberal with pauses to commit to github, this will be done by **ME** not **YOU**.

---

## 1. Project summary

A from-scratch redesign of Kieran's personal website/portfolio. The first screen is a hero in which his name is set in very large type, with a small capsule-shaped portrait of him overlapping the centre of the name, and a short tagline underneath.

The starting point is the "Portfolio Hero" component on 21st.dev by waleedkibhen (bold name, profile image overlay, blur-in text animation, theme toggle, slide-out menu).

**Licence note (LOCKED):** that component's licence is listed as "unknown". Do not paste its code into the repo. Rebuild the idea from scratch following this document. If the original source file is kept for reference, keep it outside `src/`, for example `docs/reference/`, and never import it or ship it.

---

## 2. Requirements from Kieran (LOCKED)

1. **Font: TASA Orbiter.** Use it everywhere. No second typeface. No monospace, no script, no fallback to Fira Code/Antic from the reference file.
2. **Clean design principles.** Restraint, strong alignment, generous whitespace, one idea per section.
3. **No luminescent status symbols or anything similar.** See section 5 for the explicit ban list.
4. **Look different from typical Claude-generated designs.** Avoid cream/terracotta/serif-heading palettes, soft rounded cards, and "friendly AI" styling. Aim for a strict, Swiss-style, typographic look.
5. **Follow respected, established design rules.** Section 4 lists them; treat them as acceptance criteria.
6. **Use Kieran's own photo and name** in the hero.

---

## 3. Stack and assumptions

| Item | Choice | Status |
|---|---|---|
| Framework | Next.js (App Router), TypeScript | **OPEN**: confirm vs plain HTML/CSS |
| Styling | Tailwind CSS v4 with CSS variables as tokens | Assumed |
| Font delivery | `@fontsource-variable/tasa-orbiter` (self-hosted, weights 400-800, latin) | **LOCKED** |
| Icons | `lucide-react`, only if needed (menu, close, chevron) | Assumed |
| Animation | CSS transitions plus `IntersectionObserver`; no animation library unless justified | Assumed |
| Theme | `next-themes` (or equivalent) | Assumed |
| Content | Typed TS files plus MDX for projects/writing | **OPEN** |
| Package manager | pnpm | Assumed |

TASA Orbiter is an OFL-licensed neo-grotesque with a single variable weight axis and **no italic**. Do not use `font-style: italic` and do not rely on faux italics. Create emphasis with weight or size.

**Hosting and CMS** are not decided. Don't add either.

---

## 4. Design rules (acceptance criteria)

These come from widely used references (WCAG 2.2, Refactoring UI, Bringhurst/Butterick typography, Laws of UX). Every page must pass them.

**Spacing**
- All spacing is a multiple of 8px (4px allowed for fine adjustment). Use the spacing tokens, never arbitrary values.
- Related items sit close together (8-16px). Unrelated sections sit far apart (64px or more).
- Everything aligns to one column grid. No element floats off-grid unless it is an intentional, documented overlap (the hero portrait).

**Typography**
- Maximum five text sizes in use across the site.
- Body line length 45-75 characters. Body line-height 1.5; headings 1.05-1.2; display text can go tighter (0.8-0.9) because it is a single short word.
- Reduce letter-spacing on large type (display uses -0.04em); leave body tracking at default.
- Avoid pure `#000`/`#fff` for long-form text.

**Colour and contrast**
- Body text at least 4.5:1 against its background; large text and UI components at least 3:1. Verify with a tool, not by eye.
- Never convey meaning by colour alone (an active nav item also needs `aria-current` and a non-colour cue such as a rule or weight change).
- One accent colour only. Roughly 60 / 30 / 10 split (background / ink and neutrals / accent).

**Interaction and accessibility**
- Minimum hit area 44x44px for touch targets.
- Every interactive element has a visible `:focus-visible` style (2px outline, 2px offset, in the ink colour).
- Fully keyboard operable. Logical tab order.
- Respect `prefers-reduced-motion` and `prefers-color-scheme`.
- One primary call to action per viewport.
- Semantic HTML: one `h1` per page, landmarks (`header`, `nav`, `main`, `footer`), real links and buttons.

**Performance**
- Self-host the font with `font-display: swap`; preload the one weight file used above the fold if needed.
- Portrait via `next/image` (or `<img>` with width/height, `srcset`, `fetchpriority="high"`). No layout shift.
- Target Lighthouse 95+ in all four categories.

---

## 5. Explicit ban list (the "no luminescent" rule, LOCKED)

Do not add any of the following anywhere:

- Glows: `box-shadow` or `drop-shadow` with a coloured or blurred halo, `text-shadow` glow, blurred gradient blobs
- Pulsing, ping, breathing or blinking indicators
- Status dots or badges such as a green "Available for work" light, "online" dots, "live" tags
- Neon or fluorescent-on-black text treatments used as decoration
- Gradients of any kind (backgrounds, text, borders)
- Glassmorphism / backdrop-blur panels
- Shader, particle, aurora or animated-grid backgrounds
- Large `shadow-2xl` drops. Depth comes from 1px borders and spacing, not shadows.

If availability needs to be communicated, use plain text (for example "Open to new opportunities"), not an indicator light. Only add that if Kieran supplies the wording.

---

## 6. Design tokens

Define these in `src/styles/tokens.css` and map them into Tailwind. Components reference tokens, never raw hex values.

### 6.1 Colour

Dark and light themes. Contrast figures are approximate; re-verify with a checker.

| Token | Dark | Light | Use |
|---|---|---|---|
| `--bg` | `#0B0B0C` | `#F5F4F0` | page background |
| `--ink` | `#F2F2EF` | `#111111` | primary text, display name |
| `--ink-muted` | `#8A8A86` | `#5E5E5A` | secondary text (about 5.6:1 dark, about 5.9:1 light) |
| `--rule` | `#2A2A2A` | `#D6D5D0` | 1px dividers, borders |
| `--accent` | `#C3E41D` | `#C3E41D` | single accent (see rule below) |
| `--accent-ink` | `#0B0B0C` | `#111111` | text placed on top of accent fills |

**Accent rule (LOCKED):** the accent is lime `#C3E41D` as in the reference. On the dark background it reads at roughly 13:1 and may be used as text. On the light background it is only about 1.3:1, so **in light theme the accent is never used for text or thin lines**. Use it only as a filled shape with `--accent-ink` text on top. Use it sparingly: hover/active state of menu items, the hero name in dark theme, and small fills.

**OPEN:** Kieran may want a different accent. If so, change only `--accent` and re-check contrast in both themes.

### 6.2 Typography

Family: `"TASA Orbiter Variable", system-ui, sans-serif`.

| Token | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| `--text-display` | `clamp(5rem, 16vw, 13.5rem)` | 700-800 | 0.8 | hero name only |
| `--text-title` | `clamp(2rem, 4vw, 3rem)` | 600 | 1.1 | section headings |
| `--text-lead` | `1.25rem` (20px) | 400 | 1.4 | tagline, intro paragraphs |
| `--text-body` | `1rem` (16px) | 400 | 1.5 | body |
| `--text-small` | `0.875rem` (14px) | 500 | 1.4 | labels, metadata, nav |

That is five sizes. Do not add more. Nav and menu labels use `--text-small` uppercase with `+0.06em` tracking, or sentence case at `--text-lead`; decide once and apply everywhere.

### 6.3 Spacing and shape

- Spacing scale: 4, 8, 16, 24, 32, 48, 64, 96, 128px.
- Max content width 1440px; page gutters 24px mobile, 48px desktop.
- Border radius: portrait is a full capsule (`9999px`); everything else is `0` or `4px`. No rounded cards.
- Borders: 1px solid `--rule`.

### 6.4 Motion

- Letter reveal: blur 10px to 0, opacity 0 to 1, translateY -20px to 0, 500ms `ease-out`, 100ms stagger per letter. Runs once when the element enters view.
- Tagline reveal: same effect by word, 150ms stagger.
- Hover and colour changes: 200-300ms.
- `prefers-reduced-motion: reduce`: no blur, no translate, no stagger. Show the final state immediately, or a plain 150ms opacity fade at most.

---

## 7. Hero specification

Full-viewport (`min-height: 100svh`) section. Content centred on both axes.

**Layout (top to bottom)**
1. **Header** (fixed): menu button on the left, small wordmark in the centre, theme toggle on the right.
2. **Name block** (vertical centre): two stacked lines, set in display type, uppercase, centred:
   - Line 1: first name (`KIERAN`)
   - Line 2: surname (**OPEN**: Kieran to supply; use `content/site.ts` so it is a one-line change)
3. **Portrait**: capsule shape (width : height about 1 : 1.7, for example 129x218 at desktop, scaling down to about 65x110 at mobile), centred exactly between the two name lines, overlapping both. `z-index` above the text. The photo is `object-fit: cover`. No shadow. Hover: optional `scale(1.04)` over 300ms, disabled under reduced motion.
4. **Tagline**: centred, 64-128px above the bottom edge, `--text-lead`, `--ink-muted`, brightening to `--ink` on hover is optional (it must not be the only cue for anything).
5. **Scroll cue**: small chevron at the bottom centre. Must be a real `<a href="#about">` (or removed if there is no next section). In the reference it is a button that does nothing; do not repeat that.

**Behaviour**
- The name is the page's `h1`. Wrap the two lines in a single `h1` with `aria-label="Kieran [Surname]"`. Mark the animated per-letter spans `aria-hidden="true"` so screen readers don't read letter by letter.
- The name must not wrap or overflow at any width from 320px to 2560px. Use `clamp()` and test the longest surname.
- Portrait `alt` text: a real description (for example "Kieran, smiling, outdoors"), supplied by Kieran.

**Content placeholders (OPEN, ask Kieran)**
- Surname
- Tagline (do not reuse the reference tagline; it is not Kieran's)
- Portrait file: put at `public/images/profile/portrait.jpg`. Needs a tight, front-lit head-and-shoulders crop that reads well at about 130px wide. Until supplied, render a flat `--rule`-coloured capsule.

---

## 8. Menu and header specification

- Menu opens as a panel under the button: 1px `--rule` border, `--bg` background, **no shadow**.
- Items (from `content/navigation.ts`): Home, About, Projects, Experience, Education, Writing, Contact. **OPEN**: confirm which exist at launch; unfinished sections must not appear in the menu.
- Current page: `aria-current="page"`, plus a visible non-colour cue (a 2px left rule). The accent may also be applied, but it must not be the only signal.
- Hover/focus styling is done in CSS (`:hover`, `:focus-visible`), not with `onMouseEnter`/`onMouseLeave` handlers as in the reference.
- Behaviour: opens/closes on button click; closes on `Esc`, on outside click, and on link click; focus moves into the panel on open and returns to the button on close; button has `aria-expanded` and `aria-controls`.
- **Theme toggle**: a real `button` with `role="switch"` and `aria-checked`. Keep the 64x32 pill look if desired but ensure a 44px-tall hit area. Persist choice; default to the system preference; avoid flash of wrong theme on first paint.
- **Wordmark**: replace the reference's cursive "A" with a plain TASA Orbiter monogram or the full name in `--text-small`. No script fonts.

---

## 9. Reference code: what to keep and what to fix

The reference `.tsx` contains these problems. Do not reproduce them.

| Reference behaviour | Required change |
|---|---|
| Fira Code and Antic fonts | TASA Orbiter only |
| `BlurText` renders a `<p>` and splits letters into spans | Render inside the `h1`; `aria-label` on parent, `aria-hidden` on spans; honour reduced motion |
| Colours hard-coded in inline styles, theme via JS state | CSS variable tokens plus a theme provider |
| Hover colours via `onMouseEnter`/`onMouseLeave` | CSS `:hover` / `:focus-visible` |
| `shadow-2xl` on portrait and menu | Remove; use 1px borders |
| Scroll chevron is a dead button | Real anchor link or remove |
| Hotlinked image from `cdn.21st.dev` | Local file in `public/images/profile/` |
| Theme forced to dark on mount | System preference by default, persisted |
| Page is one giant `Component` | Split per section 10 |
| Placeholder name "ALEX KANE", tagline "Designing human experiences in code." | Kieran's own content from `content/site.ts` |

---

## 10. File structure (LOCKED unless Kieran approves changes)

```
portfolio/
├── public/
│   ├── images/
│   │   ├── profile/           portrait.jpg (+ alt sizes)
│   │   ├── projects/          one folder per project
│   │   └── og/                social share image
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── app/                   routes only, kept thin
│   │   ├── layout.tsx         font, theme provider, metadata, header/footer
│   │   ├── page.tsx           home: composes the hero and later sections
│   │   ├── globals.css        Tailwind import + token import
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
│   │   ├── ui/                primitives: button.tsx, link.tsx
│   │   ├── layout/            site-header.tsx, site-menu.tsx,
│   │   │                      site-footer.tsx, theme-toggle.tsx
│   │   ├── motion/            blur-text.tsx, reveal.tsx
│   │   └── sections/
│   │       └── hero/          hero.tsx, hero-name.tsx, hero-portrait.tsx,
│   │                          hero-tagline.tsx, scroll-cue.tsx, index.ts
│   │
│   ├── content/               all words and data, no JSX
│   │   ├── site.ts            name, surname, tagline, location, social links
│   │   ├── navigation.ts      menu items
│   │   ├── projects/          one .mdx per project
│   │   └── writing/           one .mdx per post
│   │
│   ├── hooks/                 use-in-view.ts, use-click-outside.ts
│   ├── lib/                   cn.ts, fonts.ts, metadata.ts
│   ├── styles/                tokens.css
│   └── types/                 content.ts
│
├── docs/
│   ├── design-system.md       living copy of sections 4-6
│   ├── decisions.md           why each choice was made
│   └── reference/             original 21st.dev file, NOT imported or shipped
│
├── .gitignore, .editorconfig, .prettierrc
├── eslint.config.mjs, tsconfig.json   (alias "@/" -> src/)
├── next.config.ts, package.json, README.md
```

---

## 11. Code conventions (LOCKED)

- Filenames kebab-case; components PascalCase; hooks start with `use`.
- One component per file. Props typed with an explicit interface.
- Pages in `app/` contain composition only: no styling logic, no hard-coded copy.
- All user-facing text and links live in `src/content/`. Changing the name or tagline must be a one-file edit.
- Imports use the `@/` alias, never `../../`.
- Only `sections/hero/` gets an `index.ts` barrel. No other barrels.
- Components use tokens through Tailwind theme mappings. No hex values and no arbitrary pixel values in JSX unless they correspond to a token.
- No inline `style` for colours or fonts.
- Server components by default; add `"use client"` only to components that need state or browser APIs (menu, theme toggle, blur text).
- Comments explain why, not what.

---

## 12. Build order

Do these as separate commits. Stop for review after step 4.

1. **Scaffold:** Next.js + TypeScript + Tailwind + ESLint/Prettier; folder structure; `@/` alias.
2. **Foundations:** TASA Orbiter via Fontsource; `tokens.css`; theme provider with no flash; `globals.css`.
3. **Content layer:** `content/site.ts` and `navigation.ts` with placeholders; `types/content.ts`.
4. **Hero + header:** name, portrait, tagline, scroll cue, menu, theme toggle, `BlurText` with reduced-motion support.
5. **Checks:** keyboard pass, screen-reader pass of the `h1`, contrast verification in both themes, Lighthouse, test at 320 / 768 / 1440 / 2560px, test with a very long surname.
6. Further sections (About, Projects, and so on) only after Kieran signs off the hero.

---

## 13. Definition of done for the hero

- [ ] TASA Orbiter is the only font loaded; no other font requests in the network panel
- [ ] No item from the ban list in section 5 appears anywhere
- [ ] Both themes meet the contrast requirements in section 4, measured
- [ ] Name never overflows or wraps between 320px and 2560px
- [ ] Screen reader announces the name once, not letter by letter
- [ ] Menu and theme toggle fully operable by keyboard, with visible focus
- [ ] Reduced-motion setting removes blur, translate and stagger
- [ ] Portrait loads without layout shift
- [ ] Changing name, surname or tagline requires editing only `content/site.ts`
- [ ] Lighthouse 95+ in Performance, Accessibility, Best Practices, SEO

---

## 14. Open questions for Kieran (ask before building the affected part)

1. Next.js, or plain HTML/CSS?
2. Surname, tagline, and portrait file.
3. Which sections exist at launch? (Menu currently lists seven.)
4. Projects and writing as MDX files, or something else?
5. Keep the lime accent, or choose a different one?
6. Default theme: follow system, or force dark?
