# IDE prompt — add the Capstone timeline to the pLAtform curriculum site

Paste the block below into Cursor, Windsurf, or Claude Code from the root of the
pLAtform curriculum repo, with `CapstoneTimeline.jsx` from this ZIP placed alongside it.

---

Add a "September Capstone Timeline" page to this React/Vite site using the component in
`CapstoneTimeline.jsx` (in the repo root — move it as described below). Do not restyle it;
it already follows the site's design system (oxblood #8b3a2f, paper #f5efe1, Newsreader,
IBM Plex Mono) and scopes all of its CSS under `.cap-timeline`.

1. Move `CapstoneTimeline.jsx` into the components folder used by the other curriculum
   components (find where components like `SwatchForge.jsx`, `MirrorLab.jsx`, or
   `PitchDeckStructure.jsx` live and put it there).
2. Register it as a page in the same way the Capstone assignment page
   ("Creating in a World-Building Context") is registered — same router pattern,
   same layout wrapper. Suggested path: `/capstone/timeline`, title
   "September Capstone Timeline".
3. Add a link to it in the site navigation next to the Capstone assignment page,
   and add a short "View the September timeline" link at the top of the Capstone
   assignment page itself.
4. Confirm the site already loads Newsreader (weights 400, 400 italic, 500) and
   IBM Plex Mono (400). If any weight is missing, add it wherever the site loads its
   fonts; do not add a second font-loading mechanism.
5. The component takes no required props. It renders horizontally by default and stacks
   itself below 720 px; pass `orientation="vertical"` only if a page needs the stacked
   version on desktop. It dims past dates automatically using the browser date. Leave
   `showToday` at its default.
6. Do not add any dependencies. Run the dev server, open the new route at desktop and
   at 390 px wide, and confirm: on desktop six dates run left to right on one level
   spine with day-gap labels between markers, and below it a "Run of show" section
   with a time ruler from 11 AM to 3:30, a catering marker above the bar, and a
   two-column schedule; at 390 px the dates stack vertically and the schedule is one column.
7. Commit as `feat: add September Capstone timeline page`.

If the site has a shared page-header component, use it for the page title and remove
the `<h1>` inside `CapstoneTimeline.jsx`'s `<header>` so the title isn't duplicated —
but keep the `cap-head` element and its bottom rule.
