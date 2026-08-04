import { motion } from "framer-motion";

import Image from "next/image";
import { useTypingEffect } from "@/hooks/useTypingEffect";

const TYPING_STRINGS = [
	"Full-Stack JavaScript Developer",
	"Next.js & React Specialist",
	"Node.js Backend Engineer",
	"TypeScript Enthusiast",
];

const fadeUp = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
};

export default function Hero() {
	const typedText = useTypingEffect(TYPING_STRINGS);

	return (
		<section
			id="home"
			className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10 overflow-hidden"
		>
			{/* Animated background orbs */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div
					className="absolute -top-40 -left-40 w-150 h-150 rounded-full opacity-20 animate-float-slow"
					style={{
						background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
						filter: "blur(80px)",
					}}
				/>
				<div
					className="absolute -bottom-40 -right-20 w-125 h-125 rounded-full opacity-15 animate-float"
					style={{
						background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
						filter: "blur(80px)",
					}}
				/>
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full opacity-5"
					style={{
						background: "radial-gradient(circle, #8b5cf6 0%, transparent 60%)",
						filter: "blur(100px)",
					}}
				/>
				{/* Grid pattern */}
				<div
					className="absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
						backgroundSize: "60px 60px",
					}}
				/>
			</div>

			<div className="relative z-10 max-w-5xl w-full mx-auto">
				<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
					{/* Text content */}
					<div className="flex-1 text-center lg:text-left">
						<motion.div
							variants={fadeUp}
							initial="initial"
							animate="animate"
							transition={{ duration: 0.6, delay: 0.1 }}
							className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 glass"
							style={{ color: "#6366f1" }}
						>
							<span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
							Available for new opportunities
						</motion.div>

						<motion.h1
							variants={fadeUp}
							initial="initial"
							animate="animate"
							transition={{ duration: 0.6, delay: 0.2 }}
							className="font-display font-bold leading-[1.05] mb-4"
							style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
						>
							<span style={{ color: "var(--foreground)" }}>Hi, I&apos;m</span>
							<br />
							<span className="text-gradient">Abobaker</span>
							<br />
							<span style={{ color: "var(--foreground)" }}>Yagoub Bashar</span>
						</motion.h1>

						<motion.div
							variants={fadeUp}
							initial="initial"
							animate="animate"
							transition={{ duration: 0.6, delay: 0.3 }}
							className="flex items-center gap-0 justify-center lg:justify-start mb-6 h-8"
						>
							<span
								className="font-display font-semibold text-lg"
								style={{ color: "var(--muted-foreground)" }}
							>
								{typedText}
							</span>
							<span
								className="inline-block w-0.5 h-6 ml-0.5 rounded-full animate-pulse"
								style={{ background: "#6366f1" }}
							/>
						</motion.div>

						<motion.p
							variants={fadeUp}
							initial="initial"
							animate="animate"
							transition={{ duration: 0.6, delay: 0.4 }}
							className="text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
							style={{ color: "var(--muted-foreground)" }}
						>
							I craft high-performance, scalable web applications from database
							to interface. Specializing in the JavaScript ecosystem — React,
							Next.js, Node.js — with a passion for clean architecture and
							exceptional user experiences.
						</motion.p>

						<motion.div
							variants={fadeUp}
							initial="initial"
							animate="animate"
							transition={{ duration: 0.6, delay: 0.5 }}
							className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
						>
							<a
								href="#projects"
								onClick={(e) => {
									e.preventDefault();
									document
										.getElementById("projects")
										?.scrollIntoView({ behavior: "smooth" });
								}}
								className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-lg"
								style={{
									background: "linear-gradient(135deg, #6366f1, #4f46e5)",
									boxShadow: "0 0 30px rgba(99,102,241,0.3)",
								}}
							>
								View Projects
							</a>
							<a
								href="#contact"
								onClick={(e) => {
									e.preventDefault();
									document
										.getElementById("contact")
										?.scrollIntoView({ behavior: "smooth" });
								}}
								className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.03] glass"
								style={{
									color: "var(--foreground)",
									border: "1px solid var(--border)",
								}}
							>
								Contact Me
							</a>
							<a
								href="/cv.pdf"
								download
								className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.03]"
								style={{
									color: "#06b6d4",
									border: "1px solid rgba(6,182,212,0.3)",
								}}
							>
								Download CV ↓
							</a>
						</motion.div>

						{/* Socials */}
						<motion.div
							variants={fadeUp}
							initial="initial"
							animate="animate"
							transition={{ duration: 0.6, delay: 0.6 }}
							className="flex gap-4 justify-center lg:justify-start"
						>
							{[
								{
									label: "GitHub",
									href: "https://github.com/abobakerBashar",
									icon: (
										<svg
											viewBox="0 0 24 24"
											fill="currentColor"
											width="18"
											height="18"
										>
											<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
										</svg>
									),
								},
								{
									label: "LinkedIn",
									href: "https://linkedin.com/in/abobakeryagoub",
									icon: (
										<svg
											viewBox="0 0 24 24"
											fill="currentColor"
											width="18"
											height="18"
										>
											<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
										</svg>
									),
								},
							].map((s) => (
								<a
									key={s.label}
									href={s.href}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.05] glass"
									style={{ color: "var(--muted-foreground)" }}
									aria-label={s.label}
								>
									{s.icon}
									<span className="hidden sm:inline">{s.label}</span>
								</a>
							))}
						</motion.div>
					</div>

					{/* Profile photo */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
						animate={{ opacity: 1, scale: 1, rotate: 0 }}
						transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
						className="relative shrink-0"
					>
						<div className="relative w-64 h-64 lg:w-80 lg:h-80">
							{/* Glow ring */}
							<div
								className="absolute inset-0 rounded-full animate-pulse-glow"
								style={{
									background:
										"conic-gradient(from 0deg, #6366f1, #06b6d4, #8b5cf6, #6366f1)",
									padding: "3px",
									borderRadius: "50%",
								}}
							>
								<div
									className="w-full h-full rounded-full"
									style={{ background: "var(--background)" }}
								/>
							</div>
							{/* Photo */}
							<div className="absolute inset-1.5 rounded-full overflow-hidden">
								<Image
									fill
									sizes="100%"
									src="/bakrey-2.jpeg"
									alt="Abobaker Yagoub Bashar — Full-Stack JavaScript Developer"
									className="w-full h-full object-cover"
								/>
							</div>
							{/* Floating badges */}
							<motion.div
								animate={{ y: [-4, 4, -4] }}
								transition={{
									duration: 3,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className="absolute -top-4 -right-4 px-3 py-1.5 rounded-xl text-xs font-semibold glass shadow-lg"
								style={{
									color: "#6366f1",
									border: "1px solid rgba(99,102,241,0.3)",
								}}
							>
								▲ Next.js
							</motion.div>
							<motion.div
								animate={{ y: [4, -4, 4] }}
								transition={{
									duration: 3.5,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-xl text-xs font-semibold glass shadow-lg"
								style={{
									color: "#06b6d4",
									border: "1px solid rgba(6,182,212,0.3)",
								}}
							>
								🟢 Node.js
							</motion.div>
						</div>
					</motion.div>
				</div>

				{/* Scroll indicator */}
			</div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.2 }}
				className="mt-12 flex flex-col items-center gap-2"
				style={{ color: "var(--muted-foreground)" }}
			>
				<span className="text-xs">Scroll to explore</span>
				<div
					className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
					style={{ border: "1px solid var(--border)" }}
				>
					<div
						className="w-1 h-2 rounded-full animate-scroll"
						style={{ background: "#6366f1" }}
					/>
				</div>
			</motion.div>
		</section>
	);
}
