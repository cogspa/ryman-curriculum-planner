// ─── Curriculum Data ──────────────────────────────────────────────
// Populated with distinct Tuesday (Zoom) and Saturday (In-Person Reveal Studio) tracks.
// Tuesdays preview Saturdays and pull from discussions/readings.
// Week 01 Tuesday covers intro, Reveal parking/entry procedures, and meet-and-greet.

export const config = {
  startDate: '2026-06-23',
  endDate: '2026-09-12',

  tuesday: {
    label: 'Tuesday (Virtual)',
    time: '7:00–9:00 pm',
    location: 'Zoom',
  },
  saturday: {
    label: 'Saturday (In-Person)',
    time: '10:00 am–3:30 pm',
    location: 'Reveal Studio',
  },

  capstoneNote: 'Capstone showcase — September 2026 · final presentations',
  storageVersion: 1,
};

export const curriculum = [
  {
    week: 1,
    title: 'Translating Classical Foundations',
    overview: 'What carries over from traditional painting — value, composition, gesture, form, and the relationship between digital and physical canvases.',
    tuesday: {
      topics: [
        'Class Introduction & Meet and Greet',
        'Reveal Studio Logistics & Procedures (directions, parking, entry, safety)',
        'Overview of the program, Wacom/iPad setup checklist, and file-naming rules',
        'Discussion: Preview of Saturday\'s classical-to-digital translation paradigm',
      ],
      readings: [
        '[NEW] Photoshop — Learn at Your Own Pace Videos: https://www.youtube.com/playlist?list=PL96BXqp9fQs6EcSwTbDgo57DFI-6EXzQ8',
        'Tools Overview: Adobe Photoshop vs. Procreate workflows',
        '[NEW] Reading: V. S. Ramachandran — Phantoms in the Brain: Probing the Mysteries of the Human Mind: https://www.amazon.com/Phantoms-Brain-Probing-Mysteries-Human/dp/0688172172',
        'Guest: No speaker - First Class',
      ],
    },
    saturday: {
      topics: [
        '[NEW] Digital vs. Physical Canvas / Understanding Pixels',
        '[NEW] Origin of the word "pixel"',
        '[NEW] Elements vs. Principles of Design',
        '[NEW] Resolution and Quality',
        '[NEW] Hands-on: Biomorphic shapes & the Metaball effect (Gaussian Blur + Levels thresholding to generate organic blob forms via implicit scalar fields)',
        'Hands-on: Value, composition, gesture, and form on a digital screen',
      ],
      assignments: [
        '[NEW] **Base Assignment**: *Traditional Translation* — Recreate a traditional character sketch or prop study digitally in Photoshop or Procreate to learn basic brush control and layer setup.',
        '[NEW] **Next Level**: *Style Adaptability* — Translate a character or prop design into two distinct production styles (e.g., flat graphic vs. painterly visual development) to build stylistic range.',
        '[NEW] **3D Integration**: *3D Block-In & Paint* — Model a character base mesh or prop in Blender, render orthographic views, and paint them digitally in Photoshop in two different styles.'
      ],
    }
  },
  {
    week: 2,
    title: 'Digital Brushes & Texture Systems',
    overview: 'Simulating physical media digitally with custom brush assets and procedural overlay systems.',
    tuesday: {
      topics: [
        'Discussion: Simulating tactile surfaces in a backlit digital space',
        'Preview: Tuesday readings review — Noise vs. Pattern & Procedural generation',
        'Workflow breakdown: Contrast preparation for custom brush presets',
        '[NEW] Color palette extraction — building color libraries, the ASE format, and SwatchForge tool',
      ],
      readings: [
        '[NEW] Defining Brushes — capture-to-preset workflow',
        '[NEW] Painting In Photoshop + Brush Hardness and Size — brush engine fundamentals',
        '[NEW] What is Pattern? and Noise vs. Pattern, Procedural vs. Non-procedural — texture theory',
        '[NEW] Perlin/Fractal Noise and Cellular/Worley Noise — algorithmic surface generation',
        '[NEW] Cellular Noise (The Book of Shaders) — https://thebookofshaders.com/12/',
        '[NEW] Cracked Earth Texture (video walkthrough) — canvas simulation demo',
        '[NEW] What are Blend Modes + The Special "8" Blend Modes — layering texture passes',
        '[NEW] Color Palette Extraction — building color libraries and ASE swatch formats',
        'Guest: Senior digital illustrator — live demo on building a personal brush library',
      ],
    },
    saturday: {
      topics: [
        '⛔ July 4th Holiday — No Saturday Studio Class',
      ],
      assignments: [],
    }
  },
  {
    week: 3,
    title: 'Light, Color & Atmosphere for Screen',
    overview: 'Advanced digital rendering using blending modes, atmospheric depth, and cinematic lighting treatments, combined with Week 2 material workshop.',
    tuesday: {
      topics: [
        'Discussion: Traditional glazing vs. digital layering and transparency',
        'Preview: Lighting as a character and cinematic depth',
        'Workflow breakdown: Non-destructive light adjustments and layer stack safety',
      ],
      readings: [
        '[NEW] Glazing vs. Digital Layering — core mechanics of transparent overlays',
        'Layer Basics: Selection masking, non-destructive adjustment layers, and layer organization',
        'Guest: Concept artist or film matte painter — live demo on building atmospheric depth',
      ],
    },
    saturday: {
      topics: [
        '🎨 PUSHED FROM WEEK 2: Custom brush creation & Wacom brackets-key flow',
        '🎨 PUSHED FROM WEEK 2: Procedural texture generation (Perlin/cellular surface simulation)',
        '🎨 PUSHED FROM WEEK 2: Special 8 Blend Modes and stipple/grain overlays',
        'Glazing vs. digital layering transparent applications',
        'Cinematic lighting, atmospheric perspective, & selection masking compositing',
      ],
      assignments: [
        '[NEW] **Base Assignment**: *Media Tile* — Render a simple character prop on a 2×2 grid simulating traditional media (oil, watercolor, charcoal, digital) using custom brush presets and basic blend modes.',
        '[NEW] **Next Level**: *Wear & Tear prop sheet* — Paint a signature prop from your IP in four distinct wear/weathered states (new, rusted, mossy, active/damaged) to demonstrate texture rendering.',
        '[NEW] **3D Integration**: *Shader Editor & Bake* — Model the prop in Blender, apply procedural wear shaders, bake ambient occlusion and light passes, and do the final painting in Photoshop.'
      ],
    }
  },
  {
    week: 4,
    title: 'Composition for Screen-Based Media',
    overview: 'Designing scalable artwork and layout structures for modern print and digital platforms.',
    tuesday: {
      topics: [
        'Discussion: Responsive layout design for variable screen viewports',
        'Preview: InDesign page engineering and grids vs. Illustrator vector assets',
        'Workflow breakdown: Export conventions and bleed parameters',
      ],
      readings: [
        'Intro to Adobe Illustrator: Vector vs. Raster guidelines',
        '[NEW] Tools: Adobe InDesign (portfolio layouts, grid frameworks, margins)',
        'Guest: Senior graphic designer — live portfolio structure walkthrough',
      ],
    },
    saturday: {
      topics: [
        '[NEW] Designing for social, web, and print',
        '[NEW] Cropping & framing',
        'Scalable artwork systems',
        'Exporting for multiple formats',
        '🛠️ Task: Adapt one artwork for print, web, and social formats (hierarchy exercise)',
      ],
      assignments: [],
    }
  },
  {
    week: 5,
    title: 'Illustration & Visual Storytelling',
    overview: 'Moving beyond single-frame fine art into visual sequential storytelling, cinematography, and animation principles.',
    tuesday: {
      topics: [
        'Discussion: Auditory spaces, diegetic vs. non-diegetic sound, and leitmotifs in film',
        'Preview: Preston Blair expression guides and character turnaround principles',
        'Workflow breakdown: The hybrid straight-ahead vs. pose-to-pose animation plan',
      ],
      readings: [
        '[NEW] Animation Mechanics: Preston Blair Expression Guides & Cartoon Takes',
        '[NEW] Soundscapes in Media: Diegetic vs. Non-Diegetic Sound & Leitmotifs',
        '[NEW] Cinemagraphics: Dutch Tilt, Pitch Shot, and Dolly Zooms in Storyboards',
        'Guest: Nancy Seruto — Publishing or entertainment illustrator — narrative structure demo',
      ],
    },
    saturday: {
      topics: [
        '[NEW] Character development & emotional range (Preston Blair expression sheets, cartoon takes)',
        '[NEW] Environmental storytelling & auditory space (diegetic vs. non-diegetic sound, leitmotifs)',
        '[NEW] Sequential thinking & animation planning (straight ahead vs. pose to pose hybrid approach)',
        '[NEW] Storyboarding fundamentals & visual cinematography (Dutch tilt, worm\'s eye view, pitch shot, zolly/dolly zooms)',
      ],
      assignments: [
        '[NEW] **Base Assignment**: *Atmospheric perspective* — Paint a home base or environment from your IP, focusing on linear perspective, value depth, and dynamic directional light.',
        '[NEW] **Next Level**: *Narrative Keyframe* — Paint a story-driven environment keyframe featuring your character. Focus on visual storytelling and scale relationships.',
        '[NEW] **3D Integration**: *3D Cinematic Block-in* — Build the environment in Blender, configure camera focal length and depth-of-field, set up volumetric lighting, and paint over the render.'
      ],
    }
  },
  {
    week: 6,
    title: 'Introduction to Commercial Application',
    overview: 'Turning painterly skill into professional paid work through layouts, key art, and design campaigns.',
    tuesday: {
      topics: [
        'Discussion: Working under the parameters of a professional design brief',
        'Preview: Page engineering margins, columns, and document bounds in InDesign',
        'Workflow breakdown: Assets syncing with CC Libraries and shared color spaces',
      ],
      readings: [
        '[NEW] Layout Engineering: InDesign Page Layout Specs, Margins, and Master Pages',
        '[NEW] Brand Architecture: Integrated Campaigns & Asset Management (CC Libraries)',
        '[NEW] Visual Pitching: Combining Type & Image for the "Your World" Design Brief',
        'Guest: Art director or creative agency lead — live portfolio brief breakdown',
      ],
    },
    saturday: {
      topics: [
        '[NEW] Book covers & key art page layouts (margins, columns, grids in InDesign)',
        '[NEW] Integrated ad campaigns (combining typography, graphic layout, & illustration)',
        '[NEW] Asset management & CC Libraries (collaborative libraries & master page templates)',
        '[NEW] The commercial brief (visual hierarchy, type & image pairing, campaign pitching)',
      ],
      assignments: [],
    }
  },
  {
    week: 7,
    title: 'Advanced Project Development',
    overview: 'Beginning the Client Simulation Project — selecting a track and building a professional layout from a brief.',
    tuesday: {
      topics: [
        'Discussion: The anatomy of a professional design brief',
        'Preview: The four distinct simulation tracks (Concept Art, Poster, Storyboard, Book Cover)',
        'Workflow breakdown: How peer review validates the integrity of a brief',
      ],
      readings: [
        '[NEW] Client Simulation Framework: Anatomy of a Professional Design Brief',
      ],
    },
    saturday: {
      topics: [
        '[NEW] Concept art piece (hero rendering, silhouette sheets, value & color studies, callouts)',
        '[NEW] Illustrated poster series (Polish Poster, Tanaka type-as-image, Rand economy of form, Makela layers)',
        '[NEW] Storyboards / sequential art (camera shots/angles/moves, Script Courier 12pt specifications)',
        '[NEW] Book cover / children’s book illustration (Ann & Paul Rand children\'s books, Zwart constructivist covers)',
      ],
      assignments: [
        '[NEW] **Base Assignment**: *Narrative Panels* — Draw a 3-panel sequential comic strip showing a simple character action, alongside a basic character turnaround layout.',
        '[NEW] **Next Level**: *Production Storyboards* — Create a 6-to-9 panel storyboard layout with camera moves (dolly zoom, tilt, track), alongside a character model turnaround sheet with expression studies.',
        '[NEW] **3D Integration**: *Blender Grease Pencil / Animatic* — Layout a 6-to-9 panel storyboard sequence in Blender using 3D camera staging, and sketch drawings in 3D space using Grease Pencil.'
      ],
    }
  },
  {
    week: 8,
    title: 'Refinement & Presentation',
    overview: 'Polishing individual assets and compiling them into presentation-ready boards for critiques.',
    tuesday: {
      topics: [
        'Discussion: Receiving and processing constructive art direction',
        'Preview: Structuring a professional presentation pitch deck',
        'Workflow breakdown: Handoff formats and packaging documents',
      ],
      readings: [
        'Industry Standards: Design reviews & creative studio hierarchy',
        'Guest: Panel critic — live review of past student portfolios',
      ],
    },
    saturday: {
      topics: [
        'Artwork refinement & rendering polish',
        'Presentation board layout creation',
        'Final edit checks & margins alignment',
        'Studio handoff etiquette & conventions',
        'Working with art directors role-play',
        'Formal pitch rehearsal & timing',
        '🛠️ Task: Refine narrative panels for portfolio: export finished layouts and organize reference sheets',
      ],
      assignments: [],
    }
  },
  {
    week: 9,
    title: 'Freelance, Contracts & Business Skills',
    overview: 'Exploring pricing, contract basics, taxes, and intellectual property for independent creative paths.',
    tuesday: {
      topics: [
        'Discussion: What makes a contract legally binding and protective for creatives',
        'Preview: Freelance business operations & tax structures',
        'Workflow breakdown: Drafting client agreements and proposal sheets',
      ],
      readings: [
        'Intellectual Property Guide: Copyrights, trademarks, and usage licensing rights',
        'Guest: Eugenia Chen — Creative entrepreneur — navigating freelance taxes & operations',
      ],
    },
    saturday: {
      topics: [
        'Pricing your work & project scoping',
        'Contracts & intellectual property deep dive',
        'Client communication & relationship skills',
        'Taxes basics for creative sole proprietors',
        '🛠️ Task: Refine campaign assets & apply peer feedback from Week 8 pitch rehearsals',
      ],
      assignments: [
        '[NEW] **Base Assignment**: *"Your World" Poster* — Design a clean poster for your IP pairing your main illustration with custom typography and logo layouts.',
        '[NEW] **Next Level**: *Senior Key Art & Grids* — Design a high-end key art poster and adapt it into 4 different layout form-factors using InDesign master grids and smart objects.',
        '[NEW] **3D Integration**: *3D Studio Render & Wrap* — Set up studio lighting for your Blender models, render hero passes, and compile the marketing campaign using modular templates.'
      ],
    }
  },
  {
    week: 10,
    title: 'Job Readiness & Interview Training',
    overview: 'Preparing portfolios, professional resumes, and interview protocols to enter the creative workforce.',
    tuesday: {
      topics: [
        'Discussion: Crafting a compelling elevator pitch and story',
        'Preview: Hiring pipelines in animation, tech, and creative agencies',
        'Workflow breakdown: Resumes and LinkedIn profiles optimized for ATS bots',
      ],
      readings: [
        'Recruiter Insights: What catches the eye in a 6-second portfolio review',
        'Guest: Jeremy Costello — Hiring managers & agency recruiters (Guest Panel)',
      ],
    },
    saturday: {
      topics: [
        'Resume & LinkedIn optimization workshop',
        'Interview role-play and behavioral scenarios',
        'Portfolio storytelling: structuring process cases',
        'Salary negotiation basics & pricing confidence',
      ],
      assignments: [
        '[NEW] **Base Assignment**: *Portfolio Showcase* — Curate and compile 6-8 of your best polished pieces from the assignments into a clean digital portfolio PDF or website.',
        '[NEW] **Next Level**: *IP Worldbuilding Deck* — Compile a full pitch deck for your IP, including a character lineup, world guide, and color scripts/keys.',
        '[NEW] **3D Integration**: *IP Production Kit & Bible* — Compile a comprehensive production deck/bible featuring your Blender model layouts, modular kits, and final digital paints.'
      ],
    }
  },
  {
    week: 11,
    title: 'Final Portfolio Refinement',
    overview: 'Curating final artwork and organizing layouts for digital platforms and print books.',
    tuesday: {
      topics: [
        'Discussion: Selection vs. clutter — why removing weaker pieces saves a portfolio',
        'Preview: Interactive web formats vs. static multi-page PDF presentation books',
        'Workflow breakdown: Grid alignments and negative space in portfolio cards',
      ],
      readings: [
        'Modern Portfolios: Grid standards, typography, and site architectures',
        'Guest: Heidi Hirsch — live review of student portfolios',
      ],
    },
    saturday: {
      topics: [
        '⛔ September 5th Holiday (Labor Day Weekend) — No Saturday Studio Class',
      ],
      assignments: [],
    }
  },
  {
    week: 12,
    title: 'Capstone Preparation',
    overview: 'Rehearsing final presentation pitches and putting final polishes on the capstone portfolio deck.',
    tuesday: {
      topics: [
        'Discussion: Formulating a cohesive narrative about your creative trajectory',
        'Preview: Presentation staging, pacing, and time management',
        'Workflow breakdown: AV guidelines, screen share checks, and backup decks',
      ],
      readings: [
        'Pitch Deck Guide: Formats, sequences, and slide outlines',
        'Guest Speakers: Past graduates sharing their showcase experiences',
      ],
    },
    saturday: {
      topics: [
        '🎨 PUSHED FROM WEEK 11: Portfolio layout & sequence curation',
        '🎨 PUSHED FROM WEEK 11: Removing weaker pieces & streamlining selections',
        '🎨 PUSHED FROM WEEK 11: Final presentation deck preparation',
        'Portfolio layout check (PDF + website ready)',
        'Removing weaker pieces final review',
        'Final presentation preparation',
        'Rehearsal & peer feedback sessions',
        '🛠️ Task: Capstone curation: Assemble 6-8 high-quality digital works, commercial campaign, & pitch deck',
      ],
      assignments: [],
    }
  },
  {
    week: 13,
    title: 'CAPSTONE SHOWCASE',
    overview: 'Formal portfolio reviews, presentations, and networking mixers with industry panels.',
    dateOverride: 'End of September',
    saturday: {
      topics: [
        'Formal portfolio reviews and critiques with panels',
        'Networking mixer and peer interactions',
        'Career pathway and educational progression guidance',
        'Final portfolio showcases',
        '🛠️ Task: Final Project and Portfolio Deck reveal',
      ],
      assignments: [],
    }
  },
];

