"use client";

import Education from "@/components/dashboard/experience/Education";
import LearningJourney from "@/components/dashboard/experience/LearningJourney";
import Experience from "@/components/Experience";
import { Button } from "@/components/ui/button";
import {
	DEFAULT_CAREER_CONTENT,
	loadCareerContent,
	saveCareerContent,
} from "@/lib/experience";
import type { CareerContent } from "@/types/experience";
import { ArrowLeft, RotateCcw, Save, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function DashboardExperiencePage() {
	const [content, setContent] = useState<CareerContent>(DEFAULT_CAREER_CONTENT);
	const [saved, setSaved] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const setData = () => {
			setContent(loadCareerContent());
			setLoading(false);
		};
		setData();
	}, []);

	const stats = useMemo(
		() => [
			{ label: "Experience items", value: content.experience.length },
			{ label: "Education items", value: content.education.length },
			{ label: "Journey items", value: 0.0 },
		],
		[content],
	);

	const handleSave = () => {
		saveCareerContent(content);
		setSaved(true);
		window.setTimeout(() => setSaved(false), 1800);
	};

	const handleReset = () => {
		setContent(DEFAULT_CAREER_CONTENT);
		saveCareerContent(DEFAULT_CAREER_CONTENT);
		setSaved(true);
		window.setTimeout(() => setSaved(false), 1800);
	};

	if (loading) {
		return (
			<div
				className="flex items-center justify-center min-h-[60vh] text-sm"
				style={{ color: "var(--muted-foreground)" }}
			>
				Loading experience editor...
			</div>
		);
	}

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
				<div className="flex flex-wrap gap-2">
					<Button
						type="button"
						variant="outline"
						onClick={handleReset}
						className="gap-2"
					>
						<RotateCcw className="h-4 w-4" />
						Reset defaults
					</Button>
					<Button
						type="button"
						onClick={handleSave}
						className="gap-2 text-white"
						style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)" }}
					>
						{saved ? (
							<Sparkles className="h-4 w-4" />
						) : (
							<Save className="h-4 w-4" />
						)}
						{saved ? "Saved" : "Save changes"}
					</Button>
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

			<Experience />

			<Education />

			<LearningJourney />
		</div>
	);
}
