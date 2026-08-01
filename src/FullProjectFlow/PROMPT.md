# IDE PROMPT — add FullProjectFlow to the pLAtform Capstone page

Paste into Cursor / Windsurf / Claude Code from the ryman-curriculum
repo root:

---

Add the FullProjectFlow component to the Capstone page footer.

1. The folder `FullProjectFlow/` (from this ZIP) has been copied to
   `src/components/FullProjectFlow/`. It contains
   `FullProjectFlow.jsx` and an `assets/` folder with three images
   imported by the component. Do not modify the component's internal
   styles — it follows the pLAtform design system (oxblood #8b3a2f,
   cream #f5efe1, IBM Plex Mono, Newsreader) with inline styles.
2. In the Capstone page component (the "Creating in a World-Building
   Context" assignment page), import it:
   `import FullProjectFlow from "../components/FullProjectFlow/FullProjectFlow";`
   (adjust the relative path to match the repo structure).
3. Render `<FullProjectFlow />` at the bottom of the Capstone page,
   after the deliverables content and before the global site footer,
   inside the page's main content column.
4. Verify: the component shows a "CAPSTONE · FULL PROJECT FLOW"
   eyebrow, the sketchbook photo, an auto-animating layout-board
   carousel that spotlights six panels in sequence, six phase
   entries, a "03 · THE FINISHED SITE EXAMPLE" thumbnail, and a
   branding strip. Click the thumbnail: the full ZARK website should
   open in a full-screen overlay iframe with a "← BACK TO CAPSTONE"
   button that returns to the page (Esc works too). Confirm no
   console errors and that the carousel pauses on hover.
5. Note: `assets/zark-site.html` is imported with Vite's `?raw`
   suffix — do not change that import or move the file out of the
   component folder.

---
