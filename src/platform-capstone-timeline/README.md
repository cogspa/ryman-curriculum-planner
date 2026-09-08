# September pLAtform Capstone Timeline

A timeline graphic for the pLAtform curriculum site: the six September dates left to
right on a horizontal spine (day gaps labelled between markers), then the September 19
showcase expanded into an 11:00–3:30 run-of-show ruler and two-column schedule. Built in the pLAtform design system (oxblood #8b3a2f, paper #f5efe1,
Newsreader, IBM Plex Mono).

## What's in the box

| File | Use it for |
| --- | --- |
| `src/CapstoneTimeline.jsx` | Drop-in React component for the pLAtform site. No dependencies beyond React. |
| `capstone-timeline.html` | Self-contained single file (React, fonts and styles inlined). Open it, email it, or drop it on Netlify as-is. |
| `capstone-timeline.png` | 2x PNG of the horizontal desktop layout (2480 px wide) for Slack, email, or slides. |
| `PROMPT.md` | Paste into Cursor / Windsurf / Claude Code to wire the component into the site. |
| `package.json`, `vite.config.js`, `index.html`, `src/main.jsx` | Standalone Vite scaffold so you can run it on its own. |

## Run it standalone

```bash
npm install
npm run dev            # local preview (add ?vertical to the URL for the stacked version)
npm run build          # dist/ for Netlify
npm run build:single   # dist-single/index.html, one self-contained file
```

## Editing dates and copy

Everything is driven by the `DATA` block at the top of `src/CapstoneTimeline.jsx`.

- Each entry in `days` is one row on the spine. `kind` sets the marker:
  `off` (hollow grey), `class` / `review` / `offsite` (hollow oxblood),
  `deadline` (solid diamond), `showcase` (large solid dot).
- A day with a `schedule` array gets the ruler and the run-of-show list.
  `start` / `end` are minutes after 11:00 AM and position the blocks;
  a `start === end` entry with `lane: "back"` becomes the marker above the bar
  (currently catering at 12:45). `short` is the label used inside the ruler when it fits.
- `speakers` on an entry renders the numbered speaking order (opening remarks).

## Behaviour

- `<CapstoneTimeline />` is horizontal by default; `orientation="vertical"` gives the
  stacked version. Below 720 px the horizontal layout stacks automatically, so phones
  always get the vertical spine.
- Past dates are dimmed automatically. Pass `today={new Date("2026-09-20")}` to preview
  a later state, or `showToday={false}` to hide the "Today is…" line (the PNG omits it).
- Below 640 px the ruler switches to a compact scale and the schedule drops to one column.
- A print stylesheet gives a clean white one-sheet (`Ctrl/Cmd+P`).

Assumes the host site already loads Newsreader (400, 400 italic, 500) and IBM Plex Mono (400),
which the pLAtform site does. The standalone scaffold pulls them from `@fontsource`.
