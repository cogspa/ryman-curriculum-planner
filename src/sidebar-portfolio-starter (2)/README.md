# Sidebar Portfolio Starter (for HTML/CSS beginners)

A one-page portfolio in the "left sidebar + image grid" style: script logo, email, nested menu on the left; centered title, social icons, and a mixed-size gallery on the right.

## What's inside
```
site/            <- the finished template. Open index.html in a browser.
  index.html
  style.css
  images/        <- 8 placeholder JPGs. Replace with your own, keep the names.
react/
  StepByStep.jsx <- optional React module that walks through the build in 8 steps.
IDE_PROMPT.md    <- paste into Claude Code / Cursor to generate a personalised copy.
```

## Student instructions (10 minutes)
1. Open `site/style.css`. Change the four variables at the top (`--brand`, `--brand-soft`, `--sidebar-width`, `--font-logo`).
2. Drop your artwork into `site/images/`, named `01.jpg` ... `08.jpg`.
3. In `site/index.html`, change "Your Name", the email, the `<h1>` title, and the links in the `<nav>` list.
4. Want a bigger image? Add `class="tile wide"` (2 columns) or `class="tile tall"` (2 rows).
5. Add more images by copying any `<a class="tile">...</a>` line.

## Concepts this template teaches
- `display: grid` for the two-column page and for the gallery
- `position: sticky` sidebar
- nested `<ul>` menus and the `>` child selector
- `object-fit: cover` and `grid-column: span 2`
- one `@media` query for phones

## Running the React stepper
```
npm create vite@latest stepper -- --template react
cd stepper && npm install
# copy react/StepByStep.jsx into src/ and render <StepByStep /> in App.jsx
npm run dev
```
