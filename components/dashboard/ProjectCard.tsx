"use client";

import type { DashboardProject } from "@/lib/projects";
import { useDeleteProject } from "@/hooks/use-projects";
import { Edit3, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ProjectCard({
	project,
	onDeleted,
}: {
	project: DashboardProject;
	onDeleted?: () => void;
}) {
	const [confirming, setConfirming] = useState(false);
	const deleteMutation = useDeleteProject();

	const handleDelete = () => {
		if (!confirming) {
			setConfirming(true);
			setTimeout(() => setConfirming(false), 4000);
			return;
		}
		deleteMutation.mutate(project.id, {
			onSuccess: () => onDeleted?.(),
		});
	};

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className="group rounded-2xl overflow-hidden glass hover:shadow-xl transition-shadow duration-300"
			style={{ border: "1px solid var(--border)" }}
		>
			{/* Image */}
			<div className="relative h-40 overflow-hidden">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={project.image}
					alt={project.title}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				<div
					className="absolute inset-0"
					style={{
						background: `linear-gradient(to bottom, transparent 30%, rgba(5,5,8,0.75) 100%)`,
					}}
				/>
				<span
					className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[11px] font-semibold"
					style={{
						background: `${project.color}25`,
						color: project.color,
						backdropFilter: "blur(8px)",
					}}
				>
					{project.category}
				</span>
			</div>

			{/* Body */}
			<div className="p-4">
				<div className="flex items-start justify-between gap-2 mb-1.5">
					<h3
						className="font-display font-semibold text-sm leading-snug"
						style={{ color: "var(--foreground)" }}
					>
						{project.title}
					</h3>
					<span
						className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
						style={{ background: project.color }}
						title={project.color}
					/>
				</div>
				<p
					className="text-xs leading-relaxed mb-3 line-clamp-2"
					style={{ color: "var(--muted-foreground)" }}
				>
					{project.description}
				</p>

				{/* Tech */}
				<div className="flex flex-wrap gap-1 mb-4">
					{project.tech.slice(0, 4).map((t) => (
						<span
							key={t}
							className="text-[10px] px-1.5 py-0.5 rounded font-mono"
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
							className="text-[10px] px-1.5 py-0.5 rounded font-mono"
							style={{ color: "var(--muted-foreground)" }}
						>
							+{project.tech.length - 4}
						</span>
					)}
				</div>

				{/* Actions */}
				<div className="flex items-center gap-2">
					<Link
						href={`/dashboard/projects/${project.id}/edit`}
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
					<a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						className="p-2 rounded-lg transition-all duration-200 hover:scale-[1.02]"
						style={{
							background: "var(--secondary)",
							color: "var(--muted-foreground)",
							border: "1px solid var(--border)",
						}}
						aria-label="GitHub repository"
					>
						<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
							<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
						</svg>
					</a>
					<a
						href={project.demo}
						target="_blank"
						rel="noopener noreferrer"
						className="p-2 rounded-lg transition-all duration-200 hover:scale-[1.02]"
						style={{
							background: "var(--secondary)",
							color: "var(--muted-foreground)",
							border: "1px solid var(--border)",
						}}
						aria-label="Live demo"
					>
						<ExternalLink className="h-3.5 w-3.5" />
					</a>
					<AnimatePresence mode="popLayout">
						<motion.button
							key={confirming ? "confirm" : "delete"}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.15 }}
							onClick={handleDelete}
							disabled={deleteMutation.isPending}
							className="p-2 rounded-lg transition-all duration-200 hover:scale-[1.02]"
							style={{
								background: confirming
									? "rgba(239,68,68,0.15)"
									: "var(--secondary)",
								color: confirming ? "#ef4444" : "var(--muted-foreground)",
								border: `1px solid ${confirming ? "#ef4444" : "var(--border)"}`,
							}}
							aria-label={confirming ? "Confirm delete" : "Delete project"}
						>
							{confirming ? (
								<span className="text-[10px] font-bold px-0.5">Sure?</span>
							) : (
								<Trash2 className="h-3.5 w-3.5" />
							)}
						</motion.button>
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	);
}
