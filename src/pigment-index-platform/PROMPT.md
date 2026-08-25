# IDE PROMPT — Pigment Index integration

Paste this into Cursor / Windsurf / Claude Code from the pLAtform curriculum repo root:

---

Integrate the Pigment Index component into this React/Vite site.

1. Copy `PigmentIndex.jsx` from the pigment-index-platform package into
   `src/components/`. It is fully self-contained (embedded styles + Google Fonts
   import for IBM Plex Mono and Newsreader); do not extract or refactor its CSS.
2. Copy my real `pigment-data.json` (239 entries, v1 harvest format) into
   `/public/pigment-data.json`, replacing the 6-entry sample. Do not transform the
   JSON — the component normalizes the v1 caption-prefix format at load time.
3. Add a route `/pigment-index` rendering `<PigmentIndex />`, and add a nav link
   labeled "Pigment Index" wherever the site's other tools are linked.
4. Verify: dev server shows the cream/oxblood grid, category chips with counts,
   search filters live, sort by newest/most liked/author works, clicking a card
   opens the detail modal, Escape closes it, and cards with dead image URLs show
   the striped "image expired" placeholder instead of a broken image icon.
5. Do not change the design tokens: oxblood #8b3a2f, paper cream #f5efe1,
   IBM Plex Mono for utility text, Newsreader for display/body.

