"use client";

import { useProjects } from "@/hooks/use-projects";
import { useSkills } from "@/hooks/use-skills";
import { Code2, FolderKanban, FolderPlus, Layers, Plus } from "lucide-react";
import Link from "next/link";
import ProjectCard from "@/components/dashboard/ProjectCard";
import SkillCard from "@/components/dashboard/SkillCard";

export default function DashboardHome() {
	const { data: projects = [], isLoading } = useProjects();
	const { data, isLoading: skillsLoading } = useSkills();

	const skills = data?.skills || [];

	const total = projects.length;
	const fullStack = projects.filter((p) => p.category === "Full Stack").length;
	const frontend = projects.filter((p) => p.category === "Frontend").length;
	const backend = projects.filter((p) => p.category === "Backend").length;

	const recent = [...projects]
		.sort((a, b) => b.updatedAt - a.updatedAt)
		.slice(0, 3);

	const recentSkills = [...skills]
		.sort(
			(a, b) =>
				(a.order ?? Number.MAX_SAFE_INTEGER) -
					(b.order ?? Number.MAX_SAFE_INTEGER) ||
				Number(b.featured ? 1 : 0) - Number(a.featured ? 1 : 0),
		)
		.slice(0, 4);

	const stats = [
		{ label: "Total Projects", value: total, icon: Layers },
		{ label: "Full Stack", value: fullStack, icon: FolderKanban },
		{ label: "Frontend", value: frontend, icon: FolderKanban },
		{ label: "Backend", value: backend, icon: FolderKanban },
	];

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1
						className="font-display font-bold text-2xl md:text-3xl"
						style={{ color: "var(--foreground)" }}
					>
						Dashboard
					</h1>
					<p
						className="text-sm mt-1"
						style={{ color: "var(--muted-foreground)" }}
					>
						Manage your portfolio projects.
					</p>
				</div>
				<Link
					href="/dashboard/projects/new"
					className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:opacity-90"
					style={{
						background: "linear-gradient(135deg, #6366f1, #06b6d4)",
					}}
				>
					<Plus className="h-4 w-4" />
					Add Project
				</Link>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="glass rounded-2xl p-5"
						style={{ border: "1px solid var(--border)" }}
					>
						<div className="flex items-center justify-between mb-3">
							<span
								className="text-xs font-mono uppercase tracking-wider"
								style={{ color: "var(--muted-foreground)" }}
							>
								{stat.label}
							</span>
							<stat.icon className="h-4 w-4" style={{ color: "#6366f1" }} />
						</div>
						<div
							className="font-display font-bold text-3xl"
							style={{ color: "var(--foreground)" }}
						>
							{isLoading ? "—" : stat.value}
						</div>
					</div>
				))}
			</div>

			{/* Recent projects */}
			<div>
				<div className="flex items-center justify-between mb-4">
					<h2
						className="font-display font-semibold text-lg"
						style={{ color: "var(--foreground)" }}
					>
						Recent Projects
					</h2>
					<Link
						href="/dashboard/projects"
						className="text-sm font-medium inline-flex items-center gap-1.5 transition-colors hover:opacity-80"
						style={{ color: "#6366f1" }}
					>
						View all
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							width="14"
							height="14"
						>
							<line x1="5" y1="12" x2="19" y2="12" />
							<polyline points="12 5 19 12 12 19" />
						</svg>
					</Link>
				</div>

				{isLoading ? (
					<div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
						Loading…
					</div>
				) : projects.length === 0 ? (
					<div
						className="glass rounded-2xl p-10 text-center"
						style={{ border: "1px dashed var(--border)" }}
					>
						<FolderPlus
							className="h-10 w-10 mx-auto mb-3"
							style={{ color: "var(--muted-foreground)" }}
						/>
						<p
							className="font-semibold mb-1"
							style={{ color: "var(--foreground)" }}
						>
							No projects yet
						</p>
						<p
							className="text-sm mb-4"
							style={{ color: "var(--muted-foreground)" }}
						>
							Get started by adding your first project.
						</p>
						<Link
							href="/dashboard/projects/new"
							className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
							style={{
								background: "linear-gradient(135deg, #6366f1, #06b6d4)",
							}}
						>
							<Plus className="h-4 w-4" />
							Add Project
						</Link>
					</div>
				) : (
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{recent.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				)}
			</div>

			{/* Recent skills */}
			<div>
				<div className="flex items-center justify-between mb-4">
					<h2
						className="font-display font-semibold text-lg"
						style={{ color: "var(--foreground)" }}
					>
						Recent Skills
					</h2>
					<Link
						href="/dashboard/skills"
						className="text-sm font-medium inline-flex items-center gap-1.5 transition-colors hover:opacity-80"
						style={{ color: "#6366f1" }}
					>
						View all
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							width="14"
							height="14"
						>
							<line x1="5" y1="12" x2="19" y2="12" />
							<polyline points="12 5 19 12 12 19" />
						</svg>
					</Link>
				</div>

				{skillsLoading ? (
					<div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
						Loading…
					</div>
				) : skills.length === 0 ? (
					<div
						className="glass rounded-2xl p-10 text-center"
						style={{ border: "1px dashed var(--border)" }}
					>
						<Code2
							className="h-10 w-10 mx-auto mb-3"
							style={{ color: "var(--muted-foreground)" }}
						/>
						<p
							className="font-semibold mb-1"
							style={{ color: "var(--foreground)" }}
						>
							No skills yet
						</p>
						<p
							className="text-sm mb-4"
							style={{ color: "var(--muted-foreground)" }}
						>
							Get started by adding your first skill.
						</p>
						<Link
							href="/dashboard/skills/new"
							className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
							style={{
								background: "linear-gradient(135deg, #6366f1, #06b6d4)",
							}}
						>
							<Plus className="h-4 w-4" />
							Add Skill
						</Link>
					</div>
				) : (
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{recentSkills.map((skill) => (
							<SkillCard key={skill.id} skill={skill} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
