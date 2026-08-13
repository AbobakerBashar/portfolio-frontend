export type ProjectFormValues = {
	title: string;
	category: "Full Stack" | "Frontend" | "Backend";
	image: File | null;
	preview: string;
	description: string;
	features: string[];
	tech: string[];
	github: string;
	demo: string;
	color: string;
};

export type ProjectCategory = "Full Stack" | "Frontend" | "Backend";

export type Project = {
	id: string;
	title: string;
	category: ProjectCategory;
	image: string;
	description: string;
	features: string[];
	tech: string[];
	github: string;
	demo: string;
	color: string;
	createdAt: number;
	updatedAt: number;
};

export type ProjectsResponse = {
	projects?: Project[];
	error?: string;
	message?: string;
	success: false;
};

export type ProjectResponse = {
	project?: Project;
	error?: string;
	message?: string;
	success: false;
};

export type MutationProjectResponse = {
	project?: Project;
	errors?: Record<string, string>;
	message?: string;
	success: false;
};
