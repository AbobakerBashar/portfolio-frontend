"use client";

import ProjectForm from "@/components/dashboard/ProjectForm";
import { useProject } from "@/hooks/use-projects";
import { ProjectFormValues } from "@/types/project";
import { ArrowLeft, PackageX } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

export default function EditProjectPage() {
	const params = useParams<{ id: string }>();

	const { data, isLoading } = useProject(params.id);

	const project = data?.project;

	if (isLoading) return;

	if (!project) notFound();

	const formValues: ProjectFormValues = {
		title: project.title,
		description: project.description,
		category: project.category,
		preview: project.image,
		tech: project.tech,
		features: project.features,
		demo: project.demo,
		github: project.github,
		color: project.color,
		image: null,
	};

	return (
		<div className="space-y-8">
			<div>
				<Link
					href="/dashboard/projects"
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
					Edit Project
				</h1>
				<p
					className="text-sm mt-1"
					style={{ color: "var(--muted-foreground)" }}
				>
					{project
						? `Updating "${project.title}"`
						: "Update your project details."}
				</p>
			</div>

			{isLoading ? (
				<div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
					Loading…
				</div>
			) : !project ? (
				<div
					className="glass rounded-2xl p-10 text-center"
					style={{ border: "1px dashed var(--border)" }}
				>
					<PackageX
						className="h-10 w-10 mx-auto mb-3"
						style={{ color: "var(--muted-foreground)" }}
					/>
					<p
						className="font-semibold mb-1"
						style={{ color: "var(--foreground)" }}
					>
						Project not found
					</p>
					<p
						className="text-sm mb-4"
						style={{ color: "var(--muted-foreground)" }}
					>
						This project may have been deleted.
					</p>
					<Link
						href="/dashboard/projects"
						className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
						style={{
							background: "linear-gradient(135deg, #6366f1, #06b6d4)",
						}}
					>
						View all projects
					</Link>
				</div>
			) : (
				<div
					className="glass rounded-2xl p-6 md:p-8"
					style={{ border: "1px solid var(--border)" }}
				>
					<ProjectForm
						initialValues={formValues}
						submitLabel="Update Project"
						id={params.id}
						editting={true}
					/>
				</div>
			)}
		</div>
	);
}
