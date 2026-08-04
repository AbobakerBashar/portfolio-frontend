"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
	const [pos, setPos] = useState({ x: -100, y: -100 });
	const [trail, setTrail] = useState({ x: -100, y: -100 });
	const [clicking, setClicking] = useState(false);
	const [hovering, setHovering] = useState(false);

	useEffect(() => {
		const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
		const down = () => setClicking(true);
		const up = () => setClicking(false);
		window.addEventListener("mousemove", move);
		window.addEventListener("mousedown", down);
		window.addEventListener("mouseup", up);

		const handleHover = () => {
			document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
				el.addEventListener("mouseenter", () => setHovering(true));
				el.addEventListener("mouseleave", () => setHovering(false));
			});
		};
		handleHover();

		return () => {
			window.removeEventListener("mousemove", move);
			window.removeEventListener("mousedown", down);
			window.removeEventListener("mouseup", up);
		};
	}, []);

	useEffect(() => {
		let raf: number;
		const smooth = () => {
			setTrail((t) => ({
				x: t.x + (pos.x - t.x) * 0.12,
				y: t.y + (pos.y - t.y) * 0.12,
			}));
			raf = requestAnimationFrame(smooth);
		};
		raf = requestAnimationFrame(smooth);
		return () => cancelAnimationFrame(raf);
	}, [pos]);

	return (
		<>
			<motion.div
				className="fixed top-0 left-0 z-9999 pointer-events-none hidden md:block"
				animate={{ x: pos.x - 6, y: pos.y - 6, scale: clicking ? 0.7 : 1 }}
				transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.3 }}
			>
				<div
					className="w-3 h-3 rounded-full"
					style={{ background: "#6366f1" }}
				/>
			</motion.div>
			<motion.div
				className="fixed top-0 left-0 z-9998 pointer-events-none hidden md:block"
				style={{ x: trail.x - 20, y: trail.y - 20 }}
			>
				<div
					className={`w-10 h-10 rounded-full border transition-all duration-200 ${hovering ? "scale-150 border-cyan-400" : "border-indigo-500/40"}`}
					style={{
						transform: hovering ? "scale(1.5)" : "scale(1)",
						borderColor: hovering ? "#06b6d4" : "rgba(99,102,241,0.4)",
					}}
				/>
			</motion.div>
		</>
	);
}
