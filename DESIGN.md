# Nextblogs — Design Rules (AI agent style guide)

Paste this file to an AI agent and tell it: **"Build/style the UI to follow these rules exactly."**
It captures the look & feel: monochrome + one teal accent, heavy grotesk headlines paired with
monospace micro-labels, frosted "chrome" over crisp content, and a live constellation hero.

---

## 0. Design principles (the vibe)

1. **Monochrome first, one accent.** Black/white/grey everywhere; a single teal accent used *sparingly* (eyebrows, links/hover, focus, CTA hint). Never colorful.
2. **Two type personalities.** Big **grotesk** (Inter) for headings/body; **monospace** (JetBrains Mono), UPPERCASE + wide tracking, for labels/eyebrows/meta/tags/dates.
3. **Frosted chrome, sharp content.** Floating UI (navbar, modal, cards) uses translucency + `backdrop-filter` blur. Article/text content stays crisp and high-contrast.
4. **Editorial & minimal.** Generous negative space, hairline borders, restrained shadows, confident large type.
5. **Token-driven theming.** Every color is a CSS variable. Dark is default (`:root`); light overrides under `[data-theme="light"]`. No hard-coded colors in component rules.
6. **Calm motion.** 0.2s ease transitions, subtle hover lifts; always honor `prefers-reduced-motion`.
7. **No CSS framework.** Hand-written CSS, semantic class names (BEM-ish: `.block__el--mod`).

---

## 1. Color tokens

Define these on `:root` (dark = default) and override the themeable ones under `[data-theme="light"]`.

```css
:root {
  --bg: #000000;
  --text: #ffffff;
  --dim: #6b6b6b;                       /* muted second headline line */
  --muted: rgba(255,255,255,0.55);      /* secondary text */
  --muted-strong: rgba(255,255,255,0.75);
  --border: rgba(255,255,255,0.10);
  --border-soft: rgba(255,255,255,0.07);
  --field-bg: #101010;                  /* inputs (opaque) */

  --accent: #41b3b3;                    /* teal — used sparingly */
  --accent-bright: #63cccc;             /* accent hover */

  /* surfaces & effects */
  --nav-bg: rgba(0,0,0,0.25);           /* navbar (translucent, blurred) */
  --panel-bg: rgba(18,18,18,0.6);       /* modal panel (translucent, blurred) */
  --glass-bg: rgba(0,0,0,0.15);         /* generic frosted surface */
  --hover: rgba(255,255,255,0.08);
  --hover-soft: rgba(255,255,255,0.06);
  --active: rgba(255,255,255,0.16);
  --ring: rgba(255,255,255,0.15);
  --focus-border: rgba(255,255,255,0.45);
  --placeholder: #3a3a3a;
  --shadow: rgba(0,0,0,0.6);
  --glow-1: rgba(255,255,255,0.07);     /* faint ambient hero glow */
  --glow-2: rgba(255,255,255,0.04);
  --hero-scrim: rgba(0,0,0,0.72);       /* darkens hero center behind text */
  --code-bg: #0b0b0b;
  --code-text: #ffffff;

  --radius: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --container: 1180px;
}

[data-theme="light"] {
  --bg: #ffffff;
  --text: #0d0d0d;
  --dim: #9a9a9a;
  --muted: rgba(0,0,0,0.55);
  --muted-strong: rgba(0,0,0,0.72);
  --border: rgba(0,0,0,0.12);
  --border-soft: rgba(0,0,0,0.08);
  --field-bg: #ffffff;

  --accent: #1f8f8f;                    /* darker teal for contrast on white */
  --accent-bright: #157d7d;

  --nav-bg: rgba(255,255,255,0.6);
  --panel-bg: rgba(255,255,255,0.7);
  --glass-bg: rgba(255,255,255,0.5);
  --hover: rgba(0,0,0,0.05);
  --hover-soft: rgba(0,0,0,0.04);
  --active: rgba(0,0,0,0.1);
  --ring: rgba(0,0,0,0.12);
  --focus-border: rgba(0,0,0,0.45);
  --placeholder: #b9b9b9;
  --shadow: rgba(0,0,0,0.18);
  --glow-1: rgba(0,0,0,0.04);
  --glow-2: rgba(0,0,0,0.03);
  --hero-scrim: rgba(255,255,255,0.72);
  --code-bg: #f4f4f5;
  --code-text: #0d0d0d;
  color-scheme: light;
}
```

**Accent usage rule:** teal appears ONLY on eyebrow labels, the hero CTA, link/title hover, focus rings, and tiny counts. Body text, buttons, and cards stay monochrome.

---

## 2. Typography

- **Display / body font:** Inter (via `next/font`), CSS var `--font-sans`. Weights 300–900.
- **Mono font:** JetBrains Mono, CSS var `--font-mono`. Weights 400/500/700.
- **Body:** Inter 400, `line-height: 1.65`, color `--text`.

