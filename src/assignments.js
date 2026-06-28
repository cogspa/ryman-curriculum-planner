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
      imageUrl: '/phantoms_in_the_brain.png',
      imageCaption: 'Phantoms in the Brain by V. S. Ramachandran',
      body: 'When we look at an image, we do not perceive every detail at once. The visual system first responds to simpler visual information: changes in light and dark, color differences, edges, directions, textures, overlapping forms, and larger shape groupings. In early visual cortex, many neurons are especially responsive to the orientation of an edge or bar—vertical, horizontal, diagonal, curved, or moving. Other visual networks contribute to color, figure-ground separation, spatial depth, motion, and object recognition.\n\nNeurologist V. S. Ramachandran’s book [Phantoms in the Brain](https://www.amazon.com/Phantoms-Brain-Probing-Mysteries-Human/dp/0688172172) explores how neurological conditions can reveal the hidden structure of perception. When a specific part of the visual system is damaged or disrupted, a person may lose one aspect of visual experience while retaining others. Someone may see objects but struggle to perceive motion, recognize faces, judge distance, organize space, or identify a familiar form.\n\nThese cases show that vision is not a single process. The brain builds visual understanding from many interacting systems that process edges, contrast, color, motion, shape, depth, attention, and object identity. What feels like one seamless image is actually the result of many forms of analysis occurring at once.\n\nThis is directly relevant to digital artists. When we break down an image into gesture lines, silhouettes, value masses, color groupings, perspective guides, and simple geometric forms, we are separating the same kinds of visual information the brain must organize in order to make sense of a scene.\n\nDigital graphics tools make these components visible and editable. Pixels store small samples of color and brightness; vector paths use points and Bézier curves to construct lines and shapes; layers, masks, and channels isolate visual information; and tools such as Blur, Sharpen, Levels, Curves, and Filters allow us to analyze and adjust contrast, edge clarity, color, texture, and depth.\n\nIt is more accurate to say that digital tools let us separate and manipulate visual variables than to say they reproduce the brain’s exact mechanisms. Photoshop channels, Curves, masks, Bézier paths, filters, and pixel grids are engineering systems, but they are powerful for artists because they map well onto the visual information viewers use: edge, contrast, color, shape, scale, and spatial separation.\n\nAnd this is how many digital artists work as well. They break images down into components, base shapes, and line structures. The exercises here reflect the common techniques digital painters use to block out forms, structures, and define lighting in their compositions, which is very much how the brain itself works—by unlocking patterns of perception that we normally don\'t think about.\n\nThe purpose of this assignment is to study an image as a constructed visual system. By identifying its major lines, shapes, values, negative spaces, and spatial cues, you will better understand how an image guides perception—and how to use those same tools in your own original digital work.\n\nFor this assignment, break down your selected reference into its visual building blocks:',
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
            body: 'Using your selected traditional sketch as reference, create three separate digital versions of your character or prop—each using a different blocking approach.',
            bullets: [
              { text: '**Straight Line Blocking:** Use the Pen Tool (**P**) to lay down precise bezier paths, or use the Brush Tool (**B**) with **Shift** held down to click point-to-point for rigid straight-line construction. Focus on angular structure and clean geometric edges.', imageUrl: '/example_lasso_shape_blocking.png', imageCaption: 'Straight Line Blocking' },
              { text: '**Sketch Approach:** Work freehand with the Brush Tool, using brush smoothing (80–90%) to achieve loose, gestural, expressive lines. Capture energy and movement over precision.', imageUrl: '/example_sketch_approach.png', imageCaption: 'Sketch Approach' },
              { text: '**Lasso Block Approach:** Use the Polygonal Lasso Tool (**L**) to click out flat shape selections, then fill them with the Paint Bucket or brush inside the selection boundary. Build up your character/prop as a series of flat, hard-edged value masses—like a paper cut-out silhouette.', imageUrl: '/example_straight_line_blocking.png', imageCaption: 'Lasso Block Approach', subIntro: 'This is a simple process, and many artists use it as an initial step to create a landscape. It\'s quick and simple because it works best with a mouse, and the results for landscape depth can be surprisingly good for such a simple process. Here are the steps:', substeps: ['Create a New Layer — For each layer type (background, midground, foreground), create a new layer in Photoshop. Use the keyboard shortcut **Ctrl + Alt + Shift + N** (**Cmd + Option + Shift + N** on Mac) to quickly add a new layer.', 'Select the Polygonal Lasso Tool — Select the Polygonal Lasso tool from the toolbar to create your landscape elements. Access this tool quickly by pressing **Shift + L** until the Polygonal Lasso tool is active.', 'Draw and Fill Your Landscape Shapes — Using the Polygonal Lasso tool, draw the outline of your landscape elements such as mountains, rivers, or trees. You can switch from the Polygonal Lasso to the freeform Lasso by holding **Alt/Option**. Once you\'ve completed a selection, fill it with your chosen color by pressing **Alt + Backspace** (**Option + Delete** on Mac) to fill with the foreground color.', 'Deselect and Move to the Next Layer — After you have filled the selection, deselect by pressing **Ctrl + D** (**Cmd + D** on Mac). Move on to the next layer to create your next landscape element.'] },
            ],
          },
          {
            heading: 'Tool Guide: Creating Straight Lines in Photoshop',
            body: 'You will be using the following tools to create straight lines. These tools are fairly common for the majority of the software products that I have previously mentioned, but most of the details I provide below pertain mostly to Photoshop. I will explain in our first Zoom how these tools work in other programs.',
            toolGuides: [
              {
                title: 'The Pen Tool (**P**)',
                subtitle: '(found in Photoshop, Illustrator, GIMP, and Figma)',
                description: 'The Pen tool (**P**) is used to create paths or vectors (also called strokes). With the Pen tool, you draw out your paths point by point. The path is called a bezier.',
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
                  'Then use the Path Selection tool (**A** shortcut in Photoshop) to select the paths.',
                  'Select the paths, then right-click on the paths, and in the menu that appears click "Stroke Path" and select the Pencil tool or the Brush tool.',
                  'The pencil or brush tool settings will determine the quality of the brushstroke that is applied to the path.',
                ],
              },
              {
                title: 'The Brush Tool (**B**)',
                description: 'We can use the Brush tool (**B** shortcut in Photoshop) to create straight lines by dragging on the canvas while hitting **Shift**. Click once, hit **Shift**, and then click somewhere else where you want the line to end. This technique works in Photoshop, GIMP, and Magma.io. After each line, hit **Escape**, otherwise, you will get one continuous line.',
              },
              {
                title: 'The Line Tool (**U**)',
                description: 'In Photoshop, you will have to press **Shift + U** a couple of times to access the Line tool. Make sure the line type is set to pixels.',
              },
              {
                title: 'The Polygonal Lasso Tool (**L**)',
                subtitle: '(Photoshop and digital painting software)',
                description: 'The Polygonal Lasso tool (**L**) is a powerful tool to build up initial digital painting concepts. Instead of drawing paths point-by-point like the Pen tool, the Polygonal Lasso lets you click to create straight-edge selection boundaries. Constrain angles using **Shift**, click to set corners, and close the loop to make your selection active.',
                imageUrl: '/polygonal_lasso_tool.png',
                steps: [
                  'Use it to quickly block in value masses: layout background, midground, and foreground planes on separate layers to immediately establish structure and form.',
                  'Create quick character silhouettes or hard-edged mechanical shapes in the scene.',
                  'Use selections to paint straight beams of light or crisp cast shadows without overspraying onto other areas.',
                  'Fill selections directly with the Paint Bucket tool or brush inside the active boundary to lock in the shapes.'
                ]
              },
            ],
          },
        ],

        submission: [
          'Scan/photo of the original traditional reference.',
          'Finished Straight Line Blocking version as a PNG.',
          'Finished Sketch Approach version as a PNG.',
          'Finished Lasso Block Approach version as a PNG.',
        ],
        critiqueQuestions: [
          'How did your three blocking approaches (straight-line, sketch, lasso block) differ in ease of execution and final aesthetic character?',
          'What did you discover about your brush control, line confidence, and hand-eye coordination when doing the freehand gestural sketch versus the straight-line path blocking?',
          'How does the flat silhouette lasso blocking style help you see form and shape value hierarchy differently compared to traditional linework?',
          'How will organizing these drawing phases on separate layers make it easier to apply color and lighting overlays in later assignments?'
        ],
      },
      intermediate: {
        title: 'Assignment 1 — Part 2: Scene Integration',
        subtitle: 'Focus: Combining your blocking methods, working from photo reference, and moving from value to color through lighting.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'In Part 1, you translated a traditional sketch into a digital character or prop and explored three different blocking approaches. That character or prop is the seed of your world. In Part 2, you will plant it in three different environments.\n\nYou will create **three scenes**, each built from a different photographic reference, and place your IP character or prop into each one. This is where the methods from Part 1 stop being separate exercises and start working together. The goal is **not** a finished photoreal scene — it is to capture the *essence* of the world you are developing. Keep everything loose and sketchy. The viewer\'s imagination fills the gaps.',
          },
          {
            heading: 'Exercise Guidelines',
            body: 'Gather three different photographic references — three distinct environments, moods, or settings your character could inhabit. For each one, build a scene by working through the process below.',
          },
          {
            heading: 'Process',
            numberedSteps: [
              '**Block out and sketch the scene.**\nStart by combining the techniques from Part 1. You can sketch freehand or block out background elements with the Polygonal Lasso — or both in the same scene. Use straight-line blocking, the sketch approach, and lasso blocks wherever they fit. Establish the big forms first: where the character sits, where the major masses of the environment are.',
              '**Refine the forms.**\nOnce the main forms are determined, sketch further and tighten things up. You are not chasing detail — you are finding the structure and the shape relationships.',
              '**Organize with layers and your Library.**\nUse layers to keep your scene readable (background, midground, foreground, character, lighting). Use the CC Library to store and reuse assets across your three scenes — your character, props, or any shape you want to carry forward.',
              '**Think about shape language.**\nAs you block and refine, pay attention to the *shape language* of your forms — the angles, curves, and silhouettes that define the feel of your world. If a shape becomes interesting or reusable, save it to the Library too.',
              '**Keep brushes simple.**\nWe have not covered custom brushes yet, so stay with the basics. Don\'t get distracted by texture or fancy strokes — the focus right now is structure, value, and light.',
            ],
            bottomImageUrl: '/cyclist_paint_over_comparison.png',
            bottomImageCaption: 'Example of blocking out and sketching a scene from photo reference (left) into painted value shapes (right).'
          },
          {
            heading: 'From Value to Color',
            start: 6,
            numberedSteps: [
              '**Study the light in your reference.**\nLook at your photo reference and read the light: where it\'s coming from, the direction it travels, and how that translates into color. This observation is what makes the next steps believable.',
              '**Block everything out in greyscale.**\nGet the full scene working in value first — lights and darks, no color. A scene that reads in greyscale will read in color.',
              '**Build a small palette and paint the light.**\nOnce the greyscale is in place, build a focused color palette of **4 to 6 colors** and paint the lighting over your value blockout.',
              {
                text: '**Apply the lighting with blend modes.**\nFor now, use layer blend modes to apply lighting rather than painting it manually — it\'s faster and keeps you flexible. My recommended starting points:',
                subbullets: [
                  '**Linear Light** — for your darker colors (shadows)',
                  '**Pin Light** — for your lighter colors (highlights)',
                  '**Overlay** — for your mid-tones'
                ],
                subIntro: 'Put your lighting/color passes on their own layers so you can dial intensity and swap modes freely.'
              }
            ],
          },
          {
            heading: 'Working With Your Reference',
            body: 'A few ways to keep your photo reference visible while you paint:',
            bullets: [
              'Place the reference on a **separate artboard** alongside your canvas.',
              'Use **PureRef** (note: this is now a paid app).',
              'Or drop the reference on the **base layer** and toggle layers on and off to compare against it.',
            ],
          },
          {
            heading: 'Recommended File Setup',
            bullets: [
              '**Reference layer (bottom):** Your photographic reference, set to a low opacity, on its own toggleable layer.',
              '**Greyscale blockout:** Background, midground, foreground, and character forms on organized layers.',
              '**Lighting / color passes (top):** Separate layers set to your recommended blend modes.',
              '**Library:** Character, props, and any reusable shapes saved for use across all three scenes.',
            ],
          },
        ],
        submission: [
          'The three photographic references used (one per scene).',
          'Scene 1 — finished loose color study as a PNG.',
          'Scene 2 — finished loose color study as a PNG.',
          'Scene 3 — finished loose color study as a PNG.',
        ],
        critiqueQuestions: [
          'How did combining the Part 1 methods change the way you approached building a full scene?',
          'What did studying the light in your reference teach you about translating value into color?',
          'How did the blend-mode lighting workflow affect the mood of each scene, and which mode gave you the most useful result?',
          'Looking at all three scenes together, what shape language is starting to define your world?',
        ],
      },
      advanced: {
        title: 'Advanced Integration: Illustrated 3D Prop Composite',
        subtitle: 'Focus: Combine Photoshop, vector outlines, and Blender Grease Pencil to build an illustrated 3D prop composite.',
        sections: [
          {
            heading: 'Overview',
            body: 'For this assignment, you will choose one scene and add one illustrated 3D prop to it using a hybrid workflow that combines Photoshop, Illustrator/glTF, Blender, Grease Pencil, and Photoshop compositing.\n\nThe goal is not to learn full 3D modeling. Instead, the goal is to use a 2D drawing as the basis for a simple 3D object, then enhance it with hand-drawn linework and paint so it feels expressive, stylized, and integrated into an illustration or photo composite.\n\nThis workflow allows you to create props that can be:\n- rotated to find a better camera angle,\n- placed in perspective,\n- lit more consistently,\n- painted over for a hand-made look,\n- and composited into a finished scene.\n\nThink of this as Illustrated 3D Props, not traditional hard-surface modeling.',
            images: [
              { url: '/photoshop_bike_drawing.png', caption: 'Original Photoshop outline drawing of the bike.' },
              { url: '/blender_grease_pencil_example.png', caption: 'The final simple 3D bike model with Grease Pencil line art applied.' }
            ]
          },
          {
            heading: 'Assignment Prompt',
            body: 'Pick one scene and add one 3D prop that belongs in that world.\n\nYour prop should begin as a 2D outline drawn in Photoshop, be converted into a vector, brought into Blender as a simple extruded object, enhanced with Grease Pencil, and then composited back into a final Photoshop scene.\n\nYour final image should feel like a finished illustration, concept image, poster, or stylized photo composite.',
          },
          {
            heading: 'Examples of Props',
            body: 'You may choose almost any prop, as long as it can begin as a clear silhouette or outline.',
            bullets: [
              'Guitar',
              'Skateboard',
              'Surfboard',
              'Bike frame',
              'Shoe',
              'Robot part',
              'Sign',
              'Helmet',
              'Ray gun',
              'Vehicle silhouette',
              'Chair',
              'Mask',
              'Hand-held device',
              'Fantasy object',
            ],
          },
          {
            heading: 'Learning Goals',
            bullets: [
              'Translate a 2D drawing into a simple 3D object.',
              'Understand how vector outlines can become extruded forms.',
              'Use Blender in an accessible way without full polygon modeling.',
              'Add expressive drawn detail using Grease Pencil.',
              'Composite a rendered object into a Photoshop illustration.',
              'Combine 2D and 3D methods into one workflow.',
            ],
          },
          {
            heading: 'Workflow Steps',
            body: 'Follow these steps to complete the assignment:',
            numberedSteps: [
              '**Step 1: Choose Your Scene.** Start by selecting or creating one scene where your prop will appear. This could be a painted environment, photo collage, poster composition, editorial illustration, character scene, album-cover, or designed setting. Your prop should feel like it belongs in the world of the scene.',
              '**Step 2: Draw the Prop in Photoshop.** Create a clean outline drawing of your prop in Photoshop. You may use the Pen Tool, Shape Tools, or carefully drawn outline work that can be turned into paths. Focus on a strong silhouette, clear readable form, and a design that translates well into a simple extruded object. At this stage, think in terms of shape design, not tiny details.',
              {
                text: '**Step 3: Convert the Outline to Vector.** Turn your outline into a vector-ready shape. Suggested workflow: save or refine the path in Photoshop, export the path to Illustrator if needed, clean up the vector shape, and export the final shape as glTF. The glTF should be simple, clean, and easy to import into Blender.',
                imageUrl: '/asset_export_gltf.png',
                imageCaption: 'Photoshop Asset Export settings panel showing GLTF output option for the vector shapes.'
              },
              '**Step 4: Import the glTF into Blender.** Bring your glTF into Blender. Once imported, use the curve/object as the basis for your prop: give it a small amount of extrusion, add a slight bevel if needed, and create a dimensional "cutout" version of the object. This is not meant to be a complex model. You are creating a simple 3D form from a 2D silhouette.',
              '**Step 5: Add Only Minimal 3D Forms.** You may add a few extra dimensional parts if needed, but keep the object simple (e.g. guitar neck/strings, skateboard trucks/wheels, bike wheels/handlebars). **Important Limitation:** To keep the assignment focused, you may add no more than 3 modeled forms beyond the original silhouette. Don\'t get stuck building a fully realistic object or worry about perfect topology. The goal is a convincing illustrated prop, not engineering accuracy.',
              {
                text: '**Step 6: Use Grease Pencil to Stylize the Prop.** Take all GLTF and put them in collection (rt. click in tghe Scene Collection window and choose container) and then to apply the grease pencil to the geometry hit shift + A in the 3D viewport, select Grease Pencil > Collection Line Art.  You can adjust the width of Grease Pencil line by line Radius in the Line Art modifier in Properties.\n\n*In order to properly see the grease pencil outlines you need to toggle camera and click on the lock icon in the viewport.*',
                images: [
                  { url: '/blender_new_collection.png', caption: 'Create a New Collection in the Outliner window.' },
                  { url: '/blender_grease_pencil_collection_line_art.png', caption: 'Select Grease Pencil > Collection Line Art.' },
                  { url: '/blender_modifier_line_radius.png', caption: 'Set the Line Radius in the Modifier properties.' },
                  { url: '/blender_lock_camera.png', caption: 'Toggle camera and click the lock icon in the viewport.' }
                ]
              },
              '**Step 7: Render the Prop.** Render your prop from the best camera angle for your scene. Output a transparent PNG still (or a short transparent sequence if you want multiple options). Your prop should be lit in a way that helps it fit your final scene.',
              '**Step 8: Composite the Prop in Photoshop.** Bring your rendered prop back into Photoshop and composite it into your chosen scene. In Photoshop, you may adjust scale and placement, color-correct the prop, paint over the render, add cast shadows, add atmosphere, add texture, integrate lighting, and unify the overall image. Your final piece should feel like one finished image, not just an object pasted onto a background.'
            ]
          },
          {
            heading: 'Technical Notes',
            bullets: [
              'Use Photoshop for the original outline and final composite.',
              'Use Illustrator or glTF export as the bridge between Photoshop and Blender if needed.',
              'Use Blender for extrusion, simple form development, and Grease Pencil.',
              'Export the prop as a transparent render.',
              'If you want to preserve the object for future use, Blender can export it as glTF or OBJ (glTF is preferred for modern reuse, OBJ is acceptable for basic geometry export).'
            ]
          },
          {
            heading: 'Requirements',
            bullets: [
              'Include one scene.',
              'Include one illustrated 3D prop.',
              'Begin with a 2D outline.',
              'Use a vector-to-3D workflow.',
              'Include some Grease Pencil or hand-drawn enhancement.',
              'End as a finished Photoshop composite.'
            ]
          }
        ],
        submission: [
          'Original Photoshop prop drawing (the outline or shape design used to begin the prop).',
          'Vector source file (glTF, Illustrator file, or equivalent exported vector).',
          'Blender file (showing the imported shape and simple 3D construction).',
          'Rendered prop (one transparent PNG of the prop by itself).',
          'Final composited scene (a finished Photoshop image with the prop integrated into the scene).',
          'Optional: Second camera angle or variation (optional alternate render or alternate composite).'
        ],
        critiqueQuestions: [
          'How did combining 2D drawing, vector outlines, and simple 3D forms change your approach to designing props?',
          'What expressive elements did you add using Grease Pencil, and how did they help bridge the gap between 3D renders and your 2D illustration?',
          'How did you handle lighting, color grading, and shadows in Photoshop to make the rendered prop feel integrated into the final scene?'
        ]
      },
    },
  },
  3: {
    title: 'Assignment 2: Compositional Brush Library & Landscape Exploration',
    subtitle: 'Worldbuilding Step 2: Build custom brushes from real-world imagery and use them to construct environment compositions.',
    tracks: {
      beginner: {
        title: 'Base Assignment: Compositional Brush Library',
        subtitle: 'Focus: Building custom brush libraries from real-world imagery to use as compositional painting tools.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'In this assignment, you will build your own custom brush library that represents the visual elements of your world.\n\nAn important distinction: the brushes you are creating here are not meant to emulate traditional artistic materials like charcoal, oil paint, or watercolor. Instead, these brushes represent real compositional elements—clouds, building silhouettes, tree canopies, industrial structures, terrain features—that you stamp and paint directly onto the canvas to construct a scene. This is how many professional concept artists and digital matte painters work. They build libraries of compositional brushes sourced from photographic reference, then use those brushes to rapidly block out environments, establish depth, and define lighting in their compositions.\n\nIf you don\'t have Photoshop, you can use Photopea.com, which supports custom brush definition the same way.',
          },
          {
            heading: 'Create Your Brush Library',
            body: 'Start with a minimum of three core categories — Atmospheric, Landscape/Background, and Messy/Junk brushes. Aim for six brushes in each, but push for more from the expanded list below. Having a broad brush library is essential as you build up your digital painting skills. Use images that are wide enough to ensure the brushes have sufficient detail, and organize your brushes into clearly labeled folders within the Brushes panel.',
            imageUrl: '/brush_types_examples.png',
            imageCaption: 'Examples of the three brush categories: Atmospheric, Background, and Messy/Junk brushes.',
            bullets: [
              { text: '**Atmospheric Brushes:** Clouds, fog banks, smoke plumes, mist layers, and sky textures. These are used to establish mood, atmosphere, and depth in the background and sky areas of your composition. For atmospheric brushes, it\'s good to feather the selection edges before defining the brush (Select > Modify > Feather, set to 40–50px) so you don\'t get hard edges when painting.', imageCaption: 'Atmospheric Brushes' },
              { text: '**Landscape/Background Brushes:** City skyline silhouettes, mountain ridges, tree lines, building clusters, terrain profiles, and architectural forms. These define the structural shapes and horizon lines of your environments. These brushes can keep their hard edges since architectural and landscape forms naturally have defined silhouettes.', imageCaption: 'Landscape/Background Brushes' },
              { text: '**Messy/Junk Brushes:** Industrial parts, girders, telephone poles, mechanical fragments, scaffolding, pipes, wires, and random geometric debris. These add visual complexity, foreground interest, and textural grit to your scenes. They\'re great for framing elements—creating the feeling of looking through something to see the scene behind it.', imageCaption: 'Messy/Junk Brushes' },
              '**Architectural Brushes:** windows, brick, concrete seams, roof tiles, scaffolding, pipes, vents, signage, trim, perspective-grid marks.',
              '**Figure / Anatomy Brushes:** gesture lines, skin texture, hair, fabric folds, hands, facial planes, silhouettes, crowd stamps.',
              '**Vehicle / Mechanical Brushes:** tires, treads, panel lines, rivets, exhaust grime, cables, gears, engine parts, chrome reflections.',
              '**Nature / Organic Brushes:** foliage, bark, rocks, grass, moss, clouds, water, dirt, coral, insects, fur.',
              '**Industrial / Construction Brushes:** rust, weld marks, hazard stripes, concrete damage, peeling paint, rebar, chain-link, metal grates.',
              '**Graphic-Design Brushes:** halftones, ink splatter, dry marker, screenprint grain, photocopy noise, tape edges, torn paper.',
              '**Material Brushes:** leather, denim, wood grain, brushed metal, plastic, ceramic, velvet, scales, slime, cracked paint.',
              '**Lighting / Effects Brushes:** bloom, fog, smoke, sparks, rain, snow, lens grime, glowing particles, rim-light haze.',
              '**Narrative / Worldbuilding Brushes:** symbols, posters, graffiti, maps, alien writing, warning labels, UI fragments, emblems.',
              '**Creature / Character-Detail Brushes:** scales, pores, horns, feathers, claws, wrinkles, wounds, armor plates, bioluminescent markings.',
              '**Pattern / Textile Brushes:** embroidery, plaid, camouflage, knit fabric, lace, quilting, woven fibers, decorative trims.',
              '**Damage / Age Brushes:** scratches, dents, chipped edges, corrosion, soot, oil stains, water streaks, mold, grime buildup.',
            ],
          },
          {
            heading: 'How to Create a Brush',
            body: 'The process for turning a found image into a usable compositional brush:',
            numberedSteps: [
              'Find your source image (search for clouds, city skylines, industrial structures, etc.) and copy or screenshot the portion you want.',
              'In Photoshop (or Photopea.com), paste the selection into a new or existing document.',
              'Convert to black and white: **Image > Adjustments > Black and White** (**Cmd + Option + Shift + B** on Mac).',
              'Add contrast using Levels (**Cmd + L**): push the dark triangle to the right and the light triangle to the left to increase contrast. Remember: white areas become transparent in the brush, so you want a clean white background with strong dark forms.',
              'Use the Rectangular Marquee tool (**M**) to select the area you want to define as a brush. Make the selection comprehensive—bigger brushes are generally better than smaller ones.',
              'Define the brush: **Edit > Define Brush Preset**. Name it clearly (e.g., "Cloud 01", "Skyline 02", "Grunge 03").',
            ],
            note: 'Tip: For atmospheric brushes like clouds, the grayscale values of the cloud may need to be inverted (**Cmd + I**) before defining the brush—since brushes paint with dark values, and clouds are naturally light. Use Levels to push the background fully white after inverting so you get a clean, usable cloud brush.',
          },
          {
            heading: 'Understanding Levels for Brush Creation',
            body: 'Levels is a critical tool for this assignment. In the Levels panel, you see a histogram of the image\'s tonal values with three triangles beneath it: black (shadows), gray (midtones), and white (highlights).\n\nDragging the black triangle to the right makes dark areas darker. Dragging the white triangle to the left makes light areas lighter. Together, these push your image toward a high-contrast silhouette—which is exactly what you want for a clean brush definition.\n\nWhy does this matter? A brush is defined by its dark values—the dark areas become the painted marks, and the white areas become transparent. If your source image has muddy grays in the background, those will show up as faint noise when you paint. By using Levels to push the background fully white and your subject fully dark, you get crisp, intentional brush strokes.\n\nLevels also has broader uses beyond brush creation: increasing vibrancy, revealing detail in dark or light areas, and making colors stand out. Understanding Levels will serve you well throughout your digital painting workflow.',
          },
        ],
        submission: [
          'Brush library screenshot showing your organized brush folders (Atmospheric, Background, Messy/Junk) with all 18 brushes.',
          'A test sheet showing each brush stamped once at full size, labeled with its name and category.',
        ],
        critiqueQuestions: [
          'How did your choice of source imagery for each brush category (clouds, skylines, industrial parts) reflect the world you are building?',
          'How did you use Levels to clean up your brush definitions, and what difference did it make in the quality of the brush strokes?',
          'Which brushes do you think will be the most versatile for composing full environments, and why?'
        ],
      },
      intermediate: {
        title: 'Take It to the Next Level: Landscape Compositions',
        subtitle: 'Focus: Using your custom brush library to paint three themed landscape compositions with depth layering.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Now that you have built your compositional brush library (from the Base Assignment), put it to work. You will use your brush library, starting with the Atmospheric, Background, and Messy/Junk brushes, to paint three separate landscape compositions—all set within the same world as your character IP, but each showing a different phase or variation of that world.\n\nThis process will involve stamping your brushes rather than painting with them. Each time you stamp, create a new layer for that stamped brush.\n\nUse techniques to establish landmasses and structure, such as polygonal lasso blocking, in addition to the brushes you will use.\n\nKeeping your layers organized is critical—so be sure to use groups and subgroups to keep this organized.\n\nMake this greyscale for now.',
            imageUrl: '/three_compositions_example.png',
            imageCaption: 'Three separate landscape compositions — each showing a different phase of the same world.',
          },
          {
            heading: 'Paint Three Landscape Compositions',
            body: 'Using your custom brushes, create three separate landscape compositions. Each composition should be 11" × 17" at 72 DPI. All three landscapes exist within the same world as your character IP, but each one shows a different phase or variation of that world.\n\nChoose one thematic approach for your three phases:',
            bullets: [
              'Seasonal: Summer → Fall → Winter (or any three seasons)',
              'Genre Shift: Fantasy → Modern → Science Fiction',
              'Timeline: Past → Present → Future',
              'Time of Day: Dawn → Midday → Night',
            ],
          },
          {
            heading: 'Composing with Depth: Foreground, Midground & Background',
            body: 'As you build each landscape, think in terms of three depth layers. Keep each layer on its own separate layer in your Photoshop file—this is essential because in a future assignment, we will combine all three landscapes into one long panoramic image, colorize them, and animate the foreground, midground, and background at different speeds to create a parallax animation.\n\nValue creates the illusion of depth:',
            bullets: [
              'Foreground elements should be the darkest values—use your Messy/Junk brushes and strong black shapes to create framing elements close to the viewer.',
              'Midground elements should be medium values—use your Background brushes for architecture, terrain, and structural forms.',
              'Background elements should be the lightest values—use your Atmospheric brushes for sky, clouds, distant mountains, and haze. Things fade out the further they recede into the distance.',
            ],
            note: 'You can build up density by clicking multiple times with the same brush. You can also paint in white to carve back into dark areas and break up repetitive patterns. Scale your brushes up and down, and rotate them to create variety.',
          },
          {
            heading: 'File Setup & Organization',
            bullets: [
              'Work in a single Photoshop document with three Artboards (use the Artboard tool to create each one at 11" × 17"), or create three separate .PSD files.',
              'Keep foreground, midground, and background on separate layers within each composition.',
              'Save your working files as .PSD to preserve layers—you will need them for the parallax animation assignment.',
              'Export each composition as a PNG for submission.',
            ],
          },
        ],
        submission: [
          'Three landscape compositions as PNG files (11" × 17" at 72 DPI).',
          'Each composition should clearly show foreground, midground, and background depth separation.',
          'Layered .PSD files with foreground, midground, and background on separate layers.',
        ],
        critiqueQuestions: [
          'How did your choice of source imagery for each brush category (clouds, skylines, industrial parts) affect the mood and genre of your final landscapes?',
          'How did you use value contrast across your foreground, midground, and background layers to create a convincing sense of depth?',
          'Which brushes were the most versatile across your three compositions, and how did scaling, rotating, and layering them create variety from a limited set?'
        ],
      },
      advanced: {
        title: 'Advanced Integration: Shader Editor, Render Bake & Photoshop Asset Authoring',
        subtitle: 'Focus: Prop Wear States — The Procedural-to-Painted Pipeline.',
        sections: [
          {
            heading: 'Overview & Worldbuilding Through-line',
            body: 'Take the signature prop of your character and tell its life story across four wear-and-tear states. But instead of painting each state from scratch, you\'ll first turn Blender into an asset factory: build procedural materials on your prop, bake out physically meaningful maps, and convert those bakes into a reusable Photoshop library of patterns, brushes, and masks. Then you\'ll assemble all four wear states non-destructively over a single untouched base.\n\nThe point: clean mathematical procedural surfaces from Blender + the warmth of hand-painted overlays in Photoshop, with the bakes deciding where wear is physically allowed to live.',
          },
          {
            heading: 'The Core Idea: Blender Ships Photoshop Three Asset Classes',
            body: 'Blender\'s procedural shaders and baking pipeline produce three distinct types of assets that become your Photoshop toolkit:',
            bullets: [
              'Patterns — Built by baking a procedural shader to a tileable square (Emit bake). Becomes a Define Pattern → Pattern Fill layer in Photoshop. Used to express broad surfaces: rust fields, moss carpets, scratch grain.',
              'Brushes — Built by baking a single isolated element to a grayscale alpha. Becomes a Define Brush Preset → scatter/jitter stamp. Used to express discrete damage: cracks, dents, moss clumps, energy fissures.',
              'Mask Maps — Built by baking AO, curvature, and position from the prop. Loaded as selections or layer masks. Used to decide where wear goes — the wear logic.',
            ],
            note: 'The mask maps are the lesson. They aren\'t textures — they\'re rules. Curvature (Pointiness) → exposed edges → metal scrape, paint chip, rust onset (the story of handling). Ambient Occlusion → crevices and contact points → grime, moss, damp settling (the story of storage/environment). Z-Position/Height → base vs. top → mud and ground contact below, sun-bleach above (the story of orientation in the world).',
          },
          {
            heading: 'Part A — Blender: Build the Shader and the Asset Library',
            body: 'This part covers the Blender-side workflow: building procedural wear shaders, baking passes, and creating tileable patterns and stamp brushes.',
          },
          {
            heading: 'A1. Procedural Wear Shader',
            body: 'Build a node setup in the Shader Editor that defines wear boundaries procedurally:',
            bullets: [
              'Use Noise Texture for organic grain and patina. (Blender 5.1 has no standalone Musgrave node — it lives inside Noise Texture under the Type dropdown: fBM, Multifractal, Ridged Multifractal, Hetero Terrain.)',
              'Use Voronoi for cellular rust pitting and chipped-paint cells.',
              'Drive everything through Color Ramps to harden the wear boundaries (narrow ramps = crisp edge scraping; soft ramps = gradual patina).',
              'Mix layers with Mix/MixColor nodes, masked by a Geometry > Pointiness signal so rust and scrape concentrate on exposed edges.',
            ],
          },
          {
            heading: 'A2. Unwrap and Bake (Cycles)',
            body: 'Switch the render engine to Cycles (EEVEE baking is limited). UV unwrap the prop, create and assign an image texture node, then bake each pass to its own image. Set a Margin/bleed of a few pixels to avoid UV-seam halos.\n\nBake these passes as separate PNGs:',
            bullets: [
              'Diffuse / Base Color — Bake Type: Diffuse, uncheck Direct & Indirect, keep Color only (gives flat base color, no baked lighting).',
              'Ambient Occlusion — Bake Type: Ambient Occlusion. Your crevice/grime/moss mask.',
              'Curvature — plug Geometry > Pointiness → ColorRamp (squeeze the ramp around the mid-gray to isolate edges) → Emission, then Bake Type: Emit. Your edge-wear mask. (Pointiness reads flat on low-poly — subdivide the mesh or bake from a high-poly version.)',
              'Position / Height — Geometry > Position → Separate XYZ → Z → ColorRamp → Emission → Bake Emit. Your top-vs-base mask for sun-bleach and mud.',
              '(Optional) Normal map for relighting/detail in Photoshop.',
            ],
            note: 'The Emit-bake trick: to capture any raw procedural value cleanly (curvature, position, a noise field), plug it into an Emission shader and bake Emit. This bypasses all scene lighting so you get the pure data, not a lit render.',
          },
          {
            heading: 'A3. Build the Tileable Patterns',
            body: 'On a separate flat plane (UVs filling 0–1), build a procedural rust/moss/scratch material and bake it via the Emit trick to a square image. To make it seamless for a Pattern Fill: run Photoshop\'s Filter > Other > Offset with Wrap Around on, then heal the seam line that appears. (Truly procedural tiling via wrapped coordinates is the advanced route — Offset-and-heal is the dependable classroom method.)',
          },
          {
            heading: 'A4. Build the Stamp Brushes',
            body: 'Model or procedurally isolate a single wear element — one crack, one moss clump, one dent, one energy fissure — on a black background. Bake its height or AO to a square grayscale image. In Photoshop: desaturate, push contrast with Levels, then Edit > Define Brush Preset. In the Brush Settings panel enable Scattering, Size Jitter, and Angle Jitter so repeated stamps never look cloned.',
          },
          {
            heading: 'Part B — Photoshop: Assemble the Four Wear States Non-Destructively',
            body: 'Build one master file. The baked Diffuse + AO form the foundation layer that you never paint on directly — every wear state is a group of fills, stamps, and adjustments masked above it.\n\nStandard stack, bottom to top:',
            numberedSteps: [
              'Base — baked Diffuse (locked).',
              'AO — set to Multiply, low opacity, to ground every layer above.',
              'Wear groups — each is a Pattern Fill (rust/moss/mud) + a layer mask driven by the relevant baked map (Curvature for edge rust; AO + Position for moss and mud) + clipped adjustment layers for color.',
              'Hand-paint — your custom brushes, clipped to the wear group, adding the warmth and intent the procedural can\'t.',
              'Energy/glow (ruined state) — emission painting on Screen or Linear Dodge (Add), masked tightly to the cracks.',
              'Global grade — adjustment layers on top to unify each state\'s mood.',
            ],
            note: 'Each of the four states is the same prop shape with a different recombination of these groups — toggle groups on/off to move between states.',
          },
          {
            heading: 'Required Wear States',
            bullets: [
              'Pristine / Factory — perfect surfaces, clean speculars and reflections. Mostly base + light AO; minimal masking.',
              'Oxidized / Weathered — rust, patina, sun-bleach, micro-scratches. Edge-rust via the Curvature mask; sun-bleach via the Position mask top; scratch brush stamping.',
              'Overgrown / Organic — moss, mud, vine growth, damp. Moss pattern via AO + Position-base mask; mud at the base; raise roughness, kill speculars.',
              'Ruined / Active — severe battle damage (cracks, dents) + glowing cracked energy. Crack and dent brushes; energy group on Screen/Add leaking from the fissures.',
            ],
          },
        ],
        submission: [
          'Photographic material reference board — 10–15 reference photos covering all four states.',
          'Blender node setup screenshot — the procedural shader mapping in the Shader Editor.',
          'Baked passes (separate PNGs) — Diffuse, AO, Curvature, Position (Normal optional).',
          'Custom asset library — at least 2 tileable patterns + 3 stamp brushes derived from your bakes (the .pat / .abr exports or screenshots of them defined).',
          'Completed 2×2 prop wear sheet (PNG) — all four states, same shape.',
          'Final illustrative paint-over render (PNG) — your best single state, fully finished.',
        ],
        critiqueQuestions: [
          'How did your node configuration (Noise Texture type + Voronoi + Color Ramps, masked by Pointiness) target edges and crevices rather than washing wear evenly across the surface?',
          'What did the AO and Curvature bakes bring to your Photoshop stack — how did you blend baked masks with hand-painted color, and where did each mask decide placement for you?',
          'How did you vary highlights, specular reflection, and surface roughness to read metal vs. moss vs. energy as genuinely different materials?',
          'How does the placement of wear tell the prop\'s story — edges from handling, crevices from where it was kept, base from ground contact, cracks from what damaged it?',
          'What non-destructive setup (pattern fills, layer masks driven by bakes, clipped adjustment layers, smart objects) let you move between four states while keeping the original shape untouched?',
          'How did you balance the mathematical precision of procedural 3D shaders with the warmth and charm of digital paint-over — where did each one win?'
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
        title: 'Advanced Integration: 3D Cinematic Block-In',
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
        title: 'Advanced Integration: Blender Grease Pencil / Animatic Block-In',
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
        title: 'Base Assignment: "Your World" Poster Campaign',
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
        title: 'Advanced Integration: 3D Studio lighting & Asset Marketing Deck',
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
        title: 'Advanced Integration: IP Production Bible & 3D Assets Deck',
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
