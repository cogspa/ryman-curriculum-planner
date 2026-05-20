// ──────────────────────────────────────────────────────────────────
//  ASSIGNMENT DETAIL PAGES
//  Keyed by week number. Each entry contains structured content
//  that renders on a dedicated /assignment/:week route.
// ──────────────────────────────────────────────────────────────────

export const assignments = {
  2: {
    title: 'Media Tile: Texture Systems & Brush-Based Material Studies',
    subtitle: '(Phase structure adapted from Assignment 6, Part 1; style-tile output adapted from Assignment 7)',
    totalPoints: 130,
    phases: [
      {
        name: 'Phase 1: Build Your Brush Library',
        intro: 'Following the same process from the Landscape Progression brush workflow, build three sets of custom brushes, six per set:',
        sets: [
          { name: 'Pigment brushes', desc: 'capture textures of bristles, palette-knife strokes, or impasto from photographs of physical paint' },
          { name: 'Surface brushes', desc: 'paper grain, canvas weave, wood, plaster, stone, anything with tooth' },
          { name: 'Atmospheric brushes', desc: 'splatters, drips, mist, particulate (for finishing passes)' },
        ],
        steps: [
          'Capture or source a wide-enough photo with strong texture',
          'Convert to black and white: Image > Adjustments > Black and White (Cmd/Ctrl + Option + Shift + B)',
          'Push contrast with Levels (Cmd/Ctrl + L) — push the dark triangle right, the light triangle left',
          'Define a clean rectangular selection with the Marquee tool (M)',
          'Edit > Define Brush Preset',
          'Name brushes consistently by set (e.g., pigment_01_bristle, surface_03_canvas)',
        ],
        note: 'Remember: with brushes, white is transparent and black is the painted area.',
      },
      {
        name: 'Phase 2: Pick One Subject',
        intro: 'Choose one simple subject with mass and surface — a piece of fruit, a folded cloth, a stone, a single tool. The subject stays constant across all variations.',
      },
      {
        name: 'Phase 3: Create the Media Tile',
        intro: 'Develop the same subject through four physical-media simulations, presented as a single tiled layout:',
        simulations: [
          { name: 'Oil paint simulation', desc: 'pigment brushes + impasto, hard edges where strokes break' },
          { name: 'Watercolor simulation', desc: 'paper grain (surface brush) on multiply, wet-edge brush, bleeds' },
          { name: 'Charcoal on toned paper', desc: 'mid-gray ground, canvas tooth overlay, additive whites and subtractive blacks' },
          { name: 'Invented digital medium', desc: 'a material that could only exist digitally, using techniques covered in class (procedural noise overlays, blend modes, layer effects)' },
        ],
        layout: [
          '2×2 grid, each panel 1000×1000, final tile 2000×2000 at 200 dpi',
          'Caption each panel with the medium name (small, style-tile style)',
          'Give the overall tile a title that frames the study',
        ],
        requiredTechniques: [
          'Three or more of your custom brushes used across the four panels',
          'At least one procedural effect per panel (Filter Gallery, noise, cloud filter, threshold, etc.)',
          'Blend modes for layering surface textures',
          'A texture overlay on at least two panels using a Surface brush as a stamp',
        ],
      },
    ],
    submission: [
      'Final media tile as a .png (2000×2000)',
      'Brush sheet — a single .png screenshot showing your eighteen custom brushes laid out in a grid (use the Brush Preset panel or paint each on a blank canvas and label)',
      'Process reflection — 150 words on which simulation read most convincingly, what gave the others away, and a one-sentence description of your invented digital medium',
    ],
    grading: [
      { criterion: 'Brush Library', points: 30, desc: 'Completeness, contrast, and usability of all 18 brushes' },
      { criterion: 'Material Believability', points: 40, desc: 'How convincingly each of the four panels reads as its medium' },
      { criterion: 'Procedural / Painted Integration', points: 30, desc: 'Effective combination of filter-based and hand-painted techniques' },
      { criterion: 'Composition & Layout', points: 20, desc: 'Cohesiveness of the tile as a single piece' },
      { criterion: 'Reflection', points: 10, desc: 'Thoughtfulness and specificity' },
    ],
  },
};
