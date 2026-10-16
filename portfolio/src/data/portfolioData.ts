export interface PersonalInfo {
  name: string;
  shortName: string;
  tagline: string;
  role: string;
  department: string;
  institution: string;
  cgpa: string;
  email: string;
  location: string;
  github: string;
  githubUsername: string;
  linkedin: string;
  twitter: string;
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
  category: 'All' | 'Full Stack' | 'AI & ML' | 'Open Source' | 'Automation';
  timeline: string;
  color: string;
  accentColor: string;
  featured: boolean;
  metrics?: string;
  githubUrl: string;
  liveUrl?: string;
  description: string;
  overview: string[];
  architecture: string;
  database: string;
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
  skills: { name: string; highlight?: boolean }[];
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
  location: "Pratapgarh, Uttar Pradesh, India",
  github: "https://github.com/Vaibhav-221",
  githubUsername: "Vaibhav-221",
  linkedin: "https://www.linkedin.com/in/vaibhav-singh-a9200a2b9/",
  twitter: "https://x.com/VaibhavS92068",
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
    metrics: "88 automated tests • 9 workflows • 2 evidence sources",
    description:
      "Maps learner competencies to industry needs and builds adaptive learning paths with AI-assisted assessment.",
    overview: [
      "Built for Smart India Hackathon problem statement 26101, StatKarmyog gives statistical officers and organizations such as MoSPI and NSSTA an evidence-based view of competency. It moves beyond self-declared skills and course completion by combining quiz results with work-artifact evidence.",
      "The platform maps each officer’s role to required competencies, estimates current proficiency, identifies skill gaps, recommends learning resources, and preserves assessment history so progress can be measured over time. It includes officer dashboards, competency passports, reassessment workflows, and organization-level training analytics.",
      "Recommendations combine semantic similarity with skill-tag matching. Sentence Transformers and ChromaDB support course retrieval, while Google Gemini generates quizzes from courses, competencies, or supplied documents. A mock-iGOT service demonstrates enrollment and completion workflows, with Celery and Redis handling asynchronous events."
    ],
    architecture: "Three-service prototype: React and Vite frontend, Python and FastAPI application backend, and a mock-iGOT integration service.",
    database: "SQLite with SQLAlchemy ORM.",
    techStack: ["React", "Vite", "Ant Design", "Recharts", "Python", "FastAPI", "SQLAlchemy", "SQLite", "Gemini", "LangChain", "Sentence Transformers", "ChromaDB", "Celery", "Redis", "Pytest"],
    keyHighlights: [
      "88 automated backend unit and integration tests are included in the repository",
      "Nine primary workflows cover login, dashboards, gap analysis, quizzes, artifacts, competency passports, progress, and administration",
      "Combines two evidence sources—quizzes and work artifacts—and retains historical competency scores",
      "A three-service prototype connects the React frontend, FastAPI backend, and mock-iGOT integration service"
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
    liveUrl: "https://www.vbspu-pyq-hub.online",
    description:
      "A student resource hub for verified VBSPU question papers, notes, and academic guidance.",
    overview: [
      "VBSPU PYQ Hub gives students of Veer Bahadur Singh Purvanchal University free access to previous-year question papers, organized from semester to subject to year. Students can preview and download PDFs without creating an account.",
      "The site covers all eight semesters and stores paper metadata and PDF links in Cloud Firestore. It also includes responsive navigation, dark mode, contact and newsletter forms, legal pages, and student support. Search metadata, canonical URLs, sitemap and robots files support its SEO setup.",
      "A Node.js and Express service supports donations through Razorpay. It creates payment orders and verifies payment signatures on the server using HMAC-SHA256. The project is deployed as a live student-facing resource."
    ],
    architecture: "Next.js frontend with a Node.js and Express payment service; Firebase provides the cloud data layer.",
    database: "Firebase Cloud Firestore.",
    techStack: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "Node.js", "Express", "Firestore", "Razorpay", "EmailJS", "Web3Forms", "Google Search Console"],
    keyHighlights: [
      "Covers all eight semesters and hosts 100+ authentic previous-year question papers",
      "Repository reports more than 10,000 PDF downloads; resource access does not require sign-up",
      "Three-step discovery flow: semester, subject, then paper",
      "Three Express payment endpoints handle configuration, order creation, and payment verification",
      "The repository contains 147 commits"
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
    liveUrl: "https://get-me-a-chai-plum.vercel.app",
    description:
      "A creator-support platform for sponsorships, profile discovery, and secure Razorpay-powered contributions.",
    overview: [
      "Get-Me-A-Chai is a creator-support platform where people can discover public username-based creator pages and send direct contributions. Creators can manage their profiles and view support through a dashboard.",
      "Google and GitHub sign-in use NextAuth.js, with account and creator data stored in MongoDB through Mongoose. Dynamic routes make each creator page available through a personal username.",
      "Razorpay completes the payment flow: the backend creates an order, the supporter checks out, and the server verifies the payment signature before saving payment and creator details."
    ],
    architecture: "Next.js App Router application with authentication, creator profile pages, dashboards, MongoDB models, and server-side payment routes.",
    database: "MongoDB accessed through Mongoose.",
    techStack: ["Next.js", "React", "Tailwind CSS", "NextAuth.js", "MongoDB", "Mongoose", "Razorpay", "React Toastify"],
    keyHighlights: [
      "Supports two OAuth providers: Google and GitHub",
      "Includes one payment gateway, Razorpay, with server-side payment verification",
      "Implements the complete flow from sign-in and creator profile to payment verification",
      "The repository contains 133 commits"
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
      "A school and university attendance platform with live records, role-based access, and analytics.",
    overview: [
      "Attendance Sarthi replaces manual classroom tracking with separate workflows for students and Class Representatives. CRs can manage subjects, class information, daily schedules, and attendance; students can review schedules, records, history, and subject-level attendance trends.",
      "Firebase Authentication handles identity and Cloud Firestore stores users, roles, classes, subjects, schedules, and date-based attendance. Real-time listeners keep schedule and attendance information current without a full page refresh.",
      "The frontend uses Next.js and React with a responsive Tailwind CSS interface. Firebase supplies authentication and data services, so the project does not rely on a separate custom backend server."
    ],
    architecture: "Next.js and React frontend backed by Firebase Authentication and Cloud Firestore; no separate custom backend server.",
    database: "Firebase Cloud Firestore.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Firebase Authentication", "Firestore", "Lucide React", "React Calendar"],
    keyHighlights: [
      "Supports two primary roles: Student and Class Representative",
      "Provides distinct attendance and class-management workflows for each role",
      "Uses Firestore real-time synchronization for schedule and attendance updates",
      "Includes daily, weekly, monthly, and subject-level attendance calculations",
      "The repository contains 53 commits"
    ],
  },
  {
    id: "jarvis-voice-assistant",
    title: "Jarvis",
    subtitle: "Voice-Controlled Python Desktop Assistant",
    category: "Automation",
    timeline: "Python Desktop",
    color: "#bf5af2",
    accentColor: "#8b5cf6",
    featured: false,
    githubUrl: "https://github.com/Vaibhav-221/Jarvis",
    metrics: "4 web shortcuts • 4 music links • 2 API integrations",
    description: "A voice-driven desktop assistant for web shortcuts, music, news, and AI-powered questions.",
    overview: [
      "Jarvis is a Python desktop assistant that listens for the wake word “Jarvis” and turns recognized speech into actions or spoken responses.",
      "It opens preset Google, Facebook, YouTube, and LinkedIn pages, plays mapped YouTube music links, retrieves news through NewsAPI, and sends general questions to OpenAI GPT-3.5 Turbo. pyttsx3 provides spoken output.",
      "The project is a local desktop prototype. Its speech recognition depends on the configured Google speech service, while news and general answers require their respective API credentials."
    ],
    architecture: "A Python desktop script routes microphone-recognized commands to browser shortcuts, music links, NewsAPI, or the OpenAI chat API, then speaks responses with pyttsx3.",
    database: "None; shortcuts and music mappings are defined in the application code.",
    techStack: ["Python", "SpeechRecognition", "pyttsx3", "Google Speech Recognition", "NewsAPI", "OpenAI GPT-3.5 Turbo", "webbrowser"],
    keyHighlights: [
      "Uses the “Jarvis” wake word to start voice-command handling",
      "Includes four preset website shortcuts and four mapped music links",
      "Connects to NewsAPI and OpenAI GPT-3.5 Turbo for external information and Q&A",
      "Uses pyttsx3 for spoken responses; no persistent database is configured"
    ],
  },
  {
    id: "nexora-ai-wrapper",
    title: "Nexora AI Wrapper",
    subtitle: "Local LLM Chat Dashboard",
    category: "AI & ML",
    timeline: "Local AI",
    color: "#0a84ff",
    accentColor: "#00d2ff",
    featured: false,
    githubUrl: "https://github.com/Vaibhav-221/Nexora-AI-Wrapper",
    metrics: "Dynamic model discovery • Local Ollama API • Responsive chat UI",
    description: "A Next.js chat dashboard that discovers local Ollama models and sends conversations to the selected model.",
    overview: [
      "Nexora AI Wrapper provides a chat interface for language models served by a locally running Ollama instance. Users can discover available models, choose one, and start conversations.",
      "The Next.js API route forwards chat requests and conversation context to Ollama’s local API. The interface includes navigation, model selection, message composition, loading states, and error handling.",
      "Conversation state is held in the browser session and is not persisted to a database, so chats reset when the application state is cleared. Ollama must be running locally for model discovery and responses."
    ],
    architecture: "A Next.js frontend manages chat state and calls a Next.js API route, which forwards model and conversation requests to the local Ollama service.",
    database: "None; conversation state is held in React memory and is not persisted between sessions.",
    techStack: ["Next.js", "React", "JavaScript", "Tailwind CSS", "Lucide React", "Ollama"],
    keyHighlights: [
      "Discovers and selects models provided by a local Ollama instance",
      "Routes prompts and conversation context through a Next.js API route",
      "Includes responsive navigation, model selection, chat, and message input UI",
      "Requires Ollama to be running locally; chat history is not stored persistently"
    ],
  },
  {
    id: "auto-reply-bot",
    title: "Auto Reply Bot",
    subtitle: "Gemini-Assisted Instagram DM Automation",
    category: "Automation",
    timeline: "Desktop Automation",
    color: "#ff375f",
    accentColor: "#ff9f0a",
    featured: false,
    githubUrl: "https://github.com/Vaibhav-221/Auto-reply-Bot",
    metrics: "Gemini reply generation • In-memory duplicate checks",
    description: "A Python desktop prototype that reads visible Instagram messages and sends short Hinglish replies generated with Gemini.",
    overview: [
      "Auto Reply Bot automates a browser-based Instagram DM workflow from the desktop. It reads visible message text, asks Gemini 3.1 Flash Lite to generate a casual Hinglish response, then pastes and sends that response through the browser UI.",
      "PyAutoGUI and Pyperclip drive the screen and clipboard, while an in-memory check helps avoid replying to the same detected message repeatedly during a run. The script polls periodically and waits after sending a reply.",
      "This is an experimental, screen-coordinate-based prototype: it depends on the browser layout and visible UI, and its temporary duplicate tracking is lost when the script stops. It may need adjustment when the interface changes."
    ],
    architecture: "A Python loop reads visible browser content and drives clicks and keyboard input with PyAutoGUI, transfers text through Pyperclip, and requests response text from the Google Gen AI SDK.",
    database: "None; duplicate tracking is kept in memory for the current run.",
    techStack: ["Python", "PyAutoGUI", "Pyperclip", "Google Gen AI SDK", "Gemini 3.1 Flash Lite"],
    keyHighlights: [
      "Generates casual Hinglish replies using Gemini 3.1 Flash Lite",
      "Uses PyAutoGUI and Pyperclip to interact with the visible browser interface",
      "Checks recent detected messages against an in-memory set during each run",
      "Relies on screen coordinates and visible UI state, so it is an experimental desktop automation prototype"
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
      "Contributed production fixes and interface improvements across community repositories through GirlScript Summer of Code '26.",
    achievements: [
      "Ranked in the Top 1% among 50,000+ registered contributors",
      "Merged 5+ pull requests across projects including CODEVIBE and Eventra",
      "Improved responsive layouts, interface consistency, and performance across mobile viewports",
      "Recognized for high-impact contributions during Hacktoberfest 2026"
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
      "Built and adapted responsive interfaces for three corporate web properties during a remote internship with GAOTek Inc.",
    achievements: [
      "Delivered responsive layouts across three enterprise web properties",
      "Earned three consecutive promotions in a cohort of 180 interns: Assistant Squad Leader → Squad Leader → Platoon Leader",
      "Led daily stand-ups, coordinated sprint tasks, and reviewed technical documentation",
      "Applied cross-browser and accessibility checks to delivered interfaces"
    ],
    skills: ["Web Development", "UI Engineering", "Team Leadership", "Scrum / Agile", "Technical Documentation"],
  },
];

export const achievementsData: AchievementItem[] = [
  {
    title: "Adobe University Hackathon 2026",
    badge: "Top 416 National Qualifier",
    organization: "Adobe India",
    detail: "Advanced through two evaluation rounds in a competition with 300,000+ registrations across India.",
    color: "#ff375f",
  },
  {
    title: "Smart India Hackathon (SIH) 2026",
    badge: "Rank #1 University Selection",
    organization: "Ministry of Education / VBSPU",
    detail: "Placed first in the university selection among 50+ teams and 300+ engineering students.",
    color: "#c5ff41",
  },
  {
    title: "GSSoC '26 Top 1% Contributor",
    badge: "National Honor",
    organization: "GirlScript Foundation",
    detail: "Ranked in the Top 1% among 50,000+ registered contributors, with 5+ merged pull requests.",
    color: "#ff9f0a",
  },
  {
    title: "30 Days of Building Series",
    badge: "Build-in-public series",
    organization: "LinkedIn",
    detail: "Shared daily engineering notes and build updates focused on practical web architecture.",
    color: "#0a84ff",
  },
];

export const skillCategoriesData: SkillCategory[] = [
  {
    categoryName: "Languages",
    iconName: "code",
    skills: [
      { name: "JavaScript (ES6+)", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "Python", highlight: true },
      { name: "HTML5 & CSS3" },
    ],
  },
  {
    categoryName: "Frontend Engineering",
    iconName: "layout",
    skills: [
      { name: "React.js", highlight: true },
      { name: "Next.js (App Router)", highlight: true },
      { name: "Tailwind CSS", highlight: true },
      { name: "Component Architecture" },
      { name: "Responsive & Mobile UI" },
    ],
  },
  {
    categoryName: "Backend & APIs",
    iconName: "server",
    skills: [
      { name: "Node.js", highlight: true },
      { name: "Express.js" },
      { name: "FastAPI", highlight: true },
      { name: "RESTful API Design" },
      { name: "Server Actions" },
    ],
  },
  {
    categoryName: "Databases & AI Tools",
    iconName: "database",
    skills: [
      { name: "MongoDB & Mongoose", highlight: true },
      { name: "Cloud Firestore", highlight: true },
      { name: "ChromaDB (Vector DB)" },
      { name: "Google Gemini API", highlight: true },
      { name: "LangChain" },
    ],
  },
  {
    categoryName: "DevOps & Integrations",
    iconName: "settings",
    skills: [
      { name: "Git & GitHub", highlight: true },
      { name: "Vercel & Render" },
      { name: "Razorpay Payments", highlight: true },
      { name: "NextAuth.js / Firebase Auth", highlight: true },
      { name: "Postman & API Testing" },
    ],
  },
];

