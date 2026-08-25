"use client";

import { useSkills } from "@/hooks/use-skills";
import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn, SKILL_CATEGORIES, SKILL_CATEGORY_COLORS } from "@/lib/utils";
import { type SkillCategory } from "@/types/skill";
import SkillCard from "@/components/dashboard/SkillCard";
import { Skill } from "@/types/skill";

const FILTERS = ["All", ...SKILL_CATEGORIES] as const;

export default function SkillsPage() {
	const { data, isLoading } = useSkills();
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState<string>("All");

	const filtered = useMemo(() => {
		const term = query.trim().toLowerCase();

		let list: Skill[] = (data?.skills || []).filter((s) => {
			const matchesFilter = filter === "All" || s.category === filter;
			const matchesQuery =
				!term ||
				s.name.toLowerCase().includes(term) ||
				s.category.toLowerCase().includes(term);
			return matchesFilter && matchesQuery;
		});

		// Sort by order (ascending); fall back to featured first, then name
		list = [...list].sort(
			(a, b) =>
				(a.order ?? Number.MAX_SAFE_INTEGER) -
					(b.order ?? Number.MAX_SAFE_INTEGER) ||
				Number(b.featured ? 1 : 0) - Number(a.featured ? 1 : 0) ||
				a.name.localeCompare(b.name),
		);

		return list;
	}, [data, query, filter]);

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1
						className="font-display font-bold text-2xl md:text-3xl"
						style={{ color: "var(--foreground)" }}
					>
						Skills
					</h1>
					<p
						className="text-sm mt-1"
						style={{ color: "var(--muted-foreground)" }}
					>
						{filtered.length} of ${data?.skills?.length} skills
					</p>
				</div>
				<Link
					href="/dashboard/skills/new"
					className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:opacity-90"
					style={{
						background: "linear-gradient(135deg, #6366f1, #06b6d4)",
					}}
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						width="16"
						height="16"
					>
						<line x1="12" y1="5" x2="12" y2="19" />
						<line x1="5" y1="12" x2="19" y2="12" />
					</svg>
					Add Skill
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
						placeholder="Search by name or category…"
						className="w-full pl-10 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20"
						style={{
							background: "var(--secondary)",
							color: "var(--foreground)",
							border: "1px solid var(--border)",
						}}
					/>
				</div>

				<div className="flex flex-wrap gap-2">
					{FILTERS.map((f) => {
						const cat = f as SkillCategory;
						const color = f === "All" ? "#6366f1" : SKILL_CATEGORY_COLORS[cat];
						return (
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
									background: filter === f ? color : "var(--secondary)",
									border: "1px solid var(--border)",
								}}
							>
								{f === "All" ? "All" : f}
							</button>
						);
					})}
				</div>
			</div>

			{/* Grid */}
			{isLoading ? (
				<div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
					Loading…
				</div>
			) : filtered.length === 0 ? (
				<div
					className="glass rounded-2xl p-10 text-center"
					style={{ border: "1px dashed var(--border)" }}
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						width="40"
						height="40"
						className="mx-auto mb-3"
						style={{ color: "var(--muted-foreground)" }}
					>
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
					</svg>
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
						href="/dashboard/skills/new"
						className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
						style={{
							background: "linear-gradient(135deg, #6366f1, #06b6d4)",
						}}
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							width="16"
							height="16"
						>
							<line x1="12" y1="5" x2="12" y2="19" />
							<line x1="5" y1="12" x2="19" y2="12" />
						</svg>
						Add Skill
					</Link>
				</div>
			) : (
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{filtered.map((skill) => (
						<SkillCard key={skill.id} skill={skill} />
					))}
				</div>
			)}
		</div>
	);
}
