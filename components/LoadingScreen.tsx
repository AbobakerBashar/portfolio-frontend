"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
	const [visible, setVisible] = useState(true);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const steps = [20, 45, 70, 90, 100];
		let i = 0;
		const interval = setInterval(() => {
			if (i < steps.length) {
				setProgress(steps[i]);
				i++;
			} else {
				clearInterval(interval);
				setTimeout(() => setVisible(false), 200);
			}
		}, 150);
		return () => clearInterval(interval);
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0, scale: 1.02 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="fixed inset-0 z-9999 flex flex-col items-center justify-center"
					style={{ background: "#050508" }}
				>
					{/* Glowing orb */}
					<div className="absolute inset-0 pointer-events-none overflow-hidden">
						<div
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1255 h-1255 rounded-full"
							style={{
								background:
									"radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
								filter: "blur(60px)",
							}}
						/>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
						className="relative flex flex-col items-center gap-8"
					>
						{/* Logo */}
						<div className="flex items-center gap-3">
							<motion.div
								animate={{ rotate: [0, 360] }}
								transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
								className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold font-display"
								style={{
									background: "linear-gradient(135deg, #6366f1, #06b6d4)",
								}}
							>
								A
							</motion.div>
							<div>
								<div
									className="font-display font-bold text-xl"
									style={{ color: "#f1f5f9" }}
								>
									Abobaker<span style={{ color: "#6366f1" }}>.</span>dev
								</div>
								<div className="text-xs font-mono" style={{ color: "#64748b" }}>
									Full-Stack JavaScript Developer
								</div>
							</div>
						</div>

						{/* Progress bar */}
						<div className="w-48">
							<div
								className="h-0.5 rounded-full overflow-hidden"
								style={{ background: "rgba(255,255,255,0.06)" }}
							>
								<motion.div
									className="h-full rounded-full"
									animate={{ width: `${progress}%` }}
									transition={{ duration: 0.3, ease: "easeOut" }}
									style={{
										background: "linear-gradient(90deg, #6366f1, #06b6d4)",
									}}
								/>
							</div>
							<div className="mt-2 text-right">
								<span
									className="text-xs font-mono"
									style={{ color: "#64748b" }}
								>
									{progress}%
								</span>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
