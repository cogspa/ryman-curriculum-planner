# Creature Carousel

An infinite, constant-speed silhouette strip built from your creature sheet. The sheet was
segmented into 20 individual specimens, background removed, alpha-trimmed, and normalized to
300px tall.

```
npm install
npm run dev
```

## Structure

```
src/
  CreatureCarousel.jsx   the component
  CreatureCarousel.css   tokens + strip styles
  specimens.js           auto-loads assets/specimens/*.png via import.meta.glob
  assets/specimens/      specimen-01.png … specimen-20.png (transparent, 300px tall)
  App.jsx                demo page
```

Add or remove a PNG in `assets/specimens/` and the strip picks it up on reload — no manifest
to edit, no widths to set. Card width follows each drawing's aspect ratio.

## Props

| prop | default | notes |
| --- | --- | --- |
| `items` | `[]` | `[{ src, alt }]` |
| `height` | `180` | artwork height in px; card sizes itself around it |
| `speed` | `55` | **pixels per second** — stays constant as you add specimens |
| `gap` | `18` | px between cards |
| `direction` | `"left"` | or `"right"` |
| `pauseOnHover` | `true` | Pause/Resume button covers touch and keyboard |
| `label` | `"Plate 01 …"` | eyebrow text |

## How the loop works

Two identical groups render side by side. One group is measured with a `ResizeObserver`, and
the track animates `translate3d(0)` → `translate3d(-(groupWidth + gap))`. When the first group
has fully exited, the second sits exactly where the first started, so the seam never shows.
Duration is derived (`distance / speed`), which is why speed is expressed in px/sec rather than
as an animation duration — the strip reads at the same pace whether it holds 6 specimens or 60.

The brass marker under the strip runs on the same duration, so it reads as loop position.

`prefers-reduced-motion` swaps the animation for a native scroll-snap strip.

## Regenerating specimens from a new sheet

`tools/segment_sheet.py` cuts a fresh sheet the same way: threshold the ink, dilate to bind
each figure's loose parts, label connected components, trim on alpha, normalize height.

```
python3 tools/segment_sheet.py my-sheet.png src/assets/specimens
```

Overlapping figures merge into one crop — the script prints any box wider than expected so you
can set a manual split column.
