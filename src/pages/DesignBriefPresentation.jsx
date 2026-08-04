import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

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

  /* 01 — CLIENT SIM */
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

// Sample datasets
const SAMPLES = [
  {
    id: 1,
    style: "STYLE 01 · CLASSIC MINIMAL",
    title: "Editorial & Independent Publishing",
    color: T.red,
    src: "/style1-classic-minimal.svg",
    desc: "Clean, elegant typography layout for art directors and independent authors.",
  },
  {
    id: 2,
    style: "STYLE 02 · CORPORATE GRID",
    title: "Agency & Enterprise Systems",
    color: T.blue,
    src: "/style2-corporate-grid.svg",
    desc: "Structured multi-column data grid for agency workflows and enterprise handoffs.",
  },
  {
    id: 3,
    style: "STYLE 03 · STUDIO BRANDED",
    title: "Entertainment & Creative IP",
    color: T.red,
    src: "/style3-studio-branded.svg",
    desc: "High-impact visual identity header for animation, games, and film pitches.",
  },
  {
    id: 4,
    style: "STYLE 04 · MODULAR QUESTIONNAIRE",
    title: "Form-Based & Client Handoff",
    color: T.blue,
    src: "/style4-questionnaire.svg",
    desc: "Questionnaire-style prompts for client intake and collaborative briefing.",
  },
];

/* ——— deck shell ——— */