// ─── Changelog ────────────────────────────────────────────────────
export const changelog = [
  {
    date: '2026-06-19',
    message: 'Added condensed Alvy Ray Smith bio, YouTube video embed, and link to "A Pixel Is Not A Little Square" PDF on the Digital vs. Physical Canvas topic page (Week 01).',
  },
  {
    date: '2026-06-19',
    message: 'Split Curriculum Vision intro into three paragraphs with a highlighted 3D Integration callout note on the Syllabus page.',
  },
  {
    date: '2026-06-19',
    message: 'Updated Capstone Showcase (Week 13): removed Tuesday Zoom session, set final date to "End of September," location at Reveal Studio.',
  },
  {
    date: '2026-06-18',
    message: 'Added condensed syllabus toggle view and "Download Condensed Syllabus PDF" button alongside the full syllabus download.',
  },
  {
    date: '2026-06-18',
    message: 'Assignment 5 renamed from "Most Wanted" Poster Campaign to "Your World" Poster Campaign — updated across syllabus, assignments, and topic pages.',
  },
  {
    date: '2026-06-01',
    message: 'Added a dedicated Potential Guest Speaker database page populated with 19 local industry leads, linked in cyan directly below the Class FAQ banner.',
  },
  {
    date: '2026-06-01',
    message: 'Added a dedicated Class FAQ page detailing Saturdays at Reveal Studios (Glendale coordinates, rules, parking, computers, kitchenette, entry word-bubble) and linked it beautifully under the header rule.',
  },
  {
    date: '2026-06-01',
    message: 'Labeled all 6 graded biweekly milestones with clear assignment numbers (Assignment 1 through Assignment 6) across both interactive cards and linear print pages.',
  },
  {
    date: '2026-05-28',
    message: 'Rebuilt curriculum assignment cadence to a clean biweekly model: 6 graded milestones (Weeks 1, 3, 5, 7, 9, 10), with all other deliverables reframed as preparatory milestones in topics.',
  },
  {
    date: '2026-05-28',
    message: 'Consolidated July 4th (Week 2 Saturday holiday) brush & texture workshop topics and material tiles assignments onto July 11th (Week 3 Saturday), keeping the calendar structure intact.',
  },
  {
    date: '2026-05-28',
    message: 'Restructured all 13 weeks to feature split Tuesday (Zoom discussion & readings preview) and Saturday (In-person Reveal Studio workshop) sections. Week 1 Tuesday specifically details Intro & Reveal logistics.',
  },
  {
    date: '2026-05-28',
    message: 'Week 7 detailed pages wired up: Client Simulation brief framework, Concept Art deliverables, Poster Series lineages, Storyboard shots, and Book Cover design traditions.',
  },
  {
    date: '2026-05-28',
    message: 'Week 6 expanded with InDesign layout specifications, master pages, integrated campaign artboards, CC Libraries asset management, and "Your World" design brief.',
  },
  {
    date: '2026-05-27',
    message: 'Updated Week 5 with 2D animation integration: Preston Blair expression guides, auditory space/leitmotifs, straight-ahead vs. pose-to-pose planning, and cinematic camera angles.',
  },
];
