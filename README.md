# Nextblogs

**Words in black & white.** A fast, minimalist, **no-accounts** blogging app. Backed by **SQLite** — a local file in development, serverless SQLite (Turso) in production.

Built with **Next.js 16** and **React 19**, styled with hand-written, token-driven CSS (no framework), and themeable between a bold monochrome **dark** and a clean **light** mode.

---

## Highlights

- **Lightweight data** — posts and comments live in SQLite (a local file in dev, Turso in prod); no heavyweight backend.
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
| Data      | SQLite via libSQL — local file in dev, Turso (serverless) in prod |
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

No environment variables are required locally (a SQLite file is created automatically).

---

## How it works

```
Browser ──► React contexts ──► /api routes ──► lib/db.ts ──► SQLite (libSQL)
```

- **`lib/db.ts`** — the entire data layer (SQLite via libSQL). Locally it uses a file at `storage/nextblogs.db`; in production it connects to Turso. IDs are short, URL-safe 8-character strings.
- **`app/api/*`** — Next 16 route handlers: `blog` (list/create), `blog/[id]` (read/update/delete), `comment` (create), `comment/[id]` (delete).
- **`context/*`** — client providers that fetch the API once and expose `blogs` + CRUD actions to the UI.
- **`components/common/hero/Hero.tsx`** — the canvas constellation; reads `data-theme` to draw dark dots on light, light dots on dark.
- **Theming** — every color is a token. Dark values live in `:root`, light under `[data-theme="light"]`; the toggle flips one attribute on `<html>`.

---

## Project structure

```
app/                 Routes + API handlers
  api/               blog & comment endpoints
  blog/[id]/         post page
  write/             composer
  layout.tsx         fonts, no-flash theme script, header
components/
  common/            Logo, ThemeToggle, header, hero, search, editor, cards
  blog/  main/       full-post view & home feed
context/             blog + comment providers
lib/                 db.ts (SQLite/libSQL), format.ts (dates, excerpt, reading time)
types/               shared TypeScript interfaces
config/              brand identity
styles/              globals.css (design system) + tiptap.css (post content)
storage/             nextblogs.db local SQLite + optional seed json (git-ignored)
public/              favicon / assets
```

---

## Data

The app uses **SQLite** through **libSQL** (`@libsql/client`).

- **Local dev:** a real SQLite file is created at `storage/nextblogs.db` automatically — no setup. If a `storage/blogs.json` seed file is present, it's imported once on first run.
- **Production (Vercel):** a serverless filesystem can't persist a local `.db`, so point the app at **Turso** (hosted SQLite, free tier) with two env vars:

  ```
  TURSO_DATABASE_URL=libsql://<your-db>.turso.io
  TURSO_AUTH_TOKEN=<token>
  ```

Create one with the Turso CLI:

  ```bash
  turso db create nextblogs
  turso db show --url nextblogs        # -> TURSO_DATABASE_URL
  turso db tokens create nextblogs     # -> TURSO_AUTH_TOKEN
  ```

Add those to your Vercel project's Environment Variables and redeploy. The schema is created automatically on first request.

---

## Scripts

| Command          | Does                     |
| ---------------- | ------------------------ |
| `npm run dev`    | Start the dev server     |
| `npm run build`  | Production build         |
| `npm start`      | Run the production build |
| `npm run lint`   | ESLint                   |
| `npm run format` | Prettier                 |
