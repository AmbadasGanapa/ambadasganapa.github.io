// ============================================================
// ALL YOUR PORTFOLIO DATA IN ONE PLACE
// Edit this file to update anything on the site
// ============================================================

export const personalInfo = {
  name: "Ambadas Ganapa",
  tagline: "I build software and decode data —",
  taglineAccent: "always building something new.",
  location: "Pune, Maharashtra",
  email: "ambadasganapa31@gmail.com",
  phone: "+91 7757082080",
  bio: 'A Software Developer and Data & Cloud Enthusiast passionate about building scalable applications and data-driven solutions. I enjoy solving real-world problems through technology.',
  vision: 'To leverage cloud computing, data, and artificial intelligence to build innovative solutions that solve real-world challenges, empower businesses, and create a meaningful impact through technology.',
  mission: 'To continuously learn, innovate, and develop scalable software solutions while embracing emerging technologies and delivering value through reliable, intelligent, and user-centric applications.',
  languagesSpoken: ['English', 'Hindi', 'Marathi', 'Kannada', 'Telugu'],
  resumeUrl: "/resumes/Ambadas Ganapa Software Developer Resume.pdf",
  socials: {
    github: "https://github.com/AmbadasGanapa/",
    linkedin: "https://linkedin.com/in/ambadasganapa",
    instagram: "https://www.instagram.com/amul_ganapa33/",
    twitter: "",
    telegram: "https://t.me/AmulG31",
    leetcode: "https://leetcode.com/u/AmbadasGanapa/",
    hackerrank: "https://www.hackerrank.com/profile/ambadasganapa31",
    whatsapp: "https://wa.me/7757082080",
  },
  stats: [
    { label: "Mentored", value: 10, suffix: "+" },
    { label: "Projects Built", value: 15, suffix: "+" },
    { label: "Competition Won", value: 5, suffix: "+" },
    { label: "Languages Spoken", value: 5, suffix: "+" },
  ],
};

export const skills = {
  languages: [
    { name: "Python", level: "Expert" },
    { name: "Java", level: "Expert" },
    { name: "JavaScript", level: "Proficient" },
    { name: "C#", level: "Expert" },
    { name: "C ", level: "Proficient" },
    
  ],
  dataAnalytics: [
    { name: "Python", level: "Expert" },
    { name: "Power BI", level: "Expert" },
    { name: "SQL", level: "Expert" },
    { name: "Excel (Advanced)", level: "Expert" },
    { name: "Pandas / NumPy", level: "Proficient" },
    { name: "Matplotlib / Seaborn", level: "Proficient" },
    { name: "AWS", level: "Expert" },
    { name: "Google Sheets", level: "Expert" },
  ],
  webBackend: [
    { name: "HTML / CSS", level: "Expert" },
    { name: "React JS", level: "Proficient" },
    { name: "Python (Django,Flask)", level: "Expert" },
    { name: "Java Spring MVC", level: "Learning" },
    { name: "FAST API", level: "Proficient" },
    { name: "MySQL / PostgreSQL", level: "Expert" },
    { name: "MongoDB", level: "Expert" },
    { name: "Bootstrap", level: "Proficient" },
  ],
  aiCloud: [
    { name: "RAG,LangChain", level: "Expert" },
    { name: "AWS Cloud", level: "Expert" },
    { name: "GCP/Azure", level: "Proficient" },
    { name: "Prompt Engineering", level: "Proficient" },
    { name: "MCP", level: "Learning" },
    { name: "Machine Learning", level: "Proficient" },
    { name: "AI Tools", level: "Expert" },
    { name: "Docker (Basics)", level: "Learning" },
  ],
  tools: [
    "VS Code", "Visual Studio", "GitHub", "Postman","Git",
    "Power BI", "Canvas", "WordPress",
    "MS Office", "Tableau",
  ],
};

