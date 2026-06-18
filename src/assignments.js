// ──────────────────────────────────────────────────────────────────
//  ASSIGNMENT DETAIL PAGES (THREE-TRACK MODELS)
//  Keyed by week number. Each entry contains structured content for 
//  Beginner, Intermediate, and Advanced tracks under a unified Worldbuilding IP.
// ──────────────────────────────────────────────────────────────────

export const assignments = {
  1: {
    title: 'Assignment 1: Character / Prop Foundation',
    subtitle: 'Worldbuilding Step 1: Establish your core IP characters and signature items.',
    introduction: {
      heading: 'Assignment Introduction: Line, Shape, and the Visual Building Blocks of Digital Art',
      body: 'When we look at an image, we do not perceive every detail at once. The visual system first responds to simpler visual information: changes in light and dark, color differences, edges, directions, textures, overlapping forms, and larger shape groupings. In early visual cortex, many neurons are especially responsive to the orientation of an edge or bar—vertical, horizontal, diagonal, curved, or moving. Other visual networks contribute to color, figure-ground separation, spatial depth, motion, and object recognition.\n\nThis does not mean that the brain literally sees a finished drawing as outlines and blobs. Instead, it builds recognition from many kinds of visual evidence. A character, vehicle, building, or landscape becomes understandable because the brain can organize boundaries, silhouettes, value groupings, color regions, and spatial relationships into a coherent whole.\n\nFor artists, this is the reason to study line and shape breakdowns. A line is not only a contour. It can communicate direction, gesture, perspective, overlap, structure, and a change in plane or value. A shape is not only a filled-in area. It can establish silhouette, negative space, figure-ground separation, proportion, composition, lighting, and depth. Before a viewer reads the texture of a costume or the detail in a background, they usually read the larger organization of shapes.\n\nDigital-art tools are built around comparable visual components. Raster images are made from pixels: small samples of color and brightness that can be grouped into values, edges, textures, and color fields. Vector graphics use anchor points, path segments, and Bézier handles to define editable straight lines and curves. These systems are not copies of the brain, but they give artists a practical way to construct, isolate, and revise the same kinds of visual information that make an image readable.\n\nOnce an image is created, digital tools also allow it to be analyzed and adjusted as visual data. Channels separate color information; masks isolate selected areas; Levels and Curves remap shadows, midtones, highlights, and color relationships; filters can emphasize blur, sharpening, edge contrast, texture, or scale. These tools allow an artist to test whether an image still works as a composition of values, shapes, edges, and color masses before relying on detail.\n\nFor this assignment, break down your selected reference into its visual building blocks:',
      bullets: [
        'Major shapes: What are the largest light, dark, and color masses?',
        'Silhouette and negative space: What makes the subject separate from its background?',
        'Directional lines: Where do gesture, perspective, contours, or repeated angles guide the eye?',
        'Simple forms: Can complex objects be reduced to boxes, cylinders, spheres, wedges, or flat graphic shapes?',
        'Value structure: Does the image still read when viewed small, blurred, or in grayscale?',
        'Focal hierarchy: Where are the sharpest edges, strongest contrast, highest saturation, or most specific details?'
      ],
      closing: 'The goal is not to trace a finished image. The goal is to understand its visual construction well enough to use those principles in your own original digital artwork.'
    },
    tracks: {
      beginner: {
        title: 'Base Assignment: Traditional Translation',
        subtitle: 'Focus: Mastering digital brush mechanics, line control, and basic layers.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Select one traditional sketch or drawing of a character or prop from your traditional portfolio. You will recreate this sketch digitally. This character or prop will serve as the core element of your worldbuilding project throughout the remaining assignments.',
          },
          {
            heading: 'Exercise Guidelines',
            bullets: [
              'Create a straight-line version of your character/prop: Hold Shift with the Brush (B) tool for rigid paths.',
              'Create a curved-line version: Enable brush smoothing (80-90%) in Photoshop or Procreate to achieve clean, swooping lines.',
              'Keep the values purely black and white (line art only).',
            ],
          },
          {
            heading: 'Tool Guide: Creating Straight Lines in Photoshop',
            body: 'You will be using the following tools to create straight lines. These tools are fairly common for the majority of the software products that I have previously mentioned, but most of the details I provide below pertain mostly to Photoshop. I will explain in our first Zoom how these tools work in other programs.',
            toolGuides: [
              {
                title: 'The Pen Tool (P)',
                subtitle: '(found in Photoshop, Illustrator, GIMP, and Figma)',
                description: 'The Pen tool (P) is used to create paths or vectors (also called strokes). With the Pen tool, you draw out your paths point by point. The path is called a bezier.',
              },
              {
                title: 'The Path Palette',
                description: 'In Photoshop, paths are stored in the Path Palette. You can finish a path by hitting Escape, then draw a new path.',
              },
              {
                title: 'Converting Paths to Pixels in Photoshop',
                description: 'Here are the steps to turn the paths into pixels:',
                steps: [
                  'First, create a new layer.',
                  'Then use the Path Selection tool (A shortcut in Photoshop) to select the paths.',
                  'Select the paths, then right-click on the paths, and in the menu that appears click "Stroke Path" and select the Pencil tool or the Brush tool.',
                  'The pencil or brush tool settings will determine the quality of the brushstroke that is applied to the path.',
                ],
              },
              {
                title: 'The Brush Tool (B)',
                description: 'We can use the Brush tool (B shortcut in Photoshop) to create straight lines by dragging on the canvas while hitting Shift. Click once, hit Shift, and then click somewhere else where you want the line to end. This technique works in Photoshop, GIMP, and Magma.io. After each line, hit Escape, otherwise, you will get one continuous line.',
              },
              {
                title: 'The Line Tool (U)',
                description: 'In Photoshop, you will have to press Shift + U a couple of times to access the Line tool. Make sure the line type is set to pixels.',
              },
            ],
          },
          {
            heading: 'Recommended File Setup',
            numberedSteps: [
              'Layer 1 (Bottom): Import your traditional sketch scan/photo, set opacity to 30%.',
              'Layer 2 (Middle): Solid white background layer.',
              'Layer 3 (Top): Your active drawing layer for inking.',
            ],
          },
        ],
        submission: [
          'Scan/photo of the original traditional reference.',
          'Finished straight-line digital ink drawing as a PNG.',
          'Finished curved-line digital ink drawing as a PNG.',
        ],
        critiqueQuestions: [
          'How did you translate the organic, tactile feel of your traditional sketch into clean digital lines?',
          'What did you discover about your brush control and line confidence when comparing the straight-line and curved-line versions?',
          'How does the layer structure you set up make it easier to isolate lines and prep for future coloring or adjustments?'
        ],
      },
      intermediate: {
        title: 'Take It to the Next Level: Style Adaptability',
        subtitle: 'Focus: Adapting a character or prop design to match varying studio art directions.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Take your character or signature prop design and render it in two completely distinct commercial styles. This is a crucial skill for concept artists who must adapt to style guides.',
          },
          {
            heading: 'Style Options (Choose Two)',
            bullets: [
              'Flat Graphic Style: Hard edges, bold graphic shapes, minimal shading, heavy focus on silhouette (e.g., Samurai Jack style).',
              'Painterly / Visual Dev Style: Rich textures, soft value transitions, backlit lighting effects (e.g., Disney/Pixar style).',
              'Line & Ink Style: Dynamic comic inks with flat color fills (e.g., French-Belgian comic style).',
            ],
          },
        ],
        submission: [
          'Core sketch/underdrawing of the character or prop.',
          'Version A (Style 1) render as a PNG.',
          'Version B (Style 2) render as a PNG.',
        ],
        critiqueQuestions: [
          'What key visual rules (e.g., shape language, linework, value ranges) did you establish to distinguish your two chosen styles?',
          'How did changing the artistic style shift the personality of the character or the mood of the prop?',
          'What workflow strategies did you use to maintain consistent anatomical or mechanical proportions across both renders?'
        ],
      },
      advanced: {
        title: 'Advanced 3D Integration: 3D Base Model & Paint-over',
        subtitle: 'Focus: Modeling assets in Blender and painting details digitally in Photoshop.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Model your character base mesh or signature prop using Blender. You will render orthographic views (Front, Side, Back) and paint over them in Photoshop in two different commercial styles.',
          },
          {
            heading: 'Blender & Photoshop Workflow',
            numberedSteps: [
              'Block out the prop or low-poly character mannequin in Blender using primitive shapes and subdivision modifiers.',
              'Set up orthographic cameras (Front, Side, and Back) and render them with flat gray shaders.',
              'Import renders into Photoshop, establish a clean line art overlay, and apply two distinct style renders (flat graphic and textured painterly).',
            ],
          },
        ],
        submission: [
          'Screenshot of the Blender viewport showing your 3D mesh topology.',
          'Orthographic flat renders (PNG).',
          'Two final style paint-overs (PNG).',
        ],
        critiqueQuestions: [
          'How did blocking out the 3D shapes in Blender help clarify the proportions and perspective of your initial sketch?',
          'What choices did you make in your orthographic viewport setups to ensure your renders were clean templates for drawing?',
          'How did you merge 3D structural correctness with the expressive qualities of hand-drawn digital painting during the paint-over?'
        ],
      },
    },
  },
  3: {
    title: 'Assignment 2: Material Studies & Textures',
    subtitle: 'Worldbuilding Step 2: Define the physical materials and surfaces of your world.',
    tracks: {
      beginner: {
        title: 'Base Assignment: Media Tile Material Studies',
        subtitle: 'Focus: Brush customization, blend modes, and traditional medium simulation.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Render a signature item or element from your IP (e.g., character mask, crystal, wood shield) using a 2×2 media tile layout. Simulate traditional mediums digitally.',
          },
          {
            heading: 'Simulated Mediums',
            bullets: [
              'Panel 1: Oil Paint (using thick impasto brush, hard lighting edges).',
              'Panel 2: Watercolor (using paper textures, bleeding edges, Multiply blend modes).',
              'Panel 3: Charcoal (using tooth textures, additive white chalk, soft smudging).',
              'Panel 4: Invented Medium (using neon glows, glitch lines, or digital filters).',
            ],
          },
        ],
        submission: [
          'Brush library screenshot showcasing your custom brush engine setups.',
          'Final 2×2 Media Tile layout as a single 2000×2000 PNG file.',
          'Brief written reflection (150 words) on simulating tactile media digitally.',
        ],
        critiqueQuestions: [
          'What brush settings (e.g., texture, opacity pressure, dual brushes) were most effective in simulating physical medium paint or charcoal?',
          'How did using specific blend modes (like Multiply for watercolor transparent glazes) help replicate traditional paint interaction?',
          'Which of the four media tiles feels the most tactile, and what specific details create that illusion of physical texture?'
        ],
      },
      intermediate: {
        title: 'Take It to the Next Level: Wear & Tear Prop Sheet',
        subtitle: 'Focus: Painting texture weathering, rust, dirt, and material aging.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Take the signature prop of your character and paint it in four distinct wear-and-tear states. This showcases how materials age, react to damage, and decay in your world.',
          },
          {
            heading: 'Required Wear States',
            bullets: [
              'Pristine/Factory State: Brand new, perfect surfaces, specular highlights, clean reflections.',
              'Oxidized/Weathered State: Rust, surface patina, sun-bleaching, and micro-scratches.',
              'Overgrown/Organic State: Moss, mud, vine growth, and damp surface characteristics.',
              'Ruined/Active State: Severe battle damage (cracks, dents) combined with glowing cracked energy or magical leakage.',
            ],
          },
        ],
        submission: [
          'Photographic material reference board (10-15 reference photos).',
          'Completed 2×2 prop wear sheet (PNG).',
        ],
        critiqueQuestions: [
          'How did you vary your highlights, specular reflections, and surface roughness to distinguish between metal, moss, and energy?',
          'How does the wear and tear tell a story about the prop’s history—how it was used, where it was kept, or what damaged it?',
          'What non-destructive layer setups (e.g., masks, adjustment layers) allowed you to paint updates while keeping the original prop shape intact?'
        ],
      },
      advanced: {
        title: 'Advanced 3D Integration: Shader Editor & Render Bake',
        subtitle: 'Focus: Designing procedural shaders in Blender and backing them up with Photoshop overlays.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Use Blender\'s Shader Editor to build procedural materials (metal, rust, moss, wear) on your 3D prop. Bake the lighting and Ambient Occlusion (AO) maps, and do the final painting in Photoshop.',
          },
          {
            heading: 'Shader & Bake Workflow',
            numberedSteps: [
              'Create a procedural shader setup in Blender using Noise/Musgrave textures mixed with color ramps to define wear boundaries (like edge scraping).',
              'Unwrap your prop mesh and bake out a clean Ambient Occlusion (AO) pass and Diffuse color map.',
              'Import the baked textures into Photoshop and paint over them using custom texture overlays and adjustment layers to give it an illustrative, hand-painted finish.',
            ],
          },
        ],
        submission: [
          'Node setup screenshot showing your Blender Shader Editor mapping.',
          'Baked AO and Diffuse passes as separate files (PNG).',
          'Final illustrative paint-over render (PNG).',
        ],
        critiqueQuestions: [
          'How did you use node configurations in Blender (e.g., mixing noise textures with geometry wear attributes) to target edges and crevices?',
          'What did the ambient occlusion (AO) pass bring to your Photoshop layer stack, and how did you blend it with hand-painted colors?',
          'How did you balance the clean, mathematical precision of procedural 3D shaders with the warmth and charm of digital paint-over?'
        ],
      },
    },
  },
  5: {
    title: 'Assignment 3: Atmospheric Space',
    subtitle: 'Worldbuilding Step 3: Illustrate a key setting, headquarters, or terrain from your world.',
    tracks: {
      beginner: {
        title: 'Base Assignment: Perspective & Atmospheric Lighting',
        subtitle: 'Focus: Linear perspective grids, depth cueing, and value composition.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Paint an environment setting from your IP (e.g., character sanctuary, hideout, landscape) focusing on creating depth. Focus strictly on composition and lighting (no character required).',
          },
          {
            heading: 'Required Techniques',
            bullets: [
              'Establish a clear perspective grid (one-point or two-point perspective).',
              'Use clear depth cueing: things further away get lighter, lower contrast, and cooler (atmospheric perspective).',
              'Use a strong directional light source (sun through trees, spotlight, portal glow) to establish a clear value hierarchy (Foreground shadow, midground light, background haze).',
            ],
          },
        ],
        submission: [
          'Linear perspective grid sketch (PNG).',
          'Value study thumbnail sheet (3 different options).',
          'Final high-resolution digital painting (PNG).',
        ],
        critiqueQuestions: [
          'How does your perspective grid guide the viewer’s eye through the foreground, midground, and background layers?',
          'How did you use value contrast (light against dark) and color temperature (cool vs. warm) to establish atmospheric depth?',
          'Does the directional light source feel integrated across all elements, and how does it define the volume of your structures?'
        ],
      },
      intermediate: {
        title: 'Take It to the Next Level: Narrative Keyframe',
        subtitle: 'Focus: Combining character and environment to tell a story in a single image.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Paint a story-driven environment keyframe featuring your main character interacting with a dramatic location. The light is the main subject: it must act on the character and surfaces to tell a story.',
          },
          {
            heading: 'Narrative Framing Guidelines',
            bullets: [
              'Scale: Establish a clear relationship between the character\'s height and the environment (e.g., massive ruins, tight claustrophobic corridors).',
              'Focal Point: Guide the viewer\'s eye to a specific point of interest using composition lines and lighting highlights.',
              'Cinematic effects: Use atmospheric haze, fog rays, dust particles, and soft depth-of-field overlays to give the keyframe a cinematic appearance.',
            ],
          },
        ],
        submission: [
          'Initial rough sketch layout and visual research board.',
          'Value / color keys (3 color script variants).',
          'Final cinematic environment keyframe render (PNG).',
        ],
        critiqueQuestions: [
          'What story details or character motivations did you focus on communicating in this keyframe setting?',
          'How does the camera crop and composition layout create a sense of scale and emotional atmosphere (e.g. isolation, epic grandeur, danger)?',
          'How did you use cinematic light overlays, atmospheric fog, or depth-of-field to integrate the character seamlessly into the scene?'
        ],
      },
      advanced: {
        title: 'Advanced 3D Integration: 3D Cinematic Block-In',
        subtitle: 'Focus: Staging environments in 3D, configuring volumetric cameras, and painting over the render.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Build a 3D block-in of your IP environment setting in Blender. Configure composition, volumetric lighting, and camera lenses, then execute a detailed illustrative paint-over in Photoshop.',
          },
          {
            heading: 'Blender-to-Photoshop Pipeline',
            numberedSteps: [
              'Staging: Build the environment layout in Blender using modular assets or low-poly boxes.',
              'Lighting & Volume: Enable volumetrics (Principled Volume) and position lighting to create dramatic god rays, focal highlights, and shadows.',
              'Camera configuration: Set focal length (e.g., 24mm wide angle for grandeur), enable depth-of-field, and render a high-fidelity pass.',
              'Photoshop Paint-over: Paint details, hand-rendered textures, environmental flora, and character illustrations over the top of the render layer.',
            ],
          },
        ],
        submission: [
          'Blender workspace viewport screenshot showing 3D scene geometry layout.',
          'Raw Blender render pass (PNG).',
          'Final painted-over cinematic keyframe (PNG).',
        ],
        critiqueQuestions: [
          'How did staging your camera lens (focal length, sensor size) in Blender help frame the dramatic depth of the environment?',
          'What changes did you make to the volumetric settings (fog density, light scattering) in 3D to create strong initial values?',
          'In the Photoshop stage, how did you decide which render details to keep and which areas to paint over to make it feel hand-painted?'
        ],
      },
    },
  },
  7: {
    title: 'Assignment 4: Narrative Sequence',
    subtitle: 'Worldbuilding Step 4: Map character consistency and tell a sequential action story.',
    tracks: {
      beginner: {
        title: 'Base Assignment: 3-Panel Comic & Turnaround',
        subtitle: 'Focus: Character proportions, expression, and basic multi-panel framing.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Depict a simple interaction or scene in your IP story. You will create a basic 3-panel comic layout showing a character performing an action, alongside a clean turnaround sketch showing the character from the front and side.',
          },
          {
            heading: 'Sequential Formatting',
            bullets: [
              'Panel 1: Establishing Shot — Show the environment setting.',
              'Panel 2: Medium Shot — Show the character preparing for an action.',
              'Panel 3: Close-Up — Show the result of the action or the character\'s reaction.',
              'Character turnaround: Ensure proportions (height, features) match between the front and side sketches.',
            ],
          },
        ],
        submission: [
          'Clean 3-panel comic sheet layout (PNG).',
          '2-view character turnaround line art sheet (PNG).',
        ],
        critiqueQuestions: [
          'How did the panel framing (establishing shot, medium shot, close-up) help clarify the action and the character’s reaction?',
          'What features or structural details did you focus on to ensure your character looked consistent between the front and side views?',
          'How did your clean line art help clarify the focus of each panel without relying on color or shading?'
        ],
      },
      intermediate: {
        title: 'Take It to the Next Level: Storyboard Sequence & Turnarounds',
        subtitle: 'Focus: Camera angles, cinematography codes, and model turnaround templates.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Create a professional storyboard sequence (6-to-9 panels) detailing a high-stakes moment in your IP. Pair this with a standard character model turnaround sheet containing orthographic views (Front, Side, Back) and 4 expression studies.',
          },
          {
            heading: 'Cinematography Codes',
            bullets: [
              'Use diverse camera angles: High angle (vulnerability), Low angle (power), Dutch tilt (tension).',
              'Show camera movement indicators (zoom arrows, tracking paths) within your panels.',
              'Format storyboard sheets cleanly with action captions, dialog, and panel numbering.',
            ],
          },
        ],
        submission: [
          'Completed 6-9 panel storyboard sequence sheet (PNG/PDF).',
          'Character model turnaround sheet showing Front, Side, Back, and Expressions (PNG).',
        ],
        critiqueQuestions: [
          'How did using dynamic camera angles (high, low, Dutch tilts) emphasize the emotional shifts in your storyboard sequence?',
          'What challenges did you face when showing camera motion (e.g. pans, zooms) inside static panels, and how did you use arrows/guides?',
          'How do the turnaround expression studies help define the character’s acting style and emotional personality?'
        ],
      },
      advanced: {
        title: 'Advanced 3D Integration: Blender Grease Pencil / Animatic Block-In',
        subtitle: 'Focus: Virtual camera timelines, 3D storyboard blocking, and Grease Pencil sketching.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Stage a 6-to-9 panel storyboard sequence directly in Blender. Set up a multi-camera timeline to block out camera angles, and sketch character action in 3D space using Grease Pencil.',
          },
          {
            heading: '3D Storyboard Pipeline',
            numberedSteps: [
              'Set up a simple 3D staging ground in Blender with low-poly assets and character mannequins.',
              'Create camera objects, configure aspect ratios (e.g., 1.85:1 or 2.39:1 cinema scope), and keyframe camera switches along the timeline.',
              'Use Grease Pencil layers to draw character poses, gestures, and action indicators directly in 3D space over the low-poly mannequin meshes.',
              'Export the sequence as storyboard cards or compile an animatic render.',
            ],
          },
        ],
        submission: [
          'Blender workspace viewport screenshot showing camera rigs and Grease Pencil drawings.',
          'Completed storyboard sequence sheet exported directly from Blender (PNG/PDF) or compiled animatic video (MP4).',
        ],
        critiqueQuestions: [
          'How did staging the storyboard in a 3D environment help you test camera movements and spatial relationships before drawing?',
          'What advantages did you find in drawing on a 3D grid with Grease Pencil compared to standard 2D sketching?',
          'How did timing your panels along the Blender timeline help you understand the pacing and rhythm of the cinematic sequence?'
        ],
      },
    },
  },
  9: {
    title: 'Assignment 5: Release Campaign',
    subtitle: 'Worldbuilding Step 5: Design the promotional assets and release package for your world.',
    tracks: {
      beginner: {
        title: 'Base Assignment: Most Wanted Poster Campaign',
        subtitle: 'Focus: Typography hierarchy, bleed margins, and raster-vector combinations.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Design a clean commercial poster showcasing your main character or signature environment. Pair your digital illustration with custom logo/typography layouts.',
          },
          {
            heading: 'Design Layout Specs',
            bullets: [
              'Canvas Size: 11" x 17" with 0.25" bleed margins.',
              'Combine your raster digital painting (from Photoshop/Procreate) with vector text layers.',
              'Create a hierarchy of information: Title/Logo (focal point), tagline (medium size), credits (small size at bottom).',
            ],
          },
        ],
        submission: [
          'Mockup design thumbnail sketch showing layout grids.',
          'Completed poster print-ready file (PDF or high-res PNG).',
        ],
        critiqueQuestions: [
          'How did you establish typography hierarchy so that the title/logo is read first, followed by taglines and secondary credits?',
          'What choices did you make regarding margins and layout grid alignment to ensure the poster feels balanced and commercial?',
          'How did the composition of your digital painting adapt to leave appropriate negative space for the text overlay?'
        ],
      },
      intermediate: {
        title: 'Take It to the Next Level: Multi-Format Key Art Campaign',
        subtitle: 'Focus: Layout engineering in InDesign, CC Libraries, and responsive print/web layouts.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Design a premium commercial campaign cover (e.g., game case art or film poster). You will adapt this campaign into four completely different layout sizes (horizontal web banner, vertical poster, mobile feed post, and package spine/box art).',
          },
          {
            heading: 'Responsive Campaign Specs',
            bullets: [
              'Use Adobe InDesign to establish master grid structures for margins, column bounds, and text flow.',
              'Manage your asset links: Use Photoshop smart objects and Illustrator vector assets linked through CC Libraries to maintain resolution.',
              'Ensure composition responds dynamically to different sizes without simply stretching the image (cropping, rearranging elements, adjusting text layout).',
            ],
          },
        ],
        submission: [
          'Completed campaign package containing 4 layout formats (PDF/PNG).',
          'Asset package folder screenshot showing linked high-res source files.',
        ],
        critiqueQuestions: [
          'How did you adapt your layout grids in InDesign to fit four very different shapes (horizontal, vertical, square, spine)?',
          'What adjustments did you make to the focal points, text positioning, and crop bounds to keep the story clear in every size?',
          'How did linking assets (smart objects, vectors) through libraries help you work efficiently and avoid losing quality?'
        ],
      },
      advanced: {
        title: 'Advanced 3D Integration: 3D Studio lighting & Asset Marketing Deck',
        subtitle: 'Focus: Setting up studio lighting in Blender, rendering hero passes, and compiling marketing decks.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Set up high-end virtual studio lighting in Blender (three-point lighting, rim lights, gobos) to render your hero character model or prop. Bring these renders into Photoshop/InDesign to construct the final marketing deck.',
          },
          {
            heading: 'Studio Lighting & Render Workflow',
            numberedSteps: [
              'Import your high-poly character or prop model into a clean Blender staging scene.',
              'Lighting: Set up a three-point lighting system (Key, Fill, Rim) with dramatic colors to match your IP\'s mood. Use spotlight gobos to create textured light patterns.',
              'Baking/Rendering: Render out high-resolution transparency passes (alpha channel shadows, emission passes).',
              'Composite & Design: Combine your 3D renders with graphic elements and typography in Photoshop/InDesign to create print-ready ads and digital banners.',
            ],
          },
        ],
        submission: [
          'Blender workspace viewport screenshot showing 3D studio light positioning.',
          'Raw 3D render passes (transparent background PNG).',
          'Completed multi-format marketing deck layouts (PDF/PNG).',
        ],
        critiqueQuestions: [
          'How did your three-point studio lighting setup (Key, Fill, Rim) in Blender carve out form and highlight the model’s details?',
          'What role did colored light accents or spotlight gobos play in matching the marketing deck\'s theme with the IP\'s story?',
          'How did you organize your render passes (shadow catchers, emissions) in Photoshop/InDesign to create a professional commercial layout?'
        ],
      },
    },
  },
  10: {
    title: 'Assignment 6: Capstone Pitch Deck',
    subtitle: 'Worldbuilding Step 6: Compile your IP worldbuilding project into a showcase-ready presentation.',
    tracks: {
      beginner: {
        title: 'Base Assignment: Portfolio Showcase Deck',
        subtitle: 'Focus: Curating art assets, organizing presentation grids, and formatting layout pages.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Compile and format 6-8 of your best polished digital art assets generated during the program. Package them into a cohesive digital presentation PDF or personal portfolio website layout.',
          },
          {
            heading: 'Presentation Elements',
            bullets: [
              'Title slide containing your IP name, logo, and a brief description of the world.',
              'Clean card layout slides: Use consistent margins, font sizes, and grids to frame your artwork.',
              'Process page: Show the progression of one piece from the rough sketch to the final color render.',
            ],
          },
        ],
        submission: [
          'Completed portfolio showcase deck (PDF or link to live website).',
        ],
        critiqueQuestions: [
          'What unified design choices (margins, fonts, color themes) did you establish to make the entire presentation slide deck feel cohesive?',
          'How did you organize your presentation grids to balance artwork focal points with descriptive text columns?',
          'Does your process page clearly show a progression that helps other artists understand your digital workflow?'
        ],
      },
      intermediate: {
        title: 'Take It to the Next Level: IP Worldbuilding Pitch Deck',
        subtitle: 'Focus: Character lineups, color keys, world guides, and professional presentation decks.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Compile a complete "IP Worldbuilding Pitch Deck" that pitches your project as a potential TV show, video game, or comic. This deck will showcase your character lineups, prop sheets, narrative keyframes, and color scripts.',
          },
          {
            heading: 'Required Pitch Deck Slides',
            bullets: [
              'Slide 1: Logline & IP Overview (Concept summary and target audience).',
              'Slide 2: Main Character Lineup (Character turnaround, details callouts, expressions).',
              'Slide 3: Signature Prop & Material Guide (Asset wear sheets, textures).',
              'Slide 4: Key Locations & Cinematic Keyframes (Environment shots, atmosphere).',
              'Slide 5: Narrative Sequence & Storyboards (Sequential panels showing storytelling).',
              'Slide 6: Color Script & Mood Keys (Color script chart showing emotional beats).',
            ],
          },
        ],
        submission: [
          'Completed IP Worldbuilding Pitch Deck (16:9 PDF format).',
        ],
        critiqueQuestions: [
          'How did you sequence the slides (logline, characters, environments, storyboards) to build a compelling narrative about your IP?',
          'What choices did you make in typography size, page grids, and color schemes to give your pitch deck a premium, studio-ready look?',
          'Does the color script successfully show the emotional beats of the story in a simple, visual chart?'
        ],
      },
      advanced: {
        title: 'Advanced 3D Integration: IP Production Bible & 3D Assets Deck',
        subtitle: 'Focus: 3D modeling topology, rendering breakdowns, and master visual production bibles.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Compile a comprehensive "IP Production Bible & 3D Assets Deck" that shows your Blender-to-Photoshop pipeline. This presentation is designed to show a potential studio that you understand technical 3D workflows, asset modularity, and high-fidelity rendering.',
          },
          {
            heading: 'Required Production Deck Slides',
            bullets: [
              'Slide 1: IP Concept & 3D Pipeline Overview (Workflow charts and render engine choices).',
              'Slide 2: 3D Character Mesh & Topology (Low-poly topology screenshots, wireframes, turnarounds).',
              'Slide 3: Modular Asset Kit & Prop Shaders (Asset mesh grid, Shader Editor layouts, UV map layouts).',
              'Slide 4: Environment Composition & Lighting Keys (3D scene block-ins vs. final paint-over keyframes).',
              'Slide 5: Cinematic Animatic / Grease Pencil Storyboards (Multi-camera staging, 3D storyboard passes).',
              'Slide 6: Marketing Release Composites (Renders integrated into print-ready layouts and digital banners).',
            ],
          },
        ],
        submission: [
          'Completed IP Production Bible & 3D Assets Deck (16:9 PDF format).',
        ],
        critiqueQuestions: [
          'How does your slide layout explain your Blender-to-Photoshop pipeline to someone who might not know 3D software?',
          'How did you frame wireframes and topology views to showcase your clean modeling work and polygon efficiency?',
          'Does the modular asset kit layout demonstrate how individual 3D objects can build a wider world efficiently?'
        ],
      },
    },
  },
};
