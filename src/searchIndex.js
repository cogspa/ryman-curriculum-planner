import { TOPIC_DETAILS as w1 } from './content/week01Topics.js';
import { TOPIC_DETAILS as w2 } from './content/week02Topics.js';
import { TOPIC_DETAILS as w3 } from './content/week03Topics.js';
import { TOPIC_DETAILS as w4 } from './content/week04Topics.js';
import { TOPIC_DETAILS as w5 } from './content/week05Topics.js';
import { TOPIC_DETAILS as w6 } from './content/week06Topics.js';
import { TOPIC_DETAILS as w7 } from './content/week07Topics.js';
import { TOPIC_DETAILS as w8 } from './content/week08Topics.js';
import { TOPIC_DETAILS as w9 } from './content/week09Topics.js';
import { curriculum } from './curriculum.js';
import { assignments } from './assignments.js';

// Interactive tools and dedicated lessons registry
export const INTERACTIVE_TOOLS = [
  {
    id: 'pixel-budget',
    title: 'The Pixel Budget Matrix',
    category: 'Interactive Tool',
    week: 1,
    url: '/week/01/pixel-budget',
    description: 'Dynamic resolution & megapixel matrix calculator. Explore resolution, canvas memory, and pixel budget planning.',
    tags: ['pixels', 'resolution', 'dpi', 'ppi', 'matrix', 'canvas size', 'dimensions', 'megapixels', 'scale', 'memory']
  },
  {
    id: 'brush-maker',
    title: 'Brush Maker & Foundry',
    category: 'Interactive Tool',
    week: 3,
    url: '/week/03/brush-maker',
    description: 'Procedural brush generator and stamp designer. Adjust hardness, jitter, spacing, opacity, and brush tips.',
    tags: ['brush', 'presets', 'hardness', 'jitter', 'spacing', 'opacity', 'flow', 'texture', 'photoshop', 'stamps']
  },
  {
    id: 'notan-light-lab',
    title: 'Notan Light Lab (2-Value & 3-Value Studies)',
    category: 'Interactive Tool',
    week: 3,
    url: '/week/03/notan-light-lab',
    description: 'Explore light and dark balance, focal points, 2-value thresholding, and 3-value light hierarchy in real time.',
    tags: ['notan', 'light', 'value', 'contrast', 'shadow', 'chiaroscuro', 'composition', 'threshold', 'black and white']
  },
  {
    id: 'threshold-notan',
    title: 'Threshold Notan in Photoshop',
    category: 'Lesson',
    week: 3,
    url: '/week/03/threshold-notan',
    description: 'Step-by-step tutorial on using Photoshop threshold adjustments to extract underlying composition notans.',
    tags: ['threshold', 'photoshop', 'notan', 'value structure', 'adjustment layer', 'contrast']
  },
  {
    id: 'sky-color',
    title: 'Atmospheric Sky Color Study',
    category: 'Interactive Tool',
    week: 3,
    url: '/week/03/sky-color',
    description: 'Atmospheric depth and horizon gradient simulator. Study daylight, golden hour, twilight, and haze color ramps.',
    tags: ['sky', 'color', 'atmosphere', 'gradient', 'sunset', 'depth', 'lighting', 'horizon', 'haze', 'environment']
  },
  {
    id: 'block-out-process',
    title: '2D Block Out Process & Silhouettes',
    category: 'Interactive Tool',
    week: 3,
    url: '/week/03/block-out-process',
    description: 'Practice rapid silhouette blocking, shape readability, and value grouping before detail rendering.',
    tags: ['block out', 'silhouette', 'shapes', 'character', 'prop', 'thumbnail', 'gestures', 'forms']
  },
  {
    id: 'triad-palettes',
    title: 'Triad Color Palette Generator',
    category: 'Interactive Tool',
    week: 3,
    url: '/week/03/triad-palettes',
    description: 'Harmonious color schemes generator using triangular and split-complementary color wheel geometry.',
    tags: ['color', 'triad', 'palette', 'harmony', 'swatches', 'hue', 'saturation', 'wheel', 'gamut']
  },
  {
    id: 'procedural-wear',
    title: 'Procedural Wear & Surface Distressing',
    category: 'Lesson',
    week: 3,
    url: '/week/03/procedural-wear',
    description: 'Creating realistic weathering, edge chipping, scuffs, and organic grime using blend modes and custom brushes.',
    tags: ['wear', 'procedural', 'grime', 'weathering', 'distressing', 'blend modes', 'textures', 'metal', 'scuffs']
  },
  {
    id: 'gradient-marquee',
    title: 'Gradient Marquee Selection Painting',
    category: 'Interactive Tool',
    week: 3,
    url: '/week/03/gradient-marquee',
    description: 'Learn lasso and marquee painting techniques with gradient fills for clean graphical forms and hard edges.',
    tags: ['gradient', 'marquee', 'lasso', 'selection', 'hard edge', 'vector style', 'cel shading']
  },
  {
    id: 'brush-foundry-ii',
    title: 'Brush Foundry II — Advanced Media Textures',
    category: 'Interactive Tool',
    week: 3,
    url: '/week/03/brush-foundry-ii',
    description: 'Simulating dry media, charcoal, watercolor washes, and gouache impasto in digital software.',
    tags: ['brush', 'traditional', 'media', 'charcoal', 'watercolor', 'gouache', 'oil', 'impasto', 'textures']
  },
  {
    id: 'sphere-material-studies',
    title: 'Sphere Material & Specular Studies',
    category: 'Interactive Tool',
    week: 3,
    url: '/week/03/sphere-material-studies',
    description: 'Interactive shader sphere breakdown: ambient occlusion, direct light, core shadow, bounce light, and highlight.',
    tags: ['sphere', 'shading', 'material', 'specular', 'core shadow', 'bounce light', 'reflection', 'render']
  },
  {
    id: 'value-studies',
    title: 'Film & Masterwork Value Studies',
    category: 'Visual Reference',
    week: 3,
    url: '/week/03/value-studies',
    description: 'Gallery of cinematic stills analyzed for composition, tonal staging, and depth planes.',
    tags: ['value', 'cinematography', 'film', 'studies', 'depth', 'tonal range', 'masterworks', 'lighting']
  },
  {
    id: 'symmetry-photoshop',
    title: 'Symmetry in Photoshop & Butterfly Tool',
    category: 'Lesson & Tool',
    week: 5,
    url: '/week/05/symmetry-in-photoshop',
    description: 'Master the four types of symmetry (vertical, horizontal, dual, radial/mandala) and the butterfly tool.',
    tags: ['symmetry', 'butterfly tool', 'radial', 'mandala', 'mirror', 'character design', 'creature', 'props']
  },
  {
    id: 'shot-examples',
    title: 'Cinematography Shot Types & Camera Angles',
    category: 'Visual Reference',
    week: 5,
    url: '/week/05/shot-examples',
    description: 'Complete visual chart of establishing shots, over-the-shoulder, close-ups, POV, dutch angles, and pans.',
    tags: ['camera', 'shot types', 'angles', 'cinematography', 'establishing', 'close up', 'ots', 'pov', 'dutch angle']
  },
  {
    id: 'storyboards-deck',
    title: 'Storyboard Systems & Sequential Flow',
    category: 'Presentation',
    week: 5,
    url: '/week/05/storyboards',
    description: 'Slide deck on professional storyboarding methods, camera choreography, and visual pacing.',
    tags: ['storyboard', 'panels', 'sequence', 'animation', 'flow', 'pacing', 'continuity', 'composition']
  },
  {
    id: 'panel-lab',
    title: 'Panel Lab — Interactive Storyboard Canvas',
    category: 'Interactive Tool',
    week: 6,
    url: '/panel-lab',
    description: 'Interactive multi-panel storyboard workspace. Block out cameras, re-order shots, and export sequences.',
    tags: ['panel lab', 'storyboard', 'panels', 'narrative', 'sequence', 'action', 'camera moves', 'export']
  },
  {
    id: 'brief-builder',
    title: 'Creative Project Brief Builder',
    category: 'Interactive Tool',
    week: 7,
    url: '/brief-builder',
    description: 'Interactive brief generator: define project scope, target audience, deliverables, art style, and schedule.',
    tags: ['brief', 'brief builder', 'creative brief', 'ip', 'worldbuilding', 'scope', 'deliverables', 'schedule', 'client']
  },
  {
    id: 'design-brief-presentation',
    title: 'Design Brief Presentation Deck',
    category: 'Presentation',
    week: 7,
    url: '/week/07/design-brief-presentation',
    description: 'Professional template and guidance on pitching creative briefs and worldbuilding proposals.',
    tags: ['pitch', 'brief', 'presentation', 'worldbuilding', 'slides', 'deck', 'proposal']
  },
  {
    id: 'pitch-deck-structure',
    title: 'Structuring a Professional Pitch Deck',
    category: 'Guide',
    week: 8,
    url: '/pitch-deck',
    description: 'Industry blueprint for structuring visual development, entertainment, and capstone presentation pitch decks.',
    tags: ['pitch deck', 'presentation', 'slides', 'structure', 'deck', 'portfolio', 'story', 'visual dev']
  },
  {
    id: 'handoff-formats',
    title: 'Production Handoff Formats & Packaging',
    category: 'Guide',
    week: 8,
    url: '/week/08/handoff-formats',
    description: 'File specifications, naming conventions, bleed/trim parameters, DPI rules, and client handoff standards.',
    tags: ['handoff', 'packaging', 'pdf', 'psd', 'export', 'print', 'file formats', 'production', 'standards']
  },
  {
    id: 'capstone-gallery',
    title: 'Capstone Gallery Builder',
    category: 'Interactive Tool',
    week: 9,
    url: '/capstone-gallery-builder',
    description: 'Assemble and curate your capstone portfolio showcase cards, artwork previews, and project statements.',
    tags: ['capstone', 'gallery', 'portfolio', 'builder', 'showcase', 'presentation', 'reviews']
  },
  {
    id: 'style-inspiration-gallery',
    title: 'Film & Style Inspiration Gallery',
    category: 'Visual Reference',
    week: 9,
    url: '/style-inspiration-gallery',
    description: 'Curated moodboard of film references, concept art styles, color palettes, and lighting inspirations.',
    tags: ['film', 'inspiration', 'style', 'moodboard', 'references', 'visual development', 'cinematography']
  },
  {
    id: 'tips-and-tricks-database',
    title: 'Tips and Tricks Database',
    category: 'Bonus Tool',
    week: 10,
    url: '/week/10/tips-and-tricks',
    description: 'Interactive field guide and curated specimen archive of digital painting, 3D workflows, brushes, lighting, and animation tips.',
    tags: ['tips', 'tricks', 'pigment', 'database', 'archive', 'specimens', 'blender', 'houdini', 'brushes', 'lighting', 'field guide']
  },
  {
    id: 'artist-statements',
    title: 'Real Artist Statements Guide & Drafting Tool',
    category: 'Capstone Tool',
    week: 10,
    url: '/week/10/artist-statements',
    description: '11-slide lesson presentation, structural move analysis (What/Why/How/Intent), and interactive drafting instrument for Capstone Artist Statements.',
    tags: ['artist statement', 'statement', 'capstone', 'drafting', 'writing', 'presentation', 'slides', 'deck', 'moves', 'intent', 'vision']
  },
  {
    id: 'critique-zone',
    title: 'Critique Zone Studio Pin-Up Wall',
    category: 'Studio Tool',
    week: 'All',
    url: '/critique',
    description: 'Real-time studio critique wall for peer reviews, weekly artwork pin-ups, and constructive visual feedback.',
    tags: ['critique', 'feedback', 'pin-up', 'peer review', 'comments', 'wall', 'studio', 'discussion']
  },
  {
    id: 'capstone-worldbuilding',
    title: 'Capstone Worldbuilding Showcase',
    category: 'Curriculum Showcase',
    week: 13,
    url: '/capstone',
    description: 'Final presentation guidelines, industry review panels, and portfolio staging for the Capstone IP showcase.',
    tags: ['capstone', 'worldbuilding', 'final', 'showcase', 'presentation', 'panels', 'reviews', 'ip']
  },
  {
    id: 'class-faq',
    title: 'Class FAQ & Reveal Studio Guide',
    category: 'Resource Guide',
    week: 'All',
    url: '/faq',
    description: 'Complete companion guide covering Glendale Reveal Studios entry, parking, hours, kitchenette, Wi-Fi, and Zoom info.',
    tags: ['faq', 'reveal', 'glendale', 'parking', 'kitchenette', 'wi-fi', 'directions', 'hours', 'attendance', 'zoom']
  },
  {
    id: 'assignments-hub',
    title: 'Saturday Assignments Hub',
    category: 'Resource Guide',
    week: 'All',
    url: '/assignments',
    description: 'Central dashboard for all six graded milestone assignments, tracks, points, and worldbuilding stages.',
    tags: ['assignments', 'hub', 'milestones', 'graded', 'points', 'tracks', 'homework', 'projects']
  },
  {
    id: 'calendar-grid',
    title: 'Traditional Calendar Grid Layout',
    category: 'Resource Guide',
    week: 'All',
    url: '/calendar',
    description: 'Month-by-month calendar showing all Tuesday Zoom and Saturday in-person studio session dates.',
    tags: ['calendar', 'dates', 'schedule', 'sessions', 'tuesday', 'saturday', 'holidays', 'timeline']
  },
  {
    id: 'syllabus-page',
    title: 'Full Program Syllabus & Versions',
    category: 'Resource Guide',
    week: 'All',
    url: '/syllabus',
    description: 'Comprehensive 12-week + Capstone curriculum outline, policies, grading rubrics, and version history.',
    tags: ['syllabus', 'curriculum', 'outline', 'rubric', 'policies', 'schedule', 'versions']
  },
  {
    id: 'weekly-zoom',
    title: 'Weekly Zoom Meeting Room',
    category: 'Live Class',
    week: 'All',
    url: 'https://us06web.zoom.us/j/6122246828',
    isExternal: true,
    description: 'Join our weekly live class discussions and demonstrations every Tuesday evening at 6:00 PM.',
    tags: ['zoom', 'meeting', 'tuesday', 'virtual', 'live', 'lecture', 'online', 'link']
  },
  {
    id: 'dropbox-upload',
    title: 'Dropbox Assignment Upload Folder',
    category: 'Class Upload',
    week: 'All',
    url: 'https://www.dropbox.com/request/d56lyvzlb50sm3vjg0yp',
    isExternal: true,
    description: 'Submit your weekly exercises, homework, Photoshop/Blender source files, and milestone deliverables.',
    tags: ['dropbox', 'upload', 'submit', 'assignment', 'files', 'homework', 'file request', 'deliverables']
  }
];

