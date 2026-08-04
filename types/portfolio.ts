import type { LucideIcon } from "lucide-react";

export type ThemeMode = "light" | "dark";

export interface Profile {
	name: string;
	title: string;
	tagline: string;
	location: string;
	email: string;
	github: string;
	linkedin: string;
}

export interface NavItem {
	id: string;
	label: string;
}

export interface SkillItem {
	name: string;
	level: number;
}

export interface SkillGroup {
	title: string;
	icon: LucideIcon;
	items: SkillItem[];
}

export interface Project {
	id: string;
	title: string;
	category: "Full Stack" | "Frontend" | "Backend";
	image: string;
	description: string;
	features: string[];
	tech: string[];
	github: string;
	demo: string;
}

export interface ExperienceItem {
	company: string;
	role: string;
	dates: string;
	points: string[];
	tech: string[];
}

export interface Testimonial {
	quote: string;
	name: string;
	role: string;
}

export interface Stat {
	label: string;
	value: number;
}

export interface GithubSummary {
	repoCount: number;
	stars: number;
	followers: number;
	lastUpdated: string;
}

export interface ContactFormValues {
	name: string;
	email: string;
	message: string;
}
