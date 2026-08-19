"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { GetSkillsResponse, SkillCategory } from "@/types/skill";

const CATEGORY_COLORS: Record<string, string> = {
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

export default function Skills({ skills }: { skills?: GetSkillsResponse }) {
	const [active, setActive] = useState<SkillCategory | "All">("All");

	const filtered = useMemo(() => {
		const filtered =
			active === "All"
				? skills?.skills || []
				: (skills?.skills || []).filter((s) => s.category === active);

		return filtered;
	}, [skills, active]);

	const skillCategories = [
		...new Set(skills?.skills?.map((s) => s.category) || []),
	];

	return (
		<section id="skills" className="relative py-32 px-4">
			{/* Divider line */}
			<div
				className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 opacity-20"
				style={{
					background: "linear-gradient(to bottom, transparent, #6366f1)",
				}}
			/>

			<div className="max-w-5xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<span
						className="text-xs font-mono font-semibold tracking-widest uppercase mb-3 block"
						style={{ color: "#6366f1" }}
					>
						Technical Skills
					</span>
					<h2
						className="font-display font-bold text-4xl md:text-5xl mb-4"
						style={{ color: "var(--foreground)" }}
					>
						My Tech Stack
					</h2>
					<p
						className="text-base max-w-xl mx-auto"
						style={{ color: "var(--muted-foreground)" }}
					>
						Technologies I use daily to build fast, scalable, and maintainable
						applications.
					</p>
				</motion.div>

				{/* Filter tabs */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
					className="flex justify-center gap-2 mb-12 flex-wrap"
				>
					<button
						onClick={() => setActive("All")}
						className="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
						style={{
							background: active === "All" ? "#6366f1" : "var(--card)",
							color: active === "All" ? "white" : "var(--muted-foreground)",
							border: `1px solid ${active === "All" ? "#6366f1" : "var(--border)"}`,
						}}
					>
						All
					</button>
					{skillCategories.map((cat) => (
						<button
							key={cat}
							onClick={() => setActive(cat)}
							className="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
							style={{
								background: active === cat ? "#6366f1" : "var(--card)",
								color: active === cat ? "white" : "var(--muted-foreground)",
								border: `1px solid ${active === cat ? "#6366f1" : "var(--border)"}`,
							}}
						>
							{cat}
						</button>
					))}
				</motion.div>

				{/* Skill cards grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
					{filtered.map((skill, i) => {
						const color = CATEGORY_COLORS[skill.category] || "#6366f1";
						return (
							<motion.div
								key={`${skill.name}-${active}`}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									delay: i * 0.04,
									duration: 0.35,
									ease: "easeOut",
								}}
								whileHover={{ scale: 1.03, y: -4 }}
								className="glass rounded-2xl p-5 cursor-default group"
								data-hover
							>
								{/* Icon */}
								<div
									className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 font-mono font-bold text-sm"
									style={{ background: `${color}15`, color: color }}
								>
									{skill.icon}
								</div>

								<div
									className="font-semibold text-sm mb-3"
									style={{ color: "var(--foreground)" }}
								>
									{skill.name}
								</div>

								{/* Proficiency bar */}
								<div
									className="h-1 rounded-full overflow-hidden"
									style={{ background: "var(--border)" }}
								>
									<motion.div
										initial={{ width: 0 }}
										whileInView={{ width: `${skill.proficiency}%` }}
										viewport={{ once: true }}
										transition={{
											duration: 0.8,
											delay: i * 0.04 + 0.2,
											ease: "easeOut",
										}}
										className="h-full rounded-full"
										style={{
											background: `linear-gradient(90deg, ${color}, ${color}99)`,
										}}
									/>
								</div>
								<div className="flex justify-between mt-1.5">
									<span
										className="text-xs font-mono"
										style={{ color: "var(--muted-foreground)" }}
									>
										{skill.category}
									</span>
									<span
										className="text-xs font-mono font-semibold"
										style={{ color }}
									>
										{skill.proficiency}%
									</span>
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Category breakdown legend */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4 }}
					className="mt-12 grid sm:grid-cols-3 gap-4"
				>
					{" "}
					{skillCategories.map((c) => (
						<div key={c} className="glass rounded-2xl p-5">
							<div className="flex items-center gap-2 mb-3">
								<div
									className="w-2 h-2 rounded-full"
									style={{ background: CATEGORY_COLORS[c] }}
								/>
								<span
									className="font-semibold text-sm"
									style={{ color: "var(--foreground)" }}
								>
									{c}
								</span>
							</div>
							<div className="flex flex-wrap gap-1.5">
								{(skills?.skills || []).map((s) =>
									s.category === c ? (
										<span
											key={s.name}
											className="text-xs px-2 py-0.5 rounded-md font-mono"
											style={{
												background: `${CATEGORY_COLORS[c]}15`,
												color: CATEGORY_COLORS[c],
											}}
										>
											{s.name}
										</span>
									) : null,
								)}
							</div>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
