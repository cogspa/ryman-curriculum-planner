# IDE PROMPT — Integrate the Storyboards deck into the pLAtform curriculum site

Paste this into Cursor / Windsurf / Claude Code from the repo root of the
pLAtform React/Vite curriculum site, with this ZIP's contents unzipped
alongside the repo.

---

Integrate a new lesson deck component into this Vite + React project:

1. Copy `storyboards-deck/src/assets/storyboards/` (23 JPGs) into
   `src/assets/storyboards/`.
2. Copy `storyboards-deck/src/Storyboards.jsx` into the lesson components
   directory (match wherever peers like SwatchForge.jsx / MirrorLab.jsx /
   SilhouetteSymmetry.jsx live). If the relative path from that directory to
   `src/assets/storyboards/` differs from `./assets/storyboards/`, update the
   23 import statements at the top of the file accordingly.
3. Register the component in the curriculum navigation/routes the same way
   the other lesson components are registered, under the storyboarding /
   visual-storytelling week. Title it "Storyboards".
4. The component loads Newsreader and IBM Plex Mono from Google Fonts via a
   `<link>` tag inside the component. If the site already loads these fonts
   globally, delete that `<link>` line.
5. The component is self-contained: default export, no props, no external
   state, inline styles using the pLAtform tokens (oxblood #8b3a2f, cream
   #f5efe1). Do not restyle it.
6. Verify: `npm run dev`, navigate to the new route, confirm all 23 slides
   render with images, arrow-key navigation works, and the index drawer
   (counter button, top right) opens.

Do not modify slide content or the SLIDES data array.
