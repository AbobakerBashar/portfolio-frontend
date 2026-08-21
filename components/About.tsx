"use client";

import { useJourneys } from "@/hooks/use-journey";
import { DEFAULT_CAREER_CONTENT, loadCareerContent } from "@/lib/experience";
import { motion, type Transition, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 30 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true as const },
	transition: { duration: 0.6, delay, ease: "easeOut" } as Transition,
});

export default function About() {
	const timelineRef = useRef(null);
	const inView = useInView(timelineRef, { once: true });
	const [career, setCareer] = useState(DEFAULT_CAREER_CONTENT);
	const { data } = useJourneys();
	const journeys = data?.learningJourneys || [];

	useEffect(() => {
		const setData = () => {
			setCareer(loadCareerContent());
		};
		setData();
	}, []);

	return (
		<section id="about" className="relative py-32 px-4">
			<div className="max-w-5xl mx-auto">
				<motion.div {...fadeUp(0)} className="text-center mb-16">
					<span
						className="text-xs font-mono font-semibold tracking-widest uppercase mb-3 block"
						style={{ color: "#6366f1" }}
					>
						About Me
					</span>
					<h2
						className="font-display font-bold text-4xl md:text-5xl mb-4"
						style={{ color: "var(--foreground)" }}
					>
						A Beginner Developer Ready to Grow
					</h2>
					<p
						className="text-base max-w-xl mx-auto"
						style={{ color: "var(--muted-foreground)" }}
					>
						I&apos;m currently learning and building with modern web
						technologies, and I&apos;m actively looking for a junior developer
						role where I can keep improving while contributing to real projects.
					</p>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-12 items-start">
					<div>
						<motion.div
							{...fadeUp(0.1)}
							className="relative rounded-3xl overflow-hidden mb-8 aspect-video"
						>
							<Image
								src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=400&fit=crop&auto=format"
								alt="Developer workspace"
								fill
								sizes="100%"
								className="w-full h-full object-cover"
							/>
							<div
								className="absolute inset-0"
								style={{
									background:
										"linear-gradient(to bottom, transparent 50%, rgba(5,5,8,0.8) 100%)",
								}}
							/>
							<div className="absolute bottom-4 left-4 right-4">
								<div className="font-display font-semibold text-white text-sm">
									Abobaker Yagoub Bashar
								</div>
								<div className="text-xs text-white/60">
									Junior Frontend / Full-Stack Developer
								</div>
							</div>
						</motion.div>

						<motion.div {...fadeUp(0.2)} className="glass rounded-2xl p-6">
							<h3
								className="font-display font-semibold text-lg mb-3"
								style={{ color: "var(--foreground)" }}
							>
								Background & Mindset
							</h3>
							<p
								className="text-sm leading-relaxed mb-4"
								style={{ color: "var(--muted-foreground)" }}
							>
								I&apos;m a beginner web developer with a strong interest in
								frontend development and building polished user experiences.
								I&apos;m currently pursuing my studies in Computer Science while
								building real projects and improving my coding skills.
							</p>
							<p
								className="text-sm leading-relaxed mb-4"
								style={{ color: "var(--muted-foreground)" }}
							>
								What I bring right now is curiosity, consistency, and a
								willingness to learn fast. I enjoy turning ideas into clean,
								responsive web interfaces and I&apos;m excited to grow inside a
								team that values mentorship and collaboration.
							</p>
							<p
								className="text-sm leading-relaxed"
								style={{ color: "var(--muted-foreground)" }}
							>
								I&apos;m actively looking for a junior role where I can
								contribute, learn from experienced developers, and build my
								career step by step while completing my studies.
							</p>
						</motion.div>
					</div>

					<div className="space-y-6">
						<motion.div {...fadeUp(0.15)}>
							<h3
								className="font-display font-semibold text-base mb-5"
								style={{ color: "var(--foreground)" }}
							>
								My Journey
							</h3>
							<div className="relative" ref={timelineRef}>
								<div
									className="absolute left-3.5 top-0 w-px"
									style={{
										height: inView ? "100%" : "0%",
										background: "linear-gradient(to bottom, #6366f1, #06b6d4)",
										transition: "height 1.5s ease",
									}}
								/>
								<div className="space-y-6">
									{journeys.map((item, index) => (
										<motion.div
											key={item.id}
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true }}
											transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
											className="flex gap-4 pl-10 relative"
										>
											<div
												className="absolute left-0 top-1.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold"
												style={{
													background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
													color: "white",
												}}
											>
												{String(index + 1).padStart(2, "0")}
											</div>
											<div>
												<div className="flex items-center gap-2 mb-1">
													<span
														className="text-xs font-mono font-semibold"
														style={{ color: item.color }}
													>
														{item.year}
													</span>
													<span
														className="font-semibold text-sm"
														style={{ color: "var(--foreground)" }}
													>
														{item.title}
													</span>
												</div>
												<p
													className="text-sm"
													style={{ color: "var(--muted-foreground)" }}
												>
													{item.description}
												</p>
											</div>
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>

						<motion.div {...fadeUp(0.3)} className="glass rounded-2xl p-6">
							<h3
								className="font-display font-semibold text-base mb-4"
								style={{ color: "var(--foreground)" }}
							>
								Education
							</h3>
							<div className="space-y-4">
								{career.education.map((item) => (
									<div key={item.id} className="flex items-start gap-3">
										<div
											className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
											style={{ background: `${item.color}15` }}
										>
											{item.icon}
										</div>
										<div>
											<div
												className="font-semibold text-sm"
												style={{ color: "var(--foreground)" }}
											>
												{item.degree}
											</div>
											<div
												className="text-xs mb-1"
												style={{ color: item.color }}
											>
												{item.school}
											</div>
											<div
												className="text-xs"
												style={{ color: "var(--muted-foreground)" }}
											>
												{item.description}
											</div>
										</div>
									</div>
								))}
							</div>
						</motion.div>

						<motion.div {...fadeUp(0.35)} className="glass rounded-2xl p-6">
							<h3
								className="font-display font-semibold text-base mb-3"
								style={{ color: "var(--foreground)" }}
							>
								Career Goals
							</h3>
							<p
								className="text-sm leading-relaxed mb-5"
								style={{ color: "var(--muted-foreground)" }}
							>
								I&apos;m currently studying Computer Science and looking for a
								junior frontend or full-stack role where I can learn from
								experienced teammates, improve my technical skills, and
								contribute to real business products.
							</p>
							<a
								href="/cv.pdf"
								download
								className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
								style={{
									background: "linear-gradient(135deg, #6366f1, #4f46e5)",
								}}
							>
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
									<polyline points="7 10 12 15 17 10" />
									<line x1="12" y1="15" x2="12" y2="3" />
								</svg>
								Download CV
							</a>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
