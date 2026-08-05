import SkillForm from "@/components/dashboard/SkillForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewSkillPage() {
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
					Add Skill
				</h1>
				<p
					className="text-sm mt-1"
					style={{ color: "var(--muted-foreground)" }}
				>
					Add a new skill to showcase in your portfolio.
				</p>
			</div>

			<div
				className="glass rounded-2xl p-6 md:p-8"
				style={{ border: "1px solid var(--border)" }}
			>
				<SkillForm submitLabel="Create Skill" />
			</div>
		</div>
	);
}
