// ──────────────────────────────────────────────────────────────────
//  ASSIGNMENT DETAIL PAGES
//  Keyed by week number. Each entry contains structured content
//  that renders on a dedicated /assignment/:week route.
// ──────────────────────────────────────────────────────────────────

export const assignments = {
  1: {
    title: 'Assignment 1: Traditional Translation',
    subtitle: 'Line Exploration (Straight and Curved Lines) — Adapted from DMA 12 Project 2',
    totalPoints: null,
    extraCredit: 'Upload your favorite design to Teepublic.com for 10 points extra credit',
    sections: [
      {
        heading: 'Overview',
        body: 'For this assignment, you will use one of your own traditional art pieces from your time at Ryman as the initial reference. You will create two different line compositions by tracing over your artwork using Photoshop (or Magma.io, Figma, Photopea.com, or GIMP). Each composition explores a different type of line.',
      },
      {
        heading: 'Composition 1: Straight Lines',
        bullets: [
          'Use your Ryman artwork as the base image to trace',
          'To use straight lines with the Brush tool (B), hold Shift for each line you draw',
          'You can also use the Pen Tool (P) and then use the stroke option to turn the vector line into pixels',
          'You can also use the Line Shape Tool (U) — in Photoshop, use the stroke option to convert lines to pixels since Adobe has removed the option to draw lines as pixels directly',
        ],
      },
      {
        heading: 'Composition 2: Curved Lines',
        body: 'Choose your subject matter from the following: famous movie posters, ancient architecture, or insects.',
        bullets: [
          'Use Photoshop\'s smoothing feature with the Brush or Pencil tool',
          'Use circle shapes',
          'You can use the Pen Tool (P), Brush Tool (B), and/or the Circle Shape Tool (U)',
        ],
      },
      {
        heading: 'How to Set Up Your File',
        subheading: 'Layer structure (3 layers):',
        numberedSteps: [
          'Layer 1 — The object/image you want to trace (your Ryman artwork)',
          'Layer 2 — Filled with white, opacity lowered to 80\u201390%',
          'Layer 3 — The layer you will draw on',
        ],
      },
      {
        heading: 'How to Copy and Paste an Image',
        numberedSteps: [
          'Search for your reference image using your preferred search engine',
          'Right-click the image → select "Copy Image"',
          'Paste into Photoshop using Cmd/Ctrl + V',
          'Scale the image using Cmd/Ctrl + T (hit Enter after scaling to your preferred size)',
        ],
      },
      {
        heading: 'Specifications',
        bullets: [
          'Colors: Black and white only',
          'Image Size: Roughly 11" × 17", landscape or portrait, at 200 DPI',
          'Composition 1 subject: A portrait of a historical figure (or your Ryman piece)',
          'Composition 2 subject: Famous movie posters, ancient architecture, or insects',
        ],
      },
      {
        heading: 'Line Qualities to Explore',
        body: 'For these compositions, try to use a variety of line types:',
        bullets: [
          'Length',
          'Thickness',
          'Repetitiveness',
          'Spacing',
          'Intersections',
          'Angles',
        ],
        note: 'Use the above concepts to create a pleasing composition.',
      },
      {
        heading: 'Tools Reference',
        bullets: [
          'Straight-line composition: Brush Tool (B) or Line Tool (U) — set to "pixels" in Photoshop',
          'Curved-line composition: Pen Tool (P), Brush Tool (B), and/or Circle Shape Tool (U)',
          'Note: keyboard shortcuts above apply to Photoshop',
        ],
      },
    ],
    submission: [
      'Save each final composition as a JPEG or PNG',
      'Turn off the initial tracing layer before saving',
      'Upload both compositions to Canvas',
    ],
    discussion: 'After both compositions are uploaded, we will critique and discuss which of your two compositions should be uploaded to Teepublic.com.',
  },
  3: {
    title: 'Assignment 2: Material Studies',
    subtitle: 'Media Tile: Texture Systems & Brush-Based Material Studies (from Week 2)',
    totalPoints: 130,
    phases: [
      {
        name: 'Phase 0: Reference Collection & Thumbnail Planning',
        points: 15,
        intro: 'Before opening Photoshop, gather your raw material.',
        bullets: [
          'Reference board (10–15 images): Photographs of physical paint (bristle marks, palette-knife strokes, impasto buildup), Surface textures (paper grain, canvas weave, plaster, stone, wood), Charcoal and graphite on toned paper, splatters, drips, atmospheric marks.',
          'References must be photographs, not other artists\' illustrations. Submit the board as a single contact sheet (PNG).',
          'Four thumbnail sketches — explore how your subject reads across the four media panels before committing. Sketches can be analog (photographed) or digital. Quick, loose, layout-focused. The point is to plan composition and value distribution, not to render.'
        ]
      },
      {
        name: 'Phase 1: Build Your Brush Library',
        points: 30,
        intro: 'Three sets of custom brushes, six per set:',
        sets: [
          { name: 'Pigment brushes', desc: 'bristles, palette-knife strokes, impasto from photographs of physical paint' },
          { name: 'Surface brushes', desc: 'paper grain, canvas weave, wood, plaster, stone — anything with tooth' },
          { name: 'Atmospheric brushes', desc: 'splatters, drips, mist, particulate (finishing passes)' }
        ],
        steps: [
          'Capture or source a wide-enough photo with strong texture',
          'Image > Adjustments > Black and White (Cmd/Ctrl + Option + Shift + B)',
          'Push contrast with Levels (Cmd/Ctrl + L) — dark triangle right, light triangle left',
          'Define a clean rectangular selection with the Marquee tool (M)',
          'Edit > Define Brush Preset',
          'Name brushes consistently by set: pigment_01_bristle, surface_03_canvas, atmos_02_splatter'
        ],
        note: 'Remember: with brushes, white is transparent, black is the painted area.'
      },
      {
        name: 'Phase 2: Pick One Subject',
        intro: 'Choose one simple subject with mass and surface — a piece of fruit, a folded cloth, a stone, a single tool. The subject stays constant across all four panels. Variation lives in the medium, not the subject.'
      },
      {
        name: 'Phase 3: Create the Media Tile',
        points: 70,
        intro: 'Develop the same subject through four physical-media simulations, presented as a single tiled layout.',
        simulationsTable: [
          { num: '1', medium: 'Oil paint', approach: 'Pigment brushes + impasto, hard edges where strokes break' },
          { num: '2', medium: 'Watercolor', approach: 'Paper grain (Surface brush) on Multiply, wet-edge brush, bleeds' },
          { num: '3', medium: 'Charcoal on toned paper', approach: 'Mid-gray ground, canvas-tooth overlay, additive whites + subtractive blacks' },
          { num: '4', medium: 'Invented digital medium', approach: 'A material that could only exist digitally — procedural noise overlays, blend modes, layer effects' }
        ],
        subsections: [
          {
            title: 'Layout',
            bullets: [
              '2×2 grid, each panel 1000×1000',
              'Final tile 2000×2000 at 200 dpi',
              'Caption each panel with the medium name (small, style-tile style)',
              'Give the overall tile a title that frames the study'
            ]
          },
          {
            title: 'Required techniques (at least one of each)',
            bullets: [
              'Three or more of your custom brushes used across the four panels',
              'At least one procedural effect per panel (Filter Gallery, noise, cloud filter, threshold, etc.)',
              'Blend modes for layering surface textures (Multiply for darks/wet edges, Overlay/Soft Light for tooth, Lighten for highlights)',
              'A texture overlay on at least two panels using a Surface brush as a stamp'
            ]
          },
          {
            title: 'Layer minimums',
            bullets: [
              'At least 8 layers per panel',
              'Each panel organized in its own labeled group (Cmd/Ctrl + G)',
              'Use adjustment layers non-destructively — no flattening until export'
            ]
          }
        ]
      },
      {
        name: 'Phase 4: Written Reflection',
        points: 5,
        intro: '150–200 words covering:',
        bullets: [
          'Which medium simulation read most convincingly, and why',
          'One brush that did more work than expected',
          'What a fifth "invented digital medium" panel might explore if you continued the study'
        ]
      }
    ],
    shortcuts: [
      { key: 'D', action: 'Reset black/white foreground/background' },
      { key: 'X', action: 'Swap foreground/background' },
      { key: '[ ]', action: 'Decrease / increase brush size' },
      { key: 'Cmd/Ctrl + T', action: 'Free Transform' },
      { key: 'Cmd/Ctrl + J', action: 'Duplicate layer' },
      { key: 'Cmd/Ctrl + G', action: 'Group selected layers' },
      { key: 'Shift + Cmd/Ctrl + I', action: 'Invert selection' },
      { key: 'Cmd/Ctrl + I', action: 'Invert layer colors' }
    ],
    tips: [
      'Turn off Auto Select — it gets in the way when you\'re stacking texture layers',
      'Use File > Scripts > Load Files Into Stack to bring all your references into a single doc',
      'Make all your masks first, then paint — separates selection work from media work',
      'Use Quick Selection with Alt/Option to subtract from selection',
      'Save iterations as .psd while working; export final tile as .png',
      'Keep your brush library .abr exported (Edit > Presets > Export/Import Presets) — you\'ll reuse this brush set in later assignments'
    ],
    submission: [
      'Reference board as PNG (Phase 0)',
      'Four thumbnail sketches as PNG (Phase 0)',
      'Brush set screenshot — show all 18 brushes in the brushes panel as PNG (Phase 1)',
      'Final Media Tile — 2000×2000 at 200 dpi as PNG (Phase 3)',
      'Written reflection — 150–200 words, in the submission comment or as .md/.txt (Phase 4)'
    ],
    grading: [
      { criterion: 'Reference board + four thumbnails', points: 15 },
      { criterion: 'Brush library (3 sets × 6, named, usable)', points: 30 },
      { criterion: 'Oil panel', points: 15 },
      { criterion: 'Watercolor panel', points: 15 },
      { criterion: 'Charcoal panel', points: 15 },
      { criterion: 'Invented digital medium panel', points: 15 },
      { criterion: 'Layout, title, captions, layer organization', points: 10 },
      { criterion: 'Required techniques applied (brushes, procedural, blend modes, overlays)', points: 10 },
      { criterion: 'Written reflection', points: 5 }
    ]
  },
  5: {
    title: 'Assignment 3: Atmospheric Spaces',
    subtitle: 'Dramatic Location: Pick a location with depth that carries a cinematic lighting treatment.',
    totalPoints: 100,
    sections: [
      {
        heading: 'Focus: Dramatic Location',
        body: 'Pick a location with depth — interior or exterior, real or imagined — that can carry a cinematic lighting treatment. No central figure required. The light *is* the subject. Your location\'s job is to give the light something to act on — surfaces, depth, atmosphere.',
        bullets: [
          'Architectural interiors (cathedral, warehouse, subway, lobby)',
          'Landscapes with strong atmospheric potential (canyon, coastline, forest clearing, ruins)',
          'Constructed environments (alley, rooftop, industrial site, theater stage)',
          'Imagined / hybrid spaces (sci-fi corridor, fantasy chamber, post-apocalyptic street)'
        ]
      },
      {
        heading: 'Lighting Requirements',
        bullets: [
          'Strong directional light source (sunlight through window, spotlight, streetlamp, futuristic emitter)',
          'Clear value hierarchy — deep shadows, distinct midtones, and localized highlights',
          'Atmospheric scattering — use fog, dust particles, mist, or smoke to render visible light rays'
        ]
      },
      {
        heading: 'Workflow & Layout',
        bullets: [
          'Size: 16" × 9" aspect ratio (horizontal cinematic canvas), 200 DPI',
          'Use adjustment layers and layer masks to control the light non-destructively',
          'Utilize Blend Modes (e.g., Multiply for shadows, Color Dodge/Linear Dodge for highlights) to paint light realistically'
        ]
      }
    ],
    submission: [
      'Final high-resolution render as JPEG or PNG',
      'Brief 100-word paragraph describing the narrative of the light in your chosen space'
    ],
    grading: [
      { criterion: 'Cinematic Light & Value Structure', points: 40 },
      { criterion: 'Atmospheric Perspective & Depth', points: 30 },
      { criterion: 'Material Surface Interactions & Texture', points: 20 },
      { criterion: 'Composition & Mood', points: 10 }
    ]
  }
};
