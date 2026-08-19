"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { SettingsRes } from "@/types/auth";
import Github from "./ui/github";
import LinknedIn from "./ui/linknedIn";
import Twitter from "./ui/twitter";
import Instagram from "./ui/instagram";
import SocialIcon from "./ui/socialIcon";

const fadeUp = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
};

type Props = {
	profile: NonNullable<SettingsRes["settings"]>["profile"];
	typingTexts: NonNullable<SettingsRes["settings"]>["typingTexts"];
	resumeUrl: string;
	socialLinks?: NonNullable<SettingsRes["settings"]>["socialLinks"];
};

const getSocialIcon = (key: string) => {
	if (key === "github") return <Github />;
	if (key === "linkedin") return <LinknedIn />;
	if (key === "twitter") return <Twitter />;
	if (key === "instagram") return <Instagram />;
	return <SocialIcon />;
};

export default function Hero({
	profile,
	typingTexts,
	resumeUrl,
	socialLinks,
}: Props) {
	const typedText = useTypingEffect(typingTexts);

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
							<span className="text-gradient">
								{profile?.name?.split(" ")[0]}
							</span>
							<br />
							<span style={{ color: "var(--foreground)" }}>
								{profile?.name?.split(" ").slice(1).join(" ")}
							</span>
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
							{profile?.tagline}
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
								href={resumeUrl}
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
							{Object.entries(socialLinks ?? {}).map(([key, value]) =>
								key !== "website" ? (
									<a
										key={key}
										href={value}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.05] glass"
										style={{ color: "var(--muted-foreground)" }}
										aria-label={key}
									>
										{getSocialIcon(key)}
										<span className="hidden sm:inline">
											{key.at(0)?.toUpperCase()}
											{key.slice(1)}
										</span>
									</a>
								) : null,
							)}
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
									src={profile.avatar}
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
