# FilmReferenceGallery — pLAtform curriculum component

The "Independent Animation: Essential Short Films" watchlist, converted from the
standalone HTML gallery into a single self-contained React component styled in
the pLAtform design system (oxblood `#8b3a2f`, paper cream `#f5efe1`,
IBM Plex Mono + Newsreader).

## Contents

```
FilmReferenceGallery.jsx      the component (data + styles + UI in one file)
assets/
  thumb-local-1.jpg           Rope Dance frame (was 280KB base64 → 11KB jpg)
  thumb-local-2.jpg           Tale of Tales frame (was 518KB base64 → 18KB jpg)
  thumb-local-3.jpg           Father and Daughter frame (was 557KB base64 → 27KB jpg)
PROMPT.md                     IDE-ready integration prompt (Cursor / Claude Code)
```

## Install

1. Copy `FilmReferenceGallery.jsx` into your components directory
   (e.g. `src/components/`).
2. Copy the `assets/` folder **next to the component** — the three local
   thumbnails are imported with relative paths (`./assets/thumb-local-1.jpg`),
   so Vite hashes and bundles them automatically.
3. Route or render it:

```jsx
import FilmReferenceGallery from "./components/FilmReferenceGallery";
// ...
<FilmReferenceGallery />
```

No props, no external deps beyond React. Fonts load via a Google Fonts
`@import` inside the component's scoped `<style>` block — remove that line if
pLAtform already loads IBM Plex Mono + Newsreader globally.

## What changed from the HTML version

- Filter buttons → `useState` era filter with `aria-pressed` + live count.
- The 3 base64 screenshot thumbnails (~1.3MB) extracted to compressed JPEGs
  (~57KB total) and imported as Vite assets. All YouTube / Archive.org /
  vumbnail thumbnails stay as remote URLs with `loading="lazy"`.
- Restyled from the original Inter/Georgia + orange palette to the pLAtform
  system: oxblood accent, paper cream background, Newsreader display/serif,
  IBM Plex Mono for meta, filters, numbers, and link chips. Primary "Watch"
  link renders as a filled oxblood chip.
- All class names prefixed `frg-` and scoped under a `.frg` root so the
  component can't leak styles into the rest of the curriculum site.
- Kept: era filtering (1960s–70s / 1980s / 1990s–2000s / Collections),
  numbered badges, play button overlay, the Houndstooth channel card variant,
  print stylesheet, availability footer note. Added keyboard focus rings and
  `prefers-reduced-motion` support.

## Editing the list

All 20 entries live in the `FILMS` array at the top of the file — add a card by
appending an object with `number, era, title, creator, meta, note, img, alt,
watchUrl, links[]`. New eras just need a matching entry in `ERAS`.
