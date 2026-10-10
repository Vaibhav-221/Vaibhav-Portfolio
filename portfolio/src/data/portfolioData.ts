export interface PersonalInfo {
  name: string;
  shortName: string;
  tagline: string;
  role: string;
  department: string;
  institution: string;
  cgpa: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  location: string;
  github: string;
  githubUsername: string;
  linkedin: string;
  bioParagraphs: string[];
  resumeUrl: string;
  resumeFileName: string;
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  accent: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'All' | 'Full Stack' | 'AI & ML' | 'Open Source';
  timeline: string;
  color: string;
  accentColor: string;
  featured: boolean;
  metrics?: string;
  githubUrl: string;
  liveUrl?: string;
  description: string;
  techStack: string[];
  keyHighlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  statusTag?: string;
  color: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface AchievementItem {
  title: string;
  badge: string;
  organization: string;
  detail: string;
  color: string;
}

export interface SkillCategory {
  categoryName: string;
  iconName: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export const personalInfo: PersonalInfo = {
  name: "Vaibhav Singh",
  shortName: "Vaibhav",
  tagline: "Full Stack Engineer & Open Source Contributor",
  role: "Full Stack Developer (CSE '29)",
  department: "Computer Science & Engineering",
  institution: "Veer Bahadur Singh Purvanchal University, Jaunpur",
  cgpa: "8.30",
  email: "vaibhavsinghcbm@gmail.com",
  phone: "+919125355790",
  phoneDisplay: "(+91) 91253-55790",
  location: "Pratapgarh, Uttar Pradesh, India",
  github: "https://github.com/Vaibhav-221",
  githubUsername: "Vaibhav-221",
  linkedin: "https://www.linkedin.com/in/vaibhav-singh-a9200a2b9/",
  bioParagraphs: [
    "Hi, I'm Vaibhav Singh, a passionate Full Stack Developer and Open Source Contributor pursuing B.Tech in Computer Science and Engineering at Veer Bahadur Singh Purvanchal University (CGPA 8.30).",
    "I specialize in engineering high-impact, real-time web architectures and AI-driven workflows using Next.js, React, FastAPI, Node.js, and Firebase. From university platforms serving hundreds of active students to micro-funding platforms and generative AI assessment engines, I focus on delivering scalable, bulletproof software with delightful user experience.",
    "Recognized in the top 1% nationwide among 50,000+ contributors in GirlScript Summer of Code (GSSoC '26), I thrive in collaborative environments where performance, accessibility, and clean component systems meet creative interaction design."
  ],
  resumeUrl: "/assets/docs/Vaibhav_resume.pdf",
  resumeFileName: "Vaibhav_Singh_Resume.pdf",
};

export const impactMetrics: MetricItem[] = [
  {
    id: "users",
    value: "500+",
    label: "Monthly Active Users",
    sublabel: "Active student community on VBSPU PYQ Hub",
    accent: "#c5ff41",
  },
  {
    id: "downloads",
    value: "10,000+",
    label: "Academic Downloads",
    sublabel: "Verified semester resources & question papers",
    accent: "#0a84ff",
  },
  {
    id: "gssoc",
    value: "Top 1%",
    label: "GSSoC '26 Nationwide",
    sublabel: "Ranked among 50,000+ open-source developers",
    accent: "#ff9f0a",
  },
  {
    id: "hackathon",
    value: "Rank #1",
    label: "SIH '26 University Round",
    sublabel: "Smart India Hackathon campus selection (50+ teams)",
    accent: "#bf5af2",
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "statkarmyog",
    title: "StatKarmyog",
    subtitle: "AI-Powered Competency & Learning Platform",
    category: "AI & ML",
    timeline: "2026",
    color: "#bf5af2",
    accentColor: "#c5ff41",
    featured: true,
    githubUrl: "https://github.com/Vaibhav-221/StatKarmyog",
    description:
      "An intelligent skill competency mapping and automated evaluation platform that harnesses retrieval-augmented generation (RAG) to align learners' competencies with industry requirements and adaptive learning roadmaps.",
    techStack: ["React.js", "FastAPI", "Python", "Google Gemini", "LangChain", "ChromaDB", "Sentence Transformers"],
    keyHighlights: [
      "Semantic similarity indexing powered by ChromaDB vector store and Sentence Transformers",
      "Dynamic prompt engineering with Google Gemini API and LangChain pipelines",
      "Interactive assessment dashboard with instant feedback and milestone tracking",
      "High-throughput FastAPI microservice backend connected to modern React UI"
    ],
  },
  {
    id: "vbspu-pyq-hub",
    title: "VBSPU PYQ Hub",
    subtitle: "University Academic Question Bank & Resource Platform",
    category: "Full Stack",
    timeline: "2026 - Present",
    color: "#0a84ff",
    accentColor: "#00d2ff",
    featured: true,
    metrics: "500+ Monthly Users • 10K+ Downloads",
    githubUrl: "https://github.com/Vaibhav-221/VBSPU-PYQ-Hub",
    description:
      "A production-grade educational platform built to provide Veer Bahadur Singh Purvanchal University engineering students with verified previous year question papers, notes, and academic guidance.",
    techStack: ["Next.js", "Firebase Firestore", "Node.js", "Express", "Razorpay", "Tailwind CSS", "Search Console"],
    keyHighlights: [
      "Currently serving 500+ active students every month with 10,000+ recorded downloads",
      "Ranked #1 on Google Search queries for Purvanchal University CSE semester question papers",
      "Real-time metadata querying and indexed categorizations via Cloud Firestore",
      "Integrated micro-support donations through secure Razorpay payment gateway"
    ],
  },
  {
    id: "get-me-a-chai",
    title: "Get-Me-A-Chai",
    subtitle: "Creator Crowdfunding & Direct Support Platform",
    category: "Full Stack",
    timeline: "2026",
    color: "#ff9f0a",
    accentColor: "#ff375f",
    featured: true,
    githubUrl: "https://github.com/Vaibhav-221/Get-Me-A-Chai",
    description:
      "A modern creator monetization platform inspired by BuyMeACoffee and Patreon, designed for developers and creators to receive direct financial sponsorships and community contributions.",
    techStack: ["Next.js App Router", "NextAuth.js", "MongoDB", "Mongoose", "Razorpay", "Tailwind CSS"],
    keyHighlights: [
      "Secure OAuth authentication and profile management utilizing NextAuth.js",
      "Dynamic vanity routing for creator handles with live transaction feeds and leaderboard",
      "Server-side cryptographic Razorpay signature validation and webhook handlers",
      "Fast database operations with Mongoose schema indexing and aggregations"
    ],
  },
  {
    id: "attendance-sarthi",
    title: "Attendance Sarthi",
    subtitle: "Real-Time Attendance Management System",
    category: "Full Stack",
    timeline: "2026",
    color: "#30d158",
    accentColor: "#34e89e",
    featured: false,
    githubUrl: "https://github.com/Vaibhav-221/Attendance-Sarthi",
    description:
      "A real-time attendance tracking and analytics system tailored for universities and schools to replace manual registers with synchronized cloud records and automated percentage tracking.",
    techStack: ["Next.js", "Firebase Auth", "Cloud Firestore", "Tailwind CSS", "React Context"],
    keyHighlights: [
      "Instant multi-user sync using Firebase Firestore real-time snapshot listeners",
      "Role-based authorization distinguishing educators, class representatives, and students",
      "Automated attendance shortage alerts and semester-wise percentage analytics",
      "Lightweight, mobile-first responsive interface optimized for low network latency"
    ],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: "gssoc-2026",
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code (GSSoC '26)",
    type: "Open Source Program",
    period: "May 2026 – Aug 2026",
    statusTag: "Top 1% Nationwide",
    color: "#ff9f0a",
    description:
      "Selected as an active open-source contributor in India's largest developer initiative. Contributed to high-traffic repositories, resolved intricate UI/UX bugs, and collaborated across multi-region developer teams.",
    achievements: [
      "Ranked in the Top 1% nationwide out of 50,000+ registered contributors",
      "Authored and merged 5+ production pull requests across projects including CODEVIBE and Eventra",
      "Improved performance, layout consistency, and responsive behavior across mobile viewports",
      "Recognized for high-impact contributions in Hacktoberfest 2026"
    ],
    skills: ["Git & GitHub", "React.js", "Next.js", "Open Source Collaboration", "Code Reviews"],
  },
  {
    id: "gaotek-intern",
    role: "WordPress Developer Intern",
    company: "GAOTek Inc.",
    type: "Remote Internship",
    period: "Jun 2025 – Aug 2025",
    statusTag: "3 Leadership Promotions",
    color: "#0a84ff",
    description:
      "Engineered and customized responsive corporate web interfaces for international enterprise web properties. Demonstrated technical leadership and rapid problem solving across large distributed cohorts.",
    achievements: [
      "Delivered responsive, production-ready layouts for 3 enterprise web properties",
      "Awarded 3 consecutive merit promotions in a cohort of 180 interns: Assistant Squad Leader → Squad Leader → Platoon Leader",
      "Led daily scrum standups, coordinated sprint deliverables, and reviewed technical documentation",
      "Ensured high adherence to cross-browser compatibility and web accessibility standards"
    ],
    skills: ["Web Development", "UI Engineering", "Team Leadership", "Scrum / Agile", "Technical Documentation"],
  },
];

export const achievementsData: AchievementItem[] = [
  {
    title: "Adobe University Hackathon 2026",
    badge: "Top 416 National Qualifier",
    organization: "Adobe India",
    detail: "Cleared 2 rigorous competitive evaluation rounds out of 3,00,000+ registrations across India.",
    color: "#ff375f",
  },
  {
    title: "Smart India Hackathon (SIH) 2026",
    badge: "Rank #1 University Selection",
    organization: "Ministry of Education / VBSPU",
    detail: "Secured 1st rank in campus internal selection among 50+ competing teams and 300+ engineering students.",
    color: "#c5ff41",
  },
  {
    title: "GSSoC '26 Top 1% Contributor",
    badge: "National Honor",
    organization: "GirlScript Foundation",
    detail: "Earned top 1% national rank among 50,000+ active developers with 5+ merged production pull requests.",
    color: "#ff9f0a",
  },
  {
    title: "30 Days of Building Series",
    badge: "Developer Community",
    organization: "LinkedIn Engineering Series",
    detail: "Published daily engineering insights and build-in-public logs focusing on real-world web architecture.",
    color: "#0a84ff",
  },
];

export const skillCategoriesData: SkillCategory[] = [
  {
    categoryName: "Languages",
    iconName: "code",
    skills: [
      { name: "JavaScript (ES6+)", level: 90, highlight: true },
      { name: "TypeScript", level: 85, highlight: true },
      { name: "Python", level: 80, highlight: true },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "SQL", level: 75 },
    ],
  },
  {
    categoryName: "Frontend Engineering",
    iconName: "layout",
    skills: [
      { name: "React.js", level: 90, highlight: true },
      { name: "Next.js (App Router)", level: 88, highlight: true },
      { name: "Tailwind CSS", level: 92, highlight: true },
      { name: "Component Architecture", level: 85 },
      { name: "Responsive & Mobile UI", level: 95 },
    ],
  },
  {
    categoryName: "Backend & APIs",
    iconName: "server",
    skills: [
      { name: "Node.js", level: 82, highlight: true },
      { name: "Express.js", level: 80 },
      { name: "FastAPI", level: 78, highlight: true },
      { name: "RESTful API Design", level: 88 },
      { name: "Server Actions", level: 80 },
    ],
  },
  {
    categoryName: "Databases & AI Tools",
    iconName: "database",
    skills: [
      { name: "MongoDB & Mongoose", level: 85, highlight: true },
      { name: "Cloud Firestore", level: 88, highlight: true },
      { name: "ChromaDB (Vector DB)", level: 75 },
      { name: "Google Gemini API", level: 82, highlight: true },
      { name: "LangChain", level: 72 },
    ],
  },
  {
    categoryName: "DevOps & Integrations",
    iconName: "settings",
    skills: [
      { name: "Git & GitHub", level: 92, highlight: true },
      { name: "Vercel & Render", level: 85 },
      { name: "Razorpay Payments", level: 88, highlight: true },
      { name: "NextAuth.js / Firebase Auth", level: 86, highlight: true },
      { name: "Postman & API Testing", level: 85 },
    ],
  },
];

