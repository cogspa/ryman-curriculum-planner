# IDE prompt (Claude Code / Cursor)

You are working in `portfolio-reference-gallery`, a Vite + React 18 app. The single component
`src/PortfolioReferenceGallery.jsx` renders a filterable gallery of 15 portfolio references
for entertainment-design students. Styling is a scoped `<style>` string at the bottom of the file
(pLAtform design system: oxblood #8b3a2f, paper cream #f5efe1, IBM Plex Mono for UI labels, Newsreader for display; do not introduce other colors or typefaces).

Tasks you may be asked to do:
1. Fill in `url` for each artist in `ARTISTS` — never invent links; ask for them or leave blank.
2. Add an optional `image` field per artist and render it in `.mono` in place of the initials
   when present (keep the initials as fallback).
3. Add a "Present" mode: a full-screen, one-card-at-a-time view with ←/→ keyboard navigation
   for showing in class.
4. Keep the DATA arrays as the single source of truth; do not scatter content into JSX.
5. Preserve keyboard focus styles, reduced-motion handling, and the 640px mobile breakpoint.

Run `npm run dev` to verify after each change.
