# Pigment Index — pLAtform edition

Digital painting tips encyclopedia harvested from @cogspa's saved Instagram posts,
rebuilt as a single React component in the pLAtform design system
(oxblood #8b3a2f · paper cream #f5efe1 · IBM Plex Mono · Newsreader).

## What's in the box

    src/PigmentIndex.jsx     the whole site: grid, search, categories, sort, detail modal
    public/pigment-data.json SAMPLE ONLY — replace with your real file
    tools/harvest-v2.js      improved harvester (fixed parsing, retry, resume, merge)
    PROMPT.md                paste-ready prompt for Cursor / Windsurf / Claude Code

## Install into the pLAtform curriculum site (2 min)

1. Copy `src/PigmentIndex.jsx` into your components folder.
2. Copy YOUR existing `pigment-data.json` into `/public` (the one included here is a
   6-entry sample with blank images so the repo runs out of the box).
3. Route or render it:

   ```jsx
   import PigmentIndex from './components/PigmentIndex';
   <PigmentIndex />                              // fetches /pigment-data.json
   <PigmentIndex jsonPath="/data/pigment.json" /> // or a custom path
   <PigmentIndex data={importedJson} />           // or pass data directly
   ```

No other dependencies. Styles and fonts are embedded in the component.

## It works with your CURRENT data file

The component accepts both formats:

- **v1** (your existing harvest.js output) — captions still carry the
  `"807 likes, 26 comments - user on DATE:"` prefix. The component parses that
  prefix at load time into author / likes / date, extracts #hashtags as tags,
  and auto-categorizes every entry. So you can ship today without re-harvesting.
- **v2** (tools/harvest-v2.js output) — the same fields, but stored clean at
  harvest time, plus retry/resume so a crash at post 180/239 doesn't lose the run.

## Why harvest v2 exists

Your v1 regex looked for `on Instagram: "..."` in og:description, but Instagram's
actual format is `N likes, N comments - user on DATE: "..."` — so the strip never
matched and every caption kept the prefix. v2 fixes the parse AND keeps the
metadata (likes, date, username) as sortable fields. To run it: open harvest-v2.js,
paste your URLS array from v1 where marked, then paste the whole thing into the
console on instagram.com. Optionally set `window.PIGMENT_PREV = <old json>` first
so failed posts keep their previous image/caption instead of going blank.

## Curation

- `HIDDEN` (top of PigmentIndex.jsx): post codes excluded from the index. A few
  non-painting saves (fly tying, a Cure video, IG-growth spam) are pre-listed.
- `CATEGORIES`: ordered keyword rules, first match wins. Tune freely; anything
  unmatched lands in "Field Notes".

## Known constraint

Instagram CDN image URLs are signed and expire after a few weeks. When one dies,
the card shows a cream/oxblood "image expired" placeholder and the detail view
offers the live Instagram embed instead. Re-run harvest-v2.js to refresh URLs
(the footer reminds you). The live embed only works on http/https, not file://.
