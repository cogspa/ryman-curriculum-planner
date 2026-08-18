// ─── Content for Week 09: Freelance, Contracts & Business Skills ──────────────
export const topicList = [
  {
    key: 'contracts-legally-binding',
    label: 'Discussion: What makes a contract legally binding and protective for creatives',
    session: 'Tuesday Zoom',
    article: 'Article 1',
  },
  {
    key: 'freelance-business-operations',
    label: 'Preview: Freelance business operations & tax structures',
    session: 'Tuesday Zoom',
    article: 'Article 2',
  },
  {
    key: 'drafting-agreements-and-proposals',
    label: 'Workflow breakdown: Drafting client agreements and proposal sheets',
    session: 'Tuesday Zoom',
    article: 'Article 3',
  },
  {
    key: 'intellectual-property-guide',
    label: 'Intellectual Property Guide: Copyrights, trademarks, and usage licensing rights',
    session: 'Tuesday Zoom (Reading)',
    article: 'Article 4',
  },
  {
    key: 'pricing-your-work-and-project-scoping',
    label: 'Pricing your work & project scoping',
    session: 'Saturday Studio',
    article: 'Article 5',
  },
  {
    key: 'contracts-and-ip-negotiating-rights',
    label: 'Contracts & intellectual property deep dive: Negotiating the rights',
    session: 'Saturday Studio',
    article: 'Article 6',
  },
  {
    key: 'client-communication-and-relationship-skills',
    label: 'Client communication & relationship skills',
    session: 'Saturday Studio',
    article: 'Article 7',
  },
  {
    key: 'tax-basics-for-creative-sole-proprietors',
    label: 'Taxes basics for creative sole proprietors',
    session: 'Saturday Studio',
    article: 'Article 8',
  },
  {
    key: 'refine-campaign-assets-peer-feedback',
    label: '🛠️ Task: Refine campaign assets & apply peer feedback from Week 8 pitch rehearsals',
    session: 'Saturday Studio (Task)',
    article: 'Studio Worksheet',
  },
];

