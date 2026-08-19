"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { EXPERIENCE } from "../data";

export default function Experience() {
	const [expanded, setExpanded] = useState<number | null>(1);

	return (
		<section id="experience" className="relative py-32 px-4">
			<div
				className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 opacity-20"
				style={{
					background: "linear-gradient(to bottom, transparent, #8b5cf6)",
				}}
			/>

			<div className="max-w-4xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<span
						className="text-xs font-mono font-semibold tracking-widest uppercase mb-3 block"
						style={{ color: "#8b5cf6" }}
					>
						Learning Journey
					</span>
					<h2
						className="font-display font-bold text-4xl md:text-5xl mb-4"
						style={{ color: "var(--foreground)" }}
					>
						Experience & Growth
					</h2>
					<p
						className="text-base max-w-xl mx-auto"
						style={{ color: "var(--muted-foreground)" }}
					>
						I’m building my experience through coursework, personal projects,
						and hands-on practice while preparing for a junior developer role.
					</p>
				</motion.div>

				<div className="relative">
					{/* Timeline spine */}
					<div
						className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
						style={{
							background:
								"linear-gradient(to bottom, #6366f1, #06b6d4, #8b5cf6)",
							opacity: 0.2,
						}}
					/>

					<div className="space-y-6">
						{EXPERIENCE.map((exp, i) => {
							const isOpen = expanded === exp.id;
							return (
								<motion.div
									key={exp.id}
									initial={{ opacity: 0, x: -30 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.12, duration: 0.5 }}
									className="relative md:pl-16"
								>
									{/* Timeline dot */}
									<div
										className="absolute left-3.5 top-6 w-5 h-5 rounded-full hidden md:flex items-center justify-center -translate-x-1/2"
										style={{
											background: isOpen
												? `linear-gradient(135deg, ${exp.color}, ${exp.color}aa)`
												: "var(--card)",
											border: `2px solid ${exp.color}`,
											transition: "background 0.3s ease",
										}}
									>
										{isOpen && (
											<div className="w-2 h-2 rounded-full bg-white" />
										)}
									</div>

									<button
										onClick={() => setExpanded(isOpen ? null : exp.id)}
										className="w-full text-left"
									>
										<div
											className="glass rounded-2xl p-6 transition-all duration-300"
											style={{
												border: `1px solid ${isOpen ? exp.color + "40" : "var(--border)"}`,
												boxShadow: isOpen ? `0 0 30px ${exp.color}12` : "none",
											}}
										>
											<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
												<div>
													<div className="flex items-center gap-2 mb-1">
														<span
															className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md"
															style={{
																background: `${exp.color}15`,
																color: exp.color,
															}}
														>
															{exp.type}
														</span>
														<span
															className="text-xs"
															style={{ color: "var(--muted-foreground)" }}
														>
															{exp.location}
														</span>
													</div>
													<h3
														className="font-display font-bold text-lg"
														style={{ color: "var(--foreground)" }}
													>
														{exp.position}
													</h3>
													<p
														className="font-semibold text-sm"
														style={{ color: exp.color }}
													>
														{exp.company}
													</p>
												</div>
												<div className="flex items-center gap-3">
													<span
														className="text-xs font-mono px-3 py-1.5 rounded-lg"
														style={{
															background: "var(--secondary)",
															color: "var(--muted-foreground)",
														}}
													>
														{exp.period}
													</span>
													<motion.div
														animate={{ rotate: isOpen ? 180 : 0 }}
														transition={{ duration: 0.2 }}
														style={{ color: "var(--muted-foreground)" }}
													>
														<svg
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth="2"
															width="16"
															height="16"
														>
															<polyline points="6 9 12 15 18 9" />
														</svg>
													</motion.div>
												</div>
											</div>

											<p
												className="text-sm"
												style={{ color: "var(--muted-foreground)" }}
											>
												{exp.description}
											</p>

											{/* Expandable content */}
											<motion.div
												initial={false}
												animate={{
													height: isOpen ? "auto" : 0,
													opacity: isOpen ? 1 : 0,
												}}
												transition={{ duration: 0.35, ease: "easeOut" }}
												className="overflow-hidden"
											>
												<div className="pt-5 space-y-5">
													{/* Responsibilities */}
													<div>
														<h4
															className="text-xs font-mono font-semibold uppercase tracking-wider mb-3"
															style={{ color: "var(--muted-foreground)" }}
														>
															Highlights
														</h4>
														<ul className="space-y-2">
															{exp.responsibilities.map((r, j) => (
																<li
																	key={j}
																	className="flex items-start gap-2 text-sm"
																	style={{ color: "var(--muted-foreground)" }}
																>
																	<span
																		className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
																		style={{ background: exp.color }}
																	/>
																	{r}
																</li>
															))}
														</ul>
													</div>

													{/* Tech stack */}
													<div>
														<h4
															className="text-xs font-mono font-semibold uppercase tracking-wider mb-3"
															style={{ color: "var(--muted-foreground)" }}
														>
															Technologies Used
														</h4>
														<div className="flex flex-wrap gap-2">
															{exp.tech.map((t) => (
																<span
																	key={t}
																	className="text-xs px-2.5 py-1 rounded-lg font-mono"
																	style={{
																		background: `${exp.color}12`,
																		color: exp.color,
																	}}
																>
																	{t}
																</span>
															))}
														</div>
													</div>
												</div>
											</motion.div>
										</div>
									</button>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
