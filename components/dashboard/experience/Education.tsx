import EditorSection from "@/components/dashboard/experience/EditorSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_CAREER_CONTENT, loadCareerContent } from "@/lib/experience";
import type { CareerContent, EducationEntry } from "@/types/experience";
import { GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import Field from "./Field";

const COLORS = ["#6366f1", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"];

function uid(prefix: string) {
	return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function createEducation(): EducationEntry {
	return {
		id: uid("edu"),
		school: "",
		degree: "",
		period: "",
		location: "",
		description: "",
		icon: "🎓",
		color: COLORS[0],
	};
}
const Education = () => {
	const [content, setContent] = useState<CareerContent>(DEFAULT_CAREER_CONTENT);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const setData = () => {
			setContent(loadCareerContent());
			setLoading(false);
		};
		setData();
	}, []);

	const updateEducation = (
		id: string,
		field: keyof EducationEntry,
		value: string,
	) => {
		setContent((prev) => ({
			...prev,
			education: prev.education.map((item) =>
				item.id === id ? { ...item, [field]: value } : item,
			),
		}));
	};

	const addEducation = () => {
		setContent((prev) => ({
			...prev,
			education: [createEducation(), ...prev.education],
		}));
	};

	const removeEducation = (id: string) => {
		setContent((prev) => ({
			...prev,
			education: prev.education.filter((item) => item.id !== id),
		}));
	};

	return (
		<EditorSection
			title="Education"
			description="Shown in the about section as your formal learning path."
			icon={GraduationCap}
			actionLabel="Add education"
			onAdd={addEducation}
		>
			<div className="space-y-4">
				{content.education.map((item) => (
					<div
						key={item.id}
						className="glass rounded-2xl p-5 space-y-4"
						style={{ border: `1px solid ${item.color}22` }}
					>
						<SectionHeader
							label={item.school || "New education"}
							badge={item.degree || "Education"}
							color={item.color}
							onDelete={() => removeEducation(item.id)}
						/>
						<div className="grid gap-4 md:grid-cols-2">
							<Field label="School">
								<Input
									value={item.school}
									onChange={(e) =>
										updateEducation(item.id, "school", e.target.value)
									}
								/>
							</Field>
							<Field label="Degree">
								<Input
									value={item.degree}
									onChange={(e) =>
										updateEducation(item.id, "degree", e.target.value)
									}
								/>
							</Field>
							<Field label="Period">
								<Input
									value={item.period}
									onChange={(e) =>
										updateEducation(item.id, "period", e.target.value)
									}
								/>
							</Field>
							<Field label="Location">
								<Input
									value={item.location}
									onChange={(e) =>
										updateEducation(item.id, "location", e.target.value)
									}
								/>
							</Field>
							<Field label="Icon">
								<Input
									value={item.icon}
									onChange={(e) =>
										updateEducation(item.id, "icon", e.target.value)
									}
								/>
							</Field>
							<Field label="Accent color">
								<Input
									type="color"
									value={item.color}
									onChange={(e) =>
										updateEducation(item.id, "color", e.target.value)
									}
									className="h-11 w-full p-1"
								/>
							</Field>
						</div>
						<Field label="Description">
							<Textarea
								value={item.description}
								onChange={(e) =>
									updateEducation(item.id, "description", e.target.value)
								}
								rows={3}
							/>
						</Field>
					</div>
				))}
			</div>
		</EditorSection>
	);
};

export default Education;
