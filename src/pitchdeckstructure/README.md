# Structuring a Pitch Deck — pLAtform lesson presentation

An 18-slide React presentation: **How to turn a creative concept into a
client-ready story** (animated cartoon · children's book · project launch).
Built to the pLAtform design system — oxblood `#8b3a2f`, paper cream
`#f5efe1`, IBM Plex Mono, Newsreader.

## Files

- `PitchDeckStructure.jsx` — the self-contained component (default export,
  no props, no dependencies beyond React). Drop it into the curriculum
  site's components folder and route/import it like the other lessons.
- `pitch-deck-preview.html` — standalone build of the same deck; open it in
  any browser to preview without running the site.
- `PROMPT.md` — IDE-ready prompt for Cursor / Windsurf / Claude Code.

## Controls

- `←` / `→` (also Space / PageUp / PageDown) — previous / next slide
- `N` — toggle the presenter-notes drawer (all original notes included)
- `G` — toggle the slide-grid overview; click any thumbnail to jump
- `Home` / `End` — first / last slide · `Esc` closes drawers

## Notes

- Fonts load from Google Fonts via the component's embedded `@import`;
  offline it degrades to Georgia / Courier New.
- All styles are scoped under `.pdx-root` class names, so it won't collide
  with other pLAtform components on the same page.
