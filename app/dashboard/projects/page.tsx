"use client";

import { useProjects } from "@/hooks/use-projects";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { FolderOpen, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Full Stack", "Frontend", "Backend"] as const;

export default function ProjectsPage() {
	const { data, isLoading } = useProjects();
	const projects = data?.projects || [];

	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

	// const filtered = useMemo(() => {
	// 	const term = query.trim().toLowerCase();
	// 	return projects.filter((p) => {
	// 		const matchesFilter = filter === "All" || p.category === filter;
	// 		const matchesQuery =
	// 			!term ||
	// 			p.title.toLowerCase().includes(term) ||
	// 			p.description.toLowerCase().includes(term) ||
	// 			p.tech.some((t) => t.toLowerCase().includes(term));
	// 		return matchesFilter && matchesQuery;
	// 	});
	// }, [projects, query, filter]);

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1
						className="font-display font-bold text-2xl md:text-3xl"
						style={{ color: "var(--foreground)" }}
					>
						Projects
					</h1>
					<p
						className="text-sm mt-1"
						style={{ color: "var(--muted-foreground)" }}
					>
						{isLoading
							? "Loading projects…"
							: `${projects.length} of ${projects.length} projects`}
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

			{/* Search + filters */}
			<div className="space-y-3">
				<div className="relative">
					<Search
						className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
						style={{ color: "var(--muted-foreground)" }}
					/>
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search by title, tech, or description…"
						className="w-full pl-10 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20"
						style={{
							background: "var(--secondary)",
							color: "var(--foreground)",
							border: "1px solid var(--border)",
						}}
					/>
				</div>

				<div className="flex flex-wrap gap-2">
					{FILTERS.map((f) => (
						<button
							key={f}
							onClick={() => setFilter(f)}
							className={cn(
								"px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
								filter === f
									? "text-white"
									: "text-muted-foreground hover:text-foreground",
							)}
							style={{
								background:
									filter === f
										? "linear-gradient(135deg, #6366f1, #06b6d4)"
										: "var(--secondary)",
								border: "1px solid var(--border)",
							}}
						>
							{f}
						</button>
					))}
				</div>
			</div>

			{/* Grid */}
			{isLoading ? (
				<div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
					Loading…
				</div>
			) : projects.length === 0 ? (
				<div
					className="glass rounded-2xl p-10 text-center"
					style={{ border: "1px dashed var(--border)" }}
				>
					<FolderOpen
						className="h-10 w-10 mx-auto mb-3"
						style={{ color: "var(--muted-foreground)" }}
					/>
					<p
						className="font-semibold mb-1"
						style={{ color: "var(--foreground)" }}
					>
						Nothing found
					</p>
					<p
						className="text-sm mb-4"
						style={{ color: "var(--muted-foreground)" }}
					>
						Try a different search or filter.
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
					{projects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			)}
		</div>
	);
}
