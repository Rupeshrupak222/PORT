export interface Milestone {
  year: string;
  period: string;
  stage: string;
  company: string;
  location: string;
  role: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  coordinates: { x: number; y: number; z: number };
  badge: string;
}

export const experienceMilestones: Milestone[] = [
  {
    year: "2026",
    period: "March 2026 — Present",
    stage: "STAGE 03 // CURRENT",
    company: "SR's Adyapan Edutech Pvt. Ltd.",
    location: "India",
    role: "Tech Team Head",
    title: "Tech Team Head",
    subtitle: "Leading Full Tech Team — Web Platforms & Mobile App",
    description: "Leading the entire tech team and end-to-end development of multiple web platforms and the Adyapan mobile application. Built adyapan.com, adyapanschool.com, adyapancrm.in, and Adyapan App from scratch. Managing architecture decisions, product roadmap, and deployment for a platform powering 10,000+ active users.",
    deliverables: [
      "Built adyapan.com, adyapanschool.com, adyapancrm.in, and the Adyapan mobile app from scratch as sole/lead engineer.",
      "Architected multi-role systems (admin, teacher, student) with JWT auth, MongoDB, and PostgreSQL backends.",
      "Integrated Razorpay payment gateway for course purchases across the Adyapan platform.",
      "Managed CI/CD pipelines, Vercel deployments, and AWS cloud infrastructure for 10K+ concurrent users.",
      "Led a team of developers, conducting code reviews, sprint planning, and product architecture decisions."
    ],
    technologies: ["Next.js 14", "React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Prisma ORM", "Razorpay", "AWS", "Tailwind CSS", "React Native", "Capacitor"],
    coordinates: { x: 2, y: 2.0, z: -6 },
    badge: "TECH TEAM HEAD"
  },
  {
    year: "2025",
    period: "May 2025 — February 2026",
    stage: "STAGE 02 // TRAINING",
    company: "LinuxWorld Informatics Pvt. Ltd.",
    location: "Jaipur, India",
    role: "Full Stack Developer Trainee",
    title: "Full Stack Developer Trainee",
    subtitle: "Vimal Daga Sir — Linux, DevOps, Docker & Cloud",
    description: "Completed intensive training in full-stack web development, Linux system administration, DevOps, Docker, cloud computing, and server management under the mentorship of Vimal Daga Sir at LinuxWorld Informatics.",
    deliverables: [
      "Mastered Linux system administration, shell scripting, and server management for production environments.",
      "Completed hands-on training in DevOps practices — Docker containerization, CI/CD pipelines, and automated deployments.",
      "Built and deployed cloud-native applications on AWS with EC2, S3, and CloudFront infrastructure.",
      "Developed full-stack web applications integrating modern frameworks with Linux-based backend environments.",
      "Gained deep expertise in server security, networking fundamentals, and container orchestration."
    ],
    technologies: ["Linux", "Docker", "AWS", "Node.js", "Express.js", "React.js", "Git", "Shell Scripting", "CI/CD", "Nginx", "PostgreSQL"],
    coordinates: { x: -2, y: 0.8, z: -4 },
    badge: "DEVOPS & CLOUD"
  },
  {
    year: "2025",
    period: "Jan 2025 — July 2025",
    stage: "STAGE 01 // EARLY CAREER",
    company: "Freelance & Personal Projects",
    location: "Jaipur, India",
    role: "Full Stack Developer",
    title: "Full Stack Developer",
    subtitle: "React, Node.js, MongoDB & Personal Project Building",
    description: "Built and shipped multiple production web applications independently — e-commerce platforms, service booking systems, and client websites. Focused on mastering the full stack with React, Node.js, Express, MongoDB, and MySQL.",
    deliverables: [
      "Built and deployed multiple production web apps — Servix, FlickCart, Montaraw, Simora, and Admission Route.",
      "Engineered REST APIs with Node.js, Express.js, JWT authentication, and relational/document databases.",
      "Designed responsive UIs with React.js and Tailwind CSS optimized for mobile and desktop.",
      "Deployed projects on Netlify, Vercel, and Render with continuous delivery pipelines."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "MySQL", "Tailwind CSS", "Netlify", "Vercel"],
    coordinates: { x: 2, y: -0.5, z: -2 },
    badge: "FREELANCE"
  }
];
