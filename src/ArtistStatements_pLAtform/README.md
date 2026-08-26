# Real Artist Statements — pLAtform lesson component

Converted from `Real_Artist_Statements_Image_Edition.pptx` (11 slides) into a single
self-contained React component for the pLAtform curriculum site.

## What's inside

```
src/components/ArtistStatements.jsx        the deck + drafting tool (styles inlined)
src/assets/artist-statements/
  anadol-infinite-space.jpg                Example 02 image
  headlands-installation.jpg               Example 04 image
  lopez-swimmers.jpg                       Example 05 image
PROMPT.md                                  paste-ready prompt for Cursor / Windsurf / Claude Code
```

## Install

1. Drop `src/components/ArtistStatements.jsx` and `src/assets/artist-statements/` into the
   pLAtform Vite project (paths in the import lines assume that layout — adjust if yours differs).
2. Route it wherever the Capstone prep lessons live, e.g.

```jsx
import ArtistStatements from "./components/ArtistStatements";
// <Route path="/capstone/artist-statements" element={<ArtistStatements />} />
```

No new dependencies. React 18+, Vite image imports.

## What it does

- 11 slides, same order and content as the deck: title → what to look for → six examples
  (with the three deck images) → compare the voices → apply it → reference library.
- All nine "read full statement" links preserved (Madison Square Park, ARTECHOUSE,
  mandygreer.org, Headlands ×2, Yale Center for British Art ×3, christopherdurst.com).
- Keyboard: ← → / PageUp PageDown to move, Home / End to jump, `?` toggles the index.
- Left index rail on desktop; on mobile it becomes a full-screen list behind the Index button.
- **Move meter** — a four-cell WHAT / WHY / HOW / INTENT strip on every example, filled for
  the moves that statement demonstrates most clearly. It's the deck's "read for structure"
  idea made visible; the fills are editorial calls, set per example in the data at the top of
  the file (`moves: [...]`) and easy to change.
- **Draft your statement** (slide 10) is a live tool: four fields matching the structure slide,
  per-field word counts, a total against the 100–175 target with a bar and coaching line,
  "read it as one piece" preview, Copy / Download .txt / Clear. Drafts persist in
  localStorage under `platform.artist-statement.draft.v1` (guarded — works without it).

## Design system

oxblood `#8b3a2f`, paper cream `#f5efe1`, IBM Plex Mono (UI / labels), Newsreader
(display / quotes). Fonts load via a Google Fonts `@import` inside the component's `<style>`;
delete that line if the site already loads them globally. Every class is prefixed `as-` so it
won't collide with other lesson components.

## Editing content

All copy lives in constants at the top of the file (`EXAMPLES`, `PAIR`, `EMERGING`, `VOICES`,
`STRUCTURE`, `REFERENCE_LIBRARY`). Add an example by pushing to `EXAMPLES` or `EMERGING`;
the index, dots, and counter update automatically.