**Headings (grotesk):**
- `font-weight: 700–800`, `letter-spacing: -0.02em` to `-0.04em` (tighter as size grows), `line-height: 0.98–1.12`.
- **Display** (hero / feature titles): weight 800, fluid size `clamp(2.1rem, 5vw, 3.6rem)` (hero up to `clamp(2.6rem, 8vw, 6rem)`).
- **Two-tone headline pattern:** first line in `--text`, second line wrapped in `.dim` (`color: var(--dim)`). Example: **"Less noise,"** (white) / *"more signal."* (grey).

**Mono micro-labels (eyebrows, tags, dates, meta, nav links):**
- `font-family: var(--font-mono)`, `text-transform: uppercase`, `letter-spacing: 0.16em–0.24em`, `font-size: 0.6rem–0.75rem`.
- Eyebrow = a number + a short rule line + a label, in `--accent`. e.g. `00 —— THE WRITING SPACE`.
- Dates/meta/tags use the same mono style but in `--muted` / `--muted-strong`.

**Case rule:** sentence case for headings & body; UPPERCASE only for the mono micro-labels.

---

## 3. Core components

**Buttons** — pill shaped (`border-radius: 999px`), `font-weight: 600`.
- Default: transparent, `1px solid var(--border)`, `color: var(--text)`; hover inverts → `background: var(--text); color: var(--bg)`.
- Solid (`--solid`): `background: var(--text); color: var(--bg)`; hover → transparent outline.

**Tags / chips** — mono, UPPERCASE, `letter-spacing: 0.16em`, pill, `font-size: ~0.66rem`. Subtle: 1px border + `--muted-strong`, or accent variant.

**Cards** — `1px solid var(--border-soft)`, `border-radius: var(--radius-xl)`, internal padding ~1.4rem. Hover: `transform: translateY(-3px)` + border brightens to `--border`. No heavy shadows.

**Inputs / textarea / select** — opaque `--field-bg`, `1px solid var(--border)`, `--radius`, `appearance: none`; focus → `border-color: var(--focus-border)`. Placeholder `--placeholder`.

**Icon buttons** — 2.2rem circle, transparent; hover `background: var(--hover-soft)`, color → `--text`.

**Links/titles** — hover turns `--accent` or gets an underline (`text-underline-offset: 3px`).

---

## 4. Navbar (fixed, frosted, no border)

Rules:
- `position: fixed; top:0; left:0; right:0; z-index:30;` so page content scrolls **under** it.
- Translucent background + blur (this is what makes the frosting visible):
- **No bottom border.**
- Layout: logo left; right cluster = theme toggle + search icon + "Write" pill, all visible at every width (no hamburger).

```css
.site-header {
  position: fixed; inset: 0 0 auto 0; z-index: 30;
  padding: 0.85rem 0;
  background: var(--nav-bg);
  backdrop-filter: blur(28px);
}
```

Because it's fixed/overlay, offset other pages' top content (e.g. `padding-top: 5.5rem`) and set `html { scroll-padding-top: 5rem; }`.

---

## 5. Search modal (dim page, frosted panel)

Rule: the **overlay only dims** the page (no blur); the **panel itself frosts** the content behind it (like the navbar). Render the modal **outside** any backdrop-filtered ancestor, or the panel's own blur won't work.

```css
.search-modal {              /* full-screen overlay */
  position: fixed; inset: 0; z-index: 60;
  display: flex; justify-content: center; align-items: flex-start;
  padding: 12vh 1.5rem 1.5rem;
  background: rgba(0,0,0,0.4);   /* just a dim — page stays visible */
}
.search-modal__panel {       /* the floating box */
  width: 100%; max-width: 560px;
  background: var(--panel-bg);
  backdrop-filter: blur(30px);   /* frosts the dimmed page behind it */
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: 0 24px 80px var(--shadow);
}
```

Behavior: autofocus the input, filter results live, `Esc` and backdrop-click close, lock body scroll while open, show `ESC` hint + result count.

---

## 6. Constellation hero (signature element)

Full-bleed `<canvas>` behind centered hero text. Drifting dots that connect with faint lines when near; clustered on the **left and right** so the **center stays clear** for the headline.

Rules:
- `min-height: 100vh`, `overflow: hidden`, content centered (eyebrow → two-tone display → mono sub → scroll-down CTA with bouncing chevron).
- **Theme-aware dots:** white on dark, dark on light — read `document.documentElement.getAttribute('data-theme')` each frame.
- **Legibility overlay** (`::after`): radial scrim darkens/lightens the center behind text + horizontal edge fade to `--bg`.
- Density scales with width; cap `devicePixelRatio` at 2; render a static frame for `prefers-reduced-motion`.

