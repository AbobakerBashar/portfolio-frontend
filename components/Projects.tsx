import { useProjects } from "@/hooks/use-projects";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import Github from "./ui/github";
import Link from "next/link";
import Spinner from "./ui/spinner";

const CATEGORIES = ["All", "Full Stack", "Frontend", "Backend"] as const;

export default function Projects() {
	const [activeFilter, setActiveFilter] = useState("All");
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const { data, isLoading } = useProjects();

	const filtered = useMemo(
		() =>
			activeFilter === "All"
				? data?.projects || []
				: (data?.projects || []).filter((p) => p.category === activeFilter),
		[data, activeFilter],
	);

	return (
		<section id="projects" className="relative py-32 px-4">
			<div
				className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 opacity-20"
				style={{
					background: "linear-gradient(to bottom, transparent, #06b6d4)",
				}}
			/>

			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<span
						className="text-xs font-mono font-semibold tracking-widest uppercase mb-3 block"
						style={{ color: "#06b6d4" }}
					>
						Portfolio
					</span>
					<h2
						className="font-display font-bold text-4xl md:text-5xl mb-4"
						style={{ color: "var(--foreground)" }}
					>
						Selected Projects
					</h2>
					<p
						className="text-base max-w-xl mx-auto"
						style={{ color: "var(--muted-foreground)" }}
					>
						A selection of production-ready applications spanning e-commerce,
						SaaS, fintech, and developer tools.
					</p>
				</motion.div>

				{/* Filters */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
					className="flex justify-center gap-2 mb-12 flex-wrap"
				>
					{CATEGORIES.map((cat) => (
						<button
							key={cat}
							onClick={() => setActiveFilter(cat)}
							className="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
							style={{
								background: activeFilter === cat ? "#06b6d4" : "var(--card)",
								color:
									activeFilter === cat ? "white" : "var(--muted-foreground)",
								border: `1px solid ${activeFilter === cat ? "#06b6d4" : "var(--border)"}`,
							}}
						>
							{cat}
						</button>
					))}
				</motion.div>

				{/* Project grid */}
				{isLoading ? (
					<Spinner
						label="Loding projects..."
						className="w-full justify-center"
					/>
				) : (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						<AnimatePresence mode="popLayout">
							{filtered.map((project, i) => (
								<motion.div
									key={project.id}
									layout
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ delay: i * 0.06, duration: 0.4 }}
									onHoverStart={() => setHoveredId(project.id)}
									onHoverEnd={() => setHoveredId(null)}
									className="glass rounded-3xl overflow-hidden group cursor-default flex flex-col"
									style={{
										border: `1px solid ${hoveredId === project.id ? project.color + "50" : "var(--border)"}`,
										transition: "border-color 0.3s ease, box-shadow 0.3s ease",
										boxShadow:
											hoveredId === project.id
												? `0 0 40px ${project.color}18`
												: "none",
									}}
								>
									{/* Project image */}
									<Link
										href={`/projects/${project.id}`}
										className="relative h-48 overflow-hidden"
									>
										<motion.img
											src={project.image}
											alt={project.title}
											className="w-full h-full object-cover"
											animate={{ scale: hoveredId === project.id ? 1.06 : 1 }}
											transition={{ duration: 0.4 }}
										/>
										<div
											className="absolute inset-0"
											style={{
												background: `linear-gradient(to bottom, ${project.color}20 0%, rgba(5,5,8,0.7) 100%)`,
											}}
										/>
										{/* Category badge */}
										<div
											className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold"
											style={{
												background: `${project.color}25`,
												color: project.color,
												backdropFilter: "blur(8px)",
											}}
										>
											{project.category}
										</div>
									</Link>

									{/* Content */}
									<div className="p-5 flex-1 flex flex-col">
										<h3
											className="font-display font-bold text-base mb-2"
											style={{ color: "var(--foreground)" }}
										>
											{project.title}
										</h3>
										<p
											className="text-sm leading-relaxed mb-4"
											style={{ color: "var(--muted-foreground)" }}
										>
											{project.description}
										</p>

										{/* Features */}
										<ul className="space-y-1 mb-4">
											{project.features.slice(0, 3).map((f, j) => (
												<li
													key={j}
													className="flex items-center gap-2 text-xs"
													style={{ color: "var(--muted-foreground)" }}
												>
													<span
														className="w-1 h-1 rounded-full shrink-0"
														style={{ background: project.color }}
													/>
													{f}
												</li>
											))}
										</ul>

										{/* Tech tags */}
										<div className="flex flex-wrap gap-1.5 mb-5">
											{project.tech.slice(0, 4).map((t) => (
												<span
													key={t}
													className="text-xs px-2 py-0.5 rounded-md font-mono"
													style={{
														background: "var(--secondary)",
														color: "var(--muted-foreground)",
													}}
												>
													{t}
												</span>
											))}
											{project.tech.length > 4 && (
												<span
													className="text-xs px-2 py-0.5 rounded-md font-mono"
													style={{ color: "var(--muted-foreground)" }}
												>
													+{project.tech.length - 4}
												</span>
											)}
										</div>

										{/* Links */}
										<div className="mt-auto flex gap-2">
											<a
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-[1.02]"
												style={{
													background: "var(--secondary)",
													color: "var(--muted-foreground)",
													border: "1px solid var(--border)",
												}}
											>
												<Github />
												Code
											</a>
											<a
												href={project.demo}
												target="_blank"
												rel="noopener noreferrer"
												className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:opacity-90"
												style={{
													background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
												}}
											>
												<svg
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													width="12"
													height="12"
												>
													<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
													<polyline points="15 3 21 3 21 9" />
													<line x1="10" y1="14" x2="21" y2="3" />
												</svg>
												Live Demo
											</a>
										</div>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				)}

				{/* GitHub CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 }}
					className="text-center mt-14"
				>
					<a
						href="https://github.com/AbobakerBashar"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] glass"
						style={{
							color: "var(--foreground)",
							border: "1px solid var(--border)",
						}}
					>
						<Github />
						View All Projects on GitHub
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
					</a>
				</motion.div>
			</div>
		</section>
	);
}
