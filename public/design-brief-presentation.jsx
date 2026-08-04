import React, { useState, useEffect, useCallback } from "react";

/* ————————————————————————————————————————————————
   ANATOMY OF A PROFESSIONAL DESIGN BRIEF
   Slide presentation · Capstone client-simulation assignment
   Aesthetic: production job-ticket / manila folder / stamped paperwork
   ———————————————————————————————————————————————— */

const T = {
  paper: "#F2EBD8",
  paperDark: "#E6DCC0",
  ink: "#1F1B16",
  red: "#C43B2A",
  blue: "#2B4C9B",
  pencil: "#8B8272",
  line: "#C9BD9E",
};

const fontCSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&display=swap');
.db-display { font-family: 'Archivo Black', sans-serif; }
.db-body { font-family: 'Space Grotesk', sans-serif; }
.db-mono { font-family: 'IBM Plex Mono', monospace; }
@keyframes stampIn { 0% { transform: rotate(-8deg) scale(2.2); opacity: 0; } 60% { transform: rotate(-8deg) scale(0.95); opacity: 1; } 100% { transform: rotate(-8deg) scale(1); opacity: 1; } }
@keyframes slideUp { from { transform: translateY(14px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.db-anim { animation: slideUp .45s ease both; }
.db-stamp { animation: stampIn .5s cubic-bezier(.2,.9,.3,1.2) both; animation-delay: .35s; }
@media (prefers-reduced-motion: reduce) { .db-anim, .db-stamp { animation: none; opacity: 1; transform: rotate(-8deg); } .db-anim { transform: none; } }
`;

/* ——— small building blocks ——— */

const Eyebrow = ({ children, color = T.red }) => (
  <div className="db-mono" style={{ color, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 12 }}>
    {children}
  </div>
);

const SectionNum = ({ n }) => (
  <span
    className="db-mono"
    style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      minWidth: 38, height: 28, padding: "0 7px", marginRight: 12,
      border: `1.5px solid ${T.ink}`, fontSize: 14, fontWeight: 700,
      background: T.paper, boxShadow: `2px 2px 0 ${T.ink}`,
    }}
  >
    {n}
  </span>
);

const Prompt = ({ children }) => (
  <div
    className="db-mono"
    style={{
      borderLeft: `3px solid ${T.blue}`, background: "rgba(43,76,155,0.06)",
      padding: "10px 14px", fontSize: 13, lineHeight: 1.6, color: T.ink, fontStyle: "italic",
    }}
  >
    <span style={{ color: T.blue, fontStyle: "normal", fontWeight: 500 }}>FILL-IN&nbsp;→&nbsp;</span>
    {children}
  </div>
);

const H = ({ children, size = 44 }) => (
  <h2 className="db-display" style={{ fontSize: size, lineHeight: 1.05, color: T.ink, margin: "0 0 18px 0", textTransform: "uppercase" }}>
    {children}
  </h2>
);

const P = ({ children, dim }) => (
  <p className="db-body" style={{ fontSize: 16, lineHeight: 1.65, color: dim ? T.pencil : T.ink, margin: "0 0 14px 0", maxWidth: 720 }}>
    {children}
  </p>
);

const Tag = ({ children, color = T.ink }) => (
  <span
    className="db-mono"
    style={{
      display: "inline-block", border: `1.5px solid ${color}`, color,
      padding: "4px 10px", fontSize: 12, margin: "0 8px 8px 0", background: T.paper,
    }}
  >
    {children}
  </span>
);

const TwoCol = ({ left, right }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="db-twocol">
    <div>{left}</div>
    <div>{right}</div>
  </div>
);

const Card = ({ title, color = T.ink, children }) => (
  <div style={{ border: `1.5px solid ${T.ink}`, background: "#FBF7EA", boxShadow: `3px 3px 0 ${T.ink}` }}>
    <div className="db-mono" style={{ background: color, color: T.paper, fontSize: 16, fontWeight: 700, letterSpacing: "0.16em", padding: "9px 14px", textTransform: "uppercase" }}>
      {title}
    </div>
    <div style={{ padding: "14px 16px" }}>{children}</div>
  </div>
);

const Li = ({ children }) => (
  <li className="db-body" style={{ fontSize: 15, lineHeight: 1.55, color: T.ink, marginBottom: 6 }}>{children}</li>
);

const Ul = ({ children }) => <ul style={{ margin: 0, paddingLeft: 20 }}>{children}</ul>;

/* ——— slides ——— */

const slides = [
  /* 00 — COVER */
  {
    tab: "Cover",
    render: () => (
      <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow>Capstone Assignment · The Client Simulation</Eyebrow>
        <h1 className="db-display" style={{ fontSize: "clamp(44px, 7vw, 84px)", lineHeight: 0.98, color: T.ink, margin: 0, textTransform: "uppercase" }}>
          Anatomy of a<br />Professional<br />
          <span style={{ color: T.red }}>Design Brief</span>
        </h1>
        <div style={{ maxWidth: 660, marginTop: 26 }}>
          <P>
            Every professional project begins with a piece of paperwork: the brief. In this assignment
            you'll invent a believable client, write the brief they would hand you, then switch chairs
            and answer it as the designer of your own Capstone. Working both sides of the table teaches
            you how real studios frame problems, define audiences, scope deliverables, and measure
            success — before a single pixel is designed. This deck walks through the full anatomy of a
            brief, section by section, ending with the submission requirements and support links.
          </P>
        </div>
        <div
          className="db-mono db-stamp"
          style={{
            position: "absolute", top: "8%", right: "4%", color: T.red,
            border: `3px solid ${T.red}`, padding: "10px 18px", fontSize: 15,
            letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.9,
            transform: "rotate(-8deg)", pointerEvents: "none",
          }}
        >
          Brief v1.0<br />
          <span style={{ fontSize: 11 }}>Approved for production</span>
        </div>
      </div>
    ),
  },

  /* 01 — PART ONE */
  {
    tab: "Client Sim",
    render: () => (
      <>
        <Eyebrow>Part One</Eyebrow>
        <H>The Client Simulation</H>
        <P>
          Imagine a real organization has hired you to create your Capstone. The client doesn't need to
          exist — but its needs should feel believable. You'll write the first version of the brief from
          the <b>client's perspective</b>, then return as the designer and explain how your Capstone answers it.
        </P>
        <div style={{ margin: "18px 0" }}>
          {["Animation / game studio", "Publisher", "Museum or gallery", "Nonprofit", "Tech company", "Fashion or product brand", "Streaming platform", "Toy company", "Startup", "Public-awareness org", "Independent filmmaker", "A company inside your project's world"].map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
        </div>
        <Card title="The Central Question" color={T.red}>
          <p className="db-body" style={{ fontSize: 18, lineHeight: 1.5, margin: 0, color: T.ink }}>
            What kind of client would need this project — and what problem or opportunity would lead
            them to commission it?
          </p>
        </Card>
      </>
    ),
  },

  /* 02 — SECTIONS 1–3 */
  {
    tab: "§1–3",
    render: () => (
      <>
        <Eyebrow>Brief Anatomy</Eyebrow>
        <H size={38}>Title · Client · Background</H>
        <div style={{ display: "grid", gap: 16 }}>
          <Card title={<><SectionNum n="1" />Project Title</>}>
            <P>Working title, client name, designer name, date, version number.</P>
            <div className="db-mono" style={{ fontSize: 13, color: T.pencil, lineHeight: 1.7 }}>
              Project: ZARK · Client: Neon Circuit Interactive · Designer: Joe Micallef · Brief v1.0
            </div>
          </Card>
          <Card title={<><SectionNum n="2" />Client Overview</>}>
            <P>Who the client is, what they do, their industry, mission, personality, and current audiences. Keep it concise.</P>
            <Prompt>We are ____, an organization that specializes in ____. Our mission is to ____. We are commissioning this project because ____.</Prompt>
          </Card>
          <Card title={<><SectionNum n="3" />Project Background</>}>
            <P>The "why now?" — what's happening in the industry, what opportunity emerged, what's missing from existing work.</P>
            <Prompt>The client has identified an opportunity to ____. Existing projects do not adequately ____. This project addresses that gap by ____.</Prompt>
          </Card>
        </div>
      </>
    ),
  },

  /* 03 — SECTION 4 */
  {
    tab: "§4",
    render: () => (
      <>
        <Eyebrow>Brief Anatomy</Eyebrow>
        <H size={38}><SectionNum n="4" /> Problem / Opportunity Statement</H>
        <P>
          State the central challenge <b>without prescribing the visual solution</b>. A productive problem
          statement leaves room for discovery.
        </P>
        <Prompt>The client needs a way to ____ for ____ because ____.</Prompt>
        <div style={{ height: 18 }} />
        <TwoCol
          left={
            <Card title="Weak — dictates the answer" color={T.pencil}>
              <P dim>"The client needs an isometric, neon-colored video game with three robot characters."</P>
            </Card>
          }
          right={
            <Card title="Strong — opens investigation" color={T.blue}>
              <P>"The client needs an engaging narrative experience that helps young audiences explore the unintended consequences of unfinished artificial intelligence."</P>
            </Card>
          }
        />
        <P dim>
          Human-centered design starts from people's needs, technical feasibility, and organizational
          viability — see IDEO's intro to design thinking (links at the end).
        </P>
      </>
    ),
  },

  /* 04 — SECTIONS 5–6 */
  {
    tab: "§5–6",
    render: () => (
      <>
        <Eyebrow>Brief Anatomy</Eyebrow>
        <H size={38}>Purpose · Goals · Objectives</H>
        <TwoCol
          left={
            <Card title={<><SectionNum n="5" />Project Purpose</>}>
              <P>The larger reason the project should exist: entertain, explain, raise awareness, launch, preserve, establish an original IP, attract collaborators…</P>
              <Prompt>The purpose of this project is to ____ by creating an experience that ____.</Prompt>
            </Card>
          }
          right={
            <Card title={<><SectionNum n="6" />Goals vs. Objectives</>}>
              <P><b>Goal</b> = broad desired outcome. <b>Objective</b> = specific, evaluable result.</P>
              <Ul>
                <Li><b>Goal:</b> introduce audiences to an original sci-fi story world.</Li>
                <Li><b>Objectives:</b> establish the visual identity · introduce characters &amp; conflict · create a memorable Hero Project · produce materials that make it legible to funders and collaborators.</Li>
              </Ul>
              <P dim>Identify one primary goal and two to four supporting objectives.</P>
            </Card>
          }
        />
      </>
    ),
  },

  /* 05 — SECTIONS 7–8 */
  {
    tab: "§7–8",
    render: () => (
      <>
        <Eyebrow>Brief Anatomy</Eyebrow>
        <H size={38}>Audience &amp; Desired Response</H>
        <TwoCol
          left={
            <Card title={<><SectionNum n="7" />Target Audience</>}>
              <P>Age, interests, media habits, motivations, frustrations, familiarity with the subject, and where they'll encounter the work. Never "everyone."</P>
              <P><b>Primary</b> — the people who engage directly. <b>Secondary</b> — mentors, educators, studios, galleries, publishers, funders, employers.</P>
              <Prompt>The primary audience is ____. They are interested in ____ but lack ____. They will encounter the project through ____.</Prompt>
            </Card>
          }
          right={
            <Card title={<><SectionNum n="8" />Think · Feel · Remember · Do</>} color={T.blue}>
              <Ul>
                <Li><b>Think</b> — what idea should they understand?</Li>
                <Li><b>Feel</b> — what emotional response should it create?</Li>
                <Li><b>Remember</b> — what should stay with them afterward?</Li>
                <Li><b>Do</b> — explore, share, purchase, learn, participate?</Li>
              </Ul>
              <div style={{ height: 10 }} />
              <P dim>e.g. "Curious and slightly unsettled; understand that unfinished AI produces unpredictable consequences; want to explore the larger ZARK universe."</P>
            </Card>
          }
        />
      </>
    ),
  },

  /* 06 — SECTIONS 9–10 */
  {
    tab: "§9–10",
    render: () => (
      <>
        <Eyebrow>Brief Anatomy</Eyebrow>
        <H size={38}>Key Message &amp; Scope</H>
        <Card title={<><SectionNum n="9" />Key Message</>} color={T.red}>
          <P>One central idea — not a slogan, but the concept that guides story, imagery, tone, and presentation.</P>
          <P><i>"Ideas that are abandoned do not always disappear — they can evolve into something unexpected."</i></P>
        </Card>
        <div style={{ height: 16 }} />
        <TwoCol
          left={
            <Card title={<><SectionNum n="10" />In Scope</>} color={T.blue}>
              <Ul>
                <Li>Original project identity</Li>
                <Li>Environment &amp; character development</Li>
                <Li>Hero Project</Li>
                <Li>Short presentation video · website · selected print</Li>
                <Li>Final Capstone presentation</Li>
              </Ul>
            </Card>
          }
          right={
            <Card title="Out of Scope" color={T.pencil}>
              <Ul>
                <Li>A fully produced feature film</Li>
                <Li>A complete commercial video game</Li>
                <Li>Manufacturing and distribution</Li>
                <Li>A finished TV season</Li>
                <Li>Every character or location in the world</Li>
              </Ul>
              <P dim>Naming what's out prevents scope creep and keeps the Capstone ambitious but achievable.</P>
            </Card>
          }
        />
      </>
    ),
  },

  /* 07 — SECTIONS 11–12 */
  {
    tab: "§11–12",
    render: () => (
      <>
        <Eyebrow>Brief Anatomy</Eyebrow>
        <H size={38}>Deliverables &amp; Required Content</H>
        <TwoCol
          left={
            <Card title={<><SectionNum n="11" />Required Deliverables</>}>
              <P>Specific and measurable — include quantity, dimensions, duration, format, platform.</P>
              <div>
                {["Name / logo / identity", "Artist statement", "Research & references", "Environment blockouts", "Character thumbnails & model sheets", "Storyboards", "3 refined environments", "3 refined characters", "Hero Project", "Process video", "Website", "Print materials", "Final pitch"].map((d) => (
                  <Tag key={d} color={T.blue}>{d}</Tag>
                ))}
              </div>
              <div className="db-mono" style={{ fontSize: 12.5, color: T.pencil, marginTop: 8, lineHeight: 1.6 }}>
                e.g. One 60–90s project video · 1920×1080 MP4 · premise, visual development, Hero Project.
              </div>
            </Card>
          }
          right={
            <Card title={<><SectionNum n="12" />Content Requirements</>}>
              <P>Information that <b>must</b> appear — separating mandatory content from optional creative additions.</P>
              <Ul>
                <Li>Project title, logo, tagline</Li>
                <Li>Story synopsis &amp; character names</Li>
                <Li>Client name &amp; credits</Li>
                <Li>Calls to action &amp; website address</Li>
                <Li>Accessibility, legal, and copyright info</Li>
              </Ul>
            </Card>
          }
        />
      </>
    ),
  },

  /* 08 — SECTIONS 13–14 */
  {
    tab: "§13–14",
    render: () => (
      <>
        <Eyebrow>Brief Anatomy</Eyebrow>
        <H size={38}>Tone &amp; Visual Direction</H>
        <TwoCol
          left={
            <Card title={<><SectionNum n="13" />Tone &amp; Brand Personality</>}>
              <P>Choose three to five words for how the project should feel — and say what it should <b>not</b> feel like.</P>
              <div>
                {["Playful", "Mysterious", "Experimental", "Optimistic", "Unsettling", "Futuristic", "Handmade", "Rebellious", "Nostalgic"].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <P dim>e.g. "Mysterious, energetic, technological, slightly unstable — not violent, hopeless, corporate, or generic."</P>
            </Card>
          }
          right={
            <Card title={<><SectionNum n="14" />Visual &amp; Creative Direction</>}>
              <P>Describe qualities that support the goals — color, type, composition, texture, motion, sound, interaction — without fully prescribing the design.</P>
              <P>Mood boards welcome, but every reference needs a reason:</P>
              <Prompt>"This reference demonstrates the limited palette, dramatic scale, and atmospheric lighting that could support the project's sense of mystery."</Prompt>
            </Card>
          }
        />
      </>
    ),
  },

  /* 09 — SECTIONS 15–16 */
  {
    tab: "§15–16",
    render: () => (
      <>
        <Eyebrow>Brief Anatomy</Eyebrow>
        <H size={38}>Comparables &amp; Constraints</H>
        <TwoCol
          left={
            <Card title={<><SectionNum n="15" />Competition &amp; Comparables</>}>
              <P>Projects in similar creative or commercial space. For each: what's similar, what it does well, who it serves, how yours differs, and what opportunity remains unexplored.</P>
              <P dim>Comparables position your work — they are not there to be copied.</P>
            </Card>
          }
          right={
            <Card title={<><SectionNum n="16" />Constraints &amp; Non-Negotiables</>} color={T.red}>
              <P>Schedule, budget, software, equipment, team size, print limits, platforms, accessibility, copyright, age-appropriateness.</P>
              <P>Constraints aren't negative — they focus decisions and force inventive solutions.</P>
              <Prompt>The project must be achievable within ____ weeks using ____. The final work must function within ____ and cannot include ____.</Prompt>
            </Card>
          }
        />
      </>
    ),
  },

  /* 10 — SECTIONS 17–19 */
  {
    tab: "§17–19",
    render: () => (
      <>
        <Eyebrow>Brief Anatomy</Eyebrow>
        <H size={38}>Timeline · Approval · Success</H>
        <div style={{ display: "grid", gap: 16 }}>
          <Card title={<><SectionNum n="17" />Timeline &amp; Milestones</>}>
            <div className="db-mono" style={{ fontSize: 12.5, lineHeight: 2, color: T.ink }}>
              Brief approval → Research → Blockouts &amp; thumbnails → Storyboards → Initial concepts →
              Client presentation → Revisions → Hero Project production → Website / video / print → QC → Final delivery
            </div>
            <P dim>List the review moments, not every production task.</P>
          </Card>
          <TwoCol
            left={
              <Card title={<><SectionNum n="18" />Feedback &amp; Approval</>}>
                <P>Client (you, in role) · Designer (you) · Creative director (instructor) · Audience reps (classmates, mentors). Define who decides, when, and how many revision rounds.</P>
                <P><i>"Does this reach the audience and support the tone?"</i> — not <i>"I just don't like that color."</i></P>
              </Card>
            }
            right={
              <Card title={<><SectionNum n="19" />Measures of Success</>} color={T.blue}>
                <Ul>
                  <Li>Audience understands the central idea</Li>
                  <Li>Hero Project communicates without a long explanation</Li>
                  <Li>Identity is consistent across digital &amp; print</Li>
                  <Li>Intended emotional response is achieved</Li>
                  <Li>Deliverables meet technical requirements</Li>
                  <Li>The work could grow into something larger</Li>
                </Ul>
              </Card>
            }
          />
        </div>
      </>
    ),
  },

  /* 11 — PART THREE */
  {
    tab: "Reverse",
    render: () => (
      <>
        <Eyebrow>Part Three</Eyebrow>
        <H>Reverse-Engineering Your Capstone</H>
        <P>You've already chosen your project — so work backward from the idea and answer:</P>
        <TwoCol
          left={
            <Ul>
              <Li>What am I planning to create?</Li>
              <Li>What larger purpose could it serve?</Li>
              <Li>What client would commission it — and why?</Li>
              <Li>Who benefits from or engages with it?</Li>
              <Li>What should the audience think, feel, remember, or do?</Li>
              <Li>What central message connects the work?</Li>
            </Ul>
          }
          right={
            <Ul>
              <Li>What deliverables would a real client request?</Li>
              <Li>What limitations affect production?</Li>
              <Li>How would the client evaluate the result?</Li>
              <Li>How could it grow beyond the Capstone — product, publication, exhibition, film, game, startup, campaign, or original IP?</Li>
            </Ul>
          }
        />
      </>
    ),
  },

  /* 12 — PART FOUR */
  {
    tab: "Roles",
    render: () => (
      <>
        <Eyebrow>Part Four</Eyebrow>
        <H>Switching Roles</H>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="db-roles">
          <Card title="Phase 1 · The Client" color={T.red}>
            <P>Write the brief from the client's point of view: the need, audience, objectives, outcomes, constraints. Do <b>not</b> defend your existing design choices.</P>
          </Card>
          <Card title="Phase 2 · The Designer" color={T.blue}>
            <P>Respond as a creative professional: your proposed solution, why the format fits, how the visual direction supports the objectives, how the Hero Project reaches the audience.</P>
          </Card>
          <Card title="Phase 3 · The Reviewer">
            <P>Evaluate the proposal against the brief: does it solve the problem? Is it realistic? Is the message clear? What's essential, what could be cut, what needs testing?</P>
          </Card>
        </div>
      </>
    ),
  },

  /* 13 — SUBMISSION + EVAL */
  {
    tab: "Submit",
    render: () => (
      <>
        <Eyebrow>Required Submission</Eyebrow>
        <H size={38}>2–4 Page Professional Brief</H>
        <TwoCol
          left={
            <>
              <div>
                {["Title & client", "Client overview", "Background", "Problem statement", "Purpose / goal / objectives", "Audiences", "Desired response", "Key message", "Scope", "Deliverables", "Content requirements", "Tone & visual direction", "Comparables", "Constraints", "Timeline & approval", "Measures of success", "Designer response ¶", "Optional mood board"].map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              <P dim>Professional briefs typically run one to three focused pages; this classroom version is longer because it documents both strategy and planning.</P>
            </>
          }
          right={
            <Card title="Evaluation Criteria" color={T.red}>
              {[
                ["Client, background & context", "15%"],
                ["Problem, purpose, goals", "20%"],
                ["Audience & response", "15%"],
                ["Scope, deliverables, feasibility", "20%"],
                ["Message, tone, direction", "15%"],
                ["Measures of success", "10%"],
                ["Clarity & professionalism", "5%"],
              ].map(([k, v]) => (
                <div key={k} className="db-mono" style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px dashed ${T.line}`, padding: "7px 0", fontSize: 13 }}>
                  <span>{k}</span>
                  <span style={{ color: T.red, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </Card>
          }
        />
      </>
    ),
  },

  /* 14 — LINKS */
  {
    tab: "Links",
    render: () => (
      <>
        <Eyebrow>Recommended Support Links</Eyebrow>
        <H size={38}>Keep These Open While You Write</H>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="db-twocol">
          {[
            ["Figma — How to Create a Design Brief", "Goals, audience, requirements, timelines, and budgets.", "https://www.figma.com/resource-library/how-to-create-a-design-brief/"],
            ["Adobe — How to Write a Creative Brief", "Audience, messaging, strategy, and creative direction.", "https://business.adobe.com/blog/basics/creative-brief"],
            ["Asana — Design Brief Guide & Examples", "Context, scope, objectives, deliverables, budget, timeline.", "https://asana.com/resources/design-brief"],
            ["Canva — Creative Brief Guide", "Brief components, examples, and scope creep explained.", "https://www.canva.com/learn/creative-brief/"],
            ["IDEO — Introduction to Design Thinking", "Human needs × technical feasibility × organizational viability.", "https://designthinking.ideo.com/"],
            ["IDEO.org — Design Kit", "Research methods for understanding an audience.", "https://www.designkit.org/"],
            ["Interaction Design Foundation — Design Briefs", "Purpose and essential content of professional briefs.", "https://www.interaction-design.org/literature/topics/design-briefs"],
          ].map(([title, desc, url]) => (
            <a
              key={title}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="db-body"
              style={{
                display: "block", border: `1.5px solid ${T.ink}`, background: "#FBF7EA",
                padding: "12px 14px", textDecoration: "none", color: T.ink,
                boxShadow: `3px 3px 0 ${T.ink}`, transition: "transform .12s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translate(-2px,-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: T.blue }}>{title} ↗</div>
              <div style={{ fontSize: 13.5, color: T.pencil }}>{desc}</div>
            </a>
          ))}
        </div>
      </>
    ),
  },
];

/* ——— deck shell ——— */

export default function DesignBriefDeck() {
  const [i, setI] = useState(0);
  const last = slides.length - 1;

  const go = useCallback(
    (d) => setI((cur) => Math.min(last, Math.max(0, cur + d))),
    [last]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div
      className="db-body"
      style={{
        minHeight: "100vh", background: T.paperDark, display: "flex",
        flexDirection: "column", color: T.ink,
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(31,27,22,0.035) 27px, rgba(31,27,22,0.035) 28px)`,
      }}
    >
      <style>{fontCSS}</style>
      <style>{`
        @media (max-width: 760px) {
          .db-twocol { grid-template-columns: 1fr !important; }
          .db-roles { grid-template-columns: 1fr !important; }
        }
        a:focus-visible, button:focus-visible { outline: 3px solid ${T.blue}; outline-offset: 2px; }
      `}</style>

      {/* header bar — job ticket strip */}
      <header
        className="db-mono"
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: `2px solid ${T.ink}`, background: T.paper,
          padding: "10px 22px", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
        }}
      >
        <span>Job No. CAP-2026 · Design Brief Assignment</span>
        <span style={{ color: T.red }}>Slide {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </header>

      {/* slide surface */}
      <main style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "28px 22px" }}>
        <div
          key={i}
          className="db-anim"
          style={{
            width: "100%", maxWidth: 1040, background: T.paper,
            border: `2px solid ${T.ink}`, boxShadow: `6px 6px 0 ${T.ink}`,
            padding: "clamp(24px, 4vw, 52px)", minHeight: 420,
          }}
        >
          {slides[i].render()}
        </div>
      </main>

      {/* folder-tab navigation */}
      <nav style={{ display: "flex", alignItems: "flex-end", gap: 4, padding: "0 22px", overflowX: "auto" }}>
        {slides.map((s, idx) => (
          <button
            key={s.tab + idx}
            onClick={() => setI(idx)}
            className="db-mono"
            aria-label={`Go to slide ${idx + 1}: ${s.tab}`}
            style={{
              border: `1.5px solid ${T.ink}`, borderBottom: "none", cursor: "pointer",
              background: idx === i ? T.ink : T.paper, color: idx === i ? T.paper : T.ink,
              padding: idx === i ? "9px 14px 11px" : "6px 12px 8px", fontSize: 11,
              letterSpacing: "0.08em", whiteSpace: "nowrap",
              borderRadius: "6px 6px 0 0", transition: "all .15s ease",
            }}
          >
            {s.tab}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 6, paddingBottom: 6 }}>
          <button onClick={() => go(-1)} disabled={i === 0} className="db-mono" style={navBtn(i === 0)}>← Prev</button>
          <button onClick={() => go(1)} disabled={i === last} className="db-mono" style={navBtn(i === last)}>Next →</button>
        </div>
      </nav>
      <div style={{ height: 2, background: T.ink }} />
    </div>
  );
}

const navBtn = (disabled) => ({
  border: `1.5px solid ${T.ink}`, background: disabled ? T.paperDark : T.red,
  color: disabled ? T.pencil : T.paper, padding: "7px 14px", fontSize: 12,
  cursor: disabled ? "default" : "pointer", boxShadow: disabled ? "none" : `2px 2px 0 ${T.ink}`,
});
