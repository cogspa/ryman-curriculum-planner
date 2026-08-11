// ─── Content for Week 08: Refinement & Presentation ─────────────────────────────
export const TOPIC_DETAILS = {
  'receiving-constructive-art-direction': {
    title: 'Discussion: Receiving and Processing Constructive Art Direction',
    subtitle: 'Navigating feedback, client dialogue, and professional creative collaboration',
    pccSources: ['Industry Standards: Design Reviews & Creative Studio Hierarchy', 'Wayne Hunt — Design Feedback & Presentation Prep'],
    sourceNote: 'Essential professional studio methodology on receiving critique, translating client requests into design objectives, and advocating for design solutions without defensiveness.',
    sections: [
      {
        heading: 'Creative Direction is a Conversation',
        subheading: 'The Philosophy of Critique & Collaboration',
        body: `One of the **most important professional skills** for a designer or artist is learning how to respond to feedback without immediately becoming defensive—or automatically agreeing with every suggestion.

Creative direction is often a **conversation**.

A client or creative director may identify a **legitimate problem**, but the solution they suggest may not necessarily be the best design solution. Part of your job as a creative professional is to **listen carefully**, understand the **underlying concern**, and then **contribute your own perspective**.

• **The goal is not to "win" the argument.**
• **The goal is to make the work better.**`,
      },
      {
        heading: 'Scenario 1: "Make the Logo Bigger"',
        subheading: 'Identifying the Need for Brand Prominence vs. Headline Competition',
        scenarioType: 'dialogue',
        dialogue: [
          { speaker: 'Creative Director', role: 'director', text: 'Can we make the logo much bigger? It feels like it is getting lost.' },
          { speaker: 'Designer', role: 'designer', text: 'Absolutely. Is the main concern that the brand isn\'t noticeable enough, or that you want it to become the first thing people see?' },
          { speaker: 'Creative Director', role: 'director', text: 'Mostly that people immediately recognize who the ad is from.' },
          { speaker: 'Designer', role: 'designer', text: 'That makes sense. I can increase the logo, but I\'d also like to try strengthening the contrast and giving it more breathing room. That may increase brand recognition without having the logo compete with the headline.' },
          { speaker: 'Creative Director', role: 'director', text: 'Let\'s see both.' },
          { speaker: 'Designer', role: 'designer', text: 'Great. I\'ll show you one version with a larger logo and another where we improve its prominence through placement and contrast.' },
        ],
        body: `**What happened?**

The designer did **not** say:
*"Making the logo bigger will ruin the design."*

Instead, the designer identified the **problem underneath the request**.

• **The client said:** *"Make the logo bigger."*
• **The actual concern was:** **The brand needs to be more recognizable.**
• **The outcome:** There may be several visual solutions to that problem, and the designer offered to explore multiple viable avenues.`,
      },
      {
        heading: 'Scenario 2: "Can We Add More Things?"',
        subheading: 'Addressing Visual Energy Without Cluttering Hierarchy',
        scenarioType: 'dialogue',
        dialogue: [
          { speaker: 'Client', role: 'client', text: 'The design feels a little empty. Could we add some more graphics, maybe some icons, another photograph, and some more information?' },
          { speaker: 'Designer', role: 'designer', text: 'We definitely can. Before I add anything, can I ask what feels missing to you?' },
          { speaker: 'Client', role: 'client', text: 'It just doesn\'t feel exciting enough.' },
          { speaker: 'Designer', role: 'designer', text: 'I understand. My concern with adding several more elements is that we may weaken the hierarchy. Instead, I would like to try making the hero image more dramatic and increasing the scale difference between the headline and supporting information.' },
          { speaker: 'Client', role: 'client', text: 'So you think it can feel more exciting without adding more content?' },
          { speaker: 'Designer', role: 'designer', text: 'Exactly. I think we can increase the visual energy while keeping the message easier to understand.' },
        ],
        body: `**The Professional Approach**

Instead of arguing about whether the design is "too empty," **translate the comment into a design objective**:

• **Client request:** Add more things.
• **Underlying concern:** The design lacks visual energy.
• **Possible designer solution:** Leverage **scale, contrast, cropping, typography, motion, color, or composition** rather than cluttering the layout.`,
      },
      {
        heading: 'Scenario 3: "I Don\'t Like This Color"',
        subheading: 'Aligning Palette Decisions With Brand Personality',
        scenarioType: 'dialogue',
        dialogue: [
          { speaker: 'Client', role: 'client', text: 'I\'m not really liking the orange.' },
          { speaker: 'Designer', role: 'designer', text: 'Sure. Is it the orange itself, or does it feel like it doesn\'t match the personality you\'re looking for?' },
          { speaker: 'Client', role: 'client', text: 'It feels too playful. I want the company to feel more sophisticated.' },
          { speaker: 'Designer', role: 'designer', text: 'That\'s helpful. The orange was originally intended to communicate energy and approachability, but if sophistication is becoming the stronger priority, I can explore a more restrained palette.' },
          { speaker: 'Client', role: 'client', text: 'Yes, exactly.' },
          { speaker: 'Designer', role: 'designer', text: 'I\'ll develop a few alternatives, but I\'d like to preserve some warmth so the brand doesn\'t become too corporate or cold.' },
        ],
        body: `**Notice the Difference**

The designer explains **why the original decision existed** without becoming defensive.

That clearly communicates:
👉 **"I made this decision intentionally."**

Yet, the designer remains receptive and willing to adjust the work when the project's strategic objectives evolve.`,
      },
      {
        heading: 'Scenario 4: When You Strongly Disagree With the Direction',
        subheading: 'Flagging Usability & Readability Issues Professionally',
        scenarioType: 'dialogue',
        dialogue: [
          { speaker: 'Creative Director', role: 'director', text: 'Let\'s put all of the text in the script typeface. It feels more artistic.' },
          { speaker: 'Designer', role: 'designer', text: 'I can explore that. I do have one concern I\'d like to flag before we move forward.' },
          { speaker: 'Creative Director', role: 'director', text: 'What\'s that?' },
          { speaker: 'Designer', role: 'designer', text: 'At larger sizes the script works really well, but at the smaller sizes we\'re using here, readability drops significantly. Since this piece may also appear on phones, I would recommend keeping the script for the headline and using a simpler typeface for the supporting information.' },
          { speaker: 'Creative Director', role: 'director', text: 'I really want the script to be part of the visual identity.' },
          { speaker: 'Designer', role: 'designer', text: 'Absolutely. We can still make it an important part of the identity. I\'d just suggest creating a hierarchy where it becomes the expressive voice rather than asking it to carry every piece of information.' },
        ],
        body: `**Important Language for Constructive Disagreement**

Instead of saying:
❌ *"That won't work."*

Try professional alternatives:
• **"I have one concern I'd like to flag before we move forward."**
• **"There may be a readability issue when this scales down to mobile screens."**
• **"Can I show you an alternative that preserves what you're looking for while protecting legibility?"**

This keeps the conversation **collaborative and professional** instead of confrontational.`,
      },
      {
        heading: 'Scenario 5: "I Just Don\'t Like It"',
        subheading: 'Translating Emotional Gut Reactions Into Actionable Revisions',
        scenarioType: 'dialogue',
        dialogue: [
          { speaker: 'Client', role: 'client', text: 'I don\'t know. I just don\'t like this version.' },
          { speaker: 'Designer', role: 'designer', text: 'That\'s completely fair. Can we narrow down what isn\'t working for you?' },
          { speaker: 'Client', role: 'client', text: 'I\'m not sure.' },
          { speaker: 'Designer', role: 'designer', text: 'Let\'s break it into a few areas. Is it the typography, color, imagery, overall mood, or the way the information is organized?' },
          { speaker: 'Client', role: 'client', text: 'I think it feels too serious.' },
          { speaker: 'Designer', role: 'designer', text: 'That\'s helpful. If we want it to feel more approachable, I can look at the image selection, typography, and color rather than rebuilding the entire concept.' },
        ],
        body: `**Why This Matters**

Clients do not always speak in design vocabulary.

• A designer's job is often to help **translate an emotional reaction into something actionable**.
• **"I don't like it" is not useless feedback.** It simply needs to be investigated systematically.`,
      },
      {
        heading: 'Scenario 6: When the Client Suggests a Specific Solution',
        subheading: 'Listening for the Problem Behind the Prescribed Fix',
        scenarioType: 'dialogue',
        dialogue: [
          { speaker: 'Client', role: 'client', text: 'Can we put a red box around this paragraph?' },
          { speaker: 'Designer', role: 'designer', text: 'We can. Is the goal to make that information more noticeable?' },
          { speaker: 'Client', role: 'client', text: 'Yes. It\'s really important.' },
          { speaker: 'Designer', role: 'designer', text: 'Understood. I\'d like to test the red box, but I can also show you another option where we increase the type size and reposition it higher in the hierarchy. That might draw attention without introducing another graphic element.' },
          { speaker: 'Client', role: 'client', text: 'Let\'s compare them.' },
        ],
        body: `**Develop the Core Listening Habit**

This is one of the most valuable habits a designer can develop:
👉 **Listen for the problem behind the proposed solution.**

• The client may say: *"Put a red box around this."*
• But what they may actually mean is: **"People aren't noticing this information."**`,
      },
      {
        heading: 'Calmly Adding Your Artistic Perspective',
        subheading: 'How You Communicate Your Perspective Matters',
        body: `A designer should not disappear from the process simply because someone senior gives feedback. Your expertise is part of what you were hired to contribute.

However, **how you communicate your perspective matters greatly**:

• **Instead of:** *"I don't agree."*
  👉 **Try:** **"I see the direction you're going. Can I show you one alternative before we commit to it?"**

• **Instead of:** *"That makes the design worse."*
  👉 **Try:** **"My concern is that we may lose some of the hierarchy we've established."**

• **Instead of:** *"That's not good design."*
  👉 **Try:** **"I think there may be another way to accomplish the same objective."**

• **Instead of:** *"The client doesn't understand typography."*
  👉 **Try:** **"I think the underlying concern may actually be readability rather than the typeface itself."**

• **Instead of:** *"I already tried that."*
  👉 **Try:** **"I explored something similar earlier. Let me show you what happened and why I moved away from it."**`,
      },
      {
        heading: 'A Useful Four-Step Response Sequence',
        subheading: 'A Practical Sequence for Handling Difficult Creative Direction',
        body: `When receiving difficult creative direction, practice this 4-step sequence:

1. **1. Listen**
   Do not immediately defend the work. Let the person finish explaining the concern completely.

2. **2. Clarify**
   Ask what problem they are trying to solve.
   *"Is the main concern readability, brand recognition, or visual impact?"*

3. **3. Acknowledge**
   Show that you understand the objective.
   *"That makes sense. I understand why you want the product to feel more prominent."*

4. **4. Add Your Perspective**
   Now introduce your professional recommendation.
   *"One thing I'd like to preserve is the simplicity of the composition. Could I show you an option that increases the product emphasis without adding more elements?"*`,
      },
      {
        heading: 'When the Creative Director Still Says No',
        subheading: 'Advocacy vs. Execution on a Professional Team',
        scenarioType: 'dialogue',
        dialogue: [
          { speaker: 'Creative Director', role: 'director', text: 'I understand your concern, but let\'s go with the larger headline.' },
          { speaker: 'Designer', role: 'designer', text: 'Understood. I\'ll move forward with that direction.' },
        ],
        body: `That is also an essential part of being a professional.

• You presented your recommendation clearly and respectfully.
• The final decision was made by the director/client.
• You do not need to continue arguing or fighting for it.

**Knowing when to advocate and when to execute is part of working effectively on a professional creative team.**`,
      },
      {
        heading: 'When You Should Push Back More Strongly',
        subheading: 'Protecting the Project\'s Integrity, Standards & Legal Compliance',
        scenarioType: 'dialogue',
        dialogue: [
          { speaker: 'Client', role: 'client', text: 'Let\'s make the disclaimer much smaller so we have more space.' },
          { speaker: 'Designer', role: 'designer', text: 'We can adjust the layout, but I would not recommend reducing the disclaimer below the required size. Instead, let me restructure the composition so we can preserve both readability and the required information.' },
        ],
        body: `There are specific situations where a designer **should clearly raise concerns and push back**, particularly when the requested change impacts:

• **Accessibility** — Contrast ratios, color-blind legibility, screen reader alt specs
• **Readability** — Body text sizing below minimum thresholds, illegible script fonts
• **Brand Standards** — Unauthorized logo distortions, unapproved color modifications
• **Legal Requirements** — Required copyright notices, disclaimers, mandatory disclosures
• **Incorrect Information** — Factual typos, incorrect dates, misleading statements
• **Technical Limitations** — Image resolution under 300 DPI for print, excessive web asset weights
• **Print Production** — Missing bleeds, unsafe margin offsets, out-of-gamut inks
• **User Experience (UX)** — Non-standard interactive patterns, hidden call-to-actions
• **Cultural Sensitivity** — Symbols, idioms, or imagery that could be misinterpreted or offensive
• **Safety** — Compliance warnings, age gates, instruction legibility
• **Project Scope or Budget** — Deliverable additions that exceed the agreed contract scope

Here the designer is not defending personal taste:
🛡️ **The designer is protecting the project.**`,
      },
      {
        heading: 'Art Direction Is Not the Same as Personal Taste',
        subheading: 'Separating "I Like It" From "It Is Working"',
        body: `One of the hardest things for young designers to learn is separating:

• **"I like it."**
  *from*
• **"It is working."**

A creative director may personally dislike something that is still appropriate for the target audience. Likewise, a designer may personally love an aesthetic choice that fails to solve the client's communication problem.

**Professional critique should continually return to foundational questions:**

• **Who is the audience?**
• **What needs to be communicated?**
• **What should the viewer notice first?**
• **What action should the viewer take?**
• **Does the design support the brand?**
• **Is the information understandable?**
• **Does the execution work across its intended formats?**`,
      },
    ],
  },

  'handoff-formats-and-packaging-documents': {
    title: 'Workflow Breakdown: Handoff Formats & Packaging Documents',
    subtitle: 'Mastering InDesign packaging, asset collection, print bleeds, and client delivery conventions',
    pccSources: ['InDesign Packaging Guidelines', 'Commercial Print Handoff Standards'],
    sourceNote: 'Standard operating procedures for exporting production-ready files, managing links and fonts, and delivering bulletproof client packages.',
    sections: [
      {
        heading: 'The InDesign Packaging Pipeline',
        subheading: 'Why Manual Asset Gathering Fails',
        body: `When delivering a project to a printer, art director, or client, simply sending the \`.indd\` or \`.psd\` file is a recipe for broken links, missing fonts, and production delays.

InDesign solves this through the **Package** workflow (**File > Package**):
• **Fonts Collection:** Packages all active OpenType and TrueType fonts used in the layout.
• **Links & Graphics:** Gathers all linked high-resolution PSDs, vector AIs, and TIFs into a dedicated \`Links\` subfolder.
• **IDML Fallback:** Generates an InDesign Markup Language (\`.idml\`) file so collaborators on older InDesign versions can open the document without error.
• **Print-Ready PDF:** Exports a high-resolution PDF with embedded crop marks and color profiles.
• **Package Report:** Generates an automated text file detailing color spaces, spot inks, fonts, and missing links.`,
      },
      {
        heading: 'Folder Structure & File Naming Conventions',
        subheading: 'Professional Studio Taxonomy',
        body: `Organized delivery folders reflect studio polish and save hours of cross-team confusion.

**Standard Handoff Structure:**
\`\`\`
[ProjectName]_[ClientName]_Handoff_v01/
├── 01_Documents/
│   ├── [ProjectName]_Layout_v01.indd
│   └── [ProjectName]_Layout_v01.idml
├── 02_Links/
│   ├── Hero_Illustration_300dpi.psd
│   └── Brand_Logo_Vector.ai
├── 03_Fonts/
│   └── [Licensed Font Family Files]
├── 04_Exports/
│   ├── [ProjectName]_Print_PressReady_Bleeds.pdf
│   ├── [ProjectName]_Digital_Preview_RGB.pdf
│   └── Assets_WebP_PNG/
└── Instructions_ReadMe.txt
\`\`\`

**File Naming Rules:**
• Use underscores or hyphens instead of spaces: \`Client_Campaign_Asset_Dimensions_v01.ext\`
• Never name a file \`Final.psd\` or \`Final_v2_FINAL.indd\`. Always use incremental version numbers (\`v01\`, \`v02\`).`,
      },
      {
        heading: 'Print Preflight & Export Specs',
        subheading: 'Bleeds, Crop Marks, Color Profiles & Resolution',
        body: `Before exporting your final print deliverables, run through this preflight checklist:

• **Bleed Offsets:** Ensure 0.125" (3mm) bleed on all exterior edges. Verify that artwork elements extend completely into the bleed zone.
• **Margin Safety:** Ensure all critical body text, page numbers, and logos remain at least 0.375" (recommended 0.5") inside the trim line.
• **Resolution Check:** Verify that effective resolution for all raster illustrations is at least **300 PPI**.
• **Color Space:** Convert color modes to **CMYK** (or specified spot Pantone swatches) for physical print runs, and **sRGB** for digital displays.
• **Crop & Slug Marks:** Include standard printer crop marks offset by 0.125" so they do not overlap the live artwork.`,
      },
      {
        heading: 'Creative Direction & Handoff Integration',
        subheading: 'Receiving Feedback on Final Packaging',
        body: `Delivering a handoff package is not just a technical step—it is often the moment of final review with your art director or client.

Be prepared to explain your packaging choices, confirm font licensing agreements, and walk through version histories.

👉 Read the companion guide: [Discussion: Receiving and Processing Constructive Art Direction](/week/08/receiving-constructive-art-direction) for scripts and strategies on handling critique during final handoffs.`,
      },
    ],
  },

  'structuring-a-presentation-pitch-deck': {
    title: 'Preview: Structuring a Professional Presentation Pitch Deck',
    subtitle: 'Organizing narrative pacing, hero visuals, and client pitch decks for final Capstone critique',
    pccSources: ['Presentation Design Standards', 'Wayne Hunt — Pitch Deck Architecture'],
    sourceNote: 'Best practices for compiling worldbuilding assets into a cohesive 10-to-15 slide presentation deck.',
    sections: [
      {
        heading: 'The Architecture of a Pitch Deck',
        subheading: 'Guiding the Audience From Premise to Deliverables',
        body: `A great pitch deck is structured like a story. It introduces a context, establishes a creative challenge, reveals the hero visual solutions, and demonstrates technical execution.

**Recommended 10-Slide Deck Flow:**
1. **Title Slide:** Project title, subtitle, student name, track/discipline, date.
2. **The Creative Brief:** One-sentence logline, client premise, target audience, and primary design objectives.
3. **Worldbuilding & Context:** Mood board, visual reference tokens, tonal inspiration.
4. **Hero Deliverable 1:** Primary focal artwork (full bleed or clean frame).
5. **Hero Deliverable 2:** Secondary layout, sequence panels, or product renders.
6. **Supporting Assets:** Character turnaround, typography hierarchy, or color triad swatches.
7. **Production Process:** Thumbnail explorations, value notan studies, before/after iterations.
8. **Technical Specifications:** Dimensions, color modes, target platforms, software pipeline.
9. **Impact & Reflection:** What worked, key lessons learned from art direction, future extensions.
10. **Conclusion & Q&A:** Contact info, portfolio link, acknowledgments.`,
      },
      {
        heading: 'Slide Layout Best Practices',
        subheading: 'Letting the Artwork Lead',
        body: `• **One Idea Per Slide:** Avoid overcrowding slides with competing images. Give your hero artwork maximum visual breathing room.
• **High Contrast Typography:** Use clean sans-serif typography with strong contrast against the slide background.
• **Consistent Grid & Margins:** Keep header positions, margin offsets, and folio numbers locked in identical positions across all slides using Master/Parent slides.
• **Rehearse the Narrative:** Limit slide presentation to 5-7 minutes, leaving ample time for constructive panel feedback.`,
      },
    ],
  },

  'presentation-board-layout-creation': {
    title: 'Presentation Board Layout Creation',
    subtitle: 'Composing polished 11x17 and 16:9 presentation boards for physical & digital critiques',
    pccSources: ['Presentation Board Architecture', 'Exhibition Standards'],
    sections: [
      {
        heading: 'Designing Presentation Boards',
        subheading: 'Balancing Focal Artworks with Supporting Process Studies',
        body: `Presentation boards serve as the definitive standalone artifact of your project. An observer should be able to walk up to your board (or view the PDF) and immediately understand the project scope, artistic voice, and technical rigor.

• **Hero Placement:** Position your primary artwork in the dominant optical center or top-left quadrant.
• **Process Hierarchy:** Group thumbnail sketches, color swatches, and wireframes into clean secondary modules along the lower third or right margin.
• **Callouts & Annotation:** Use concise, professional captions (10-12pt font) explaining critical design decisions.`,
      },
    ],
  },

  'studio-handoff-etiquette-and-conventions': {
    title: 'Studio Handoff Etiquette & Conventions',
    subtitle: 'Professional collaboration, file transfer protocols, and client communication',
    pccSources: ['Studio Operations Handbook'],
    sections: [
      {
        heading: 'Working on a Collaborative Creative Team',
        subheading: 'Professionalism in Delivery and Review',
        body: `Studio handoff etiquette separates amateur freelancers from dependable studio professionals:

• **Never Send Raw, Messy Working Files:** Always clean layer stacks, delete hidden test layers, rename groups logically, and unlock locked guides before handoff.
• **Include a ReadMe File:** Provide clear instructions on fonts, asset rights, and software versions required to edit the files.
• **Meet Milestones Ahead of Time:** Deliver files early to allow buffer time for client preflight checks.`,
      },
    ],
  },

  'working-with-art-directors-roleplay': {
    title: 'Working with Art Directors Role-Play',
    subtitle: 'Practical exercises in live feedback, revision negotiation, and collaborative critique',
    pccSources: ['Critique Simulation Protocol'],
    sections: [
      {
        heading: 'Role-Play Exercises in Critique',
        subheading: 'Simulating Live Studio Scenarios',
        body: `In this studio session, students pair up to simulate real-world art director/designer critique sessions.

One student role-plays the **Art Director / Client**, presenting difficult revision requests (e.g., changing color palettes, requesting more content, or questioning typography). The other student role-plays the **Designer**, applying the **4-Step Response Sequence** (Listen, Clarify, Acknowledge, Add Perspective).

👉 Review the complete scenario dialogue scripts in [Discussion: Receiving and Processing Constructive Art Direction](/week/08/receiving-constructive-art-direction).`,
      },
    ],
  },
};

export const topicList = [
  { key: 'receiving-constructive-art-direction', label: 'Discussion: Receiving and Processing Constructive Art Direction', isNew: true },
  { key: 'handoff-formats-and-packaging-documents', label: 'Workflow breakdown: Handoff formats and packaging documents', isNew: true },
  { key: 'structuring-a-professional-presentation-pitch-deck', label: 'Preview: Structuring a professional presentation pitch deck', isNew: true },
  { key: 'presentation-board-layout-creation', label: 'Presentation board layout creation', isNew: true },
  { key: 'studio-handoff-etiquette-and-conventions', label: 'Studio handoff etiquette & conventions', isNew: true },
  { key: 'working-with-art-directors-roleplay', label: 'Working with art directors role-play', isNew: true },
];
