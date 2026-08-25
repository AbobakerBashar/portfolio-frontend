"use client";

import SkillForm from "@/components/dashboard/SkillForm";
import { useSkill } from "@/hooks/use-skills";
import { SKILL_CATEGORY_COLORS } from "@/lib/utils";
import { ArrowLeft, PackageX } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditSkillPage() {
	const params = useParams<{ id: string }>();

	const { data, isLoading } = useSkill(params.id);
	const skill = data?.skill;

	return (
		<div className="space-y-8">
			<div>
				<Link
					href="/dashboard/skills"
					className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 mb-4"
					style={{ color: "#6366f1" }}
				>
					<ArrowLeft className="h-3.5 w-3.5" />
					Back to skills
				</Link>
				<h1
					className="font-display font-bold text-2xl md:text-3xl"
					style={{ color: "var(--foreground)" }}
				>
					Edit Skill
				</h1>
				<p
					className="text-sm mt-1"
					style={{ color: "var(--muted-foreground)" }}
				>
					{skill ? `Updating "${skill.name}"` : "Update your skill details."}
				</p>
			</div>

			{isLoading ? (
				<div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
					Loading…
				</div>
			) : !skill ? (
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
						Skill not found
					</p>
					<p
						className="text-sm mb-4"
						style={{ color: "var(--muted-foreground)" }}
					>
						This skill may have been deleted.
					</p>
					<Link
						href="/dashboard/skills"
						className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
						style={{
							background: "linear-gradient(135deg, #6366f1, #06b6d4)",
						}}
					>
						View all skills
					</Link>
				</div>
			) : (
				<div
					className="glass rounded-2xl p-6 md:p-8"
					style={{ border: "1px solid var(--border)" }}
				>
					<SkillForm
						initialValues={{
							name: skill.name,
							proficiency: skill.proficiency,
							icon: skill.icon,
							category: skill.category,
							color: SKILL_CATEGORY_COLORS[skill.category],
							order: skill.order,
							featured: skill.featured,
						}}
						submitLabel="Update Skill"
						id={skill.id}
						isEdting={true}
					/>
				</div>
			)}
		</div>
	);
}
