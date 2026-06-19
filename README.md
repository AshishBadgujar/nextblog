# Nextblogs

**Words in black & white.** A fast, fully **offline** blogging app — no database, no cloud, no accounts. Your posts live as plain files on your own machine.

Built with **Next.js 16** and **React 19**, styled with hand-written, token-driven CSS (no framework), and themeable between a bold monochrome **dark** and a clean **light** mode.

---

## Highlights

- **Offline-first** — posts and comments are stored as JSON files (`storage/`); no DB server, no calls to an external backend.
- **Open by design** — no login. Anyone can read, write, edit, and delete. Posts carry a free-text author name; comments are anonymous (optional name).
- **Dark & light themes** — one click in the navbar, persisted to `localStorage`, applied before first paint (no flash).
- **Bold, framework-free UI** — a single hand-authored stylesheet driven entirely by CSS variables.
- **Animated hero** — a live `<canvas>` constellation that adapts to the active theme.
- **Rich text editing** — a TipTap editor with headings, lists, quotes, code, alignment, links, and YouTube embeds.
- **Instant search** — a frosted command-palette-style modal that filters posts live.

---

## Tech stack

| Area      | Choice                                                          |
| --------- | --------------------------------------------------------------- |
| Framework | Next.js 16 (App Router) · React 19 · TypeScript                 |
| Styling   | Hand-written CSS with CSS-variable theming (no Tailwind/daisyUI) |
| Fonts     | `next/font` — Inter (display/body) + JetBrains Mono (labels)    |
| Editor    | TipTap                                                          |
| Icons     | Remix Icon (editor toolbar)                                     |
| Data      | Plain JSON files via Node `fs` (`lib/db.ts`)                    |
| Tooling   | ESLint (flat config) · Prettier                                |

---

## Getting started

Requirements: **Node.js 20.9+**

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

No environment variables are required.

---

## How it works

```
Browser ──► React contexts ──► /api routes ──► lib/db.ts ──► storage/*.json
```

- **`lib/db.ts`** — the entire data layer. Reads/writes `storage/blogs.json` and `storage/comments.json` with small CRUD helpers. IDs are short, URL-safe 8-character strings.
- **`app/api/*`** — Next 16 route handlers: `blog` (list/create), `blog/[id]` (read/update/delete), `comment` (create), `comment/[id]` (delete).
- **`context/*`** — client providers that fetch the API once and expose `blogs` + CRUD actions to the UI.
- **`components/common/hero/Hero.tsx`** — the canvas constellation; reads `data-theme` to draw dark dots on light, light dots on dark.
- **Theming** — every color is a token. Dark values live in `:root`, light under `[data-theme="light"]`; the toggle flips one attribute on `<html>`.

---

## Project structure

```
app/                 Routes + API handlers
  api/               blog & comment endpoints (file-based)
  blog/[id]/         post page
  write/             composer
  layout.tsx         fonts, no-flash theme script, header
components/
  common/            Logo, ThemeToggle, header, hero, search, editor, cards
  blog/  main/       full-post view & home feed
context/             blog + comment providers
lib/                 db.ts (JSON store), format.ts (dates, excerpt, reading time)
types/               shared TypeScript interfaces
config/              brand identity
styles/              globals.css (design system) + tiptap.css (post content)
storage/             blogs.json + comments.json (git-ignored, auto-created)
public/              favicon / assets
```

---

## Data

| Data     | Location                |
| -------- | ----------------------- |
| Posts    | `storage/blogs.json`    |
| Comments | `storage/comments.json` |

These are git-ignored, so your content stays local and a fresh clone starts empty. Delete the files to reset.

---

## Scripts

| Command          | Does                     |
| ---------------- | ------------------------ |
| `npm run dev`    | Start the dev server     |
| `npm run build`  | Production build         |
| `npm start`      | Run the production build |
| `npm run lint`   | ESLint                   |
| `npm run format` | Prettier                 |
