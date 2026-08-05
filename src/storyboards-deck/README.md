# Storyboards — pLAtform Lesson Deck

A 23-slide React presentation converted from the Storyboards lesson PDF, with every
image extracted from the original document (rotation-corrected film stills included)
and restyled in the pLAtform design system.

## Contents

```
src/
  Storyboards.jsx              ← the deck (default export, no required props)
  assets/storyboards/          ← 23 extracted + cleaned JPGs
```

## Install

1. Drop `src/assets/storyboards/` into your Vite project's `src/assets/`.
2. Drop `Storyboards.jsx` into `src/` (or wherever your lesson components live).
3. Route or render it:

```jsx
import Storyboards from "./Storyboards";
<Storyboards />
```

Vite resolves the `import img from "./assets/..."` statements at build time —
no config needed.

## Deck structure

- **01–07** History & method: origins, Webb Smith / Three Little Pigs, card
  sorting, A Trip to the Moon, evolution timeline + Gone with the Wind,
  "keep it short" (6–12 rectangles)
- **08** Shot-type chart overview
- **09–23** Shot language: ten framings (Establishing → POV), interleaved with
  film examples — The Piano ×2, Citizen Kane, Chinatown

## Controls

- ← / → arrows or Space to advance
- Prev / Next buttons + dot rail
- Slide counter button (top right) opens a full index drawer
- Reduced-motion respected; split layouts stack below 760px

## Design system

oxblood `#8b3a2f` · paper cream `#f5efe1` · Newsreader (display) ·
IBM Plex Mono (labels/UI). Google Fonts loaded via `<link>` inside the
component — remove that line if fonts are already loaded app-wide.
