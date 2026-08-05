export type SkillCategory =
	| "Frontend"
	| "Backend"
	| "Database"
	| "DevOps"
	| "Cloud"
	| "Mobile"
	| "Programming Language"
	| "Tools"
	| "Other";

export interface DashboardSkill {
	id: string;
	name: string;
	level: number;
	icon: string;
	category: SkillCategory;
	color: string;
	order: number;
	featured: boolean;
	createdAt: number;
	updatedAt: number;
}

export type SkillFormValues = Omit<
	DashboardSkill,
	"id" | "createdAt" | "updatedAt"
>;

export const SKILL_CATEGORY_COLORS: Record<SkillCategory, string> = {
	Frontend: "#6366f1",
	Backend: "#06b6d4",
	Database: "#10b981",
	DevOps: "#f59e0b",
	Cloud: "#3b82f6",
	Mobile: "#ec4899",
	"Programming Language": "#ef4444",
	Tools: "#8b5cf6",
	Other: "#64748b",
};

export const SKILL_CATEGORIES: SkillCategory[] = [
	"Frontend",
	"Backend",
	"Database",
	"DevOps",
	"Cloud",
	"Mobile",
	"Programming Language",
	"Tools",
	"Other",
];