```css
.hero-stage::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 40% 56% at 50% 50%, var(--hero-scrim), transparent 72%),
    linear-gradient(90deg, var(--bg) 0%, transparent 14%, transparent 86%, var(--bg) 100%);
}
```

Canvas logic (pseudocode):
```
nodes = N points in two x-bands: [2%..40%] and [60%..98%] of width, random y, tiny velocity.
each frame:
  rgb = theme === 'light' ? '0,0,0' : '255,255,255'
  for each pair within `dist` (~12% of width): stroke line, alpha = (1 - d/dist) * 0.18
  for each node: fill dot r≈1.3, alpha≈0.8; move; bounce off its band + top/bottom
```

Logo mark echoes this: a 4-point "spark" (Gemini-style) filled in `--accent`, beside a two-tone wordmark ("Next" bold + "blogs" muted).

---

## 7. Ambient background

A fixed, very faint radial glow behind everything (no grid, no texture):

```css
body::before {
  content: ''; position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background:
    radial-gradient(45% 35% at 15% 0%, var(--glow-1), transparent 70%),
    radial-gradient(40% 30% at 90% 5%, var(--glow-2), transparent 70%);
}
```

---

## 8. Layout, width & motion

- Center content in `.container` (`max-width: var(--container) /* 1180px */; padding: 0 1.5rem`).
- Article body reading measure ≈ `68ch` (`.article__content`).
- Transitions: `0.2s ease` on color/background/border/transform. Hover lift `translateY(-3px)`. Chevron bob ~1.8s. Everything off under `@media (prefers-reduced-motion: reduce)`.

### Column widths (keep these consistent)

- **Blog page** is a two-column grid: `grid-template-columns: minmax(0, 1fr) 300px` with `gap: 3.5rem`. The main column is fluid `1fr` (≈ **776px** inside the 1180 container) and the right rail is a fixed **300px**.
- **Write/composer page** is a single centered column (`.narrow`) whose `max-width` is set to **776px** — deliberately matched to the blog's main column so the editor and the published article are the same width.
- Rule: if you change the container width, the rail width, or the gap, recompute and update `.narrow` so `write width === blog main column` (`narrow = container − rail − gap`).

## 8.1 Responsiveness (mobile-first, must work at every width)

Breakpoints used throughout: **768px** (tablet), **992px** (desktop two-column), **1180px** (max container).

- **Single column by default.** All multi-column layouts (home feed + Index rail, article + Related rail, post grid, composer meta row) stack into one column on small screens and only split at their breakpoint:
  - Post grid: 1 col → 2 cols `@768` → 3 cols `@992`.
  - Home feed / article: stacked → `main + sidebar` `@992`; sidebars become `position: sticky; top: 6rem` only at `@992+`.
  - Composer author/category row: 1 col → 2 cols `@768`.
- **Navbar shows the full bar at every width** (logo + theme toggle + search + Write) — no hamburger/drawer. Keep nav items compact so they fit narrow screens.
- **Fluid type.** Headlines use `clamp()` so they scale down on phones (e.g. hero `clamp(2.6rem, 8vw, 6rem)`); never set fixed huge px sizes.
- **Fluid widths.** Use `minmax(0, …)` / `max-width` + `%`/`fr`, never fixed pixel widths that can overflow. `.container` padding (`1.5rem`) keeps content off the edges; capped columns shrink below their max via `minmax(0, …)` or `max-width`.
- **Hero & overlays** are `100vh` / `inset: 0` and fluid; the constellation reseeds on `resize`. Modals use `vh`-based padding and `max-width` with `width: 100%`.
- **Touch-friendly:** interactive targets ≥ ~2.2rem; the search icon + theme toggle stay reachable on mobile.
- **Always verify** the layout at ~360px, 768px, 992px, and ≥1180px before shipping.

---

## 9. Quick checklist for the agent

- [ ] All colors come from CSS variables; dark in `:root`, light in `[data-theme="light"]`.
- [ ] Inter for text, JetBrains Mono for UPPERCASE labels.
- [ ] Headlines heavy + tight; two-tone (white line + `.dim` line) for hero/feature.
- [ ] Teal accent only on eyebrows/CTA/hover/focus.
- [ ] Pill buttons, hairline-bordered cards with hover lift, opaque inputs.
- [ ] Navbar: fixed, translucent + `backdrop-filter: blur(28px)`, no border, content scrolls under.
- [ ] Search modal: dim overlay + blurred translucent panel; rendered outside any blurred ancestor.
- [ ] Constellation hero: side clusters, clear center, theme-aware dots, scrim + edge fade, reduced-motion fallback.
- [ ] Responsive: single column on mobile, splits at 768/992; fluid `clamp()` type; no fixed widths that overflow; verified at 360 / 768 / 992 / 1180.
- [ ] Write column width == blog main column width (`.narrow` matches the article `1fr` column).
- [ ] Calm 0.2s motion; respect `prefers-reduced-motion`.
```
