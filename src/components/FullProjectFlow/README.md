# FullProjectFlow — Capstone footer component

A self-contained React component demonstrating the phased Capstone
development & presentation flow using the ZARK example project:

1. **00 · The initial sketch** — blue-pencil sketchbook photo
2. **01 · The refined layout board** — auto-animating tour of the ink
   layout strip; each of the six sections is spotlighted and zoomed in
   sequence (pauses on hover, dots jump to any phase, respects
   prefers-reduced-motion)
3. **02 · The six phases** — each panel cropped from the board with
   its description
4. **03 · The finished site example** — thumbnail of the standalone
   ZARK project website; clicking opens the full site in a
   full-screen overlay (iframe) with a "← Back to Capstone" button.
   Esc also closes it. The site keeps its own style (Courier, light
   blue) by design — it's the example deliverable, not a pLAtform
   page. It lives untouched at `assets/zark-site.html` and is loaded
   via Vite's `?raw` import into an iframe `srcDoc`, so its HTML/CSS
   can never collide with the site's styles.
5. Branding strip footer ("Branded throughout — logo ZARK")

Follows the pLAtform design system: oxblood `#8b3a2f`, paper cream
`#f5efe1`, IBM Plex Mono (labels), Newsreader (body). All styles are
inline — no CSS file required. Assumes the site already loads the
IBM Plex Mono and Newsreader webfonts (it does).

## Install

Copy the whole `FullProjectFlow/` folder into `src/components/`, then
in the Capstone page:

```jsx
import FullProjectFlow from "./components/FullProjectFlow/FullProjectFlow";

// at the bottom of the Capstone page, above the site footer:
<FullProjectFlow />
```

Images are imported as Vite assets from `./assets/`, so no public/
setup is needed.

## Editing copy

All six phase descriptions live in the `PHASES` array at the top of
`FullProjectFlow.jsx`. Phases 2 (Rendered Environments), 3 (Character
Development), and 6 (Closing Statement) are placeholder copy pending
final text.

## Swapping art

To update the website example, replace `assets/zark-site.html` with
a newer export of the standalone site (it must stay fully
self-contained: inline images, no relative asset paths) and
regenerate `assets/zark-site-thumb.jpg` from a screenshot of it.

`PANEL_PX` defines each panel's pixel region within
`assets/zark-strip.png`. To replace the sketch with final rendered
art, either update the strip image + regions, or replace each phase's
crop `div` with an `<img>` — layout is independent of the crops.
