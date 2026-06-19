// ──────────────────────────────────────────────────────────────────
//  WEEK 01 TOPICS DATA SOURCE
//  Extracted from PCC DMA 12 corpus.
// ──────────────────────────────────────────────────────────────────

export const TOPIC_DETAILS = {
  'digital-vs-physical-canvas': {
    title: 'Digital vs. Physical Canvas / Understanding Pixels',
    pccSources: ['Pixels: The Building Blocks of Digital Designs', 'Origin of the word Pixel'],
    sections: [
      {
        heading: 'What is a pixel?',
        body: `The pixel — a portmanteau of "pix" and "element" — is the basic unit of programmable color on a computer display. Every visual element on a screen is comprised of pixels. The screen projects light when creating images, so pixels are the building blocks of digital light.

When creating digital art, we are essentially painting, drawing, sculpting, and <strong>designing the wave samples of the pixel</strong>. The process of digital art is one of manipulating pixels using an interface or code.`,
      },
      {
        heading: "Alvy Ray Smith's definition",
        body: `"A pixel is a point sample. It exists only at a point. For a color picture, a pixel might actually contain three samples, one for each primary color contributing to the picture at the sampling point. We can still think of this as a point sample of a color. But we cannot think of a pixel as a square — or anything other than a point."

📄 <a href="https://alvyray.com/Memos/CG/Microsoft/6_pixel.pdf" target="_blank" rel="noopener noreferrer" style="color:#8b3a2f; text-decoration:underline;">Read the full paper: <em>A Pixel Is Not A Little Square</em> — Alvy Ray Smith (PDF)</a>`,
      },
      {
        heading: 'Physical canvas vs digital canvas',
        body: `A physical canvas has a fixed surface texture and dimensions. A digital canvas has a resolution — its quality depends on the number of pixels per inch, the bit depth of each pixel, and whether you're outputting for screen (additive RGB light) or print (subtractive CMYK pigment). Understanding that the digital surface is sampled light, not pigment, changes how you think about value, opacity, and blend modes.`,
      },
      {
        heading: 'Who is Alvy Ray Smith?',
        body: `Alvy Ray Smith is one of the people who turned pixel-based imaging from an expensive research capability into the foundation for painting software, animation, visual effects, and eventually tools like Photoshop.

He worked at several pivotal moments in computer-graphics history: Xerox PARC-era digital paint systems, the New York Institute of Technology computer-graphics lab, Lucasfilm's Computer Division, and Pixar — which he co-founded with Ed Catmull. He was deeply involved in the transition from primitive computer graphics to images that could be painted, layered, animated, composited, and used in filmmaking.

Smith also worked on early high-resolution digital paint systems, including BigPaint3, a 24-bit paint program capable of higher-than-video-resolution imagery. "24-bit" color meant that red, green, and blue values could be stored with enough precision to produce millions of colors — the RGB image model digital artists still use today.`,
        videoUrl: 'https://www.youtube.com/embed/Vn_TkHwDwq0',
        videoCaption: 'Alvy Ray Smith — The History of Pixar and Computer Graphics',
      },
      {
        heading: 'The Alpha Channel — Smith\'s most influential contribution',
        body: `RGB tells software what color a pixel is. Smith's alpha channel tells it how opaque or transparent that pixel is. A pixel can be represented as:

(R, G, B, α)

Where R, G, B describe color and α describes coverage or opacity — how much that image element contributes when combined with another.

This is why a figure can have soft hair edges, smoke can fade into the background, a painted cloud can be partially transparent, and a green-screen subject can be cleanly composited into another scene. Smith's 1978 writing on alpha describes the digital matte concept that became the basis for modern compositing.

In Photoshop, alpha is behind much of what artists take for granted: layer masks, transparent PNGs, selections saved as channels, soft-edged erasing, compositing photographs and painted elements, VFX keying and rotoscoping, motion-blur and atmospheric fades, and exporting assets for games, animation, and web design.

Without alpha logic, digital collage would be like cutting paper shapes with hard edges. With alpha, images can behave like light, fog, paint, glass, fabric, smoke, or a soft brushstroke.`,
      },
      {
        heading: 'Why pixels matter for artists',
        body: `A pixel is often called "a tiny square," but that is only a useful simplification. More precisely, a pixel is a sample of visual information — a stored measurement of color and sometimes transparency at a particular location in an image. A raster image is a grid: I(x, y) = [R, G, B, α]. Each location stores values that describe the image there.

Once an image becomes a pixel grid, software can operate on it mathematically. A blur averages neighboring samples. A sharpen filter exaggerates local contrast. Levels remap brightness ranges. Curves remap tonal values. A selection isolates a region. A mask controls where an operation applies. A blend mode combines numerical values from two image layers.

An ordinary layer composite can be simplified as:

C_out = α_f · C_f + (1 − α_f) · C_b

Where C_f is the foreground color, C_b is the background color, α_f is the foreground opacity, and C_out is the blended result. When you lower opacity on a Photoshop layer, paint with a semi-transparent brush, or soften a mask, you are working through variations of this logic.`,
      },
      {
        heading: 'The connection to Photoshop',
        body: `Smith did not invent Photoshop — that was Thomas and John Knoll, developed commercially by Adobe. But Smith's work helped create the technical ecosystem Photoshop depends on: high-color raster painting, editable image regions, transparency logic, digital compositing, channels, anti-aliasing, and the broader premise that pixels are an expressive visual medium.

A useful way to put it: Alvy Ray Smith helped establish the grammar of digital images. Photoshop and later art tools turned that grammar into an accessible studio practice.

The Photoshop canvas is a pixel field. Brushes change pixel values. Masks control alpha. Layers use compositing mathematics. Filters analyze and transform pixel neighborhoods. Channels separate and manipulate image information. The artist is not merely "using effects" — they are directing a structured system of sampled color and transparency.`,
      },
      {
        heading: 'Why this matters for artists learning digital tools',
        body: `Studying pixels helps artists see digital tools as extensions of visual fundamentals rather than mysterious software features:

Drawing → the placement and variation of marks across a grid.
Painting → controlled color, value, and opacity changes.
Composition → the organization of visual information over a frame.
Texture → patterned variation in color, contrast, and scale.
Atmosphere → layered transparency, depth, and color scattering.
Compositing → the visual combination of separate image systems.
3D rendering → the calculation of pixel values from light, materials, geometry, and camera position.

Smith's larger argument is that digital imagery should not be treated as somehow less real or less artistic because it is numerical. Pixels are simply the medium's basic units — much like pigment particles, halftone dots, film grain, weave in a textile, or marks on paper. His work helped make that medium mature enough for artists to work with directly.`,
      },
    ],
  },

  'origin-of-pixel': {
    title: 'Origin of the word "pixel"',
    pccSources: ['Origin of the word Pixel'],
    sections: [
      {
        heading: 'Frederic C. Billingsley — JPL, 1965',
        body: `Frederic C. Billingsley first published the word "pixel" in 1965 at Jet Propulsion Laboratory in Pasadena. Billingsley (July 23, 1921 – May 31, 2002) was an American engineer who worked on image processing techniques for American space probes to the moon, Mars, and other planets for most of his career.`,
      },
      {
        heading: 'First documented use',
        body: `Billingsley used the word "pixel" in two papers published in 1965. This may have been the first published use of the word to describe a computer-generated "picture element."

According to Billingsley, the word didn't originate with him. He heard it came from Keith E. McFarland at General Precision's Link Division in Palo Alto in 1963. McFarland claimed he had no idea where the word originated — it was a general term employed by his colleagues at the time.`,
      },
      {
        heading: 'Why this matters',
        body: `Pasadena (JPL) is the documented birthplace of the published term. Local relevance for a Pasadena-area studio class: the word for the medium you're working in was coined a few miles from where you're sitting.`,
      },
    ],
  },

  'elements-vs-principles': {
    title: 'Elements vs. Principles of Design',
    pccSources: ['Elements of Design', 'Principles of Design', 'Principles of Design-2'],
    sections: [
      {
        heading: 'The Elements of Design',
        body: `The elements are the raw vocabulary — the things you put on the canvas:

- Line
- Color
- Shape
- Space
- Form
- Unity/harmony
- Balance

For painting and concept art, shape and line are the foundation of any composition you create.`,
      },
      {
        heading: 'The Principles of Design',
        body: `The principles are how you arrange the elements — the grammar:

- Balance
- Contrast
- Emphasis
- Movement
- Pattern
- Rhythm
- Unity/Variety
- Direction

These are guidelines, not rigid rules. They're rooted in a mix of physiological, social, and cultural influences. Examining successful designs throughout history shows how these principles have been used to create effective, influential work.`,
      },
      {
        heading: 'The distinction in one line',
        body: `Elements are the nouns. Principles are the verbs that act on them. A line is an element; rhythm is a principle that organizes lines into a pattern.`,
      },
    ],
  },

  'resolution-and-quality': {
    title: 'Resolution and Quality',
    pccSources: ['Resolution and Quality', 'Resolution Revisted'],
    sections: [
      {
        heading: 'Resolution',
        body: `Resolution is the number of pixels contained on a display monitor, expressed as the number of pixels on the horizontal axis × the number on the vertical axis. In a bitmap image, resolution is the degree of detail, measured in pixels per inch (PPI). Higher resolution = more pixels per inch = better printed image.`,
      },
      {
        heading: 'DPI / PPI',
        body: `DPI (dots per inch) is the unit of measurement for screen-image sharpness. A computer monitor typically displays images at 72 PPI. To find the on-screen display size of an image, divide horizontal and vertical pixels by 72.

Use 72 PPI for web. Use 200–300 PPI for print.`,
      },
      {
        heading: 'Pixelation, aliasing, interpolation',
        body: `Scaling up a low-resolution image causes it to "pixelate" — you can see the individual pixels. The process of scaling forces the computer to recalculate the number of pixels, which is called interpolation.

Aliasing produces jagged edges on curved or diagonal lines. Anti-aliasing adds realism by smoothing those edges using partially-filled pixels along the edge to create a gradual fade.`,
      },
      {
        heading: 'Bits per pixel',
        body: `A pixel can represent several distinct colors depending on the number of bits per pixel (bpp). 1 bpp = on/off. The number of colors doubles with each additional bit — 2 bpp = 4 colors, 3 bpp = 8 colors, 8 bpp = 256 colors, 24 bpp = ~16.7 million colors.`,
      },
      {
        heading: 'Resampling',
        body: `When you change dimensions or resolution without resampling, image data remains constant — the file's width and height must change to maintain consistent data. With Resample Image selected (in Photoshop's Image Size dialog), you can adjust resolution, width, and height independently, but this adds or removes pixels via interpolation.`,
      },
    ],
  },

  'value-composition-gesture-form': {
    title: 'Value, Composition, Gesture, and Form',
    pccSources: ['What is Value?', 'Value Is Emotive', 'Color Gets the Credit, Value Does the Work', 'Value and Contrast'],
    sections: [
      {
        heading: 'What value is',
        body: `Value refers to the lightness or darkness of a color. It's one of the three main properties of color, alongside hue (the basic color) and saturation (intensity).

A value scale runs from black to white through every monochromatic gray in between. The average human eye can distinguish somewhere between 30 and 500 variations of value — research is inconsistent on the exact number, but computers render 256 shades and most viewers can perceive at least 200.`,
      },
      {
        heading: 'Color gets the credit, value does the work',
        body: `Colors are recognized, but values are what have the most impact. An object can be red or blue and still have the same value. The value of any work helps establish contrast — and contrast is what gives an image structure, focus, and emotional weight.`,
      },
      {
        heading: 'Value is emotive',
        body: `Dramatic contrasts — bright lights meeting deep shadows — create tension, drama, suspense. Subtle transitions — gentle gradations from light to dark — evoke calmness, serenity, melancholy.

A horror film uses stark contrasts to unsettle. A romantic film uses softer, muted values to feel dreamy. The same logic applies to a painting or a Photoshop composition.`,
      },
      {
        heading: 'Value contrast',
        body: `Value contrast is the relationship between areas of dark and light. A consistent gray can appear to change value depending on the values around it. When two grays read as the same value, that's low contrast — the image goes flat. High contrast pulls the eye and creates a focal point.`,
      },
      {
        heading: 'Composition, gesture, form',
        body: `Composition is how you arrange value across the canvas. Gesture is the directional energy — the implied lines of movement that lead the eye. Form is the illusion of three dimensions, built almost entirely from value transitions: highlight, mid-tone, core shadow, reflected light, cast shadow.

A painting can survive bad color. It cannot survive bad value structure.`,
      },
    ],
  },

  'workflow-fundamentals': {
    title: 'Wacom / iPad Workflow & Canvas Fundamentals',
    pccSources: ['Layer Basics', 'Organizing Layers', 'Non-destructive Editing', 'Common File Formats', 'Mastering the Move Tool', 'Zooming and Panning'],
    sections: [
      {
        heading: 'Layer basics',
        body: `Layers in Photoshop are like sheets of acetate stacked on top of each other. Transparent areas of a layer can be seen through the layers below. You can move content with the move tool, change stacking order, and adjust opacity to make any layer partially transparent.

Use layers to: composite multiple images, add text, add vector shapes, apply layer styles (drop shadow, glow, etc.), mask out portions, and color-correct.`,
      },
      {
        heading: 'Organizing layers',
        body: `A new Photoshop image has a single background layer. The number of additional layers, layer effects, and layer sets you can add is limited only by your computer's memory. Group layers (Cmd/Ctrl + G) to reduce clutter — you can nest groups within groups and apply attributes or masks to multiple layers at once. F7 opens the Layers panel.`,
      },
      {
        heading: 'Non-destructive editing',
        body: `Adjustment Layers hold color or tonal adjustments that affect layers below — without editing image pixels directly. Edit the adjustment layer, leave the original pixels untouched.

Smart Objects contain one or more layers of content. You can scale, skew, or reshape a Smart Object without directly editing pixels, and Smart Filters let you apply filters non-destructively so you can tweak or remove the effect later.`,
      },
      {
        heading: 'File formats',
        body: `Working formats:
- PSD — Photoshop's native format. Keeps layers, vectors, masks intact.
- TIFF — raster with optional layers. Common in print.
- PSB — for very large files (>30,000 px on a side).

Delivery formats:
- JPEG — lossy, smaller files, no transparency. Photos.
- PNG — lossless, supports transparency. Web graphics, exports for clients.
- GIF — 256 colors, supports animation.
- SVG — vector format for web. Use when exporting from Figma/Illustrator.
- PDF — preserves vectors, shareable.`,
      },
      {
        heading: 'The move tool',
        body: `Shortcut: V. Universal across Adobe apps.

Turn OFF Auto Select — it picks the wrong layer constantly and gets in the way of any compositing workflow.

Show Transform Controls puts a transform box around your selection so you can scale (drag corners) and rotate (just outside corners). Hold Shift while scaling to constrain proportions. Hold Cmd/Ctrl while dragging a corner to skew.`,
      },
      {
        heading: 'Zooming and panning',
        body: `Spacebar = Pan (move the canvas).
Spacebar + Cmd (Mac) / Spacebar + Ctrl + Alt (Win) = Zoom In.
Spacebar + Option (Mac) / Spacebar + Alt (Win) = Zoom Out.

On modern macOS the defaults are Cmd + Plus / Cmd + Minus. Zooming is the single most underused tool for precision — zoom in to refine, zoom out to judge composition.`,
      },
      {
        heading: 'Wacom / iPad setup notes',
        body: `For Wacom: install the driver, set pressure curve so light pressure produces visible marks (default is often too stiff). Map a tablet button to "undo" — saves your wrist.

For iPad / Procreate: file types behave the same conceptually, but Procreate exports .procreate (working) and PSD/PNG/JPG (delivery). Canvas size at creation matters — Procreate caps layer count based on canvas dimensions.

Canvas size for this class: start at 3000 × 2000 px at 300 DPI for any deliverable. You can always scale down. You can't scale up without losing quality.`,
      },
    ],
  },
  'biomorphic-shapes-metaballs': {
    title: 'Biomorphic Shapes & the Metaball Effect',
    pccSources: ['Implicit Surfaces', 'Scalar Fields and Iso-contours'],
    sections: [
      {
        heading: 'What is a biomorphic metaball blob shape?',
        body: `In design language, shapes generated this way are often called biomorphic silhouettes, amorphous organic forms, or liquid blob shapes. Creating fluid, organic forms that seamlessly merge is a core technique in visual development, useful for character silhouettes, creature anatomy, and liquid/lava background designs.`,
      },
      {
        heading: 'Photoshop Recipe: Non-destructive Metaballs',
        body: `Photoshop can simulate metaball blending using image filters and adjustment layers:
        
1. Make your source shapes (e.g. black circles) on separate layers.
2. Select the shape layers, right-click, and choose "Convert to Smart Object". This keeps the workflow non-destructive so you can move the shapes around later.
3. Choose Filter > Blur > Gaussian Blur. Blur until the shapes' boundaries soften and their outer halos overlap.
4. Add a Levels adjustment layer (or Threshold adjustment).
5. Push the black and white Input Levels sliders inward toward the center until the soft blur edges are sharpened back into a crisp, solid silhouette.
        
Summary formula: Source Shapes → Blur (Convolution) → Levels/Threshold (Thresholding) = Clean organic blob form.`,
      },
      {
        heading: 'The Computer Graphics Science: Implicit Fields',
        body: `The math behind this effect is rooted in implicit surfaces (or implicit fields):

- **Scalar Fields**: Rather than defining a shape explicitly using outline vertices (like a vector outline), a metaball defines a shape using a scalar field of influence. Every object projects a soft, invisible field of density values into the surrounding space.
- **Field Accumulation**: When two objects get close, their soft fields overlap and add their density values together.
- **Thresholding (Iso-contours)**: The final visible shape is defined by a threshold value. Any point in space where the combined density is higher than the threshold becomes solid; anywhere lower becomes empty. In 2D, this threshold boundary is called an **iso-contour**; in 3D, it is an **iso-surface**.

In modern computer graphics, this concept is widely used in **Signed Distance Fields (SDFs)**, and algorithms like **Marching Squares** (2D) or **Marching Cubes** (3D) are used to compute and render the resulting smooth outlines.`,
      },
    ],
  },
};

export const topicList = [
  { key: 'digital-vs-physical-canvas', label: 'Digital vs. Physical Canvas / Understanding Pixels', isNew: true },
  { key: 'origin-of-pixel', label: 'Origin of the word "pixel"', isNew: true },
  { key: 'elements-vs-principles', label: 'Elements vs. Principles of Design', isNew: true },
  { key: 'resolution-and-quality', label: 'Resolution and Quality', isNew: true },
  { key: 'biomorphic-shapes-metaballs', label: 'Hands-on: Biomorphic shapes & the Metaball effect (Gaussian Blur + Levels thresholding)', isNew: true },
  { key: 'value-composition-gesture-form', label: 'Value, composition, gesture, and form', isNew: false },
  { key: 'workflow-fundamentals', label: 'Side-topic conversations (Tue Zoom): Wacom/iPad workflow setup, canvas size, resolution, file types, layer fundamentals, file-naming conventions', isNew: false },
];
