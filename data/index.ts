export const SKILLS = {
	Frontend: [
		{ name: "React", level: 92, icon: "⚛️" },
		{ name: "Next.js", level: 90, icon: "▲" },
		{ name: "TypeScript", level: 88, icon: "TS" },
		{ name: "JavaScript", level: 95, icon: "JS" },
		{ name: "Tailwind CSS", level: 92, icon: "🎨" },
		{ name: "HTML & CSS", level: 97, icon: "🌐" },
	],
	Backend: [
		{ name: "Node.js", level: 88, icon: "🟢" },
		{ name: "Express.js", level: 86, icon: "🚀" },
		{ name: "MongoDB", level: 84, icon: "🍃" },
		{ name: "Mongoose", level: 83, icon: "🔧" },
		{ name: "REST APIs", level: 90, icon: "🔌" },
		{ name: "JWT Auth", level: 87, icon: "🔐" },
		{ name: "Stripe", level: 78, icon: "💳" },
		{ name: "Cloudinary", level: 80, icon: "☁️" },
	],
	Tools: [
		{ name: "Git & GitHub", level: 93, icon: "🐙" },
		{ name: "Postman", level: 88, icon: "📮" },
		{ name: "Vercel", level: 90, icon: "▲" },
		{ name: "Render", level: 82, icon: "🎯" },
		{ name: "VS Code", level: 95, icon: "💻" },
	],
};

export const PROJECTS = [
	{
		id: 1,
		title: "ShopSphere E-Commerce Platform",
		category: "Full Stack",
		description:
			"A full-featured e-commerce platform with product management, cart, payments, and order tracking. Built with Next.js App Router and Node.js backend.",
		features: [
			"Stripe payment integration",
			"Real-time inventory management",
			"Admin dashboard with analytics",
			"Cloudinary image uploads",
			"JWT authentication",
		],
		tech: [
			"Next.js",
			"TypeScript",
			"Node.js",
			"MongoDB",
			"Stripe",
			"Tailwind CSS",
		],
		github: "https://github.com/abobakeryagoub",
		demo: "#",
		image:
			"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&auto=format",
		color: "#6366f1",
	},
	{
		id: 2,
		title: "DevConnect Social Platform",
		category: "Full Stack",
		description:
			"A developer-focused social network with real-time messaging, code sharing, and portfolio showcasing features.",
		features: [
			"Real-time messaging with WebSockets",
			"Code syntax highlighting",
			"Follow/unfollow system",
			"Notification system",
			"Profile customization",
		],
		tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "JWT"],
		github: "https://github.com/abobakeryagoub",
		demo: "#",
		image:
			"https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=500&fit=crop&auto=format",
		color: "#06b6d4",
	},
	{
		id: 3,
		title: "TaskFlow Project Manager",
		category: "Frontend",
		description:
			"A Kanban-style project management app with drag-and-drop, team collaboration, and progress tracking.",
		features: [
			"Drag-and-drop Kanban board",
			"Team collaboration features",
			"Progress analytics",
			"Due date reminders",
			"File attachments",
		],
		tech: [
			"React",
			"TypeScript",
			"Tailwind CSS",
			"React Query",
			"Framer Motion",
		],
		github: "https://github.com/abobakeryagoub",
		demo: "#",
		image:
			"https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop&auto=format",
		color: "#8b5cf6",
	},
	{
		id: 4,
		title: "OpenAPI Gateway Service",
		category: "Backend",
		description:
			"A high-performance API gateway with rate limiting, authentication middleware, logging, and API key management.",
		features: [
			"Rate limiting per user/IP",
			"API key management",
			"Request/response logging",
			"Health check dashboard",
			"Redis caching layer",
		],
		tech: ["Node.js", "Express", "Redis", "MongoDB", "JWT", "Docker"],
		github: "https://github.com/abobakeryagoub",
		demo: "#",
		image:
			"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&auto=format",
		color: "#f59e0b",
	},
	{
		id: 5,
		title: "CryptoTracker Dashboard",
		category: "Frontend",
		description:
			"A real-time cryptocurrency tracking dashboard with portfolio management, price alerts, and market analytics.",
		features: [
			"Live price feeds via WebSocket",
			"Portfolio P&L tracking",
			"Price alert notifications",
			"Interactive charts",
			"Multi-currency support",
		],
		tech: ["React", "TypeScript", "Recharts", "React Query", "Tailwind CSS"],
		github: "https://github.com/abobakeryagoub",
		demo: "#",
		image:
			"https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&h=500&fit=crop&auto=format",
		color: "#10b981",
	},
	{
		id: 6,
		title: "AuthKit Node Package",
		category: "Backend",
		description:
			"An npm package providing plug-and-play authentication middleware for Express apps with multiple strategies.",
		features: [
			"JWT & session-based auth",
			"OAuth2 providers",
			"Role-based access control",
			"Rate limiting built-in",
			"TypeScript support",
		],
		tech: ["Node.js", "TypeScript", "Express", "Passport.js", "MongoDB"],
		github: "https://github.com/abobakeryagoub",
		demo: "#",
		image:
			"https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop&auto=format",
		color: "#ef4444",
	},
];

