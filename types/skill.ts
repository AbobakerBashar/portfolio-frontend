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

export interface Skill {
	id: string;
	name: string;
	proficiency: number;
	icon: string;
	category: SkillCategory;
	color: string;
	order: number;
	featured: boolean;
	createdAt: number;
	updatedAt: number;
}

export type SkillFormValues = {
	name: string;
	proficiency: number;
	icon: string;
	category: SkillCategory;
	color: string;
	order: number;
	featured: boolean;
};

export type GetSkillsResponse = {
	skills?: Skill[];
	success: boolean;
	message?: string;
};
export type GetSkillResponse = {
	skill?: Skill;
	success: boolean;
	message?: string;
};