export const hobbies = [
  {
    id: 'coding',
    title: 'Coding & Development',
    icon: '💻',
    description: "I love exploring new programming languages, building innovative projects, and solving complex problems through code. It's not just my profession, it's my passion!",
    stats: [
      { label: 'Languages Learned', value: 8 },
      { label: 'Projects Built', value: 10, suffix: '+' }
    ]
  },
  {
    id: 'cricket',
    title: 'Playing Cricket',
    icon: '🏏',
    description: "Cricket is my favorite sport! I enjoy both playing and watching matches. It teaches teamwork, strategy, and helps me stay physically active.",
    stats: [
      { label: 'Favorite Position', value: 'All-rounder', isText: true },
      { label: 'Favorite Player', value: 'Hardik Pandya', isText: true }
    ]
  },
  {
    id: 'travelling',
    title: 'Travelling & Exploring',
    icon: '✈️',
    description: "I love discovering new places, experiencing different cultures, and capturing beautiful moments. Travel broadens my perspective and inspires creativity.",
    stats: [
      { label: 'Places Visited', value: 20, suffix: '+' },
      { label: 'Modes Used', value: 'Bike, Car, Bus, Train, Ship', isText: true }
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "AGCareerSathi — Career Recommendation System",
    description:
      "An intelligent ai powered career recommendation system built with Google Gemini 2.0 Flash API. Provides top 3 recommendations for students on basis of their interests and skills.",
    image: "/images/agcareersathi.png",
    tags: ["AI-Driven","Web Development"],
    tech: ["Python", "Django", "Gemini API","MongoDB", "React.js","HTML", "CSS", "JavaScript"],
    github: "https://github.com/AmbadasGanapa/",
    demo: "https://agcareersathi.vercel.app/",
    featured: true,
  },
    {
    id: 2,
    title: "WorkWatch — Office Automation Suite",
    description:
      "Desktop-based task and project management system. Handles assignments, deadlines, salary tracking, and event scheduling to enhance workplace productivity.",
    image: "/images/workwatch.png",
    tags: ["Software Development"],
    tech: ["C#", "Windows Forms", "SQL Server"],
    github: null,
    demo: null,
  },
  {
    id: 3,
    title: "AlgoVizLab — Algorithm Visualization Platform",
    description:
      "Built an Interactive platform to visualize and understand algorithms. Supports multiple algorithms with step-by-step execution and graphical representation.",
    image: "/images/algovizlab.png",
    tags: ["Web Development"],
    tech: ["Python Django", "MySQL", "React.Js", "Javascript", "HTML", "CSS"],
    github: null,
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: "EduQuery- RAG Based Educational Query System",
    description:
      "Developed a RAG based educational question answering system that answers student queries. It uses LangChain, Google gemini API, and MongoDB to provide accurate and context-aware responses.",
    image: "/images/eduquery.png",
    tags: ["AI-Driven", "Web Development"],
    tech: ["Python", "RAG", "LangChain", "React.js", "Gemini API"],
    github: null,
    demo: null,
    featured: true,
  },
  {
    id: 5,
    title: "Ola Data Analysis Dashboard",
    description:
      "Interactive Power BI dashboard analyzing ride patterns, revenue trends, and customer behavior across Ola's platform. Supports data-driven business decisions.",
    image: "/images/ola.png",
    tags: ["Data Analysis"],
    tech: ["Power BI", "Python", "Excel", "Google Sheets"],
    github: "https://github.com/AmbadasGanapa/OLA-Rides-Data-Analysis",
    demo: "https://app.powerbi.com/reportEmbed?reportId=c5b898c3-8cb7-473a-8f30-b8bb46c79d1e&autoAuth=true&ctid=8a6c12c2-f281-4d6e-9f92-6e903ef7f288",
    featured: true,
  },

  {
    id: 6,
    title: "Amazon Sales & Revenue Analysis",
    description:
      "Interactive dashboard visualizing Amazon sales performance, customer behavior, and revenue trends to support strategic decision-making.",
    image: "/images/amazon.png",
    tags: ["Data Analysis"],
    tech: ["Python", "Excel", "Power BI"],
    github: null,
    demo: "https://app.powerbi.com/reportEmbed?reportId=633c21d8-23e4-4a46-b554-89699dac3246&autoAuth=true&ctid=8a6c12c2-f281-4d6e-9f92-6e903ef7f288",
  },
  {
    id: 7,
    title: "ClassMate — Coaching Management System",
    description:
      "User-friendly coaching management system for Prarambh Coaching Institute. Handles student enrollment, batches, tutor allocation, and fee tracking.",
    image: "/images/classmate.jpg",
    tags: ["Software Development", "Web Development"],
    tech: ["Java (JSP)", "MySQL", "HTML", "CSS", "JavaScript"],
    github: null,
    demo: null,
    certificateUrl: "/images/Prarambh Coaching Certificate.pdf",
  },
  {
    id: 8,
    title: "Tata IPL-2026 Data Analysis",
    description:
      "Analyzed IPL-2026 match data to uncover insights on team performance, player statistics, and match outcomes. Created interactive visualizations for data-driven decision-making.",
    image: "/images/ipl2026.png",
    tags: ["Data Analysis"],
    tech: ["Excel", "Python", "SQL", "Power BI"],
    github: null,
    demo: null,
  },
  {
    id: 9,
    title: "Ganitwala — Real-World Web Application",
    description:
      "Developed and deployed a real-world web application for Ganitwala, providing users with a platform to explore educational resources, tutorials, and interactive learning tools.",
    image: "/images/ganitwala.png",
    tags: ["AI-Driven", "Web Development"],
    tech: ["Python", "Google Gemini API", "AI","MySQL", "React.js"],
    github: null,
    demo: null,
    // comingSoon: true,
  },
];


export const achievements = [
  {
    year: "2024",
    title: "First Consolation Prize — Dexter 2K24",
    org: "Punyashlok Ahilyadevi Holkar Solapur University, Solapur",
    description: "Recognized at a national level coding competition for showcasing strong technical and problem-solving skills.",
    image: "/images/dexter.jpeg",
  },
  {
    year: "2024",
    title: "First Consolation Prize — San Pratibha Shodh 2K24",
    org: "Sangmeshwar College, Solapur",
    description: "Recognized at district level web design competition for showcasing web development skills.",
    image: "/images/sangmeshwar.jpeg",
  },
  {
    year: "2024",
    title: "Impressive Intern Award",
    org: "Lemonade Software Developers",
    description: "Honored for outstanding performance, dedication, and significant contributions to client-based software solutions during an 8-month internship.",
    image: "/images/soni_college2.jpeg",
  },
  {
    year: "2024",
    title: "Runner-Up — KALPAK 2K24",
    org: "Shri Siddheshwar College of Engineering",
    description: "Achieved runner-up at KALPAK 2K24 Code Craft competition for strong problem-solving and efficient coding performance.",
    image: "/images/kalpak.jpeg",
  },
  {
    year: "2024",
    title: "Event Organizer — CodeBate 2K24",
    org: "K.P.Mangalvedhekar Institute, Solapur",
    description: "Organized and managed CodeBate 2K24, a coding and debate competition that brought together students from across the district.",
    image: "/images/codebate.jpeg",
  },
  {
    year: "2025",
    title: "Winner — TechMaster 2K25",
    org: "Hirchand Nemchand College, Solapur",
    description: "First place at TechMaster 2K25 coding competition at HN College, Solapur — district level.",
    image: "/images/hncc.jpeg",
  },
  {
    year: "2025",
    title: "Winner — Soni Inter College Competition 2K25",
    org: "Soni College, Solapur",
    description: "First place at Soni Inter College Competition 2K25 — district level coding event.",
    image: "/images/soni_college.jpeg",
  },
  {
    year: "2026",
    title: "Winner — Youth Karandak 2K26",
    org: "Pune Cambridge, Pune",
    description: "First place at Youth Karandak 2K26 competition held at Pune Cambridge, Pune.",
    image: "/images/punecambridge.jpeg",
  },
];

export const experience = [
  {
    role: "Software Developer Intern",
    company: "Lemonade Software Developers",
    short: "LSD",
    duration: "Dec 2023 – Jul 2024",
    duration_label: "8 Months",
    type: "Internship",
    color: "#6c63ff",
    points: [
      "Developed WorkWatch — a full office automation desktop suite using C# Windows Forms and SQL Server",
      "Built ClassMate for Prarambh Coaching Institute in Solapur — a complete tuition management system",
      "Designed user interfaces, wrote efficient code, and understood real-world client requirements",
      "Strengthened skills in software development, problem-solving, and team collaboration",
    ],
    certificateUrl: "/images/Lemonade Software Developer Certificate.pdf",
  },
  {
    role: "Python Developer Intern",
    company: "Ganitwala",
    short: "Ganitwala",
    duration: "Dec 2025 – May 2026",
    duration_label: "6 Months",
    type: "Internship",
    color: "#06b6d4",
    points: [
      "Developed and deployed a real-world web application — explore the live project at ganitwala.com",
      "Developed and maintained web application features using Python and related technologies.",
      "Gained hands-on experience in database management, debugging, and application deployment."
    ],
    liveUrl: "https://www.ganitwala.com",
    certificateUrl: "/images/Ganitwala.pdf",
  },
  {
    role: "Tutor ",
    company: "Vision Institute, Pune",
    short: "Vision Institute",
    duration: "Feb 2026 – May 2026",
    duration_label: "3 Months",
    type: "Teaching",
    color: "#10b981",
    points: [
      "Taught C Programming and Power BI to 10+ students at Vision Institute",
      "Designed structured lesson plans covering fundamentals of C to engineering & diploma students",
      "Delivered hands-on Power BI training covering analytics and dashboard creation.",
      "Mentored students individually, improving their understanding and practical problem-solving skills",
    ],
    certificateUrl: null,
  },
  {
    role: "",
    company: "LTM (Formerly LTIMindtree)",
    short: "LTM",
    duration: "Jul - Present",
    duration_label: "Present",
    type: "Full-time",
    color: "#f59e0b",
    points: [
    "Selected as an Associate Trainee in the Cloud & Infrastructure Services (CIS) division.",
    "Undergoing professional training in cloud technologies, IT infrastructure, networking, and enterprise support.",
    "Developing hands-on expertise in cloud operations, system administration, ITIL processes, and industry-standard tools."
    ],
    certificateUrl: null,
   
  },
];

export const education = [
  {
    degree: "Primary School",
    institution: "R.R.Burla Primary School",
    duration: "2008 – 2014",
    status: "Completed",
    highlight: "Foundation Years",
    desc: "Foundation years where I developed basic literacy, numeracy, and social skills. Built strong fundamentals in mathematics and language that would support my future academic journey.",
    subjects: ["Mathematics", "English", "Science", "Social Studies"],
  },
  {
    degree: "Secondary School (SSC)",
    institution: "Kuchan High School, Solapur",
    duration: "2014 – 2020",
    status: "Completed",
    highlight: "Marks: 74.4%",
    desc: "Completed secondary education with a focus on science and mathematics. Developed analytical thinking and problem-solving skills that sparked my early interest in technology and computers.",
    subjects: ["Science", "Mathematics", "English","History & Geography"],
  },
  {
    degree: "Higher Secondary (HSC) — Commerce",
    institution: "Kuchan Junior College, Solapur",
    duration: "2020 – 2022",
    status: "Completed",
    highlight: "Maharashtra State Board",
    desc: "Specialized in commerce subjects including accounting, business studies, economics, and financial management. Acquired foundational knowledge in analytical thinking and data-driven decision-making.",
    subjects: ["Accounting", "Business Studies", "Economics","Analytics"],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Punyashlok Ahilyadevi Holkar Solapur University",
    duration: "2022 – 2025",
    status: "Completed",
    highlight: "CGPA: 9.5 | Percentage: 83.51%",
    desc: "Specialized in software development, data analysis, database management, and web technologies. Completed capstone project WorkWatch — a full office automation suite demonstrating expertise in both frontend and backend technologies.",
    subjects: ["Data Structures", "Web Development", "Database Systems", "OOP"],
  },
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Savitribai Phule Pune University, Pune",
    duration: "2025 – Ongoing",
    status: "In Progress",
    highlight: "Specializing in Data and Cloud, AI/ML, and Software Engineering",
    desc: "Pursuing advanced studies in computer applications with a focus on AI, machine learning, cloud computing, and full-stack development. Continuously building on prior expertise to create intelligent, scalable software solutions.",
    subjects: [ "Cloud Computing", "Data Analytics", "Software Development","Machine Learning"],
  },
];

