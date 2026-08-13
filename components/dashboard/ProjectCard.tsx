"use client";

import { useDeleteProject } from "@/hooks/use-projects";
import { Edit3, ExternalLink, Loader, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import Github from "../ui/github";
import { Button } from "../ui/button";

export default function ProjectCard({
	project,
	onDeleted,
}: {
	project: Project;
	onDeleted?: () => void;
}) {
	const [deletingID, setdeletingId] = useState("");

	const cancel = () => {
		setdeletingId("");
	};

	return (
		<>
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
							className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
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
					<div className="flex items-center gap-2 justify-between">
						<Button variant="outline" className="cursor-pointer">
							<Link
								href={`/dashboard/projects/${project.id}/edit`}
								className="w-full h-full flex gap-1 items-center text-primary/70"
							>
								<Edit3 className="h-3 w-3" />
								Edit
							</Link>
						</Button>
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
							<Github />
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

						<Button
							onClick={() => setdeletingId(project.id)}
							variant="outline"
							className="cursor-pointer"
						>
							<Trash2 className="w-4 h-4 text-destructive" />
						</Button>
					</div>
				</div>
			</motion.div>
			{deletingID && (
				<DeleteModal title={project.title} cancel={cancel} id={project.id} />
			)}
		</>
	);
}

function DeleteModal({
	title,
	cancel,
	id,
}: {
	title: string;
	cancel: () => void;
	id: string;
}) {
	const { mutateAsync: deleteProject, isPending: isDelting } =
		useDeleteProject();

	const handleDelete = async () => {
		const res = await deleteProject(id);
		console.log("Res: ", res);
	};

	return (
		<div className="absolute z-50 bg-black/50 top-0 left-0 w-full flex items-center justify-center h-full">
			<div className="text-center bg-card w-full max-w-md py-8 px-4 rounded-md">
				<p className="text-xl">
					Are you sure you to delete <br />
					<span className="text-2xl">{title}</span>
				</p>
				<div className="grid grid-cols-2 my-5 gap-5">
					<Button
						onClick={cancel}
						disabled={isDelting}
						variant="secondary"
						className="cursor-pointer"
					>
						Cancel
					</Button>
					<Button
						onClick={handleDelete}
						disabled={isDelting}
						variant="destructive"
						className="cursor-pointer"
					>
						{isDelting ? (
							<Loader className="w-4 h-4 animate-spin" />
						) : (
							<>Confirm</>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