export const EXPERIENCE = [
	{
		id: 1,
		company: "Kigali Independent University (KIU)",
		position: "Computer Science Student",
		period: "2023 – Present",
		type: "Student",
		location: "Kigali, Rwanda",
		description:
			"Studying core computer science fundamentals while applying what I learn to modern web development projects and portfolio work.",
		responsibilities: [
			"Strengthening problem-solving, programming, and software design fundamentals",
			"Building responsive frontend applications using React and Next.js",
			"Practicing full-stack concepts through hands-on personal projects",
			"Improving code quality, Git workflow, and project organization habits",
		],
		tech: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Git"],
		color: "#6366f1",
	},
	{
		id: 2,
		company: "Personal Portfolio & Practice Projects",
		position: "Frontend / Full-Stack Learner",
		period: "2024 – Present",
		type: "Self-learning",
		location: "Remote",
		description:
			"Creating practical web apps and portfolio pieces to turn classroom knowledge into real experience with modern tooling.",
		responsibilities: [
			"Built multiple UI-focused projects using React, Next.js, and Tailwind CSS",
			"Implemented API integration, authentication flows, and reusable components",
			"Improved understanding of deployment, project structure, and clean code practices",
			"Used portfolio work to demonstrate skills to recruiters and potential teams",
		],
		tech: [
			"React",
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"MongoDB",
			"REST APIs",
		],
		color: "#06b6d4",
	},
	{
		id: 3,
		company: "Career Preparation",
		position: "Junior Developer Readiness",
		period: "2025 – Present",
		type: "Career Growth",
		location: "Remote / Hybrid",
		description:
			"Preparing for my first professional opportunity by refining portfolio quality, improving technical fundamentals, and learning how to work in a team environment.",
		responsibilities: [
			"Focused on recruiter-ready portfolio and clean project presentation",
			"Practicing collaboration, debugging, and communication skills",
			"Learning how professional web products are structured and maintained",
			"Actively seeking junior frontend or full-stack opportunities",
		],
		tech: ["GitHub", "Docker Basics", "Postman", "Vercel", "VS Code"],
		color: "#8b5cf6",
	},
];

export const STATS = [
	{ label: "Projects Shipped", value: 32, suffix: "+" },
	{ label: "Happy Clients", value: 18, suffix: "+" },
	{ label: "GitHub Stars", value: 480, suffix: "+" },
	{ label: "Years Experience", value: 3, suffix: "+" },
];

export const TESTIMONIALS = [
	{
		name: "Sarah Mitchell",
		role: "CTO, Nexora Labs",
		text: "Abobaker delivered an exceptional e-commerce platform that exceeded our expectations. His attention to performance and code quality is outstanding. The site loads in under 1.5s and handles our peak traffic flawlessly.",
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
	},
	{
		name: "Marcus Chen",
		role: "Founder, DevSync",
		text: "Working with Abobaker was a game-changer. He understood our vision immediately, suggested improvements we hadn't thought of, and shipped clean, maintainable code. I'd hire him again without hesitation.",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
	},
	{
		name: "Lena Hoffmann",
		role: "Product Manager, FinTech AG",
		text: "Abobaker integrated Stripe and built our entire checkout flow in record time. Zero bugs in production, clear communication throughout, and delivered ahead of schedule. Exactly what we needed.",
		avatar:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
	},
];