export default function DesignBriefDeck() {
  const [i, setI] = useState(0);
  const [activeModal, setActiveModal] = useState(null); // { title, src, style, color, desc }
  const [hoveredSampleId, setHoveredSampleId] = useState(null);
  const last = slides.length - 1;

  const go = useCallback(
    (d) => setI((cur) => Math.min(last, Math.max(0, cur + d))),
    [last]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (activeModal) {
        if (e.key === "Escape") setActiveModal(null);
        return;
      }
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, activeModal]);

  return (
    <div
      className="db-body"
      style={{
        minHeight: "100vh", background: T.paperDark, display: "flex",
        flexDirection: "column", color: T.ink,
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(31,27,22,0.035) 27px, rgba(31,27,22,0.035) 28px)`,
        paddingBottom: '32px',
        position: "relative"
      }}
    >
      <style>{fontCSS}</style>
      <style>{`
        @media (max-width: 760px) {
          .db-twocol { grid-template-columns: 1fr !important; }
          .db-roles { grid-template-columns: 1fr !important; }
        }
        a:focus-visible, button:focus-visible { outline: 3px solid ${T.blue}; outline-offset: 2px; }
        
        .db-zoom-card {
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .db-zoom-card:hover {
          transform: translateY(-8px) scale(1.025);
          box-shadow: 8px 12px 0 ${T.ink} !important;
        }
        .db-zoom-card:hover .db-img-preview {
          transform: scale(1.06);
        }
        .db-zoom-card:hover .db-card-overlay {
          opacity: 1;
        }
        .db-img-preview {
          transition: transform 0.35s ease;
        }
        .db-card-overlay {
          opacity: 0;
          transition: opacity 0.22s ease;
        }
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
        <Link to="/week/07" style={{ textDecoration: 'none', color: T.red, fontWeight: 'bold' }}>← BACK TO WEEK 07</Link>
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

      {/* ————————————————————————————————————————————————
         BOTTOM SUPPLEMENTARY MATERIALS
         1. Brief Anatomy Graphic Plate
         2. Creative Brief Specimens & Templates (4 Styles)
         ———————————————————————————————————————————————— */}
      <section
        className="db-body"
        style={{
          width: "100%",
          maxWidth: 1040,
          margin: "42px auto 32px auto",
          padding: "0 22px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
          boxSizing: "border-box"
        }}
      >
        {/* 1. Interactive Anatomical Brief Inspector */}
        <div
          style={{
            border: `2px solid ${T.ink}`,
            background: T.paper,
            boxShadow: `6px 6px 0 ${T.ink}`,
            padding: "clamp(20px, 3.5vw, 40px)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12, marginBottom: 16, borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 12 }}>
            <div>
              <Eyebrow color={T.red}>Interactive Document Inspector</Eyebrow>
              <h2 className="db-display" style={{ fontSize: "clamp(22px, 3.5vw, 32px)", margin: 0, textTransform: "uppercase", color: T.ink }}>
                Anatomy of a Professional Design Brief
              </h2>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={() => setActiveModal({
                  title: "Anatomy of a Professional Design Brief",
                  style: "MASTER REFERENCE SCHEMATIC · PLATE I",
                  src: "/brief-anatomy-plate.svg",
                  color: T.red,
                  desc: "Full structural breakdown detailing the 20 structural components comprising a production-ready brief."
                })}
                className="db-mono"
                style={{
                  border: `1.5px solid ${T.ink}`,
                  background: T.red,
                  color: T.paper,
                  padding: "8px 16px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: `2.5px 2.5px 0 ${T.ink}`,
                }}
              >
                🔍 FULL-SCREEN SCHEMATIC
              </button>
              <a
                href="/brief-anatomy-plate.svg"
                target="_blank"
                rel="noreferrer"
                className="db-mono"
                style={{
                  border: `1.5px solid ${T.ink}`,
                  background: T.paper,
                  color: T.ink,
                  padding: "8px 16px",
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: `2.5px 2.5px 0 ${T.ink}`,
                }}
              >
                OPEN RAW SVG ↗
              </a>
            </div>
          </div>
          <p className="db-body" style={{ fontSize: 16, color: T.pencil, marginBottom: 20, lineHeight: 1.6 }}>
            Hover over any section button or schematic region to dynamically inspect its <strong>magnified section view</strong>, <strong>fill-in prompt</strong>, and <strong>studio guidance</strong>.
          </p>

          {/* Inspector Component Container */}
          <InteractiveBriefInspector setI={setI} setActiveModal={setActiveModal} />
        </div>

        {/* 2. Creative Brief Samples & Templates */}
        <div
          style={{
            border: `2px solid ${T.ink}`,
            background: T.paper,
            boxShadow: `6px 6px 0 ${T.ink}`,
            padding: "clamp(20px, 3.5vw, 40px)",
          }}
        >
          <div style={{ marginBottom: 24, borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 14 }}>
            <Eyebrow color={T.blue}>Document Layout Archetypes</Eyebrow>
            <h2 className="db-display" style={{ fontSize: "clamp(22px, 3.5vw, 32px)", margin: 0, textTransform: "uppercase", color: T.ink }}>
              4 Creative Brief Sample Styles
            </h2>
            <p className="db-body" style={{ fontSize: 16, color: T.pencil, marginTop: 8, marginBottom: 0, lineHeight: 1.6 }}>
              Four distinct formatting and typographic layout treatments for structuring your Capstone brief. Hover over any sample card to scale up, or click to open full-screen lightbox preview.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {SAMPLES.map((sample) => (
              <div
                key={sample.id}
                className="db-zoom-card"
                onMouseEnter={() => setHoveredSampleId(sample.id)}
                onMouseLeave={() => setHoveredSampleId(null)}
                onClick={() => setActiveModal(sample)}
                style={{
                  border: `1.5px solid ${T.ink}`,
                  background: "#FBF7EA",
                  boxShadow: `4px 4px 0 ${T.ink}`,
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  justify: "space-between",
                  position: "relative"
                }}
              >
                <div>
                  <div className="db-mono" style={{ fontSize: 12, color: sample.color, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                    {sample.style}
                  </div>
                  <h3 className="db-display" style={{ fontSize: 18, margin: "0 0 12px 0", color: T.ink }}>
                    {sample.title}
                  </h3>
                  
                  {/* Image container with hover scaling */}
                  <div style={{ border: `1.5px solid ${T.ink}`, background: "#FFF", padding: 8, marginBottom: 14, overflow: "hidden", position: "relative" }}>
                    <img
                      src={sample.src}
                      alt={`${sample.style} Brief Sample`}
                      className="db-img-preview"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        transform: hoveredSampleId === sample.id ? "scale(1.12)" : "scale(1)"
                      }}
                    />
                    
                    {/* Hover hover overlay prompt */}
                    <div
                      className="db-card-overlay"
                      style={{
                        position: "absolute", inset: 0, background: "rgba(31, 27, 22, 0.4)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: 12, textAlign: "center"
                      }}
                    >
                      <span
                        className="db-mono"
                        style={{
                          background: T.paper, color: T.ink, border: `1.5px solid ${T.ink}`,
                          padding: "6px 12px", fontSize: 11, fontWeight: 700,
                          boxShadow: `3px 3px 0 ${T.ink}`, letterSpacing: "0.06em"
                        }}
                      >
                        🔍 CLICK TO ENLARGE
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModal(sample);
                    }}
                    className="db-mono"
                    style={{
                      flex: 1,
                      border: `1.5px solid ${T.ink}`,
                      background: sample.color,
                      color: T.paper,
                      padding: "7px 10px",
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: `2px 2px 0 ${T.ink}`,
                      textAlign: "center",
                    }}
                  >
                    PREVIEW 🔍
                  </button>
                  <a
                    href={sample.src}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="db-mono"
                    style={{
                      border: `1.5px solid ${T.ink}`,
                      background: T.paper,
                      color: T.ink,
                      padding: "7px 10px",
                      fontSize: 11,
                      fontWeight: 700,
                      textDecoration: "none",
                      boxShadow: `2px 2px 0 ${T.ink}`,
                      textAlign: "center",
                    }}
                  >
                    SVG ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————————————————————————————————————————————————
         LIGHTBOX / SCALED-UP MODAL OVERLAY
         ———————————————————————————————————————————————— */}
      {activeModal && (
        <div
          onClick={() => setActiveModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(31, 27, 22, 0.85)",
            backdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justify: "center",
            padding: "24px",
            boxSizing: "border-box",
            overflowY: "auto"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 960,
              background: T.paper,
              border: `3px solid ${T.ink}`,
              boxShadow: `12px 16px 0 ${T.ink}`,
              padding: "clamp(20px, 3vw, 36px)",
              position: "relative",
              margin: "auto"
            }}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, borderBottom: `2px solid ${T.ink}`, paddingBottom: 12 }}>
              <div>
                <div className="db-mono" style={{ fontSize: 13, color: activeModal.color || T.red, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  {activeModal.style}
                </div>
                <h2 className="db-display" style={{ fontSize: 28, margin: "4px 0 0 0", color: T.ink }}>
                  {activeModal.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="db-mono"
                aria-label="Close modal"
                style={{
                  border: `2px solid ${T.ink}`,
                  background: T.red,
                  color: T.paper,
                  padding: "6px 14px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: `3px 3px 0 ${T.ink}`,
                }}
              >
                ✕ CLOSE (ESC)
              </button>
            </div>

            {/* Modal Image Box */}
            <div style={{ border: `2px solid ${T.ink}`, background: "#FFF", padding: 16, marginBottom: 18, maxHeight: "70vh", overflowY: "auto" }}>
              <img
                src={activeModal.src}
                alt={activeModal.title}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>

            {/* Modal Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <p className="db-body" style={{ margin: 0, fontSize: 15, color: T.pencil }}>
                {activeModal.desc || "High-resolution SVG document template for capstone client simulation."}
              </p>
              <a
                href={activeModal.src}
                target="_blank"
                rel="noreferrer"
                className="db-mono"
                style={{
                  border: `2px solid ${T.ink}`,
                  background: T.blue,
                  color: T.paper,
                  padding: "8px 18px",
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: `3px 3px 0 ${T.ink}`,
                }}
              >
                OPEN RAW SVG IN NEW TAB ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ANATOMY_SECTIONS = [
  {
    id: "sec1",
    num: "1",
    name: "Title Block & Versioning",
    slideIdx: 2,
    color: T.red,
    boxCallout: { x: 40, y: 130, w: 375, h: 60 },
    boxDoc: { x: 430, y: 120, w: 340, h: 72 },
    summary: "Project working title, client organization, designer name, date, and document version number.",
    prompt: "Project: ZARK · Client: Neon Circuit Interactive · Designer: Joe Micallef · Brief v1.0",
    callout: "The document's official identity card. Always include version control (Brief v1.0) so team members reference the latest specs.",
    zoomStyle: { scale: 3.5, originX: "50%", originY: "15%" },
  },
  {
    id: "sec2",
    num: "2-3",
    name: "Client Overview & Background",
    slideIdx: 2,
    color: T.blue,
    boxCallout: { x: 40, y: 195, w: 375, h: 60 },
    boxDoc: { x: 430, y: 192, w: 340, h: 100 },
    summary: "Who the client is, their industry, core mission, and why this project is commissioned right now.",
    prompt: "We are an organization that specializes in [___]. Existing projects do not adequately [___], so this project addresses that gap by [___].",
    callout: "Establishes commercial context. Answers 'why now?' and identifies unexplored opportunities in existing markets.",
    zoomStyle: { scale: 3.5, originX: "50%", originY: "25%" },
  },
  {
    id: "sec4",
    num: "4",
    name: "Problem / Opportunity Statement",
    slideIdx: 3,
    color: T.red,
    boxCallout: { x: 40, y: 280, w: 375, h: 60 },
    boxDoc: { x: 430, y: 292, w: 340, h: 60 },
    summary: "States the central design challenge WITHOUT prescribing the visual solution upfront.",
    prompt: "The client needs a way to [___] for [___] because [___].",
    callout: "Human-centered design starts with people's needs. A productive problem statement leaves room for creative discovery.",
    zoomStyle: { scale: 3.5, originX: "50%", originY: "36%" },
  },
  {
    id: "sec5",
    num: "5-6",
    name: "Purpose, Goals & Objectives",
    slideIdx: 4,
    color: T.blue,
    boxCallout: { x: 40, y: 365, w: 375, h: 60 },
    boxDoc: { x: 430, y: 352, w: 340, h: 54 },
    summary: "One broad overarching goal + 2 to 4 evaluable, measurable project objectives.",
    prompt: "Primary Goal: Introduce audiences to [___]. Objectives: 1. Establish visual identity · 2. Introduce characters & conflict.",
    callout: "Goals set broad intent; objectives provide specific, checkable criteria evaluated at project completion.",
    zoomStyle: { scale: 3.5, originX: "50%", originY: "43%" },
  },
  {
    id: "sec7",
    num: "7",
    name: "Target Audience",
    slideIdx: 5,
    color: T.red,
    boxCallout: { x: 40, y: 445, w: 375, h: 60 },
    boxDoc: { x: 430, y: 406, w: 340, h: 54 },
    summary: "Primary (direct consumers/viewers) and secondary (publishers, funders, studios, employers). Never 'everyone'.",
    prompt: "Primary: [Young adults interested in sci-fi]. Secondary: [Game studios, animation recruiters, gallery curators].",
    callout: "Designing for real demographics ensures story pacing, visual density, and handoff formats fit the target user.",
    zoomStyle: { scale: 3.5, originX: "50%", originY: "50%" },
  },
  {
    id: "sec8",
    num: "8",
    name: "Desired Response (Think/Feel/Do)",
    slideIdx: 5,
    color: T.blue,
    boxCallout: { x: 40, y: 525, w: 375, h: 60 },
    boxDoc: { x: 430, y: 460, w: 340, h: 48 },
    summary: "The four key verbs defining audience cognition, emotional impact, and post-experience action.",
    prompt: "Think: [Consequences of unfinished AI]. Feel: [Curious & unsettled]. Remember: [ZARK world]. Do: [Explore story].",
    callout: "The gold-standard evaluation matrix used by leading branding & interactive agencies.",
    zoomStyle: { scale: 3.5, originX: "50%", originY: "55%" },
  },
  {
    id: "sec9",
    num: "9",
    name: "Key Message",
    slideIdx: 6,
    color: T.red,
    boxCallout: { x: 785, y: 165, w: 375, h: 60 },
    boxDoc: { x: 430, y: 508, w: 340, h: 46 },
    summary: "The single central thesis statement guiding story world, imagery, tone, and presentation.",
    prompt: "Key Message: 'Ideas that are abandoned do not always disappear — they can evolve into something unexpected.'",
    callout: "Not a marketing tag line, but the structural core that holds the creative narrative together.",
    zoomStyle: { scale: 3.5, originX: "50%", originY: "61%" },
  },
  {
    id: "sec10",
    num: "10-11",
    name: "Scope & Deliverables",
    slideIdx: 7,
    color: T.blue,
    boxCallout: { x: 785, y: 300, w: 375, h: 72 },
    boxDoc: { x: 430, y: 554, w: 340, h: 64 },
    summary: "Explicit list of what is IN scope vs OUT of scope, plus exact formats, dimensions, and quantities.",
    prompt: "Deliverables: 1. Hero Project · 2. 60-90s Process Video (1920x1080 MP4) · 3. Project Website · 4. Print Materials.",
    callout: "Your shield against scope creep. Outlining out-of-scope items ensures Capstone deliverables remain achievable.",
    zoomStyle: { scale: 3.5, originX: "50%", originY: "67%" },
  },
  {
    id: "sec13",
    num: "13-14",
    name: "Tone & Visual Direction",
    slideIdx: 8,
    color: T.red,
    boxCallout: { x: 785, y: 455, w: 375, h: 60 },
    boxDoc: { x: 430, y: 618, w: 340, h: 48 },
    summary: "3-5 brand personality keywords + visual attributes (and explicitly what it should NOT feel like).",
    prompt: "Tone: Mysterious, energetic, technological, slightly unstable. NOT: violent, hopeless, or corporate.",
    callout: "Defines visual boundaries (lighting, palette, typography) while keeping creative freedom open.",
    zoomStyle: { scale: 3.5, originX: "50%", originY: "74%" },
  },
  {
    id: "sec16",
    num: "16",
    name: "Constraints & Parameters",
    slideIdx: 9,
    color: T.blue,
    boxCallout: { x: 785, y: 555, w: 375, h: 60 },
    boxDoc: { x: 430, y: 664, w: 340, h: 48 },
    summary: "Schedule, software tools, equipment, print bounds, age rating, and non-negotiables.",
    prompt: "Constraints: 13-week production timeline; software limited to Photoshop, Blender, and InDesign.",
    callout: "Constraints sharpen focus and force inventive creative problem-solving.",
    zoomStyle: { scale: 3.5, originX: "50%", originY: "80%" },
  },
  {
    id: "sec17",
    num: "17-19",
    name: "Timeline, Approval & Success",
    slideIdx: 10,
    color: T.red,
    boxCallout: { x: 785, y: 645, w: 375, h: 65 },
    boxDoc: { x: 430, y: 710, w: 340, h: 54 },
    summary: "Review milestones, approval chain, revision rounds, and evaluation criteria.",
    prompt: "Measures of Success: Audience understands core message; identity is consistent across print & digital.",
    callout: "Defines how feedback is delivered, establishing criteria before artistic reviews begin.",
    zoomStyle: { scale: 3.5, originX: "50%", originY: "86%" },
  },
  {
    id: "sec20",
    num: "20",
    name: "Client Approval Signatures",
    slideIdx: 12,
    color: T.blue,
    boxCallout: { x: 40, y: 770, w: 375, h: 65 },
    boxDoc: { x: 430, y: 764, w: 340, h: 60 },
    summary: "Formal approval signatures turning the brief into a shared creative contract.",
    prompt: "Client Signature: [___] · Designer Signature: [___] · Date: August 4th, 2026",
    callout: "Signatures transform paperwork into a binding blueprint for the entire project life cycle.",
    zoomStyle: { scale: 3.5, originX: "50%", originY: "93%" },
  },
];

function InteractiveBriefInspector({ setI, setActiveModal }) {
  const [activeSecId, setActiveSecId] = useState("sec4");

  const currentSec = ANATOMY_SECTIONS.find((s) => s.id === activeSecId) || ANATOMY_SECTIONS[2];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Quick Section Selector Buttons */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", borderBottom: `1.5px solid ${T.ink}`, paddingBottom: 14 }}>
        {ANATOMY_SECTIONS.map((sec) => {
          const isActive = sec.id === activeSecId;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSecId(sec.id)}
              onMouseEnter={() => setActiveSecId(sec.id)}
              className="db-mono"
              style={{
                border: `1.5px solid ${T.ink}`,
                background: isActive ? sec.color : T.paper,
                color: isActive ? T.paper : T.ink,
                padding: "5px 10px",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: isActive ? `3px 3px 0 ${T.ink}` : `1.5px 1.5px 0 ${T.ink}`,
                transition: "all 0.15s ease",
              }}
            >
              §{sec.num} {sec.name.split(" ")[0]}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Split Inspector: Hotspot Graphic (Left) vs Magnified Crop & Callout (Right) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Left Panel: Graphic Plate with Interactive Overlay Hotspots */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              border: `1.5px solid ${T.ink}`,
              background: "#FDFBF3",
              padding: 10,
              position: "relative",
              boxShadow: `4px 4px 0 ${T.ink}`,
            }}
          >
            <img
              src="/brief-anatomy-plate.svg"
              alt="Anatomy of a Professional Design Brief Master Graphic"
              style={{ width: "100%", height: "auto", display: "block" }}
            />

            {/* SVG Interactive Hotspot Layer for BOTH Callouts and Document Regions */}
            <svg
              viewBox="0 0 1200 900"
              style={{
                position: "absolute",
                inset: 10,
                width: "calc(100% - 20px)",
                height: "calc(100% - 20px)",
                pointerEvents: "auto",
              }}
            >
              {ANATOMY_SECTIONS.map((sec) => {
                const isActive = sec.id === activeSecId;
                return (
                  <g key={sec.id} style={{ cursor: "pointer" }} onClick={() => setActiveSecId(sec.id)} onMouseEnter={() => setActiveSecId(sec.id)}>
                    {/* Callout box highlight */}
                    <rect
                      x={sec.boxCallout.x}
                      y={sec.boxCallout.y}
                      width={sec.boxCallout.w}
                      height={sec.boxCallout.h}
                      fill={isActive ? "rgba(196, 59, 42, 0.15)" : "transparent"}
                      stroke={isActive ? sec.color : "transparent"}
                      strokeWidth={isActive ? 3 : 0}
                      rx={4}
                      style={{ transition: "all 0.2s ease" }}
                    />

                    {/* Document region highlight */}
                    <rect
                      x={sec.boxDoc.x}
                      y={sec.boxDoc.y}
                      width={sec.boxDoc.w}
                      height={sec.boxDoc.h}
                      fill={isActive ? "rgba(196, 59, 42, 0.22)" : "transparent"}
                      stroke={isActive ? sec.color : "transparent"}
                      strokeWidth={isActive ? 3.5 : 0}
                      rx={3}
                      style={{ transition: "all 0.2s ease" }}
                    />

                    {/* Glowing active indicator pin */}
                    {isActive && (
                      <g transform={`translate(${sec.boxDoc.x + sec.boxDoc.w - 12}, ${sec.boxDoc.y + 12})`}>
                        <circle r={11} fill={sec.color} stroke={T.ink} strokeWidth={1.5} />
                        <text x={0} y={4} fill={T.paper} fontSize={11} fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                          ✓
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="db-mono" style={{ fontSize: 11, color: T.pencil, textAlign: "center" }}>
            💡 HOVER OVER ANY CALLOUT BOX OR DOCUMENT REGION ABOVE TO MAGNIFY
          </div>
        </div>

        {/* Right Panel: Magnified Section Crop & Dynamic Callout Card */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Magnified Cropped Section Box */}
          <div
            style={{
              border: `2px solid ${T.ink}`,
              background: "#FFF",
              boxShadow: `4px 4px 0 ${T.ink}`,
              padding: 14,
              overflow: "hidden",
              position: "relative",
              height: 240,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="db-mono"
              style={{
                position: "absolute",
                top: 8,
                left: 10,
                zIndex: 10,
                background: currentSec.color,
                color: T.paper,
                fontSize: 10.5,
                fontWeight: 700,
                padding: "4px 10px",
                letterSpacing: "0.1em",
                boxShadow: `2px 2px 0 ${T.ink}`,
              }}
            >
              MAGNIFIED SECTION PREVIEW §{currentSec.num}
            </div>

            {/* Cropped Magnified Image */}
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/brief-anatomy-plate.svg"
                alt={`Magnified View of ${currentSec.name}`}
                style={{
                  width: "100%",
                  height: "auto",
                  transform: `scale(${currentSec.zoomStyle.scale})`,
                  transformOrigin: `${currentSec.zoomStyle.originX} ${currentSec.zoomStyle.originY}`,
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
          </div>

          {/* Callout Detail Card */}
          <div
            style={{
              border: `2px solid ${T.ink}`,
              background: "#FBF7EA",
              boxShadow: `4px 4px 0 ${T.ink}`,
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="db-mono" style={{ color: currentSec.color, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em" }}>
                SECTION {currentSec.num}
              </span>
              <button
                onClick={() => {
                  setI(currentSec.slideIdx);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="db-mono"
                style={{
                  border: `1.5px solid ${T.ink}`,
                  background: T.paper,
                  color: T.red,
                  padding: "4px 10px",
                  fontSize: 10.5,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: `1.5px 1.5px 0 ${T.ink}`,
                }}
              >
                JUMP TO SLIDE {currentSec.slideIdx + 1} →
              </button>
            </div>

            <h3 className="db-display" style={{ fontSize: 22, margin: 0, color: T.ink }}>
              {currentSec.name}
            </h3>

            <p className="db-body" style={{ fontSize: 14.5, lineHeight: 1.55, color: T.ink, margin: 0 }}>
              {currentSec.summary}
            </p>

            {/* Prompt Template */}
            <div
              className="db-mono"
              style={{
                borderLeft: `3px solid ${currentSec.color}`,
                background: "rgba(31,27,22,0.04)",
                padding: "9px 13px",
                fontSize: 12,
                lineHeight: 1.5,
                color: T.ink,
              }}
            >
              <span style={{ color: currentSec.color, fontWeight: 700 }}>STUDENT TEMPLATE: </span>
              {currentSec.prompt}
            </div>

            {/* Studio Best Practice Callout */}
            <div style={{ fontSize: 13, color: T.pencil, fontStyle: "italic", borderTop: `1px dashed ${T.line}`, paddingTop: 10, margin: 0 }}>
              💡 <strong>Studio Guidance:</strong> {currentSec.callout}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const navBtn = (disabled) => ({
  border: `1.5px solid ${T.ink}`, background: disabled ? T.paperDark : T.red,
  color: disabled ? T.pencil : T.paper, padding: "7px 14px", fontSize: 12,
  cursor: disabled ? "default" : "pointer", boxShadow: disabled ? "none" : `2px 2px 0 ${T.ink}`,
});