export const TOPIC_DETAILS = {
  'contracts-legally-binding': {
    title: 'Discussion: What Makes a Contract Legally Binding—and Protective for Creatives',
    subtitle: 'Article 1 • Understanding enforceability, core clauses, and protective operational boundaries',
    pccSources: [
      'AIGA Standard Form of Agreement for Design Services',
      'Cornell Legal Information Institute',
      'California Civil Code §1550',
      'Freelancers Union Contract Standards'
    ],
    sourceNote: 'A contract is both a legal agreement and a production tool. The best contract helps the project run smoothly before anyone ever needs to enforce it.',
    sections: [
      {
        heading: 'Formation: When an Agreement Becomes Enforceable',
        subheading: 'The Four Pillars of Contract Law & California Statutory Elements',
        body: `Although details vary by state, the common foundation of an enforceable contract is straightforward: the parties must agree, exchange something of value, have legal capacity, and pursue a lawful purpose.

Under **California Civil Code §1550**, the essential elements of an enforceable contract are:
1. **Parties capable of contracting** (Capacity)
2. **Their consent** (Offer and acceptance)
3. **A lawful object** (Lawful purpose)
4. **A sufficient cause or consideration** (Exchange of value)

A written signature is not the only way an agreement can arise—oral contracts and email agreements can be binding in certain contexts—but a **signed writing** is far easier to prove and certain transactions (such as copyright assignments) **must be in writing by federal law**.

• **Offer and Acceptance:** One side proposes definite, clear terms and the other accepts them without alteration. A changed acceptance operates as a counteroffer, which must in turn be accepted.
• **Consideration:** Each side gives or promises something of value. For creative professionals, providing design, illustration, or animation services in exchange for monetary compensation is the standard consideration.
• **Capacity:** The individuals or entity representatives entering into the agreement must have the legal competence and authorized corporate power to bind their organization.
• **Lawful Purpose:** A court will refuse to enforce any agreement whose underlying object or performance violates the law or public policy.`,
      },
      {
        heading: 'Protection: What Turns a Valid Agreement Into a Useful Creative Contract',
        subheading: '10 Mandatory Protective Clauses for Designers and Artists',
        body: `Having a legally valid contract is not enough; it must actively protect your time, intellectual property, cash flow, and sanity.

• **Correct legal names & authority:** Full legal entity names, addresses, and explicit identification of who holds sign-off and approval authority.
• **Precise scope of work:** Exact deliverables, native file formats, pixel dimensions, quantity, target platforms, and explicit exclusions.
• **Schedule & dependencies:** Milestones, turn-around times, review windows, and what happens to deadlines when the client provides assets late.
• **Fee, deposit & payment terms:** Total fee, non-refundable deposit checkpoint, milestone invoice triggers, reimbursable expenses, late fees, and sales taxes.
• **Revision boundaries & change orders:** A fixed number of revision rounds (e.g., 2 rounds) and a formal written change-order process for out-of-scope requests.
• **Acceptance criteria:** Who approves deliverables, the written mechanism for sign-off, and whether silence after a set window (e.g., 5 business days) constitutes deemed acceptance.
• **Ownership & licensing timing:** Explicit reservation of copyright until final invoice is paid in full, definition of usage rights granted, and creator self-promotional portfolio rights.
• **Third-party materials:** Protocol and licensing pass-through for typefaces, stock photography, 3D assets, audio cues, plug-ins, and model releases.
• **Cancellation & kill fees:** Defined kill fee percentages (e.g., 50% upon concept approval, 100% after production start), project suspension rights for overdue payment, and asset delivery limits upon termination.
• **Warranties & liability limits:** Limited warranties on original authorship, explicit disclaimer of consequential damages, liability caps limited to the total project fee, governing law, and the integration (complete agreement) clause.

👉 **Creative-Business Rule:** Do not begin production until scope, price, rights, schedule, and approval authority are documented and accepted in writing. A deposit is a vital business checkpoint, but the signed contract—not the deposit alone—defines the legal relationship.`,
      },
      {
        heading: 'Mini Scenario: The Unscoped "$1,500 Logo Package"',
        subheading: 'How Ambiguity Generates Scope Creep and Conflict',
        scenarioType: 'dialogue',
        dialogue: [
          { speaker: 'Client', role: 'client', text: 'We agreed on $1,500 for our logo package, so we also need you to supply 12 social media banner variations, vectorized icon fonts, an animated 3D video bumper, and full trademark ownership clearance.' },
          { speaker: 'Designer', role: 'designer', text: 'Our agreement specifies 1 primary brand mark, 1 secondary lockup, a 2-color palette guideline, and 2 rounds of revisions in vector SVG/PNG. The social templates, 3D motion graphics, and trademark legal searches are separate scope items requiring a formal change order.' }
        ],
        body: `**The Takeaway:**
Without an explicit written scope of work and exclusion list, the client assumes "logo package" means complete marketing collateral, source files, and legal trademark vetting. A protective agreement converts "logo package" into measurable deliverables and explicitly lists what is outside the fee.`
      },
      {
        heading: 'Discussion Prompts & Classroom Questions',
        subheading: 'Critical Thinking for Tuesday Zoom Preview',
        body: `• **Which five contractual terms would you refuse to leave vague on a real client engagement?**
• **Where can a well-drafted contract protect the client as well as the creator?**
• **When should a creator pause active work rather than continuously accommodate informal email/Slack requests?**`
      },
      {
        heading: 'Authoritative Reference Links',
        subheading: 'Official Legal & Professional Practice Resources',
        body: `• [Cornell Legal Information Institute: Contract Overview](https://www.law.cornell.edu/wex/contract) — Plain-language legal encyclopedia on formation, mutual assent, consideration, and breach remedies.
• [AIGA Standard Form of Agreement for Design Services](https://www.aiga.org/resources/aiga-standard-form-of-agreement-for-design-services) — The industry-standard modular agreement framework covering IP, scope, and liability.
• [Freelancers Union Contract Creator](https://freelancersunion.org/contract/) — Guided tool for generating protective independent freelance contracts.
• [California Civil Code §1550](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1550.&lawCode=CIV) — California statutory code defining the essential elements of an enforceable contract.`
      }
    ]
  },

  'freelance-business-operations': {
    title: 'Preview: Freelance Business Operations and Tax Structures',
    subtitle: 'Article 2 • Operational systems, entity comparison, and California startup compliance',
    pccSources: [
      'U.S. Small Business Administration (SBA)',
      'IRS Small Business and Self-Employed Tax Center',
      'California Franchise Tax Board (FTB)',
      'CalGold Business Permit System'
    ],
    sourceNote: 'A business structure is not a brand identity. It directly governs personal liability, tax treatment, operational paperwork, administrative control, and how money flows.',
    sections: [
      {
        heading: 'Start with the Operating System',
        subheading: 'Foundational Habits Before Choosing an Entity',
        body: `Before comparing legal business structures, establish disciplined operational hygiene:
• **Dedicated business bank account:** Never commingle personal and business funds.
• **Consistent invoicing system:** Standardized invoice numbers, payment terms (Net 15 / Net 30), and tracking.
• **Categorized bookkeeping:** Digital accounting (e.g., QuickBooks, Wave, or disciplined ledger) tracking every revenue stream and deductible expense.
• **Tax and contract calendar:** Hard calendar reminders for federal/state quarterly estimated taxes and contract renewal dates.
• **Signed document archive:** Centralized cloud storage containing countersigned agreements, SOWs, W-9 forms, receipts, and license documentation.`
      },
      {
        heading: 'Common Business Structures at a Glance',
        subheading: 'Comparing Liability, Tax Treatment, and Administrative Burdens',
        table: {
          headers: ['Structure', 'Basic Idea', 'Key Strength', 'Watch Out For'],
          rows: [
            ['Sole Proprietorship', 'One owner; no separate legal entity created by default.', 'Zero startup friction, minimal paperwork, direct managerial control.', 'Unlimited personal liability for debts/lawsuits; Schedule C self-employment taxes.'],
            ['Single-Member LLC', 'State-chartered legal entity; disregarded for federal income tax by default.', 'Separates personal assets from business liabilities in many claims.', 'State annual minimum franchise taxes ($800/yr in CA), filings, operating agreements; no automatic tax reduction.'],
            ['General Partnership', 'Two or more co-owners sharing profits, losses, and management.', 'Pooled capital, complementary creative skills, pass-through taxation.', 'Joint and several liability for partner actions; requires rigorous written partnership agreement.'],
            ['Corporation / S-Corp Election', 'Separate legal entity; S-Corp is an IRS tax election if qualified.', 'Potential self-employment tax optimization on distributions; formal investor appeal.', 'Mandatory payroll setup, corporate governance, strict compliance, higher CPA & legal setup expenses.']
          ]
        },
        body: `👉 **Important Distinction:**
An LLC is a legal entity created under **state law**. "S Corporation" is not a business entity type—it is a **federal tax status election** (Form 2553) filed with the IRS. An eligible LLC or corporation can elect to be taxed as an S-Corporation once profits justify payroll and administrative overhead.`
      },
      {
        heading: 'California Creative Launch Checklist',
        subheading: 'Step-by-Step State and Local Regulatory Compliance',
        body: `If launching an independent creative business in California:
1. **Choose business name & check FBN:** If doing business under a name other than your legal surname, file a Fictitious Business Name (FBN / DBA) with your county clerk.
2. **Local permits & business licenses:** Check municipal registration requirements and home-occupancy zoning via **CalGold** and your local city finance office.
3. **Obtain an EIN:** Register for a free federal Employer Identification Number with the IRS to avoid giving your personal Social Security Number on client W-9 forms.
4. **Check California Seller\'s Permit:** If selling physical tangible goods (prints, merchandise, books, physical artwork copies), register with the California Department of Tax and Fee Administration (CDTFA) to collect sales tax.
5. **Estimated tax calendar setup:** Schedule quarterly federal (IRS Form 1040-ES) and California (FTB Form 540-ES) tax payment dates.
6. **Revisit structure periodically:** Re-evaluate LLC or S-Corp election when revenue, commercial risk, subcontractor hiring, or long-term liabilities expand.`
      },
      {
        heading: 'Authoritative Reference Links',
        subheading: 'Official Federal and California Business Setup Portals',
        body: `• [U.S. SBA: Choose a Business Structure](https://www.sba.gov/counseling/launch-your-business/#business-structure) — Federal comparison of sole proprietorships, LLCs, and corporations.
• [IRS: Business Structures Overview](https://www.irs.gov/businesses/small-businesses-self-employed/business-structures) — Federal tax obligations and filing forms categorized by business type.
• [California Franchise Tax Board: Sole Proprietorship](https://www.ftb.ca.gov/file/business/types/sole-proprietorship.html) — State guidelines on income reporting and estimated tax responsibilities.
• [CalGold Business Permit System](https://www.calgold.ca.gov/) — California\'s comprehensive permit, license, and city requirement locator.
• [California CDTFA Seller\'s Permit Guide](https://taxes.ca.gov/sales-and-use-tax/sellers-permit/) — Official state threshold rules for taxable physical vs digital sales.`
      }
    ]
  },

  'drafting-agreements-and-proposals': {
    title: 'Workflow Breakdown: Drafting Client Agreements and Proposal Sheets',
    subtitle: 'Article 3 • Structuring the document stack, 8-step drafting workflow, and scope control',
    pccSources: [
      'AIGA Business & Freelance Resources',
      'AIGA Standard Form of Agreement',
      'Graphic Artists Guild Handbook',
      'Freelancers Union Contract Standards'
    ],
    sourceNote: 'The proposal sells the approach. The contract governs the legal relationship. The statement of work defines the job. The change order controls what happens when the job evolves.',
    sections: [
      {
        heading: 'The Creative Document Stack',
        subheading: 'Understanding the Purpose of Each Document in the Workflow',
        body: `A professional creative business relies on five distinct documents:
• **The Proposal:** Persuasive and project-specific. Identifies the client's core problem, details your creative strategy, outlines project phases, timeline, estimated investment, and strategic rationale.
• **Master Services Agreement (MSA):** The overarching legal contract. Contains permanent terms for ongoing relationships: payment default terms, warranties, IP assignment mechanics, confidentiality, liability limits, and termination rights.
• **Statement of Work (SOW):** Project-specific attachment. Dictates specific deliverables, specifications, milestones, exact fee, revision rounds, client dependencies, and designated usage rights.
• **Change Order:** A signed written amendment. Documents changes to scope, added fees, and schedule adjustments before work on the new scope begins.
• **Invoice:** A formal payment request referencing the agreed billing schedule in the contract. An invoice should never be the first time a client sees payment terms or late fee policies.`
      },
      {
        heading: 'Eight-Step Drafting Workflow',
        subheading: 'From Client Qualification to Signed Production Handoff',
        body: `1. **Qualify the client:** Confirm full legal entity name, designated decision-maker, procurement protocol, realistic budget range, firm deadlines, and planned usage.
2. **Write a single-sentence objective:** Define the business or communication outcome (e.g., *"Increase brand recognition and Gen-Z conversion for the Fall product rollout"*), not merely the asset.
3. **List countable deliverables:** State format, resolution, dimensions, duration, quantity, color spaces, native file types, and localization requirements.
4. **Define the production process:** Specify phases, scheduled review meetings, client feedback windows (e.g., 3 business days), revision rounds, and client asset dependencies.
5. **Price the labor and rights:** Separate production labor costs, reimbursable expenses, rush premiums, and the commercial licensing fee.
6. **State explicit exclusions:** Clarify what is excluded (copywriting, custom font licenses, stock footage, talent fees, printing costs, trademark clearances, localization).
7. **Attach reviewed legal terms:** Combine project deliverables with modular terms (IP retention until full payment, kill fees, liability caps) using an industry-standard template.
8. **Secure formal acceptance:** Collect authorized signatures, receive the non-refundable deposit or initial milestone, verify purchase order numbers if required, and establish the official kick-off date.`
      },
      {
        heading: 'Proposal Sheet Skeleton',
        subheading: 'Standardized Structure for Clean Client Pitches',
        body: `\`\`\`text
1. HEADER: Project Title | Prepared For (Client) | Prepared By (Studio) | Date | Version
2. CONTEXT & OBJECTIVE: The client's business challenge and the strategic goal
3. CREATIVE APPROACH: Recommended visual direction, mood, and technical execution
4. DELIVERABLES & EXCLUSIONS: Exact countable items + explicit list of what is excluded
5. TIMELINE & MILESTONES: Phase breakdown, client feedback windows, final delivery date
6. INVESTMENT & BILLING SCHEDULE: Deposit (e.g., 50%), milestone payments, offer expiration
7. RIGHTS & USAGE SUMMARY: Granted license dimensions (media, territory, duration)
8. ACCEPTANCE & SIGNATURE BLOCK: Countersignature lines and deposit instructions
\`\`\`

👉 **Change-Order Language to Adapt:**
*"Requests outside the approved scope will be documented in a written change order describing the revised deliverables, fee, and schedule impact. Work on the added scope begins after written client approval."*`
      },
      {
        heading: 'Quality Test Before Sending',
        subheading: 'Five Checks to Perform on Every Agreement',
        body: `• **The Stranger Test:** Could a person who missed every meeting tell exactly what is being delivered and what is excluded?
• **Client Responsibility:** Can the client clearly identify their deadline dates, required file assets, and review turn-around commitments?
• **Revision Boundaries:** Are the exact number of revision rounds and the hourly rate for out-of-scope revisions explicit?
• **Rights vs Price Alignment:** Does the rights grant accurately reflect the fee paid (e.g., limited campaign license vs buyout)?
• **Document Consistency:** Do the proposal, SOW, contract, and initial invoice match in fee, milestone dates, and project title?`
      },
      {
        heading: 'Authoritative Reference Links',
        subheading: 'Standard Contract Forms and Templates',
        body: `• [AIGA Business & Freelance Resources](https://www.aiga.org/resources/business-freelance-resources) — Professional practice guides, client negotiation toolkits, and ethical guidelines.
• [AIGA Standard Form of Agreement for Design Services](https://www.aiga.org/resources/aiga-standard-form-of-agreement-for-design-services) — Modular contract framework with customizable IP and SOW schedules.
• [Freelancers Union Contract Creator](https://freelancersunion.org/contract/) — Guided builder for customized freelance scopes and payment milestones.`
      }
    ]
  },

  'intellectual-property-guide': {
    title: 'Intellectual Property Guide: Copyrights, Trademarks, and Usage Licensing Rights',
    subtitle: 'Article 4 • Required Reading • IP fundamentals, licensing dimensions, third-party rights, and fair use',
    pccSources: [
      'U.S. Copyright Office (Title 17 U.S. Code)',
      'United States Patent and Trademark Office (USPTO)',
      'Copyright Office Circular 1 & Circular 30'
    ],
    sourceNote: 'Creative professionals are not merely selling their time. They are creating, retaining, licensing, and transferring valuable intellectual property rights.',
    sections: [
      {
        heading: 'Copyright: Protection for Original Expression',
        subheading: 'What Copyright Protects vs Ideas, Styles, and Methods',
        body: `Copyright protects **original works of authorship fixed in any tangible medium of expression**—such as illustrations, paintings, graphic designs, photographs, typography layouts, 3D models, animation, films, and written copy.

• **When protection begins:** Copyright automatically exists the moment an eligible work is created and fixed in a tangible form (e.g., saved to disk, drawn on canvas).
• **What copyright does NOT protect:** Underlying ideas, concepts, principles, raw facts, general styles, or functional methods. You cannot copyright "a painting of a cyberpunk street," but you own the specific original visual expression of that street.
• **Registration benefits:** Registration with the U.S. Copyright Office is not required for copyright to exist, but timely registration is a mandatory prerequisite to filing a federal infringement lawsuit and unlocks statutory damages and attorney's fees.`
      },
      {
        heading: 'Trademark: Protection for Source Identifiers',
        subheading: 'Logos, Names, Brand Marks, and Clearance Realities',
        body: `A **trademark** identifies and distinguishes the commercial source of goods or services. Brand names, logos, slogans, symbols, and distinct packaging trade dress function as trademarks.

• **Use in commerce:** Trademark rights arise from actual commercial use in connection with specific goods or services.
• **Designer liability warning:** A graphic designer or illustrator should **never promise or guarantee** that a created logo or name is legally clear of trademark infringement unless formal trademark search and legal clearance have been conducted by a qualified trademark attorney.`
      },
      {
        heading: 'Ownership Models: Default, Work Made for Hire, Assignment, and Licensing',
        subheading: 'Understanding the Legal Mechanics of IP Transfer',
        body: `• **Default Ownership:** The individual human creator is the initial author and exclusive copyright owner, unless modified by employment or a valid statutory agreement.
• **Work Made for Hire (WMFH):**
  - *Employees:* Work created by an employee within the scope of their employment automatically belongs to the employer as author.
  - *Independent Contractors:* Commissioned freelance work qualifies as a "work made for hire" **only** if it falls under one of 9 specific statutory categories in the Copyright Act (such as a contribution to a collective work or motion picture) **AND** is documented in an express signed written agreement. In California, signing a work-for-hire agreement with an individual freelancer can trigger statutory employee classification rules under state labor and unemployment codes.
• **Assignment (Buyout):** A complete transfer of all copyright ownership rights. Under Section 204 of the U.S. Copyright Act, an assignment of copyright **must be in a signed writing**.
• **License:** The creator retains copyright ownership and grants permission to use the work within strictly defined parameters. A license may be exclusive or non-exclusive.`
      },
      {
        heading: 'The Seven Dimensions of a Creative License',
        subheading: 'Defining Boundaries to Protect Value and Monetization',
        table: {
          headers: ['Dimension', 'Key Questions to Define', 'Standard Examples'],
          rows: [
            ['Media', 'Where will the asset be published or displayed?', 'Website, organic social, paid digital ads, broadcast TV, print packaging, billboard.'],
            ['Purpose', 'What is the commercial or editorial context?', 'Advertising, editorial article, retail product packaging, internal corporate pitch.'],
            ['Territory', 'What geographic scope is authorized?', 'Local city market, Southern California, United States, North America, Worldwide.'],
            ['Duration', 'How long may the client utilize the asset?', '6-month campaign, 1-year product cycle, 3-year term, Perpetual.'],
            ['Exclusivity', 'Can the creator license the work to other parties?', 'Non-exclusive (creator can relicense), Category-exclusive (exclusive in food/beverage), Fully exclusive.'],
            ['Modification', 'Can the client alter, crop, or create derivative works?', 'Resize and crop only, color adaptation permitted, full derivative rights granted.'],
            ['Transfer / Sublicense', 'Can third parties or parent companies use the asset?', 'Non-transferable (client entity only), Sublicensable to certified PR agencies and distributors.']
          ]
        }
      },
      {
        heading: 'Third-Party Assets, Chain of Title & Fair Use Realities',
        subheading: 'Fonts, Stock, Music, AI-Assisted Assets, and Legal Limits',
        body: `• **Chain of Title:** You can only grant rights to intellectual property that you own or have licensed. Keep license receipts, end-user license agreements (EULAs), font licenses, stock photo purchases, and signed model/property releases in your project archive.
• **Fair Use is a Legal Defense, Not a Shortcut:** Fair use is determined on a case-by-case basis under Section 107 of the Copyright Act by evaluating four statutory factors:
  1. Purpose and character of the use (commercial vs nonprofit educational / transformative).
  2. Nature of the copyrighted work.
  3. Amount and substantiality of the portion used.
  4. Effect of the use upon the potential market or value of the original work.
  *Myth:* Giving credit, using less than 10 seconds, adding a filter, or calling a commercial campaign "tribute art" does **not** create automatic fair use protection.
• **Portfolio Rights:** Always reserve express contractual permission to display completed work, sketches, and case studies in your professional portfolio, website, awards entries, and social self-promotion.`
      },
      {
        heading: 'Authoritative Reference Links',
        subheading: 'Official Copyright & Trademark Portals',
        body: `• [U.S. Copyright Office: What Is Copyright?](https://www.copyright.gov/what-is-copyright/) — Official foundation on copyrightable subject matter and statutory rights.
• [U.S. Copyright Office: Visual Artists Guide](https://www.copyright.gov/engage/visual-artists/) — Guidelines tailored for illustrators, designers, and visual creatives.
• [Copyright Office Circular 1: Basics of Copyright](https://www.copyright.gov/circs/circ01.pdf) — Comprehensive circular on ownership, registration, and transfers.
• [Copyright Office Circular 30: Works Made for Hire](https://www.copyright.gov/circs/circ30.pdf) — Official analysis of employee vs independent contractor rules.
• [U.S. Copyright Office Fair Use Index](https://www.copyright.gov/fair-use/) — Searchable database of court decisions and the 4-factor statutory framework.
• [USPTO: Trademark Basics](https://www.uspto.gov/trademarks/basics/what-trademark) — Federal guidance on mark distinctiveness, commercial use, and registration.`
      }
    ]
  },

  'pricing-your-work-and-project-scoping': {
    title: 'Pricing Your Work and Scoping the Project',
    subtitle: 'Article 5 • Studio Workshop • Calculating hourly floors, project pricing models, and managing scope creep',
    pccSources: [
      'Graphic Artists Guild Handbook: Pricing & Ethical Guidelines',
      'AIGA Freelance & Professional Practice Resources',
      'U.S. Small Business Administration Startup Cost Calculator'
    ],
    sourceNote: 'Price is a fundamental design decision: it must sustain your business, reflect commercial value, cover project risk, and account for the scope of usage rights.',
    sections: [
      {
        heading: 'Build a Sustainable Internal Hourly Floor',
        subheading: 'Why Your Hourly Floor is Not Your Take-Home Wage',
        body: `A freelancer's internal hourly floor is not the hourly wage they spend on personal living expenses. It must cover personal compensation, self-employment taxes, healthcare, business overhead, equipment amortization, non-billable administrative hours, and profit reserves.

\`\`\`text
Internal Hourly Floor = (Target Owner Comp + Annual Overhead + Tax/Benefit Reserve + Desired Profit)
                         ─────────────────────────────────────────────────────────────────────────────
                                            Realistic Annual Billable Hours
\`\`\`

• **Realistic Billable Hours:** In a 40-hour workweek (~2,000 hours/year), a freelancer typically spends only **50% to 65%** of their time on billable client production (approx. 1,000–1,200 billable hours/year). The remainder is consumed by marketing, proposals, bookkeeping, client meetings, professional development, and administrative maintenance.`
      },
      {
        heading: 'The Comprehensive Project-Fee Model',
        subheading: 'Combining Production Labor, Expenses, Usage Value, and Contingency',
        body: `When quoting a fixed project fee, build your price systematically:

\`\`\`text
Total Project Fee = (Estimated Production Hours × Internal Hourly Floor)
                  + Outside Expenses (Stock, Fonts, Fabrication, Talent)
                  + Usage / Commercial Licensing Value
                  + Risk & Complexity Contingency (10%–25%)
\`\`\`

• **Contingency:** Apply a 10%–25% contingency buffer when scope uncertainty, tight turnaround, technical risks, or multi-tiered approvals exist.`
      },
      {
        heading: 'Scope Before Price: The 8-Point Scoping Matrix',
        subheading: 'Mapping Requirements Before Estimating Numbers',
        body: `1. **Objective & Audience:** What measurable business outcome must occur because this work exists?
2. **Deliverables:** Exact deliverable count, dimensions, formats, aspect ratios, color spaces, and variants.
3. **Inputs & Client Dependencies:** What copy, style guides, photography, CAD models, and brand assets will the client provide, and by when?
4. **Process & Rounds:** Discovery, mood boards, concept iterations, round limits, and sign-off meetings.
5. **Schedule & Turnaround:** Phased milestone dates, review deadlines, and rush penalties.
6. **Rights & Usage:** Media channels, geographic territory, campaign duration, and exclusivity.
7. **Delivery Risk:** Technical complexity, multiple corporate stakeholders, tight deadlines, or unrefined client briefs.
8. **Exclusions:** Explicitly enumerate items not covered (paid media budgets, font licensing fees, printing costs, sound engineering, translation).`
      },
      {
        heading: 'Pricing Models & When to Use Them',
        subheading: 'Selecting the Right Model for the Project Nature',
        table: {
          headers: ['Model', 'Best Application', 'Strategic Advantage', 'Risk / Watch Out'],
          rows: [
            ['Hourly Rate', 'Unclear scope, consulting, advisory sessions, iterative brainstorming.', 'Guarantees compensation for all working time.', 'Penalizes speed and efficiency; client watches the clock.'],
            ['Fixed Project Fee', 'Clearly scoped deliverables, standardized creative pipelines.', 'Rewards efficiency and mastery; transparent for client budgets.', 'Vulnerable to scope creep without strict change orders.'],
            ['Day Rate', 'On-site photoshoots, intensive workshops, multi-day production blocks.', 'Predictable daily income with simple scheduling boundaries.', 'Client may attempt to squeeze excessive tasks into a single day.'],
            ['Retainer', 'Ongoing creative support, monthly marketing asset production.', 'Predictable recurring cash flow; guaranteed client capacity.', 'Requires strict monthly hour caps and rollover policies.'],
            ['Value / Licensing Fee', 'High-impact commercial campaigns, national branding, merchandise.', 'Decouples compensation from time spent; scales with commercial impact.', 'Requires deep understanding of client business metrics and market reach.']
          ]
        }
      },
      {
        heading: 'Scope-Creep Response Script & Pricing Exercise',
        subheading: 'Professional Boundaries and Practical Execution',
        body: `When a client asks for additional rounds, extra assets, or alternative formats beyond the signed SOW:

👉 **The Professional Script:**
> *"That is a fantastic addition and it sits outside our approved scope of work. I can prepare a written change order showing the revised deliverables, fee adjustment, and timeline impact before we begin production on it."*

**Studio Pricing Exercise:**
Choose one campaign deliverable. Estimate the production hours by phase, calculate the internal floor cost, add outside expenses, establish the usage rights grant, and apply a 10%–20% contingency. Compare your calculated price against the client's commercial value and market positioning.`
      },
      {
        heading: 'Authoritative Reference Links',
        subheading: 'Industry Pricing & Financial Calculators',
        body: `• [Graphic Artists Guild Handbook: Pricing & Ethical Guidelines](https://graphicartistsguild.org/the-graphic-artists-guild-handbook-pricing-ethical-guidelines/) — The premier industry benchmark for illustration, graphic design, and animation pricing.
• [AIGA Freelance & Pricing Resources](https://www.aiga.org/freelance-resources) — Financial planning, pricing strategies, and contract guides for independent creatives.
• [U.S. SBA: Calculate Startup and Operating Costs](https://www.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs) — Worksheets for modeling ongoing business overhead and reserve requirements.`
      }
    ]
  },

  'contracts-and-ip-negotiating-rights': {
    title: 'Contracts and Intellectual Property: Negotiating the Rights',
    subtitle: 'Article 6 • Studio Deep Dive • Rights positions, working files vs finals, and the rights negotiation framework',
    pccSources: [
      'U.S. Copyright Office Title 17 Chapter 2',
      'U.S. Copyright Office Recordation System',
      'AIGA Intellectual Property Standards'
    ],
    sourceNote: '"The client needs the work" does not automatically mean "the client needs every right forever." Match the rights grant directly to the client\'s genuine business application.',
    sections: [
      {
        heading: 'Three Primary Rights Positions',
        subheading: 'From Limited Permission to Full Buyouts',
        body: `• **1. Limited Non-Exclusive License:**
  The creator retains full copyright ownership and grants permission to use the artwork within strictly bounded parameters (e.g., website and social media usage in North America for 12 months). Standard for editorial illustration, photography, key art, and modular design components.
• **2. Category-Exclusive License:**
  The client receives exclusive usage within their specific industry sector or geographic region for a defined term (e.g., exclusive within the beverage category in the US for 2 years). Exclusivity must carry a pricing premium because it bars the creator from accepting similar commissions from industry competitors.
• **3. Full Assignment / Complete Buyout:**
  The creator transfers entire copyright ownership to the client upon receipt of full payment. Standard for corporate logos and core brand identity marks. Assignments should command top-tier pricing, explicitly exclude pre-existing creator tools/brushes, and mandate creator portfolio rights.`
      },
      {
        heading: 'Separating Final Deliverables from Working Materials',
        subheading: 'Protecting Source Files, Toolkits, and Layered Assets',
        body: `A standard creative contract should clearly distinguish between **final deliverables** (exported flattened TIFFs, SVGs, MP4s, PDFs) and **working source assets** (layered PSDs, Blender project scenes, vector source files, proprietary brushes, custom scripts, preliminary concept sketches).

• If a client demands native source files, define the delivery specifications, charge an additional source-file release fee, and stipulate whether the client receives modification rights or strictly archival storage access.`
      },
      {
        heading: 'The 8 Rights Negotiation Questions',
        subheading: 'Framework for Establishing Commercial Value',
        body: `1. What exact business application does the client require today?
2. Could the usage expand in the future to paid media, retail merchandise, broadcast, or global markets?
3. Does the client require competitive exclusivity or simply reliable permission?
4. Will third-party agencies, distributors, or corporate affiliates need access to the work?
5. Is the client allowed to modify the artwork, create derivative works, or train generative AI models with it?
6. When do rights legally vest—upon creation, upon milestone approval, or only upon receipt of payment in full?
7. Which creator tools, custom brushes, and pre-existing libraries must remain outside the transfer?
8. Does the creator retain unequivocal rights to showcase the work for portfolios, competitions, and self-promotion?`
      },
      {
        heading: 'Case Study: The Restaurant Poster Expansion',
        subheading: 'Analyzing Scope and Rights Expansion in Practice',
        scenarioType: 'dialogue',
        dialogue: [
          { speaker: 'Restaurant Owner', role: 'client', text: 'We loved the seasonal menu poster illustration you created for our local Pasadena location. We\'re opening 20 franchise locations nationwide and want to put the illustration on permanent packaging, staff t-shirts, billboards, and our national TV spot.' },
          { speaker: 'Illustrator', role: 'designer', text: 'Congratulations on the nationwide expansion! Our original agreement covered local event poster display. Because national retail packaging, apparel merchandising, and broadcast media represent significantly broader commercial value and territory, I\'ll draft a licensing expansion schedule detailing the tiered usage fees for national and merchandising rights.' }
        ],
        body: `👉 **Negotiation Principle:**
Broader rights and higher commercial exposure warrant proportional compensation. When a client's business usage expands, revisit the licensing schedule rather than surrendering all rights under the original local fee.`
      },
      {
        heading: 'Authoritative Reference Links',
        subheading: 'Statutory Ownership and Transfer Registries',
        body: `• [U.S. Copyright Office: Copyright Ownership and Transfer (Title 17 Chapter 2)](https://www.copyright.gov/title17/92chap2.html) — Statutory regulations governing copyright transfers and licensing.
• [U.S. Copyright Office: Document Recordation](https://www.copyright.gov/recordation/) — Official federal system for recording transfers of copyright ownership and exclusive licenses.
• [AIGA Standard Form of Agreement: IP Guidelines](https://www.aiga.org/resources/aiga-standard-form-of-agreement-for-design-services) — Industry-vetted intellectual property schedules.`
      }
    ]
  },

  'client-communication-and-relationship-skills': {
    title: 'Client Communication and Relationship Skills',
    subtitle: 'Article 7 • Studio Workshop • Professional dialogue systems, feedback translation, and documentation habits',
    pccSources: [
      'AIGA Professional Practice Standards',
      'SCORE Small Business Mentoring / SBA',
      'Industry Studio Art Direction Frameworks'
    ],
    sourceNote: 'Professional communication is not 24/7 availability. It is a reliable, predictable system for decision-making, consolidated feedback, expectation management, and documentation.',
    sections: [
      {
        heading: 'Establish the Communication Agreement at Kickoff',
        subheading: 'Six Operational Ground Rules to Prevent Project Friction',
        body: `1. **Designate a single client decision-maker:** Identify one primary point of contact authorized to give binding approvals.
2. **Standardize official communication channels:** Establish which platform is used for formal decisions and files (email / project portal), rather than scattered SMS or DM threads.
3. **Set clear response windows & business hours:** Communicate turnaround expectations (e.g., *"Emails responded to within 1 business day; client review windows are 3 business days"*).
4. **Mandate consolidated client feedback:** Require the client team to resolve internal disagreements and submit one unified, synthesized set of notes.
5. **Restate milestone dates & late-input impacts:** Clearly explain that if client feedback or assets are delayed by 3 days, the final project milestone shifts accordingly.
6. **Define written approval protocols:** Establish that approvals must be documented in writing (email or signature) to trigger subsequent production phases.`
      },
      {
        heading: 'Turning Subjective Feedback Into an Actionable Brief',
        subheading: 'Diagnosing Vague Client Comments ("Make It Pop", "More Premium")',
        body: `When a client offers vague or subjective feedback like *"Can you make it pop?"* or *"It doesn't feel premium enough,"* do not argue with the phrase. **Diagnose the underlying design problem.**

Translate subjective taste into objective design criteria:
• **"Make it pop"** → Clarify contrast, color saturation, typographic hierarchy, scale differentiation, or negative space.
• **"Make it look more premium"** → Explore refined typography, restrained color palettes, generous margins, elevated photography, or subtle texture.
• **"It feels too busy"** → Remove secondary visual noise, strengthen the focal point, or simplify the grid layout.`
      },
      {
        heading: 'The Five-Point Feedback Framework',
        subheading: 'Structure for Converting Client Opinions into Design Actions',
        body: `• **1. Goal:** What should the audience understand, feel, or do at this specific touchpoint?
• **2. Evidence:** What specific element in the current composition is failing to support that goal?
• **3. Priority:** Is this feedback **Required** (blocks assignment criteria), **Recommended** (meaningfully improves clarity), or **Exploratory** (test if time permits)?
• **4. Owner:** Who holds the final decision if client stakeholders disagree?
• **5. Impact:** Does this revision request alter the agreed scope, fee, licensing rights, or delivery schedule?`
      },
      {
        heading: 'Three Professional Client Communication Scripts',
        subheading: 'Scripted Scenarios for Delicate Client Conversations',
        scenarioType: 'dialogue',
        dialogue: [
          { speaker: 'Script 1: Clarifying Vague Notes', role: 'designer', text: 'When you say "make it feel more premium," which specific element should we adjust first—the typography hierarchy, color palette, image styling, or layout breathing room? Do you have an industry reference that captures the tone you want?' },
          { speaker: 'Script 2: Resolving Conflicting Feedback', role: 'designer', text: 'I received two different notes from your team: one direction emphasizes energetic, playful motion, while the other prioritizes corporate institutional trust. Which objective should lead for this launch? Once confirmed, I will align the revision with that primary criterion.' },
          { speaker: 'Script 3: Managing Late Client Assets', role: 'designer', text: 'The brand copy and product photography arrived three business days after our agreed kickoff date. To preserve the original launch deadline, we can compress the final review window, or we can adjust the final handoff date to August 28th. Which option would you prefer to approve?' }
        ],
        body: `👉 **Protect the Relationship Through Post-Meeting Written Recaps:**
Immediately after any client meeting or video call, send a concise written email recap:
• Key decisions made
• Confirmed action items and owners
• Open questions and deadlines
• Any identified scope adjustments
This creates alignment, prevents conflicting memories, and builds long-term professional trust.`
      },
      {
        heading: 'Authoritative Reference Links',
        subheading: 'Mentoring & Studio Communication Guides',
        body: `• [AIGA Professional Practice Standards](https://www.aiga.org/resources/business-freelance-resources) — Guidelines on client relationships, ethics, and communications.
• [SCORE: Small Business Mentoring](https://www.score.org/find-mentor) — Free mentorship network supported by the U.S. Small Business Administration for independent entrepreneurs.`
      }
    ]
  },

  'tax-basics-for-creative-sole-proprietors': {
    title: 'Taxes Basics for Creative Sole Proprietors',
    subtitle: 'Article 8 • Studio Workshop • Federal Schedule C, self-employment tax, quarterly estimates, and California state compliance',
    pccSources: [
      'IRS Small Business and Self-Employed Tax Center',
      'IRS Publication 583 (Starting a Business and Keeping Records)',
      'California Franchise Tax Board (FTB)',
      'California Small Business Assistance Center'
    ],
    sourceNote: 'Taxes become manageable when every invoice, deposit, and business expense is captured in a disciplined system. Do not wait for a 1099 form to discover your tax liability.',
    sections: [
      {
        heading: 'The Basic Federal Tax Picture',
        subheading: 'Schedule C, Form 1040, and Self-Employment Tax (Schedule SE)',
        body: `As a creative sole proprietor (or single-member LLC disregarded entity), business income and expenses are reported on **IRS Schedule C** (Form 1040).

• **Gross Business Income:** Total payments received from clients, royalties, retainers, and platforms. You must report all business income, even if a client did not issue a Form 1099-NEC or 1099-K.
• **Net Profit / Loss:** Gross income minus allowable deductible business expenses.
• **Self-Employment Tax (Schedule SE):** Covers Social Security (12.4%) and Medicare (2.9%) taxes (totaling 15.3% on net earnings). Because an employer is not withholding these taxes, the sole proprietor pays both the employer and employee portions.`
      },
      {
        heading: 'Quarterly Estimated Taxes',
        subheading: 'Federal Form 1040-ES and California Form 540-ES Schedules',
        body: `The U.S. tax system is pay-as-you-go. If you expect to owe $1,000 or more in federal tax for the year, you are generally required to make four quarterly estimated tax payments using **Form 1040-ES**.

**2026 Federal & California Estimated Tax Due Dates:**
• **Q1 Payment:** April 15, 2026
• **Q2 Payment:** June 15, 2026
• **Q3 Payment:** September 15, 2026
• **Q4 Payment:** January 15, 2027

*Best Practice:* Transfer **25% to 35%** of every gross client payment into a dedicated tax savings account immediately upon deposit.`
      },
      {
        heading: 'Recordkeeping Categories for Creative Work',
        subheading: 'Tracking Deductible Expenses to Reduce Taxable Income',
        body: `• **Direct Project Costs:** Stock photography, font licenses, music tracks, 3D asset downloads, outsourced subcontractors, printing, studio rental, and fabrication.
• **Operating Overhead:** Adobe Creative Cloud subscriptions, 3D/audio software licenses, cloud storage (Dropbox/Google Drive), portfolio website hosting, professional insurance, legal/accounting fees, and office supplies.
• **Mixed-Use Expenses:** Home office deduction (dedicated workspace used regularly and exclusively for business), business percentage of internet and mobile phone, business travel, and client meals (subject to IRS percentage limitations and receipt requirements).
• **Capital Equipment & Assets:** Computers, drawing tablets, cameras, monitors, and studio furniture (deductible via Section 179 expensing, bonus depreciation, or multi-year depreciation schedules).`
      },
      {
        heading: 'The Simple 6-Step Monthly Bookkeeping Close',
        subheading: 'Maintaining Financial Health in Under 60 Minutes a Month',
        body: `1. **Reconcile bank & payment accounts:** Match bank statement transactions against accounting records.
2. **Attach receipts & categorize expenses:** Ensure every deduction is backed by a digital receipt and business purpose note.
3. **Review accounts receivable:** Track outstanding invoices, follow up on overdue payments, and log incoming client deposits.
4. **Transfer tax reserves:** Move the calculated tax percentage into your separate business tax reserve savings account.
5. **Update year-to-date profit & loss:** Review net profit trajectory to project upcoming quarterly estimated tax obligations.
6. **Back up digital archives:** Back up all countersigned contracts, invoices, 1099s, and expense receipts to redundant secure storage.`
      },
      {
        heading: 'California State Tax Considerations',
        subheading: 'FTB Form 540, CDTFA Seller\'s Permits, and Local Compliance',
        body: `• **California Income Tax:** Report net sole proprietorship income on California Form 540 and pay quarterly state estimated taxes via **Form 540-ES**.
• **California Seller\'s Permit & Sales Tax:** If selling physical tangible goods in California (e.g., art prints, printed books, apparel, merchandise), you must obtain a seller\'s permit from the **California Department of Tax and Fee Administration (CDTFA)** and collect local sales tax. Purely digital delivered services (e.g., emailing a finalized PNG illustration or PDF) are generally not subject to California sales tax, but mixed physical/digital deliverables require careful invoicing.
• **When to Consult a Professional CPA:** Seek certified tax assistance when forming an LLC/S-Corp, hiring W-2 employees or 1099 contractors, working across multiple states, or managing complex equipment depreciation.`
      },
      {
        heading: 'Authoritative Reference Links',
        subheading: 'Official IRS and California Tax Portals',
        body: `• [IRS: Self-Employed Individuals Tax Center](https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center) — Federal gateway for independent contractors and sole proprietors.
• [IRS: Estimated Taxes Guide (Form 1040-ES)](https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes) — Calculation worksheets and safe-harbor payment thresholds.
• [IRS Publication 583](https://www.irs.gov/publications/p583) — Starting a business and maintaining required financial records.
• [IRS: Business Use of Your Home (Topic 509)](https://www.irs.gov/taxtopics/tc509) — Simplified vs regular home office deduction rules.
• [California Franchise Tax Board: Self-Employed](https://www.ftb.ca.gov/file/personal/filing-situations/self-employed.html) — California state personal income and business tax rules.
• [California FTB: Estimated Tax Payments (Form 540-ES)](https://www.ftb.ca.gov/pay/estimated-tax-payments.html) — California estimated payment instructions.
• [California Small Business Assistance Center](https://taxes.ca.gov/small-business-assistance-center/) — Cross-agency state tax, licensing, and compliance routing.`
      }
    ]
  },

  'refine-campaign-assets-peer-feedback': {
    title: '🛠️ Task: Refine Campaign Assets & Apply Peer Feedback',
    subtitle: 'Studio Worksheet • Saturday Workshop • Converting Week 8 pitch rehearsal critiques into controlled design iterations',
    pccSources: [
      'Studio Critique & Peer Review Methodology',
      'Campaign Asset System Standards',
      'Art Direction Revision Framework'
    ],
    sourceNote: 'Use this studio worksheet to convert your Week 8 pitch-rehearsal peer critiques into a disciplined, strategic revision plan—not a random collection of disconnected edits.',
    sections: [
      {
        heading: 'Step 1 — Reconnect to the Core Communication Goal',
        subheading: 'Anchor Every Asset in Audience and Action',
        body: `Before opening Photoshop, Illustrator, or InDesign, write your single-sentence campaign objective:

> *"For [Target Audience], this campaign should communicate [Core Value / Message] and motivate [Specific Desired Action / Response]."*

Ensure that every subsequent revision decision directly serves this statement.`
      },
      {
        heading: 'Step 2 — Sort the Feedback Matrix',
        subheading: 'Categorizing Critique Notes by Priority and Rationale',
        table: {
          headers: ['Feedback Note', 'Evidence / Source', 'Priority Level', 'Planned Action or Rationale'],
          rows: [
            ['Hero logo lacks clear space against high-contrast background.', 'Critique review; visual hierarchy breakdown at mobile thumbnail scale.', 'Required', 'Add subtle background vignette / scrim and enforce minimum clear-space margin.'],
            ['Call-to-action typography feels too delicate at small viewport sizes.', 'Peer review; legibility dropped below 300px width.', 'Required', 'Increase weight from Regular to Bold and increase tracking slightly for mobile asset.'],
            ['Explore warm monochromatic color palette for the secondary print poster.', 'Instructor suggestion during pitch rehearsal.', 'Recommended', 'Develop controlled Iteration B testing warm earthy duotone vs original triadic scheme.'],
            ['Consider adding decorative background geometric shapes behind character.', 'Peer comment.', 'Exploratory', 'Declined to preserve negative space and avoid cluttering core narrative focal point.']
          ]
        },
        body: `**Priority Classification Key:**
• **Required:** Directly blocks visual comprehension, assignment criteria, legibility, or brand hierarchy.
• **Recommended:** Meaningfully strengthens communication clarity, aesthetic polish, and emotional resonance.
• **Exploratory:** Subjective aesthetic ideas to test only if time permits.`
      },
      {
        heading: 'Step 3 — Protect the System Across Asset Formats',
        subheading: 'Maintaining Visual Cohesion in Multi-Asset Campaigns',
        body: `• **System Consistency:** Ensure that color palettes, typography scale ratios, illustration style, and logo lockups remain cohesive across posters, web banners, and pitch slides.
• **Output Standards:** Check safe areas, bleed margins (0.125 in for print), CMYK vs RGB color profiles, and minimum 300 DPI resolution.
• **Chain of Title Check:** Verify that all typefaces, textures, stock assets, and audio cues are properly licensed or original.
• **Universal System Updates:** Apply approved fixes across the entire asset family—do not repair only the single slide where the critique occurred.`
      },
      {
        heading: 'Step 4 — Produce Two Controlled Iterations',
        subheading: 'Structured Iteration A vs Iteration B Comparisons',
        body: `• **Iteration A (Direct Clarity Fix):** Directly resolves the highest-priority visual hierarchy, contrast, or legibility issues identified during rehearsals.
• **Iteration B (Strategic Alternative):** Tests one controlled creative hypothesis (e.g., alternative crop, bold typography scale, or restrained color grading).
• *Rule:* Change only one major variable at a time so the side-by-side comparison is clear and actionable.`
      },
      {
        heading: 'Step 5 — Final Critique Checklist & Deliverables',
        subheading: 'Verification Before the Next Critique',
        body: `• [ ] Can a viewer identify the brand mark, core message, and call to action within 3 seconds?
• [ ] Does the visual hierarchy hold up at thumbnail/mobile screen size?
• [ ] Are all assets recognizably part of the same campaign family without looking identical?
• [ ] Did the revision solve an underlying communication problem rather than merely adding superficial decoration?
• [ ] Can you articulate why specific peer feedback was incorporated and why other suggestions were declined?
• [ ] Are final files exported, organized in standard folder structures, and ready for showcase presentation?

**Session Deliverable (Saturday, August 22nd):**
• **Practice Pitch:** Be prepared to deliver a practice pitch of your project on August 22.
• **Asset Suite:** Bring your revised campaign asset suite, a concise before/after comparison slide, and a 3-sentence revision rationale to the critique circle.`
      }
    ]
  }
};

