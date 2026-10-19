// ─────────────────────────────────────────────────────────────────────────────
// MARK PRAKHIN — SOURCE OF TRUTH
// Each item carries a `status` field:
//   "verified"     → approved for public display
//   "needsReview"  → requires Mark's confirmation before publishing
//   "doNotPublish" → exists for planning only; never rendered publicly
// ─────────────────────────────────────────────────────────────────────────────

export type Status = "verified" | "needsReview" | "doNotPublish";

export interface Metric {
  value: string;
  label: string;
}

export interface Experience {
  id: string;
  status: Status;
  title: string;
  organization: string;
  organizationApproved: boolean;
  websiteUrl?: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
  metrics?: Metric[]; // verified figures only — approved by Mark before display
}

export interface LeadershipItem {
  id: string;
  status: Status;
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Activity {
  id: string;
  status: Status;
  name: string;
  description: string;
}

// ─── IDENTITY ────────────────────────────────────────────────────────────────

export const identity = {
  name: "Mark Prakhin",
  location: "New York City",
  heroEyebrow: "Mark Prakhin · New York · Law & Business",
  heroHeadline: "Experience that starts\nwith showing up.",
  heroSubhead:
    "Legal office professional. Business operations assistant. Student at Staten Island Technical High School.",
  aboutParagraphs: [
    "I'm a junior at Staten Island Technical High School with hands-on professional experience in a real legal environment. Since June 2024, I've worked at the Law Office of Yuriy Prakhin, P.C., where I shadow attorneys, assist with paralegal-level tasks, and support the day-to-day work that moves cases forward — giving me a close look at how litigation actually operates from the inside.",
    "My interests sit at the intersection of law, business strategy, and civic engagement. I'm drawn to litigation and how legal institutions operate, and I'm equally interested in the operational and marketing decisions that allow professional firms to grow. Outside of work, I compete in varsity tennis and swimming and take part in civic programs including NYC HRA's Youth Action 50 council.",
    "I'm building this experience deliberately, one role at a time — with the goal of entering the legal or business world with a foundation that goes beyond the classroom.",
  ],
  contactEmail: "markp19224@gmail.com",
  domain: "markprakhin.com", // not yet registered; configure before deploy
  school: "Staten Island Technical High School",
  classYear: "Class of 2028",
  languages: ["English", "Russian"],
};

// ─── PROFESSIONAL EXPERIENCE ──────────────────────────────────────────────────

export const experience: Experience[] = [
  {
    id: "law-office",
    status: "verified",
    title: "Legal Office & Marketing Operations Assistant",
    organization: "Law Office of Yuriy Prakhin, P.C.",
    organizationApproved: true,
    websiteUrl: "https://prakhinlaw.com",
    period: "June 2024 – Present",
    location: "New York, NY",
    bullets: [
      "Shadow attorneys through consultations, case discussions, and day-to-day firm work — gaining direct exposure to how legal matters are assessed, developed, and managed in a litigation practice.",
      "Assist with paralegal-level tasks including organizing case files, preparing documents, and supporting the workflow that moves cases forward from intake through resolution.",
      "Conduct legal research to support case preparation — reviewing relevant statutes, precedents, and procedural requirements under attorney supervision.",
      "Draft and proofread correspondence, client-facing documents, and internal materials, developing an eye for the precision and clarity legal writing demands.",
      "Support general firm operations — coordinating schedules, managing records, and ensuring case files and documentation are accurate and accessible.",
    ],
    tags: ["Legal Operations", "Case Support", "Legal Research", "Paralegal Work", "Litigation"],
  },
  {
    id: "nyc-scale",
    status: "verified",
    title: "Founder & CTO",
    organization: "NYC Scale Services",
    organizationApproved: true,
    websiteUrl: "https://nycscaleservices.com",
    period: "2026 – Present",
    location: "New York, NY",
    bullets: [
      "Founded a student-led digital services company, building it from the ground up into a 7-person team serving 16 paying clients across New York City.",
      "Led technology direction and digital services strategy — including website development, Google Business Profile optimization, local SEO, and online reputation management for client businesses.",
      "Drove business development and client outreach: identifying prospective local businesses, developing service proposals, and building professional relationships with owners and operators.",
      "Researched and implemented digital marketing strategies for clients, including local search visibility improvements and content optimization across listings and directories.",
      "Explored automation tools and AI-powered marketing approaches to improve client workflows and discoverability in emerging search platforms.",
    ],
    tags: ["Entrepreneurship", "Digital Marketing", "Business Development", "SEO", "Technology Strategy"],
    // Verified by Mark — October 2026. Figures represent gross company revenue, not personal income.
    metrics: [
      { value: "16",   label: "Clients Served" },
      { value: "$36K", label: "Gross Revenue" },
      { value: "7",    label: "Team Members" },
    ],
  },
  {
    id: "medical-office",
    status: "verified",
    title: "Patient Services & Administrative Coordinator",
    organization: "Mindful Care",
    organizationApproved: true,
    period: "Prior to June 2024", // TODO: confirm exact dates with Mark
    location: "New York, NY",
    bullets: [
      "Served as a front-facing point of contact for patients — managing check-ins, coordinating appointments, and ensuring a professional and organized experience from arrival through checkout.",
      "Maintained and updated patient records, insurance documentation, and administrative files in compliance with office protocols.",
      "Supported physicians and clinical staff with scheduling, referral coordination, and internal communications to keep daily operations running smoothly.",
      "Handled a fast-paced front desk environment requiring clear communication, discretion, and the ability to manage competing priorities with professionalism.",
    ],
    tags: ["Healthcare Administration", "Patient Services", "Office Operations", "Records Management"],
  },
];

// ─── LEADERSHIP & SERVICE ─────────────────────────────────────────────────────

export const leadership: LeadershipItem[] = [
  {
    id: "ya50",
    status: "verified",
    title: "Selected Council Member",
    organization: "NYC HRA Youth Action 50 (2026–27)",
    period: "October 2026 – Present",
    description:
      "Selected for New York City's Human Resources Administration Youth Action 50 council — a competitive civic leadership program that brings together young New Yorkers to engage with city policy, community challenges, and public service. One of the incoming 2026–27 cohort members.",
  },
  {
    id: "varsity-tennis",
    status: "verified",
    title: "Varsity Tennis",
    organization: "Staten Island Technical High School",
    period: "Ongoing",
    description:
      "Competing at the varsity level, developing discipline, focus under pressure, and sustained performance across a full competitive season.",
  },
  {
    id: "varsity-swim",
    status: "verified",
    title: "Varsity Swimming",
    organization: "Staten Island Technical High School",
    period: "Ongoing",
    description:
      "Varsity swimmer committed to the physical conditioning and competitive consistency required at the high school level.",
  },
  {
    id: "jsu",
    status: "verified",
    title: "Borough President",
    organization: "Jewish Student Union",
    period: "Ongoing",
    description: "Serves as Borough President for the Jewish Student Union, representing and leading student engagement across the borough through community programming, cultural initiatives, and peer outreach.",
  },
  {
    id: "deca",
    status: "needsReview", // current-year participation unconfirmed
    title: "Participant",
    organization: "DECA",
    period: "Past participation — current year TBD",
    description:
      "Engaged with DECA's entrepreneurship and business competition curriculum.",
  },
  {
    id: "community-service",
    status: "needsReview", // hours and organization need verification
    title: "Community Volunteer",
    organization: "Various — verify org names before display",
    period: "2026",
    description:
      "60+ hours of community service in 2026, including volunteering with a lung cancer awareness organization. Verify exact organization name and activities before publishing.",
  },
];

// ─── SKILLS ──────────────────────────────────────────────────────────────────

export const skills: SkillCategory[] = [
  {
    category: "Business Operations",
    skills: [
      "Office Administration",
      "Professional Workflows",
      "Document Preparation",
      "Scheduling & Coordination",
    ],
  },
  {
    category: "Digital Marketing",
    skills: [
      "Google Business Profile",
      "Local SEO",
      "Online Reputation Management",
      "Marketing Copywriting",
      "Business Listing Optimization",
    ],
  },
  {
    category: "Communications",
    skills: [
      "Client-Facing Communications",
      "Written Content",
      "Professional Correspondence",
      "Public Speaking",
    ],
  },
  {
    category: "Technology",
    skills: [
      "Web Fundamentals",
      "Spreadsheets & Productivity Tools",
      "Digital Content Creation",
      "Basic Coding",
    ],
  },
  {
    category: "Languages",
    skills: ["English (Native)", "Russian (Fluent)"],
  },
];

// ─── INTERESTS & DIRECTION ────────────────────────────────────────────────────

export const interests = {
  headline: "Where I'm headed.",
  body: "My professional work has made me curious about the full ecosystem of law — how firms operate, how cases develop, and how the legal system intersects with business and community. I'm actively exploring opportunities in litigation, firm operations, and civic law, while continuing to develop skills in business strategy, marketing, and professional communications.",
  areas: [
    "Litigation & Criminal Justice",
    "Law Firm Operations",
    "Business Strategy",
    "Civic Engagement & Public Policy",
    "Entrepreneurship",
    "Professional Communications",
  ],
};

// ─── NAV LINKS ────────────────────────────────────────────────────────────────

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Leadership", href: "#leadership" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
