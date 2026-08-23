import Education from "@/components/dashboard/experience/Education";
import ExperienceEditor from "@/components/dashboard/experience/Experience";
import LearningJourney from "@/components/dashboard/experience/LearningJourney";
import { getExperiences } from "@/lib/experience";
import { getEducations } from "@/lib/education";
import { getJourneys } from "@/lib/journey";
import type { CareerContent } from "@/types/experience";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const fetchCareerContent = async (): Promise<CareerContent> => {
	const [educations, journeys, experience] = await Promise.all([
		getEducations(),
		getJourneys(),
		getExperiences(),
	]);

	return {
		experience: experience.experiences || [],
		education: educations.educations || [],
		journeys: journeys.learningJourneys || [],
	};
};

export default async function DashboardExperiencePage() {
	const { journeys, education, experience } = await fetchCareerContent();

	const stats = [
		{ label: "Experience items", value: experience.length },
		{ label: "Education items", value: education.length },
		{ label: "Journey items", value: journeys.length },
	];

	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<Link
						href="/dashboard"
						className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 mb-4"
						style={{ color: "#6366f1" }}
					>
						<ArrowLeft className="h-3.5 w-3.5" />
						Back to dashboard
					</Link>
					<h1
						className="font-display font-bold text-2xl md:text-3xl"
						style={{ color: "var(--foreground)" }}
					>
						Career Content
					</h1>
					<p
						className="text-sm mt-1"
						style={{ color: "var(--muted-foreground)" }}
					>
						Manage experience, education, and learning journey entries used
						across the portfolio.
					</p>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-3">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="glass rounded-2xl p-5"
						style={{ border: "1px solid var(--border)" }}
					>
						<div
							className="text-xs font-mono uppercase tracking-wider"
							style={{ color: "var(--muted-foreground)" }}
						>
							{stat.label}
						</div>
						<div
							className="mt-2 font-display text-3xl font-bold"
							style={{ color: "var(--foreground)" }}
						>
							{stat.value}
						</div>
					</div>
				))}
			</div>

			<ExperienceEditor experiences={experience} />

			<Education educationEntries={education} />

			<LearningJourney journeys={journeys} />
		</div>
	);
}
