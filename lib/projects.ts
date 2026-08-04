import { PROJECTS } from "@/data";

export type ProjectCategory = "Full Stack" | "Frontend" | "Backend";

export interface DashboardProject {
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
}

export type ProjectFormValues = Omit<
	DashboardProject,
	"id" | "createdAt" | "updatedAt"
>;

const STORAGE_KEY = "abobaker.dashboard.projects.v1";
const DEFAULT_COLOR = "#6366f1";

function seedProjects(): DashboardProject[] {
	const now = Date.now();
	return PROJECTS.map((p, i) => ({
		id: `seed-${p.id}`,
		title: p.title,
		category: p.category as ProjectCategory,
		image: p.image,
		description: p.description,
		features: [...p.features],
		tech: [...p.tech],
		github: p.github,
		demo: p.demo,
		color: p.color ?? DEFAULT_COLOR,
		createdAt: now - (PROJECTS.length - i) * 1000,
		updatedAt: now - (PROJECTS.length - i) * 1000,
	}));
}

export function loadProjects(): DashboardProject[] {
	if (typeof window === "undefined") return seedProjects();
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) {
			const seeded = seedProjects();
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
			return seeded;
		}
		const parsed = JSON.parse(raw) as DashboardProject[];
		if (!Array.isArray(parsed)) {
			const seeded = seedProjects();
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
			return seeded;
		}
		return parsed;
	} catch {
		return seedProjects();
	}
}

export function saveProjects(projects: DashboardProject[]): void {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProjectById(id: string): DashboardProject | undefined {
	return loadProjects().find((p) => p.id === id);
}

export function createProject(values: ProjectFormValues): DashboardProject {
	const now = Date.now();
	const project: DashboardProject = {
		...values,
		id: `proj-${now}`,
		color: values.color || DEFAULT_COLOR,
		createdAt: now,
		updatedAt: now,
	};
	saveProjects([project, ...loadProjects()]);
	return project;
}

export function updateProject(
	id: string,
	values: ProjectFormValues,
): DashboardProject | undefined {
	const projects = loadProjects();
	const index = projects.findIndex((p) => p.id === id);
	if (index === -1) return undefined;
	const updated: DashboardProject = {
		...projects[index],
		...values,
		color: values.color || projects[index].color,
		updatedAt: Date.now(),
	};
	projects[index] = updated;
	saveProjects(projects);
	return updated;
}

export function deleteProject(id: string): void {
	saveProjects(loadProjects().filter((p) => p.id !== id));
}