export const certifications = [
  {
    title: "AWS Solution Architect Associate Certification",
    issuer: "GeeksforGeeks",
    year: "2026",
    image: "/images/AWS_SAA.png",
    credentialUrl: null,
    category: "Cloud",
  },
  {
    title: "Agentic AI -Skill Up",
    issuer: "Nation Skillup",
    year: "2026",
    image: "/images/agentic.png",
    credentialUrl: null,
    category: "AI",
  },
   {
    title: "Generative AI ",
    issuer: "GeeksforGeeks",
    year: "2026",
    image: "/images/genai.png",
    credentialUrl: null,
    category: "AI",
  },
  {
    title: "Soft Skills — Professional Development",
    issuer: "GeeksforGeeks",
    year: "2025",
    image: "/images/softskill.png",
    credentialUrl: null,
    category: "Softskill",
  },
  {
    title: "30-Days Power BI Micro Course",
    issuer: "SkillCourse",
    year: "2025",
    image: "/images/PowerBI.jpg",
    credentialUrl: "#",
    category: "Data",
  },
 
  {
    title: "SQL ",
    issuer: "HackeRank ",
    year: "2024",
    image: "/images/sqlbasics.jpg",
    credentialUrl: null,
    category: "Data",
  },
  {
    title: "Introduction to WordPress",
    issuer: "Simplilearn",
    year: "2024",
    image: "/images/wordpress.jpg",
    credentialUrl: "https://simpli-web.app.link/e/RtULUvQCHTb",
    category: "Other",
  },
];


