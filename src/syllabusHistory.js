// ──────────────────────────────────────────────────────────────────
//  SYLLABUS VERSION HISTORY SNAPSHOTS
//  Allows users to toggle/scroll through past versions of the syllabus.
// ──────────────────────────────────────────────────────────────────

export const syllabusVersions = [
  {
    version: '2.0',
    date: '2026-05-28',
    description: 'Updated Week 2 Saturday to reflect July 4th Independence Day Holiday (No class) and successfully consolidated/pushed custom brush and texture workshop topics/assignments onto July 11th (Week 3 Saturday).',
  },
  {
    version: '1.9',
    date: '2026-05-28',
    description: 'Split all 13 weeks into distinct Tuesday (Virtual Zoom Preview & Discussion) and Saturday (In-person Reveal Studio Workshop) sessions, with Week 1 Tuesday covering introduction and Reveal parking/entry procedures.',
  },
  {
    version: '1.8',
    date: '2026-05-28',
    description: 'Wired up Week 7 detailed pages for the Client Simulation framework and the four professional track guidelines (Concept Art, Poster Series, Storyboards, Book Cover).',
    curriculumSnapshot: [
      {
        week: 7,
        title: 'Advanced Project Development',
        overview: 'Client Simulation Project: Students select one track',
        topics: [
          '[NEW] Concept art piece (hero rendering, silhouette sheets, value & color studies, callouts)',
          '[NEW] Illustrated poster series (Polish Poster, Tanaka type-as-image, Rand economy of form, Makela layers)',
          '[NEW] Storyboards / sequential art (camera shots/angles/moves, Script Courier 12pt specifications)',
          '[NEW] Book cover / children’s book illustration (Ann & Paul Rand children\'s books, Zwart constructivist covers)',
        ],
        readings: [
          '[NEW] Client Simulation Framework: Anatomy of a Professional Design Brief',
        ],
        assignments: ['[NEW] Begin major track project: select track, draft brief, build reference board, and thumbnail 12+ directions'],
      }
    ]
  },
  {
    version: '1.7',
    date: '2026-05-28',
    description: 'Updated Week 6 with InDesign layout specifications, master pages, integrated campaign artboards, CC Libraries asset management, and "Most Wanted" design brief.',
    curriculumSnapshot: [
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
      }
    ]
  },
  {
    version: '1.6',
    date: '2026-05-27',
    description: 'Updated Week 5 with 2D animation integration: Preston Blair expression guides, auditory space/leitmotifs, straight-ahead vs. pose-to-pose planning, and cinematic camera angles.',
    curriculumSnapshot: [
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
      }
    ]
  },
  {
    version: '1.5',
    date: '2026-05-27',
    description: 'Expanded Week 5 with sequential narrative storytelling, character silhouettes, storyboard beats, and the 3-panel workflow brief.',
    curriculumSnapshot: [
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
        assignments: ['3-panel narrative illustration — full workflow brief'],
      }
    ]
  },
  {
    version: '1.4',
    date: '2026-05-26',
    description: 'Expanded Week 4 with digital publishing platforms, cropping & framing composition, scalable vector art, and multi-format exports.',
    curriculumSnapshot: [
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
      }
    ]
  },
  {
    version: '1.3',
    date: '2026-05-21',
    description: 'Added Week 3 Dramatic Location assignment for cinematic light and atmosphere studies.',
    curriculumSnapshot: [
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
      }
    ]
  },
  {
    version: '1.2',
    date: '2026-05-21',
    description: 'Updated Week 1 with pixel fundamentals, YouTube playlist, and straight vs. curved line explorations.',
    curriculumSnapshot: [
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
      }
    ]
  },
  {
    version: '1.1',
    date: '2026-05-20',
    description: 'Expanded Week 2 with brush engine deep dive, texture theory, and Media Tile materials study.',
    curriculumSnapshot: [
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
      }
    ]
  },
  {
    version: '1.0',
    date: '2026-05-13',
    description: 'Initial 12-week curriculum outline with capstone structure.',
    curriculumSnapshot: [
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
        title: 'Media Tile Material Simulation',
        overview: 'Focus: Simulating traditional surfaces digitally',
        topics: [
          'Brush engine basics (hardness, opacity, spacing)',
          'Introduction to custom brushes',
          'Simulating paper and canvas tooth',
        ],
        readings: [
          'Photoshop brush engine documentation',
          'Article: The physical properties of paper',
        ],
        assignments: ['Material study tile (4 variations)'],
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
      }
    ]
  }
];
