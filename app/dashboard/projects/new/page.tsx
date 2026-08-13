"use client";

import ProjectForm from "@/components/dashboard/ProjectForm";
import { useAddProject } from "@/hooks/use-projects";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
	const addMutation = useAddProject();

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
					Add Project
				</h1>
				<p
					className="text-sm mt-1"
					style={{ color: "var(--muted-foreground)" }}
				>
					Create a new project to showcase in your portfolio.
				</p>
			</div>

			<div
				className="glass rounded-2xl p-6 md:p-8"
				style={{ border: "1px solid var(--border)" }}
			>
				<ProjectForm submitLabel="Create Project" />
			</div>

			{addMutation.isError && (
				<div
					className="rounded-xl p-4 text-sm"
					style={{
						background: "rgba(239,68,68,0.1)",
						color: "#ef4444",
						border: "1px solid #ef4444",
					}}
				>
					There was an error saving the project. Please try again.
				</div>
			)}
		</div>
	);
}
