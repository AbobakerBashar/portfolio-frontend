"use client";

import { useScrollProgress } from "@/hooks/useScrollSpy";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ToggleTheme from "./ToggleTheme";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import Logo from "./Logo";
import { useGetAdmin } from "@/hooks/use-auth";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
	{ id: "home", label: "Home" },
	{ id: "about", label: "About" },
	{ id: "skills", label: "Skills" },
	{ id: "projects", label: "Projects" },
	{ id: "experience", label: "Experience" },
	{ id: "contact", label: "Contact" },
];

const SECTIONS = [
	"home",
	"about",
	"skills",
	"projects",
	"experience",
	"contact",
];

export default function Navbar() {
	const activeSection = useScrollSpy(SECTIONS);
	const { data } = useGetAdmin();
	const isAdmin = !!data?.user;

	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const progress = useScrollProgress();

	useEffect(() => {
		const fn = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", fn, { passive: true });
		return () => window.removeEventListener("scroll", fn);
	}, []);

	const scrollTo = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		setMenuOpen(false);
	};

	return (
		<>
			{/* Progress bar */}
			<div
				className="fixed top-0 left-0 right-0 z-100 h-0.5"
				style={{ background: "var(--border)" }}
			>
				<motion.div
					className="h-full"
					style={{
						width: `${progress}%`,
						background: "linear-gradient(90deg, #6366f1, #06b6d4)",
					}}
					transition={{ ease: "linear" }}
				/>
			</div>

			<motion.nav
				initial={{ y: -80, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="fixed top-1 left-0 right-0 z-50 flex justify-center px-4"
			>
				<div
					className={`w-full max-w-5xl flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
						scrolled ? "glass shadow-2xl" : "bg-transparent"
					}`}
				>
					{/* Logo */}
					<button onClick={() => scrollTo("home")}>
						<Logo className="w-32 h-auto cursor-pointer" />
					</button>

					{/* Desktop nav */}
					<div className="hidden md:flex items-center gap-1">
						{NAV_LINKS.map((link) => (
							<button
								key={link.id}
								onClick={() => scrollTo(link.id)}
								className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
									activeSection === link.id
										? "text-primary"
										: "text-muted-foreground"
								}`}
							>
								{activeSection === link.id && (
									<motion.span
										layoutId="nav-pill"
										className="absolute inset-0 rounded-lg"
										style={{ background: "rgba(99,102,241,0.1)" }}
										transition={{ type: "spring", stiffness: 400, damping: 30 }}
									/>
								)}
								<span className="relative z-10">{link.label}</span>
							</button>
						))}
						{isAdmin && (
							<Link
								href="/dashboard"
								className="text-muted-foreground px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
							>
								Dashboard
							</Link>
						)}
					</div>

					{/* Right controls */}
					<div className="flex items-center gap-2">
						<ToggleTheme />

						<a
							href="#contact"
							onClick={(e) => {
								e.preventDefault();
								scrollTo("contact");
							}}
							className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
							style={{
								background: "linear-gradient(135deg, #6366f1, #4f46e5)",
							}}
						>
							Hire Me
						</a>

						{/* Mobile menu */}
						<button
							onClick={() => setMenuOpen((o) => !o)}
							className="md:hidden p-2 rounded-xl transition-colors hover:bg-white/5"
							style={{ color: "var(--muted-foreground)" }}
						>
							<motion.div animate={menuOpen ? "open" : "closed"}>
								{menuOpen ? (
									<Menu className="w-4 h-4" />
								) : (
									<X className="w-4 h-4" />
								)}
							</motion.div>
						</button>
					</div>
				</div>

				{/* Mobile menu dropdown */}
				<AnimatePresence>
					{menuOpen && (
						<motion.div
							initial={{ opacity: 0, y: -10, scale: 0.97 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -10, scale: 0.97 }}
							transition={{ duration: 0.2 }}
							className="absolute top-full mt-2 left-4 right-4 glass rounded-2xl py-3 shadow-2xl md:hidden"
						>
							{NAV_LINKS.map((link) => (
								<button
									key={link.id}
									onClick={() => scrollTo(link.id)}
									className="w-full text-left px-5 py-3 text-sm font-medium transition-colors duration-150 hover:text-indigo-400"
									style={{
										color:
											activeSection === link.id
												? "#6366f1"
												: "var(--muted-foreground)",
									}}
								>
									{link.label}
								</button>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</motion.nav>
		</>
	);
}
