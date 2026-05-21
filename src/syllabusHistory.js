// ──────────────────────────────────────────────────────────────────
//  SYLLABUS VERSION HISTORY SNAPSHOTS
//  Allows users to toggle/scroll through past versions of the syllabus.
// ──────────────────────────────────────────────────────────────────

export const syllabusVersions = [
  {
    version: '1.2',
    date: '2026-05-21',
    description: 'Updated Week 1 with pixel fundamentals, YouTube playlist, and straight vs. curved line explorations.',
    // Uses the live active curriculum by default, but we declare it here for reference
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
      // Week 2 remains the same as latest (expanded)
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
      }
    ]
  }
];
