# pLAtform Capstone — brief page, footer, and deck

"Creating in a World-Building Context." Three deliverables built from one
assignment doc, sharing one visual system.

```
src/components/CapstoneWorldBuilding.jsx   the brief as a full page
src/components/CapstoneFooter.jsx          the brief as a giant footer
deck/Capstone_World_Building.pptx          12-slide deck, speaker notes included
deck/Capstone_World_Building.pdf           same deck, for projecting or printing
PROMPT.md                                  paste-into-your-IDE instructions
```

---

## Quick start

```bash
cp src/components/*.jsx  <your-project>/src/components/
```

Then, on the Capstone page:

```jsx
import CapstoneWorldBuilding from "./components/CapstoneWorldBuilding";
import CapstoneFooter from "./components/CapstoneFooter";

export default function CapstonePage() {
  return (
    <>
      <CapstoneWorldBuilding />
      <CapstoneFooter />
    </>
  );
}
```

That's the whole install. No dependencies, no config, no Tailwind. Every
footer link is a same-page anchor, so there are no routes to define and
nothing that can land on a blank page.

For the footer on **every** page, see Prompt 2 in `PROMPT.md` — it needs
`basePath` and your router's `Link`, or the anchors won't resolve off the
brief page.

---

## How the two components relate

The footer is the deck's cover slide, its "where it starts" slide, its order-
of-operations slide, and its closing slide — compressed into one band that
sits under the brief. Its links point back up into the brief's own sections:

| Footer element | Anchors to |
|---|---|
| Seven pills (01–07) | `#cap-hero` … `#cap-campaign` |
| Three sentence stems | `#cap-start` |
| Foundation / Centerpiece / Extracted | `#cap-statement`, `#cap-hero`, `#cap-brand` |
| Carried by | `#cap-website`, `#cap-video`, `#cap-print`, `#cap-campaign` |
| Read the full brief | `#cap-close` |

**Renaming any section id breaks the corresponding footer link.** They are the
contract between the two files.

---

## The deck

12 slides, speaker notes on every one, same oxblood/paper palette as the web
components. Set in Cambria + Calibri rather than Newsreader + IBM Plex Mono
so it renders identically on whatever machine drives the projector — the web
fonts would silently substitute on a machine that doesn't have them.

Slide order: title → the three sentence stems → seven parts overview →
01 through 07 → how the pieces connect → final goal.

Slide 11 ("How the pieces connect") isn't in the original assignment doc. The
doc has three things claiming the center — the hero is "the centerpiece," the
brand is "at the center," the statement is "the conceptual foundation" — which
reads as ambiguous to a student deciding what to start on. That slide picks an
order: statement → hero → brand → everything else carries it. Cut it if you'd
rather leave the sequence open.

---

## Design system

```
oxblood        #8b3a2f
oxblood deep   #6d2a21
paper cream    #f5efe1
display        Newsreader
mono / utility IBM Plex Mono
```

Styles are scoped under `.cap-root` and `.cf-root` with `cap-` / `cf-` class
prefixes, so neither component can leak into or collide with existing site
styles. Both are responsive to mobile, keyboard-navigable with visible focus,
and respect `prefers-reduced-motion`.

If Newsreader and IBM Plex Mono are already loaded globally on pLAtform,
delete the `@import` line at the top of each component's `CSS` string.
