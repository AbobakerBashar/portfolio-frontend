"use client";

import type { DashboardSkill } from "@/types/skill";
import { SKILL_CATEGORY_COLORS } from "@/lib/skills";
import { useDeleteSkill } from "@/hooks/use-skills";
import { Edit3, Loader, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SkillCard({ skill }: { skill: DashboardSkill }) {
	const [confirming, setConfirming] = useState(false);
	const { mutateAsync: deleteSkill, isPending: isDeleting } = useDeleteSkill();
	const color = skill.color || SKILL_CATEGORY_COLORS[skill.category];

	const handleDelete = async () => {
		if (isDeleting) return;
		const res = await deleteSkill(skill.id);
	};

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className="group rounded-2xl glass p-5 hover:shadow-xl transition-shadow duration-300"
			style={{ border: "1px solid var(--border)" }}
		>
			{/* Header */}
			<div className="flex items-start justify-between gap-2 mb-4">
				<div
					className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-mono font-bold"
					style={{
						background: `${color}15`,
						color,
					}}
				>
					{skill.icon}
				</div>
				<div className="flex items-center gap-1.5">
					{skill.featured && (
						<span
							className="text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold"
							style={{
								background: "rgba(245,158,11,0.15)",
								color: "#f59e0b",
								border: "1px solid rgba(245,158,11,0.3)",
							}}
							title="Featured skill"
						>
							★ Featured
						</span>
					)}
					<span
						className="text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold"
						style={{
							background: `${color}12`,
							color,
						}}
					>
						{skill.category}
					</span>
				</div>
			</div>

			{/* Order badge */}
			<div className="flex items-center justify-between mb-2">
				<span
					className="text-[10px] font-mono"
					style={{ color: "var(--muted-foreground)" }}
				>
					#{skill.order ?? "-"}
				</span>
			</div>

			{/* Name */}
			<h3
				className="font-display font-semibold text-sm mb-3"
				style={{ color: "var(--foreground)" }}
			>
				{skill.name}
			</h3>

			{/* Level bar */}
			<div className="mb-4">
				<div
					className="h-1.5 rounded-full overflow-hidden mb-1"
					style={{ background: "var(--border)" }}
				>
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: `${skill.proficiency}%` }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="h-full rounded-full"
						style={{
							background: `linear-gradient(90deg, ${color}, ${color}99)`,
						}}
					/>
				</div>
				<div className="flex items-center justify-between">
					<span
						className="text-[10px] font-mono"
						style={{ color: "var(--muted-foreground)" }}
					>
						Proficiency
					</span>
					<span
						className="text-[10px] font-mono font-semibold"
						style={{ color }}
					>
						{skill.proficiency}%
					</span>
				</div>
			</div>

			{/* Actions */}
			<div className="flex items-center gap-2">
				<Link
					href={`/dashboard/skills/${skill.id}/edit`}
					className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-[1.02]"
					style={{
						background: "var(--secondary)",
						color: "var(--foreground)",
						border: "1px solid var(--border)",
					}}
				>
					<Edit3 className="h-3 w-3" />
					Edit
				</Link>
				<AnimatePresence mode="popLayout">
					{!confirming ? (
						<motion.button
							key={confirming ? "confirm" : "delete"}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.15 }}
							onClick={() => setConfirming(true)}
							disabled={isDeleting}
							className="p-2 rounded-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
							style={{
								background: "var(--secondary)",
								color: "var(--muted-foreground)",
								border: `1px solid var(--border)`,
							}}
							aria-label={confirming ? "Confirm delete" : "Delete skill"}
						>
							<Trash2 className="h-3.5 w-3.5" />
						</motion.button>
					) : (
						<motion.button
							key={confirming ? "confirm" : "delete"}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.15 }}
							onClick={handleDelete}
							disabled={isDeleting}
							className="p-2 rounded-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
							style={{
								background: "rgba(239,68,68,0.15)",
								color: "#ef4444",
								border: `1px solid #ef4444`,
							}}
							aria-label={"Confirm delete"}
						>
							{isDeleting ? (
								<Loader className="w-4 h-4 animate-spin" />
							) : (
								<span className="text-[10px] font-bold px-0.5">Sure?</span>
							)}
						</motion.button>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
