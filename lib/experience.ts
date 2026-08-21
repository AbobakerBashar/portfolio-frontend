import type {
	CareerContent,
	EducationEntry,
	ExperienceEntry,
} from "@/types/experience";

const STORAGE_KEY = "abobaker.dashboard.career.v1";

const DEFAULT_EXPERIENCE: ExperienceEntry[] = [
	{
		id: "exp-1",
		company: "Personal Portfolio & Practice Projects",
		position: "Frontend / Full-Stack Learner",
		period: "2024 - Present",
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
		id: "exp-2",
		company: "Career Preparation",
		position: "Junior Developer Readiness",
		period: "2025 - Present",
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
	{
		id: "exp-3",
		company: "Kigali Independent University (KIU)",
		position: "Computer Science Student",
		period: "2023 - Present",
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
];

const DEFAULT_EDUCATION: EducationEntry[] = [
	{
		id: "edu-1",
		school: "Kigali Independent University (KIU)",
		degree: "Computer Science",
		period: "2023 - Present",
		location: "Kigali, Rwanda",
		description:
			"Currently pursuing my degree while building practical software projects on the side.",
		icon: "🎓",
		color: "#6366f1",
	},
];

export const DEFAULT_CAREER_CONTENT: CareerContent = {
	experience: DEFAULT_EXPERIENCE,
	education: DEFAULT_EDUCATION,
};

function createSeedContent(): CareerContent {
	return {
		experience: DEFAULT_EXPERIENCE.map((item) => ({ ...item })),
		education: DEFAULT_EDUCATION.map((item) => ({ ...item })),
	};
}

export function loadCareerContent(): CareerContent {
	if (typeof window === "undefined") return createSeedContent();

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) {
			const seeded = createSeedContent();
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
			return seeded;
		}

		const parsed = JSON.parse(raw) as Partial<CareerContent>;
		const seeded = createSeedContent();
		return {
			experience: Array.isArray(parsed.experience)
				? parsed.experience
				: seeded.experience,
			education: Array.isArray(parsed.education)
				? parsed.education
				: seeded.education,
		};
	} catch {
		return createSeedContent();
	}
}

export function saveCareerContent(content: CareerContent): CareerContent {
	if (typeof window === "undefined") return content;
	const normalized = {
		experience: [...content.experience],
		education: [...content.education],
	};
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
	return normalized;
}
