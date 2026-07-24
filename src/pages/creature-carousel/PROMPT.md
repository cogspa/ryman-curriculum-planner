# IDE prompt — extending Creature Carousel

Paste into Claude Code / Cursor from the project root.

---

This project renders `src/CreatureCarousel.jsx`: an infinite marquee of transparent creature
PNGs on bone-colored specimen cards over an ink-slate field. Loop math: two identical groups,
one measured via ResizeObserver, track animates by `groupWidth + gap`; `speed` is px/sec and
duration is derived. Tokens live at the top of `CreatureCarousel.css`
(`--field #12161a`, `--card #dcd7c9`, `--ink #1b1f23`, `--brass #a8862f`, `--rule #2c333a`).
Type: Bodoni Moda (display) + IBM Plex Mono (labels).

Keep these invariants when you change anything:
- speed stays constant in px/sec; never hardcode an animation duration
- the seam must stay invisible — any padding/gap change must flow into the measured distance
- `prefers-reduced-motion` keeps a usable non-animated strip
- Pause/Resume stays keyboard reachable with a visible focus ring

Tasks:
1. Add a second strip below the first running `direction="right"` at 0.7× speed, sharing
   the same items reversed.
2. Add a `variant="plate" | "bare"` prop — `bare` drops the card, tag, and border, leaving
   silhouettes floating on the field.
3. Add click-to-inspect: clicking a card opens a centered overlay with that specimen at 3×,
   its filename, and prev/next arrows. Esc closes, focus returns to the card.
4. Add pointer drag-to-scrub on the viewport that offsets the animation without breaking the
   loop, and resumes from the dragged position on release.
