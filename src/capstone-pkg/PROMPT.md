# PROMPT.md — paste into Cursor / Windsurf / Claude Code

Two prompts. Run **Prompt 1** to wire the files in. Run **Prompt 2** only if
you want the footer on every page rather than just the Capstone page.

---

## Prompt 1 — install the Capstone brief page and footer

```
I'm adding two React components to my Vite + React site (pLAtform, the Ryman
Arts curriculum site). Both files are already written and self-contained —
they need wiring, not rewriting.

FILES
  src/components/CapstoneWorldBuilding.jsx  — the full Capstone brief page
  src/components/CapstoneFooter.jsx         — a giant footer version of the
                                              same brief, all in-page anchors

CONSTRAINTS — do not violate these:
- Do NOT add dependencies. Both files are plain React + inline <style>. No
  Tailwind, no styled-components, no CSS modules, no icon libraries.
- Do NOT extract the CSS into separate files. The scoped `cap-` / `cf-`
  prefixes and the inline <style> block are deliberate so these drop into any
  page without colliding with existing site styles.
- Do NOT rename the section ids. CapstoneFooter links by anchor to
  #cap-start, #cap-hero, #cap-brand, #cap-statement, #cap-website,
  #cap-video, #cap-print, #cap-campaign, #cap-close — all of which live in
  CapstoneWorldBuilding.jsx. Renaming either side breaks every footer link.
- Do NOT convert the footer's anchor links into router <Link>s while it sits
  on the brief page. They are same-page anchors on purpose.

TASKS
1. Add a route for the brief page at whatever path matches this project's
   existing route conventions — check the router setup first and follow it
   rather than assuming. Report the path you chose.
2. Render <CapstoneFooter /> at the bottom of the brief page, inside the same
   page component, below the closing section.
3. Add smooth-scroll offset handling IF this site has a fixed/sticky header:
   set `scroll-margin-top` on the `[id^="cap-"]` sections equal to the header
   height, so anchored sections don't land underneath it. If there's no fixed
   header, skip this and say so.
4. Verify the build compiles and the page renders. Then confirm each of the
   nine anchors resolves to a real section — list any that don't.

Do not change anything else in the project.
```

---

## Prompt 2 — put the footer on every page

Only run this if you want the Capstone deadline visible site-wide.

```
I want <CapstoneFooter /> at the bottom of every page, not just the Capstone
brief page.

The footer's links are in-page anchors (#cap-hero etc.), which only resolve on
the page that contains those sections. To work site-wide it needs two props:

  basePath      the path the Capstone brief page lives at, e.g. "/capstone"
  linkComponent this project's router Link component

TASKS
1. Find the layout or root component that wraps all routes.
2. Render the footer there with both props set, e.g.:

     import { Link } from "react-router-dom";
     import CapstoneFooter from "./components/CapstoneFooter";
     ...
     <CapstoneFooter basePath="/capstone" linkComponent={Link} />

   Use whatever the actual router is in this project — read it first, don't
   assume react-router-dom.

3. IMPORTANT: on the Capstone brief page itself, the footer should stay in
   same-page mode. Either render it without props there, or pass basePath
   conditionally based on the current route. Pick whichever fits the existing
   layout structure and explain the choice.

4. Confirm that clicking a footer link from a different page lands on the
   brief page scrolled to the right section — hash navigation on route change
   often needs a scroll-restoration effect. Add one if this project lacks it.
```

---

## Optional — sync the checkboxes

The brief page has a per-part "Mark done" checkbox. By default that state is
React-only and resets on reload, and the footer shows all seven as untouched.

To persist it and have the footer reflect it, open
`CapstoneWorldBuilding.jsx`, find `useChecklist()`, and swap the body for the
commented-out version directly above it:

```js
const [done, setDone] = useState(() =>
  JSON.parse(localStorage.getItem("platform.capstone") || "{}"));
useEffect(() => localStorage.setItem(
  "platform.capstone", JSON.stringify(done)), [done]);
```

The footer already reads that same key (`platform.capstone`) inside a
try/catch, so no change is needed on the footer side — checked parts turn
solid cream and the count line updates.

This is per-browser, not per-student across devices. If you want real
per-student state, that's a Supabase table, not localStorage — worth doing
separately.

---

## Props reference

### `<CapstoneWorldBuilding />`
No props. Self-contained.

### `<CapstoneFooter />`

| Prop | Default | What it does |
|---|---|---|
| `basePath` | `""` | Empty = same-page anchors. Set to the brief's path for site-wide use. |
| `linkComponent` | — | Your router's `Link` (receives `to`). Only needed with `basePath`. |
| `progress` | reads localStorage | `{hero: true, brand: true, …}` to drive the pill states directly. |
| `showcase` | Sept 19 | `{ label, month, day }` — **month is 0-indexed** (8 = September). |

---

## If the showcase date moves

Change it in two places:

1. `CapstoneWorldBuilding.jsx` → `SHOWCASE` const near the top
2. `CapstoneFooter.jsx` → `SHOWCASE_DEFAULT` const near the top, or pass the
   `showcase` prop instead

Both compute the days-out count live and roll to next year once the date
passes, so nothing goes stale mid-term.

---

## Design system

Locked to pLAtform tokens. If you restyle, keep these:

```
oxblood        #8b3a2f
oxblood deep   #6d2a21
paper cream    #f5efe1
display        Newsreader
mono / utility IBM Plex Mono
```

Both files load Newsreader and IBM Plex Mono via `@import` at the top of their
`CSS` string. **If the fonts are already loaded globally on pLAtform, delete
those two `@import` lines** — duplicate font loads slow first paint.
