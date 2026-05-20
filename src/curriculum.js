// ──────────────────────────────────────────────────────────────────
//  CURRICULUM DATA
//  Edit this file to populate each week with content from your syllabus.
//  Once you share the curriculum, drop the title, overview, topics,
//  readings, and assignments into the matching week below.
// ──────────────────────────────────────────────────────────────────

export const config = {
  // First Tuesday of the program. Saturday is auto-calculated as Tue + 4 days.
  startDate: '2026-06-23',
  endDate: '2026-09-12',

  tuesday: {
    label: 'Tuesday',
    time: '7:00–8:30 pm',
    location: 'Zoom',
  },
  saturday: {
    label: 'Saturday',
    time: '10:00 am–3:30 pm',
    location: 'Reveal Studio',
  },

  capstoneNote: 'Capstone showcase — September 2026 · final presentations',

  // Bump this to force a one-time reset of saved notes (rare).
  storageVersion: 1,
};

// Schema for each week:
//   week       — number (1-12)
//   title      — main theme/title for the week
//   overview   — short paragraph describing the week
//   topics     — array of strings: topics covered
//   readings   — array of strings: required readings / refs
//   assignments — array of strings: deliverables, prep, homework
//
// Empty arrays/strings are fine — the card will just hide empty sections.

export const curriculum = [
  {
    week: 1,
    title: 'Translating Classical Foundations',
    overview: 'Focus: What carries over from traditional painting',
    topics: [
      'Value, composition, gesture, and form',
      'Digital vs. physical canvas',
      'Wacom / iPad workflow setup',
      'Canvas size, resolution, file types',
      'Layer fundamentals',
      'File naming conventions',
    ],
    readings: [
      'Tools: Adobe Photoshop, Procreate',
      'Guest: Senior digital illustrator (live demo)',
    ],
    assignments: ['Recreate one traditional painting digitally'],
  },
  {
    week: 2,
    title: 'Digital Brushes & Texture Systems',
    overview: 'Focus: Simulating physical media digitally',
    topics: [
      'Brush engine deep dive — hardness, size, opacity, flow, and the bracket-key workflow',
      'Custom brush creation — capturing source photography, contrast prep with Levels, Edit > Define Brush Preset',
      'Procedural vs. non-procedural texture generation',
      'Texture overlays via blend modes — Multiply, Overlay, Soft Light, and the Special 8',
      'Canvas simulation techniques — Perlin/cloud noise as paper, Worley noise for tooth, grain and stipple filters',
    ],
    readings: [
      'Defining Brushes — capture-to-preset workflow',
      'Painting In Photoshop + Brush Hardness and Size — brush engine fundamentals',
      'What is Pattern? and Noise vs. Pattern, Procedural vs. Non-procedural — texture theory',
      'Perlin/Fractal Noise and Cellular/Worley Noise — algorithmic surface generation',
      'Cellular Noise (The Book of Shaders) — https://thebookofshaders.com/12/',
      'Cracked Earth Texture (video walkthrough) — canvas simulation demo',
      'What are Blend Modes + The Special "8" Blend Modes — layering texture passes',
      'Guest: Senior digital illustrator — live demo on building a personal brush library',
    ],
    assignments: [
      'Media Tile: Texture Systems & Brush-Based Material Studies — Build an 18-brush library (pigment, surface, atmospheric sets) and render one subject as a 2×2 tile across four physical-media simulations (oil, watercolor, charcoal, invented digital medium). 2000×2000 at 200 dpi. Submit final tile, brush sheet, and 150-word reflection.',
    ],
  },
  {
    week: 3,
    title: 'Light, Color & Atmosphere for Screen',
    overview: 'Focus: Advanced digital rendering',
    topics: [
      'Glazing vs. digital layering',
      'Blending modes',
      'Cinematic lighting',
      'Atmospheric perspective',
      'Masking & selections',
      'Photo compositing',
      'Realistic lighting adjustments',
    ],
    readings: ['Guest: Concept artist or film matte painter (live demo)'],
    assignments: ['Dramatic lighting portrait or environment'],
  },
  {
    week: 4,
    title: 'Composition for Screen-Based Media',
    overview: 'Focus: Designing for digital platforms',
    topics: [
      'Designing for social, web, and print',
      'Cropping & framing',
      'Scalable artwork',
      'Exporting for multiple formats',
    ],
    readings: [
      'Tools: Adobe Illustrator (intro), Adobe InDesign (portfolio basics)',
      'Guest: Senior graphic designer (live demo)',
    ],
    assignments: ['Adapt one artwork for print, web, and social formats'],
  },
  {
    week: 5,
    title: 'Illustration & Visual Storytelling',
    overview: 'Focus: Moving beyond single-frame fine art',
    topics: [
      'Character development',
      'Environmental storytelling',
      'Sequential thinking',
      'Storyboarding fundamentals',
    ],
    readings: ['Guest: Publishing or entertainment illustrator (live demo)'],
    assignments: ['3-panel narrative illustration'],
  },
  {
    week: 6,
    title: 'Introduction to Commercial Application',
    overview: 'Focus: Turning painterly skill into paid work',
    topics: [
      'Book covers',
      'Key art',
      'Editorial illustration',
      'Entertainment concept art',
    ],
    readings: ['Guest: Art director or creative agency lead'],
    assignments: ['Respond to a professional-style brief'],
  },
  {
    week: 7,
    title: 'Advanced Project Development',
    overview: 'Client Simulation Project: Students select one track',
    topics: [
      'Concept art piece',
      'Illustrated poster series',
      'Storyboards / sequential art',
      'Book cover / children’s book illustration',
    ],
    readings: [],
    assignments: ['Begin major track project'],
  },
  {
    week: 8,
    title: 'Refinement & Presentation',
    overview: 'Finalizing the Client Simulation Project',
    topics: [
      'Artwork refinement',
      'Presentation board creation',
      'Final edits',
      'Studio handoff etiquette',
      'Working with art directors',
      'Formal pitch rehearsal',
    ],
    readings: ['Guest: Panel critique'],
    assignments: ['Refine track project for portfolio'],
  },
  {
    week: 9,
    title: 'Freelance, Contracts & Business Skills',
    overview: 'Focus: Income pathways for creatives',
    topics: [
      'Pricing your work',
      'Contracts & intellectual property',
      'Client communication',
      'Taxes basics for creatives',
    ],
    readings: ['Guest: Creative entrepreneur'],
    assignments: ['Continue project refinement'],
  },
  {
    week: 10,
    title: 'Job Readiness & Interview Training',
    overview: 'Focus: Employment preparation',
    topics: [
      'Resume & LinkedIn optimization',
      'Interview role-play',
      'Portfolio storytelling',
      'Salary negotiation basics',
    ],
    readings: ['Guest Panel: Hiring managers / recruiters'],
    assignments: ['Final artwork refinement'],
  },
  {
    week: 11,
    title: 'Final Portfolio Refinement',
    overview: 'Focus: Polish & positioning',
    topics: [
      'Portfolio layout (PDF + website ready)',
      'Removing weaker pieces',
      'Final presentation preparation',
    ],
    readings: [],
    assignments: ['Deliverable: 6–10 industry-ready pieces'],
  },
  {
    week: 12,
    title: 'Capstone Preparation',
    overview: 'Focus: Final preparation for capstone presentations',
    topics: [
      'Portfolio layout (PDF + website ready)',
      'Removing weaker pieces',
      'Final presentation preparation',
      'Rehearsal & peer feedback',
    ],
    readings: [
      'Guest Speakers: Concept artists, Art directors, Illustrators, Motion designers',
    ],
    assignments: [
      '6–8 high-quality digital works',
      '1 commercial-ready project',
      'Cohesive presentation portfolio',
    ],
  },
  {
    week: 13,
    title: 'CAPSTONE',
    overview: 'Formal portfolio review sessions & networking mixer',
    topics: [
      'Industry panel feedback',
      'Networking mixer',
      'Career pathway guidance',
      'Final portfolio presentations',
    ],
    readings: [],
    assignments: [
      'Present final portfolio to industry panel',
      'Completed commercial-ready project',
    ],
    dateOverride: 'Date to be determined',
  },
];

// ──────────────────────────────────────────────────────────────────
//  CHANGELOG
//  Add entries here when the curriculum is updated.
//  Newest entries first. They display in the banner at the top.
// ──────────────────────────────────────────────────────────────────

export const changelog = [
  {
    date: '2026-05-20',
    message: 'Week 2 expanded — detailed brush engine workflow, texture theory readings, and Media Tile assignment added',
  },
  {
    date: '2026-05-18',
    message: 'Week 12 renamed to "Capstone Preparation" — final review content moved to new Week 13',
  },
  {
    date: '2026-05-18',
    message: 'Added Week 13: CAPSTONE — formal portfolio presentations & industry panel (date TBD)',
  },
  {
    date: '2026-05-14',
    message: 'Holiday notes added: no class July 4th & September 5th',
  },
  {
    date: '2026-05-13',
    message: 'Initial 12-week curriculum populated with all lesson plans',
  },
];
