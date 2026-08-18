# Capstone Gallery Builder

Turns the "Capstone Project Development Template" SVG into a working web tool:
each template section becomes a full-width board in a top-down stack. Add images,
drag sections to reorder, export a static site for Netlify.

## Files
- `CapstoneGallery.jsx` — the entire app, one component, zero dependencies beyond React
- `reference-template.svg` — the original board template the design is derived from

## Run it (Vite)
```bash
npm create vite@latest capstone-gallery -- --template react
cd capstone-gallery
# replace src/App.jsx contents with CapstoneGallery.jsx (or import it)
npm install
npm run dev
```

## Use it
1. BRAND bar (below the toolbar): pick ACCENT / INK / PAGE colors and choose a
   Display + Body font from 13 Google Fonts (Archivo, Space Grotesk, Bebas Neue,
   Oswald, Syne, Unbounded, Playfair Display, DM Serif Display, Inter, DM Sans,
   Work Sans, IBM Plex Sans, Lora) — fonts load live in the editor and the
   chosen theme is baked into the export (Google Fonts <link> in index.html,
   CSS variables in styles.css). "Reset to template" restores the original
   #507b86 / #262b2f / #f7f6f2 Arial board look.
2. Click or drop images into any dashed frame (Blockouts, Environments, Characters, Storyboard, Hero, Contact QR)
3. Fill Project Title / Student Name in the toolbar; Hero + Contact have inline text fields
4. Drag the dark `⠿ DRAG` handle on a section's left edge to reorder the stack
5. PREVIEW toggles off all editing chrome
6. EXPORT SITE downloads `index.html`, `styles.css`, `script.js`
   - images are embedded as base64, so the three files are fully self-contained
   - drop all three into one folder and drag that folder onto https://app.netlify.com/drop

## Exported site features
- Same board aesthetic as the template (paper `#f7f6f2`, ink `#262b2f`, teal `#507b86` accent bars)
- Scroll-reveal per section, click-to-zoom lightbox, responsive down to mobile, reduced-motion respected
- Empty slots and empty sections are omitted from the export automatically

## IDE-ready prompt (paste into Claude Code to extend)
> I have a single-file React component `CapstoneGallery.jsx` that is a drag-and-drop
> capstone gallery builder with static HTML/CSS/JS export. Extend it with:
> (1) localStorage persistence of the full editor state,
> (2) a "+ Add Section" button that clones any section type,
> (3) per-image caption fields included in the export,
> (4) an option to export images as separate files in an /assets folder instead of base64,
> zipped via JSZip. Keep the existing visual token system (#f7f6f2 / #262b2f / #507b86)
> and the export contract (index.html + styles.css + script.js) intact.
