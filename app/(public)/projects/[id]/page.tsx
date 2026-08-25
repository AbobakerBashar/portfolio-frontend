"use client";

import { useProject } from "@/hooks/use-projects";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectDetailsPage() {
	const params = useParams<{ id: string }>();

	const { data, isLoading } = useProject(params.id);

	const project = data?.project;

	if (isLoading) return null;

	if (!project) notFound();

	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			className="min-h-screen space-y-6 px-4 pt-20 pb-10"
		>
			<div>
				<Link
					href="/#projects"
					className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 mb-4"
					style={{ color: "#6366f1" }}
				>
					<ArrowLeft className="h-3.5 w-3.5" />
					Back to projects
				</Link>

				<h1
					className="font-display font-bold text-2xl md:text-3xl"
					style={{ color: "var(--foreground)" }}
				>
					{project.title}
				</h1>
				<p
					className="text-sm mt-1"
					style={{ color: "var(--muted-foreground)" }}
				>
					{project.category} •{" "}
					{new Date(project.createdAt).toLocaleDateString()}
				</p>
			</div>

			<div
				className="glass rounded-2xl overflow-hidden"
				style={{ border: "1px solid var(--border)" }}
			>
				<div className="relative h-56 md:h-72">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={project.image}
						alt={project.title}
						className="w-full h-full object-cover"
					/>
					<div
						className="absolute inset-0"
						style={{
							background: `linear-gradient(to bottom, transparent 30%, rgba(5,5,8,0.7) 100%)`,
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

				<div className="p-6 md:p-8">
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<p
								className="text-sm mb-3"
								style={{ color: "var(--muted-foreground)" }}
							>
								{project.description}
							</p>

							<div className="mb-4">
								<h3
									className="text-sm font-semibold mb-2"
									style={{ color: "var(--foreground)" }}
								>
									Features
								</h3>
								<ul
									className="list-disc ml-5 text-sm"
									style={{ color: "var(--muted-foreground)" }}
								>
									{project.features.map((f) => (
										<li key={f}>{f}</li>
									))}
								</ul>
							</div>

							<div>
								<h3
									className="text-sm font-semibold mb-2"
									style={{ color: "var(--foreground)" }}
								>
									Tech
								</h3>
								<div className="flex flex-wrap gap-2">
									{project.tech.map((t) => (
										<span
											key={t}
											className="text-[12px] px-2 py-1 rounded font-mono"
											style={{
												background: "var(--secondary)",
												color: "var(--muted-foreground)",
											}}
										>
											{t}
										</span>
									))}
								</div>
							</div>
						</div>

						<div className="shrink-0 flex flex-col gap-3 w-44">
							<a
								href={project.demo}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm"
								style={{
									background: "linear-gradient(135deg, #6366f1, #06b6d4)",
									color: "white",
								}}
							>
								<ExternalLink className="w-4 h-4" />
								Live demo
							</a>

							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm"
								style={{
									background: "var(--secondary)",
									color: "var(--muted-foreground)",
									border: "1px solid var(--border)",
								}}
							>
								<ExternalLink className="w-4 h-4" />
								View repo
							</a>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