// ─── Master Resource Links Directory ──────────────────────────────────────────
export const masterResourceLinks = [
  {
    category: 'Contracts and Freelance Agreements',
    description: 'Foundations of contract enforceability, standard modular agreements, and statutory protections.',
    links: [
      { name: 'Cornell Legal Information Institute — Contract', url: 'https://www.law.cornell.edu/wex/contract' },
      { name: 'AIGA Standard Form of Agreement for Design Services', url: 'https://www.aiga.org/resources/aiga-standard-form-of-agreement-for-design-services' },
      { name: 'Freelancers Union Contract Creator', url: 'https://freelancersunion.org/contract/' },
      { name: 'California Civil Code §1550 (Statutory Elements of a Contract)', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1550.&lawCode=CIV' },
      { name: 'AIGA Business and Freelance Resources', url: 'https://www.aiga.org/resources/business-freelance-resources' },
      { name: 'AIGA Freelance Resources', url: 'https://www.aiga.org/freelance-resources' },
    ]
  },
  {
    category: 'Business Setup and Operations',
    description: 'Entity comparison, state permit routing, and startup financial modeling.',
    links: [
      { name: 'SBA — Launch Your Business and Choose a Structure', url: 'https://www.sba.gov/counseling/launch-your-business/#business-structure' },
      { name: 'IRS — Business Structures Overview', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/business-structures' },
      { name: 'California FTB — Sole Proprietorship Filing Guide', url: 'https://www.ftb.ca.gov/file/business/types/sole-proprietorship.html' },
      { name: 'California CalGold Permit Finder', url: 'https://www.calgold.ca.gov/' },
      { name: 'California Seller’s Permit (CDTFA)', url: 'https://taxes.ca.gov/sales-and-use-tax/sellers-permit/' },
      { name: 'SBA — Calculate Startup Costs', url: 'https://www.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs' },
      { name: 'SCORE — Find a Free Small Business Mentor', url: 'https://www.score.org/find-mentor' },
    ]
  },
  {
    category: 'Copyright and Intellectual Property',
    description: 'Federal copyright statutes, registration, circulars, and fair use guidelines.',
    links: [
      { name: 'U.S. Copyright Office — Main Portal', url: 'https://www.copyright.gov/' },
      { name: 'What Is Copyright? (Official Introduction)', url: 'https://www.copyright.gov/what-is-copyright/' },
      { name: 'Copyright Guidance for Visual Artists', url: 'https://www.copyright.gov/engage/visual-artists/' },
      { name: 'Copyright Office Circular 1 — Copyright Basics', url: 'https://www.copyright.gov/circs/circ01.pdf' },
      { name: 'Copyright Office Circular 30 — Works Made for Hire', url: 'https://www.copyright.gov/circs/circ30.pdf' },
      { name: 'Copyright Office Fair Use Index', url: 'https://www.copyright.gov/fair-use/' },
      { name: 'Copyright Ownership and Transfer (Title 17 Chapter 2)', url: 'https://www.copyright.gov/title17/92chap2.html' },
      { name: 'Copyright Office Document Recordation System', url: 'https://www.copyright.gov/recordation/' },
    ]
  },
  {
    category: 'Trademarks',
    description: 'Source identifier basics, commercial use thresholds, and clearance checks.',
    links: [
      { name: 'USPTO — Trademark Basics', url: 'https://www.uspto.gov/trademarks/basics' },
      { name: 'USPTO — What Is a Trademark?', url: 'https://www.uspto.gov/trademarks/basics/what-trademark' },
      { name: 'USPTO — Trademark, Patent, or Copyright? (Comparison Guide)', url: 'https://www.uspto.gov/trademarks/basics/trademark-patent-copyright' },
    ]
  },
  {
    category: 'Pricing and Professional Practice',
    description: 'Industry benchmark pricing, rate calculation formulas, and ethical standards.',
    links: [
      { name: 'Graphic Artists Guild Handbook: Pricing & Ethical Guidelines', url: 'https://graphicartistsguild.org/the-graphic-artists-guild-handbook-pricing-ethical-guidelines/' },
      { name: 'Graphic Artists Guild Tools and Resources', url: 'https://graphicartistsguild.org/resources/' },
      { name: 'AIGA Freelance Resources', url: 'https://www.aiga.org/freelance-resources' },
      { name: 'AIGA Business and Freelance Resources', url: 'https://www.aiga.org/resources/business-freelance-resources' },
    ]
  },
  {
    category: 'Federal Tax Resources',
    description: 'Schedule C, Schedule SE self-employment tax, 1040-ES quarterly estimates, and home office deductions.',
    links: [
      { name: 'IRS — Self-Employed Individuals Tax Center', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center' },
      { name: 'IRS — Estimated Taxes (Form 1040-ES)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes' },
      { name: 'IRS Publication 583 — Starting a Business and Keeping Records', url: 'https://www.irs.gov/publications/p583' },
      { name: 'IRS — Business Use of Your Home (Topic 509)', url: 'https://www.irs.gov/taxtopics/tc509' },
      { name: 'IRS — Small Business and Self-Employed Tax Center', url: 'https://www.irs.gov/businesses/small-businesses-self-employed' },
    ]
  },
  {
    category: 'California Tax Resources',
    description: 'California FTB Form 540, Form 540-ES estimated payments, and CDTFA seller permits.',
    links: [
      { name: 'California FTB — Self-Employed Individuals', url: 'https://www.ftb.ca.gov/file/personal/filing-situations/self-employed.html' },
      { name: 'California FTB — Estimated Tax Payments (Form 540-ES)', url: 'https://www.ftb.ca.gov/pay/estimated-tax-payments.html' },
      { name: 'California FTB — Sole Proprietorship Overview', url: 'https://www.ftb.ca.gov/file/business/types/sole-proprietorship.html' },
      { name: 'California Small Business Assistance Center', url: 'https://taxes.ca.gov/small-business-assistance-center/' },
      { name: 'California Franchise Tax Board (Main Portal)', url: 'https://www.ftb.ca.gov/' },
      { name: 'California Tax Service Center', url: 'https://taxes.ca.gov/' },
      { name: 'California Seller’s Permit (CDTFA)', url: 'https://taxes.ca.gov/sales-and-use-tax/sellers-permit/' },
    ]
  }
];