// Helper to compile full search index
export function buildSearchIndex(customCurriculum = curriculum) {
  const index = [];

  // 1. Topic Detail Pages from week01 to week09
  const topicSources = [
    { wk: 1, topics: w1 },
    { wk: 2, topics: w2 },
    { wk: 3, topics: w3 },
    { wk: 4, topics: w4 },
    { wk: 5, topics: w5 },
    { wk: 6, topics: w6 },
    { wk: 7, topics: w7 },
    { wk: 8, topics: w8 },
    { wk: 9, topics: w9 },
  ];

  topicSources.forEach(({ wk, topics }) => {
    if (!topics) return;
    const padWk = String(wk).padStart(2, '0');
    Object.entries(topics).forEach(([key, data]) => {
      if (!data) return;
      const sectionText = (data.sections || [])
        .map(s => `${s.heading || ''} ${s.body || ''}`)
        .join(' ');
      const pccText = (data.pccSources || []).join(' ');

      index.push({
        id: `topic-wk${wk}-${key}`,
        title: data.title || key,
        category: `Week ${padWk} Lesson`,
        week: wk,
        url: `/week/${padWk}/${key}`,
        description: data.sections?.[0]?.body ? data.sections[0].body.slice(0, 160).replace(/<[^>]*>/g, '') + '...' : `Deep dive lesson on ${data.title}`,
        searchText: `${data.title} ${sectionText} ${pccText} Week ${wk} Lesson`.toLowerCase(),
        isExternal: false
      });
    });
  });

  // 2. Interactive Tools & Dedicated Pages
  INTERACTIVE_TOOLS.forEach(tool => {
    index.push({
      ...tool,
      searchText: `${tool.title} ${tool.description} ${tool.category} ${(tool.tags || []).join(' ')} Week ${tool.week}`.toLowerCase()
    });
  });

  // 3. Graded Assignments
  Object.entries(assignments).forEach(([wk, asg]) => {
    if (!asg) return;
    const weekNum = Number(wk);
    const stepsText = (asg.steps || []).map(s => `${s.title || ''} ${s.body || ''}`).join(' ');
    const deliverablesText = (asg.submission || []).join(' ');

    index.push({
      id: `assignment-wk${weekNum}`,
      title: asg.title || `Assignment ${weekNum}`,
      subtitle: asg.subtitle,
      category: 'Graded Milestone',
      week: weekNum,
      url: `/assignment/${weekNum}`,
      description: asg.introduction?.summary || asg.subtitle || `Detailed milestone guide and deliverables for Week ${weekNum}.`,
      searchText: `${asg.title} ${asg.subtitle || ''} ${asg.introduction?.summary || ''} ${stepsText} ${deliverablesText} Assignment ${weekNum} Milestone`.toLowerCase(),
      isExternal: false
    });
  });

  // 4. Curriculum Weeks in Planner
  (customCurriculum || []).forEach(w => {
    if (!w) return;
    const isCapstone = Number(w.week) === 13;
    const tueTopics = (w.tuesday?.topics || []).join(' ');
    const tueReadings = (w.tuesday?.readings || []).join(' ');
    const satTopics = (w.saturday?.topics || []).join(' ');
    const satAssignments = (w.saturday?.assignments || []).join(' ');

    index.push({
      id: `planner-week-${w.week}`,
      title: isCapstone ? 'Week 13: Capstone Showcase' : `Week ${String(w.week).padStart(2, '0')}: ${w.title}`,
      category: 'Curriculum Week',
      week: w.week,
      url: `/#week-${w.week}`,
      isAnchor: true,
      weekNum: w.week,
      description: w.overview || `Curriculum breakdown, topics, readings, and workshops for Week ${w.week}.`,
      searchText: `Week ${w.week} ${w.title} ${w.overview || ''} ${tueTopics} ${tueReadings} ${satTopics} ${satAssignments}`.toLowerCase(),
      isExternal: false
    });
  });

  return index;
}

// Perform instant fuzzy match across the index
export function searchCurriculum(query, searchIndex) {
  if (!query || typeof query !== 'string') return [];
  const cleanQuery = query.trim().toLowerCase();
  if (cleanQuery.length === 0) return [];

  const terms = cleanQuery.split(/\s+/).filter(t => t.length > 0);

  const results = [];

  for (const item of searchIndex) {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const descLower = (item.description || '').toLowerCase();
    const searchLower = item.searchText || '';

    // Direct title exact match
    if (titleLower.includes(cleanQuery)) {
      score += 120;
      if (titleLower.startsWith(cleanQuery)) score += 50;
    }

    // Direct search text exact match
    if (searchLower.includes(cleanQuery)) {
      score += 40;
    }

    // Term-by-term match
    let allTermsMatch = true;
    for (const term of terms) {
      if (titleLower.includes(term)) {
        score += 30;
      } else if (descLower.includes(term)) {
        score += 15;
      } else if (searchLower.includes(term)) {
        score += 10;
      } else {
        allTermsMatch = false;
      }
    }

    if (allTermsMatch || score >= 40) {
      results.push({ item, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.map(r => r.item);
}
