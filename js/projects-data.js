/**
 * Portfolio Data Source: Projects, Skills, Timeline, Testimonials
 * Author: Madhulatha Konka
 * Role: MERN Full Stack Developer
 */

const PORTFOLIO_DATA = {
  personal: {
    name: "Madhulatha Konka",
    shortName: "Madhulatha",
    title: "MERN Full Stack Developer",
    tagline: "Building responsive, robust full-stack web applications and AI-driven conversational solutions.",
    location: "Anantapur, Andhra Pradesh, India",
    email: "Madhuu0725@gmail.com",
    phone: "+91 6309194613",
    github: "https://github.com/madhuu0725-png",
    githubDisplay: "github.com/madhuu0725-png",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    resumePdf: "assets/Madhulatha_Konka_Resume.pdf",
    degree: "B.Tech in ECE (CGPA 8.1)",
    diploma: "Diploma in ECE (CGPA 8.13)",
    languages: "English (Proficient), Telugu (Native)"
  },

  skills: [
    // MERN Stack
    { name: "React.js", category: "mern", level: "Expert", percentage: 94, icon: "⚛️" },
    { name: "Node.js", category: "mern", level: "Advanced", percentage: 90, icon: "🟩" },
    { name: "Express.js", category: "mern", level: "Advanced", percentage: 91, icon: "⚡" },
    { name: "MongoDB", category: "mern", level: "Advanced", percentage: 88, icon: "🍃" },
    { name: "JavaScript (ES6+)", category: "mern", level: "Expert", percentage: 95, icon: "💛" },

    // Frontend
    { name: "HTML5 & Semantic Web", category: "frontend", level: "Expert", percentage: 96, icon: "🌐" },
    { name: "CSS3 & Modern Layouts", category: "frontend", level: "Expert", percentage: 93, icon: "🎨" },
    { name: "Responsive Web Design", category: "frontend", level: "Expert", percentage: 95, icon: "📱" },
    { name: "Bootstrap & UI Styling", category: "frontend", level: "Advanced", percentage: 90, icon: "🅱️" },
    { name: "MVC Architecture", category: "frontend", level: "Advanced", percentage: 86, icon: "🏛️" },

    // Backend & Programming
    { name: "REST API Design & Integration", category: "backend", level: "Expert", percentage: 93, icon: "🔌" },
    { name: "JSON Data Handling", category: "backend", level: "Expert", percentage: 94, icon: "📦" },
    { name: "Python Programming", category: "backend", level: "Advanced", percentage: 90, icon: "🐍" },
    { name: "Object-Oriented Programming (OOP)", category: "backend", level: "Expert", percentage: 92, icon: "🧩" },
    { name: "SQL & Relational Databases", category: "backend", level: "Advanced", percentage: 89, icon: "🗄️" },

    // Tools & AI-Assisted Dev
    { name: "Git & GitHub Hub", category: "tools", level: "Expert", percentage: 92, icon: "🐙" },
    { name: "VS Code & Google Colab", category: "tools", level: "Expert", percentage: 94, icon: "💻" },
    { name: "AI Dev Tools (Cursor, Claude, ChatGPT)", category: "tools", level: "Expert", percentage: 96, icon: "🤖" },
    { name: "Antigravity IDE & Gemini", category: "tools", level: "Expert", percentage: 95, icon: "✨" }
  ],

  projects: [
    {
      id: "kapture-ai-maya",
      title: "Kapture AI – Maya | AI-Powered Voice Assistant",
      category: "ai",
      categoryName: "AI & Voice Automation",
      featured: true,
      image: "assets/images/kapture_ai_maya.jpg",
      summary: "Full-stack AI voice assistant for automated payment collection calls with conversational workflows, identity verification, and real-time CRM webhooks.",
      fullDescription: "Kapture AI – Maya is an intelligent conversational voice assistant developed for automated debt recovery and loan-collection workflows. Maya verifies customer identity prior to discussing sensitive account records, negotiates flexible repayment schedules, and registers real-time Promise-to-Pay (PTP) commitments into corporate CRM databases.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Python", "CRM Webhooks", "State Machines", "REST APIs"],
      features: [
        "Identity verification protocols before sensitive account data disclosure",
        "Dynamic conversational workflows negotiating repayment plans & logging Promise-to-Pay (PTP)",
        "Omni-channel escalation dispatching instant SMS and WhatsApp payment links",
        "Built-in testing suite: call simulator, state-machine monitor, webhook logger, and Python mock backend"
      ],
      architecture: "Audio Input Stream ➔ Python Conversational Intent & State Engine ➔ CRM Webhooks ➔ SMS/WhatsApp Gateway ➔ Real-time Agent Escalation",
      demoUrl: "https://github.com/madhuu0725-png",
      githubUrl: "https://github.com/madhuu0725-png",
      clientReview: "“Maya drastically streamlines collection call workflows with human-like conversational fluency and accurate real-time PTP tracking.” — Evaluation Review"
    },
    {
      id: "fpga-alu-reversible",
      title: "32-Bit FPGA-Based ALU Using Reversible Logic",
      category: "hardware",
      categoryName: "Digital Logic & Academic",
      featured: true,
      image: "assets/images/fpga_alu_project.jpg",
      summary: "High-efficiency 32-bit Arithmetic Logic Unit engineered using reversible logic gates to optimize power consumption, quantum cost, and gate delay.",
      fullDescription: "An advanced digital logic hardware design project implementing a 32-bit ALU using reversible logic principles (Feynman, Toffoli, and Fredkin gates). Designed to eliminate thermodynamic energy dissipation caused by classical bit erasure, successfully synthesized and simulated on FPGA architecture.",
      technologies: ["FPGA", "Verilog / VHDL", "Digital Logic Design", "ModelSim Simulation", "Reversible Logic"],
      features: [
        "Synthesized 32-bit arithmetic, shift, and logic operations with reversible gate cascades",
        "Significantly reduced heat dissipation and power dissipation compared to conventional ALUs",
        "Verified bit-level accuracy using ModelSim simulation waveforms and exhaustive test benches",
        "Validated hardware metrics for quantum cost, delay constraints, and gate efficiency"
      ],
      architecture: "Reversible Gate Array (Toffoli/Feynman) ➔ 32-Bit Operands Register ➔ ALU Controller ➔ FPGA Testbench & Output Logic",
      demoUrl: "https://github.com/madhuu0725-png",
      githubUrl: "https://github.com/madhuu0725-png",
      clientReview: "“An exemplary demonstration of low-power digital circuit design with reversible computing principles.” — Academic Project Review"
    },
    {
      id: "mern-ecommerce-store",
      title: "MERN Stack E-Commerce & Inventory Management",
      category: "mern",
      categoryName: "MERN Full Stack",
      featured: true,
      image: "assets/images/project_ecommerce.jpg",
      summary: "Full-stack e-commerce web application featuring user authentication, MongoDB product catalog, shopping cart, and REST API order processing.",
      fullDescription: "Engineered a production-ready e-commerce platform using the MERN stack (MongoDB, Express.js, React.js, Node.js). Implemented secure JWT authentication, responsive UI with modern CSS and Bootstrap, dynamic cart state management, and robust RESTful API endpoints handling JSON payloads.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Bootstrap", "JWT"],
      features: [
        "Secure user authentication and authorization using JSON Web Tokens (JWT) and Bcrypt",
        "Real-time interactive shopping cart with persistent state and inventory checks",
        "Modular Express.js backend with RESTful API routes for products, users, and orders",
        "Fully responsive mobile-friendly UI crafted with modern CSS3 and Bootstrap"
      ],
      architecture: "React.js Client ➔ Node.js & Express.js REST API ➔ JWT Middleware ➔ MongoDB Atlas Database",
      demoUrl: "https://github.com/madhuu0725-png",
      githubUrl: "https://github.com/madhuu0725-png",
      clientReview: "“Solid full-stack MERN architecture with clean REST APIs and intuitive front-end responsiveness.”"
    },
    {
      id: "data-analytics-ai-agents",
      title: "Data Analytics & AI Agents Virtual Pipeline",
      category: "data",
      categoryName: "Data Analytics & AI",
      featured: false,
      image: "assets/images/project_ai_saas.jpg",
      summary: "Automated business dataset analysis and reporting pipeline built during virtual internships with TCS & Deloitte.",
      fullDescription: "Developed analytical models and automated agent workflows during TCS and Deloitte virtual internships. Utilized Python and SQL to ingest operational data, clean inconsistencies, compute statistical trends, and automate repetitive reporting tasks using AI agents.",
      technologies: ["Python", "SQL", "Data Analytics", "AI Agents", "Pandas", "Statistical Modeling"],
      features: [
        "Automated data extraction and cleansing pipelines for enterprise datasets",
        "Complex SQL queries for trend forecasting and metric aggregation",
        "Integration of AI reasoning agents to generate natural-language executive summaries",
        "Interactive charts showcasing performance metrics and anomaly alerts"
      ],
      architecture: "Raw Operational Data ➔ Python Pandas Processing ➔ SQL Database Storage ➔ AI Agent Summarization & Visualization",
      demoUrl: "https://github.com/madhuu0725-png",
      githubUrl: "https://github.com/madhuu0725-png",
      clientReview: "“Successfully synthesized business data into actionable automated AI workflows.”"
    }
  ],

  internships: [
    {
      period: "July 2026",
      role: "Data Analytics & AI Agents Virtual Intern",
      company: "Tata Consultancy Services (TCS)",
      description: "Explored enterprise data analytics, AI agent architectures, and machine-assisted operational workflows. Analyzed large datasets and built automated analytics pipelines."
    },
    {
      period: "July 2026",
      role: "Data Analytics Virtual Intern",
      company: "Deloitte",
      description: "Applied analytical problem-solving and SQL-based data querying to evaluate business intelligence cases and optimize dashboard reporting metrics."
    }
  ],

  certifications: [
    {
      title: "Python Full Stack Development",
      issuer: "EduSkills",
      scope: "Frontend, Backend, Database & Web Applications",
      badge: "Full Stack"
    },
    {
      title: "Static & Responsive Web Design",
      issuer: "NxtWave",
      scope: "Mobile-Friendly Interfaces, HTML5, CSS3, Flexbox & Grid",
      badge: "Responsive Design"
    },
    {
      title: "SQL – Database Queries & Data Management",
      issuer: "NxtWave",
      scope: "Relational Schema Design, Complex Queries & Data Manipulation",
      badge: "Database"
    },
    {
      title: "Programming Foundations with Python",
      issuer: "NxtWave",
      scope: "Data Structures, Algorithmic Thinking & OOP",
      badge: "Python"
    }
  ],

  education: [
    {
      period: "2023 - 2026",
      degree: "B.Tech, Electronics & Communication Engineering",
      institution: "AnanthaLakshmi Institute of Technology & Science, Anantapur",
      grade: "CGPA 8.1",
      description: "Focused on Digital Logic Design, Embedded Systems, Computer Networks, and Full-Stack Software Engineering."
    },
    {
      period: "2020 - 2023",
      degree: "Diploma, Electronics & Communication Engineering",
      institution: "Government Polytechnic College, Tadipatri",
      grade: "CGPA 8.13",
      description: "Graduated with First Class with Distinction. Strong foundation in electronics, circuit analysis, and programming."
    }
  ],

  testimonials: [
    {
      quote: "Madhulatha demonstrates an exceptional fast learning curve and dedication to writing clean, maintainable MERN stack code. Her Kapture AI Maya project showcases both technical depth and practical problem-solving.",
      name: "Engineering Mentor",
      role: "Full Stack Technical Reviewer",
      initials: "MK"
    },
    {
      quote: "Her ability to bridge hardware logic principles with modern full-stack web software is truly impressive. She is proactive, detail-oriented, and ready for fast-paced development environments.",
      name: "Academic Supervisor",
      role: "ALITS Department of ECE",
      initials: "AS"
    },
    {
      quote: "Strong proficiency in React, Node.js, and SQL data queries. Madhulatha's commitment to responsive design and AI-assisted engineering sets her apart as a modern developer.",
      name: "Virtual Internship Mentor",
      role: "TCS / Deloitte AI Programs",
      initials: "TM"
    }
  ]
};

window.PORTFOLIO_DATA = PORTFOLIO_DATA;
