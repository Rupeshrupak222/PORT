export interface ProjectMetric {
  label: string;
  value: string;
  description: string;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  category: "Full Stack" | "E-Commerce" | "Cloud & Microservices" | "WebGL & 3D" | "Mobile & Desktop" | "EdTech" | "AI & ML";
  year: string;
  client: string;
  role: string;
  brief: string;
  challenge: string;
  process: string[];
  solution: string;
  results: string[];
  techStack: string[];
  metrics: ProjectMetric[];
  previewAccent: string;
  image?: string;
  livePreviewUrl?: string;
  links?: {
    live?: string;
    github?: string;
  };
}

export const projectsData: ProjectCaseStudy[] = [
  {
    id: "adyapan-main",
    slug: "adyapan",
    number: "01",
    title: "ADYAPAN.COM",
    tagline: "Learn, Earn & Get Placed — Flagship EdTech Platform",
    category: "EdTech",
    year: "2026",
    client: "SR's Adyapan Edutech Pvt. Ltd.",
    role: "Tech Team Head & Lead Full Stack Developer",
    brief: "The flagship EdTech platform of Adyapan — powering verified skill learning, real company projects, and direct placement for 10,000+ active learners. Blockchain-verified credentials, Razorpay payments, and career GPS built from scratch.",
    challenge: "Building a high-concurrency EdTech ecosystem with course enrollment, payment processing, company marketplace tasks, and student placement tracking — all in one unified platform at scale.",
    process: [
      "Architected the full platform from scratch using Next.js 14 App Router, TypeScript, and Tailwind CSS for a fast, SEO-optimized experience.",
      "Built scalable Node.js + Express.js APIs with JWT authentication, role-based access (student, teacher, admin, company), and MongoDB storage.",
      "Integrated Razorpay payment gateway for course purchases, subscription management, and automated receipts.",
      "Built the marketplace module — companies post real tasks, students complete them and earn placement opportunities.",
      "Managed end-to-end deployment, CI/CD pipelines, and cloud infrastructure on Vercel and AWS."
    ],
    solution: "A production EdTech platform supporting thousands of concurrent learners with course management, company marketplace, payment processing, and verified credential issuance.",
    results: [
      "10,000+ active learners onboarded across multiple course categories.",
      "Razorpay payment processing with zero downtime and automated receipts.",
      "Marketplace connecting students directly with hiring companies.",
      "Recognized by NSDC, Skill India Digital Hub, and Ministry of MSME."
    ],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Razorpay", "JWT", "AWS", "Vercel"],
    metrics: [
      { label: "Active Learners", value: "10K+", description: "Concurrent platform users" },
      { label: "Payment Gateway", value: "Razorpay", description: "Secure course transactions" },
      { label: "Recognition", value: "NSDC & Skill India", description: "Govt. certified programs" }
    ],
    previewAccent: "#6366F1",
    livePreviewUrl: "https://adyapan.com",
    links: {
      live: "https://adyapan.com",
      github: "https://github.com/Rupeshrupak222"
    }
  },
  {
    id: "adyapan-school",
    slug: "adyapanschool",
    number: "02",
    title: "ADYAPAN SCHOOL",
    tagline: "Future Skills Curriculum for Class 1–12 Students",
    category: "EdTech",
    year: "2026",
    client: "SR's Adyapan Edutech Pvt. Ltd.",
    role: "Tech Team Head & Full Stack Developer",
    brief: "A school-focused EdTech platform delivering 21st-century skills curriculum — coding, AI, financial literacy, current affairs, and life skills — for students from Class 1 to 12 through live classes and interactive workshops.",
    challenge: "Designing a multi-role school management system supporting admins, teachers, and students across class-wise learning pathways (Foundation, Development, Growth, Mastery tracks) with engaging curriculum delivery.",
    process: [
      "Built the platform from scratch with Next.js 14, Tailwind CSS, and TypeScript for responsive school dashboards.",
      "Engineered multi-role backend with Node.js, Express.js, and MongoDB — supporting school admin, teacher, and student hierarchies.",
      "Implemented class-wise curriculum tracks (Foundation Class 1–5, Development 6–8, Growth 9–10, Mastery 11–12).",
      "Built hackathon management, coding championship, and career webinar event modules.",
      "Integrated analytics dashboards for school partners to track student progress and engagement."
    ],
    solution: "A comprehensive school management and curriculum delivery platform preparing students from Class 1–12 with future-ready skills.",
    results: [
      "Class-wise learning pathways covering Coding, AI, Finance, Communication, and Life Skills.",
      "School partnership portal for deploying AI curriculum and coding labs.",
      "Community features: hackathons, coding championships, and student founder clubs.",
      "Trusted by multiple partner schools with 150+ hiring partners in the network."
    ],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Vercel"],
    metrics: [
      { label: "Curriculum Tracks", value: "4 Levels", description: "Foundation to Mastery" },
      { label: "Subjects", value: "6+ Skills", description: "Coding, AI, Finance & more" },
      { label: "Classes", value: "1 – 12", description: "Complete school coverage" }
    ],
    previewAccent: "#0EA5E9",
    livePreviewUrl: "https://adyapanschool.com",
    links: {
      live: "https://adyapanschool.com",
      github: "https://github.com/Rupeshrupak222"
    }
  },
  {
    id: "sharego",
    slug: "sharego",
    number: "03",
    title: "SHAREGO",
    tagline: "Modern Social Sharing & Go-To Platform",
    category: "Full Stack",
    year: "2025",
    client: "Personal Project",
    role: "Full Stack Developer",
    brief: "A modern full-stack social sharing platform built for fast, seamless content discovery and sharing — featuring a clean, responsive UI optimized for engagement and user interaction.",
    challenge: "Creating a high-performance social platform with real-time content feeds, smooth interactions, and an intuitive UX that feels native across all devices.",
    process: [
      "Designed and built the full-stack platform with React.js and Tailwind CSS for a clean, responsive interface.",
      "Engineered backend services with Node.js and Express.js with secure JWT authentication.",
      "Optimized for fast load times and smooth interactions deployed on Netlify.",
      "Implemented real-time content feed updates and user engagement flows."
    ],
    solution: "A responsive, fast social sharing platform with seamless content discovery and clean modern UI.",
    results: [
      "Sub-second page loads with Netlify edge deployment.",
      "Fully responsive across mobile and desktop devices.",
      "Smooth real-time content feed interactions.",
      "Clean, intuitive interface driving user engagement."
    ],
    techStack: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "JavaScript", "Netlify"],
    metrics: [
      { label: "Deployment", value: "Netlify", description: "Edge CDN distribution" },
      { label: "UX", value: "Responsive", description: "Mobile & desktop optimized" },
      { label: "Performance", value: "<1s Load", description: "Netlify edge caching" }
    ],
    previewAccent: "#F59E0B",
    livePreviewUrl: "https://sharego1.netlify.app/",
    links: {
      live: "https://sharego1.netlify.app/",
      github: "https://github.com/Rupeshrupak222"
    }
  },
  {
    id: "adyapan-crm",
    slug: "adyapancrm",
    number: "04",
    title: "ADYAPAN CRM",
    tagline: "Internal CRM & Hub Portal for Adyapan Operations",
    category: "Full Stack",
    year: "2026",
    client: "SR's Adyapan Edutech Pvt. Ltd.",
    role: "Tech Team Head & Full Stack Developer",
    brief: "A custom-built internal CRM Hub platform for Adyapan Edutech's operations — managing student leads, enrollment pipelines, multi-role staff access, and real-time analytics across the entire organization.",
    challenge: "Building a secure, multi-portal CRM that handles large lead volumes, team-based assignment, multi-stage sales funnels, and real-time data with different views for agents, team leads, and administrators.",
    process: [
      "Built the full CRM from scratch with React.js, TypeScript, and Tailwind CSS for a fast, data-dense internal UI.",
      "Engineered Node.js + Express.js APIs with MongoDB for flexible lead schemas and pipeline stage management.",
      "Implemented multi-portal sign-in — separate dashboards for different team roles.",
      "Built real-time analytics for lead tracking, follow-up reminders, and conversion funnels.",
      "Secured with JWT auth and role-based access across agents, team leads, and admins."
    ],
    solution: "A tailored CRM centralizing Adyapan's lead operations with real-time pipelines, multi-role portals, and conversion analytics.",
    results: [
      "Multi-portal system replacing manual spreadsheet-based lead tracking.",
      "Multi-stage pipeline with automated follow-up and status tracking.",
      "Real-time analytics dashboards for management visibility.",
      "Secure role-based access for all operational levels."
    ],
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Vercel"],
    metrics: [
      { label: "Portals", value: "Multi-Role", description: "Agent, Lead & Admin access" },
      { label: "Pipeline", value: "Real-Time", description: "Live lead tracking" },
      { label: "Analytics", value: "Live Dashboard", description: "Conversion & follow-up metrics" }
    ],
    previewAccent: "#10B981",
    livePreviewUrl: "https://adyapancrm.in",
    links: {
      live: "https://adyapancrm.in",
      github: "https://github.com/Rupeshrupak222"
    }
  },
  {
    id: "adyapan-lms",
    slug: "adyapan-lms",
    number: "05",
    title: "MY.ADYAPAN — LMS",
    tagline: "Enterprise Learning Management System with Live Assessments",
    category: "EdTech",
    year: "2026",
    client: "SR's Adyapan Edutech Pvt. Ltd.",
    role: "Tech Team Head & Full Stack Developer",
    brief: "Enterprise-grade Learning Management System — the core academic delivery engine of Adyapan. Features virtual classrooms, live assessments, automated grading, student progress analytics, and scalable AWS cloud infrastructure for 12,000+ concurrent users.",
    challenge: "Supporting simultaneous live exam submissions from thousands of students without database connection pool exhaustion, race conditions, or latency spikes under peak academic load.",
    process: [
      "Built LMS modules using Next.js App Router and Tailwind CSS for responsive multi-device learning.",
      "Engineered high-throughput Express.js backend with PostgreSQL and Prisma ORM for complex academic schemas.",
      "Implemented live assessment engine with real-time auto-grading and instant result publication.",
      "Configured AWS infrastructure (EC2, S3, CloudFront) for scalable hosting and video lecture delivery.",
      "Built instructor dashboards for course creation, student management, and progress analytics."
    ],
    solution: "A cloud-hosted LMS powering Adyapan's academic delivery at scale — live tests, auto-grading, and detailed analytics for 12K+ concurrent learners.",
    results: [
      "Supported 12,000+ concurrent students during peak live exam sessions.",
      "AWS cloud scalability with zero downtime and elastic auto-scaling.",
      "End-to-end course lifecycle tracking from enrollment to certification.",
      "Automated grading engine delivering instant results post-submission."
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "AWS", "MongoDB"],
    metrics: [
      { label: "Concurrency", value: "12K+ Users", description: "Simultaneous exam sessions" },
      { label: "Cloud", value: "AWS", description: "Elastic scalable deployment" },
      { label: "Auto-Grade", value: "Instant", description: "Real-time result delivery" }
    ],
    previewAccent: "#FFFFFF",
    livePreviewUrl: "https://my.adyapan.com",
    links: {
      live: "https://my.adyapan.com",
      github: "https://github.com/Rupeshrupak222"
    }
  },
  {
    id: "adyapan-ai",
    slug: "adyapan-ai",
    number: "06",
    title: "AI.ADYAPAN — AI PLATFORM",
    tagline: "Smart AI-Powered Learning & Assistance Platform",
    category: "AI & ML",
    year: "2026",
    client: "SR's Adyapan Edutech Pvt. Ltd.",
    role: "Tech Team Head & Full Stack Developer",
    brief: "Adyapan's dedicated AI-powered learning platform — delivering smart course recommendations, AI-assisted doubt resolution, personalized learning paths, and intelligent content discovery for EdTech learners.",
    challenge: "Building an AI-first EdTech interface that integrates LLM-based assistance, personalized recommendations, and smart content delivery without compromising on page speed or user experience.",
    process: [
      "Built the AI platform frontend with Next.js 14, TypeScript, and Tailwind CSS for a sleek, intelligent UI.",
      "Integrated LLM APIs for AI-powered doubt resolution, quiz generation, and personalized learning path suggestions.",
      "Engineered backend APIs with Node.js and Express.js connecting AI models to the Adyapan student database.",
      "Implemented real-time AI chat interface with streaming responses for instant student assistance.",
      "Deployed on Vercel with edge functions for low-latency AI response delivery."
    ],
    solution: "An AI-first learning companion that enhances Adyapan's platform with smart assistance, personalized paths, and intelligent content recommendations.",
    results: [
      "Real-time AI doubt resolution integrated directly into the learning experience.",
      "Personalized learning path recommendations based on student progress data.",
      "AI quiz and assessment generation for dynamic practice content.",
      "Seamless integration with the main Adyapan platform and LMS."
    ],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "LLM APIs", "MongoDB", "Vercel"],
    metrics: [
      { label: "AI Features", value: "Smart Assist", description: "Doubt resolution & quiz gen" },
      { label: "Response", value: "Real-Time", description: "Streaming AI responses" },
      { label: "Integration", value: "Full Stack", description: "Connected to LMS & main app" }
    ],
    previewAccent: "#8B5CF6",
    livePreviewUrl: "https://ai.adyapan.com",
    links: {
      live: "https://ai.adyapan.com",
      github: "https://github.com/Rupeshrupak222"
    }
  }
];

export const projectCategories = [
  "All Projects",
  "EdTech",
  "AI & ML",
  "Full Stack",
] as const;