export const services = [
  {
    id: 1,
    icon: "📊",
    title: "Data Analytics & Visualization",
    description:
      "Transform complex data into meaningful insights through interactive dashboards, performance reports, and data-driven decision support for businesses.",
    tags: ["Business Intelligence", "Dashboards", "Analytics", "Reporting"],
  },
  {
    id: 2,
    icon: "🌐",
    title: "Full-Stack Web Development",
    description:
      "Develop responsive, scalable, and user-centric web applications with intuitive interfaces and reliable backend systems tailored to business needs.",
    tags: ["Web Applications", "Responsive Design", "Backend", "Frontend"],
  },
  {
    id: 3,
    icon: "🤖",
    title: "AI-Powered Solutions",
    description:
      "Design intelligent applications that automate workflows, enhance user experiences, and leverage artificial intelligence to solve real-world challenges.",
    tags: ["Artificial Intelligence", "Automation", "Machine Learning", "Innovation"],
  },
  {
    id: 4,
    icon: "🖥️",
    title: "Desktop Application Development",
    description:
      "Build reliable desktop software that streamlines business operations, improves productivity, and simplifies everyday workflows.",
    tags: ["Business Software", "Automation", "Productivity", "Desktop Apps"],
  },
  {
    id: 5,
    icon: "🎓",
    title: "Career Guidance",
    description:
      "Help students and aspiring professionals explore career paths, identify suitable opportunities, and make informed decisions for their academic and professional growth.",
    tags: ["Career Planning", "Mentorship", "Guidance", "Skill Development"],
  },
  {
    id: 6,
    icon: "🎨",
    title: "Graphic Design",
    description:
      "Create visually engaging designs for branding, social media, presentations, marketing materials, and digital content with a focus on creativity and clarity.",
    tags: ["Branding", "Social Media", "Creative Design", "Visual Content"],
  },
];