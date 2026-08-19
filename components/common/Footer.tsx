"use client";

import { useSettings } from "@/hooks/use-auth";
import { motion } from "framer-motion";

const NAV_LINKS = [
	{ label: "Home", id: "home" },
	{ label: "About", id: "about" },
	{ label: "Skills", id: "skills" },
	{ label: "Projects", id: "projects" },
	{ label: "Experience", id: "experience" },
	{ label: "Contact", id: "contact" },
];

export default function Footer() {
	const { data } = useSettings();

	const profile = data?.settings?.profile;
	const socialLinks = data?.settings?.socialLinks;

	const scrollTo = (id: string) =>
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	return (
		<footer
			className="relative pt-16 pb-8 px-4"
			style={{ borderTop: "1px solid var(--border)" }}
		>
			<div className="max-w-5xl mx-auto">
				<div className="grid sm:grid-cols-3 gap-8 mb-12">
					{/* Brand */}
					<div>
						<div className="flex items-center gap-2 mb-3">
							<div
								className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold font-display"
								style={{
									background: "linear-gradient(135deg, #6366f1, #06b6d4)",
								}}
							>
								A
							</div>
							<span
								className="font-display font-semibold text-sm"
								style={{ color: "var(--foreground)" }}
							>
								{profile?.name.split(" ")[0]}
								<span style={{ color: "#6366f1" }}>.</span>dev
							</span>
						</div>
						<p
							className="text-sm leading-relaxed"
							style={{ color: "var(--muted-foreground)" }}
						>
							{profile?.title} building fast, scalable, and beautiful web
							applications.
						</p>
					</div>

					{/* Quick links */}
					<div>
						<h4
							className="text-xs font-mono font-semibold uppercase tracking-wider mb-4"
							style={{ color: "var(--muted-foreground)" }}
						>
							Quick Links
						</h4>
						<div className="grid grid-cols-2 gap-2">
							{NAV_LINKS.map((link) => (
								<button
									key={link.id}
									onClick={() => scrollTo(link.id)}
									className="text-left text-sm transition-colors hover:text-indigo-400"
									style={{ color: "var(--muted-foreground)" }}
								>
									{link.label}
								</button>
							))}
						</div>
					</div>

					{/* Social + contact */}
					<div>
						<h4
							className="text-xs font-mono font-semibold uppercase tracking-wider mb-4"
							style={{ color: "var(--muted-foreground)" }}
						>
							Connect
						</h4>
						<div className="space-y-2">
							{Object.entries(socialLinks || {}).map(([key, value]) =>
								key !== "website" ? (
									<a
										key={key}
										href={value}
										target="_blank"
										rel="noopener noreferrer"
										className="block text-sm transition-colors hover:text-indigo-400 truncate"
										style={{ color: "var(--muted-foreground)" }}
									>
										{key}
									</a>
								) : null,
							)}
						</div>
					</div>
				</div>

				{/* Bottom bar */}
				<div
					className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
					style={{ borderTop: "1px solid var(--border)" }}
				>
					<p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
						© {new Date().getFullYear()} {profile?.name}. All rights reserved.
					</p>

					<div className="flex items-center gap-4">
						<span
							className="text-xs"
							style={{ color: "var(--muted-foreground)" }}
						>
							Built with React + Vite + Tailwind
						</span>

						<motion.button
							onClick={scrollTop}
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
							className="p-2.5 rounded-xl transition-all glass"
							aria-label="Back to top"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="#6366f1"
								strokeWidth="2"
								width="14"
								height="14"
							>
								<line x1="12" y1="19" x2="12" y2="5" />
								<polyline points="5 12 12 5 19 12" />
							</svg>
						</motion.button>
					</div>
				</div>
			</div>
		</footer>
	);
}
