# IDE PROMPT — add the Pitch Deck lesson to the pLAtform curriculum site

Copy `PitchDeckStructure.jsx` into the project's components directory, then
give your IDE agent (Cursor / Windsurf / Claude Code) this prompt:

---

Add a new lesson page to the pLAtform curriculum site (React/Vite).

1. Place `PitchDeckStructure.jsx` in `src/components/` (or the folder where
   other lesson components live). It is self-contained: default export, no
   props, only depends on `react`.
2. Register it in the site's lesson index / router the same way existing
   lessons are registered, under the title "Structuring a Pitch Deck" with
   the subtitle "How to turn a creative concept into a client-ready story".
3. The component fills its container (`height: 100vh`) and listens for
   window keydown events (arrows, N, G, Home/End, Esc). If lessons render
   inside a layout with its own header, wrap it in a full-viewport route or
   adjust `.pdx-root` height to `100%` of a sized parent.
4. Do not restyle it — it already follows the pLAtform design system
   (oxblood #8b3a2f, paper cream #f5efe1, IBM Plex Mono, Newsreader) with
   all CSS scoped under `.pdx-` class names.
5. Verify: 18 slides, presenter-notes drawer on N, grid overview on G,
   progress bar and 01/18 counter in the footer.

---
