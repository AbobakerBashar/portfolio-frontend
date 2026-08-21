import EditorSection from "@/components/dashboard/experience/EditorSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_CAREER_CONTENT, loadCareerContent } from "@/lib/experience";
import type { CareerContent, ExperienceEntry } from "@/types/experience";
import { Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import Field from "./Field";

const COLORS = ["#6366f1", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"];

function uid(prefix: string) {
	return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function toLines(value: string) {
	return value
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);
}

function fromLines(value: string[]) {
	return value.join("\n");
}

function createExperience(): ExperienceEntry {
	return {
		id: uid("exp"),
		company: "",
		position: "",
		period: "",
		type: "",
		location: "",
		description: "",
		responsibilities: [],
		tech: [],
		color: COLORS[0],
	};
}

const Experience = () => {
	const [content, setContent] = useState<CareerContent>(DEFAULT_CAREER_CONTENT);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const setData = () => {
			setContent(loadCareerContent());
			setLoading(false);
		};
		setData();
	}, []);

	const updateExperience = (
		id: string,
		field: keyof ExperienceEntry,
		value: string | string[],
	) => {
		setContent((prev) => ({
			...prev,
			experience: prev.experience.map((item) =>
				item.id === id ? { ...item, [field]: value } : item,
			),
		}));
	};

	const addExperience = () => {
		setContent((prev) => ({
			...prev,
			experience: [createExperience(), ...prev.experience],
		}));
	};

	const removeExperience = (id: string) => {
		setContent((prev) => ({
			...prev,
			experience: prev.experience.filter((item) => item.id !== id),
		}));
	};

	return (
		<EditorSection
			title="Experience"
			description="These entries power the experience timeline on the portfolio site."
			icon={Briefcase}
			actionLabel="Add experience"
			onAdd={addExperience}
		>
			<div className="space-y-4">
				{content.experience.map((item) => (
					<div
						key={item.id}
						className="glass rounded-2xl p-5 space-y-4"
						style={{ border: `1px solid ${item.color}22` }}
					>
						<SectionHeader
							label={item.company || "New experience"}
							badge={item.type || "Experience"}
							color={item.color}
							onDelete={() => removeExperience(item.id)}
						/>
						<div className="grid gap-4 md:grid-cols-2">
							<Field label="Company">
								<Input
									value={item.company}
									onChange={(e) =>
										updateExperience(item.id, "company", e.target.value)
									}
								/>
							</Field>
							<Field label="Role">
								<Input
									value={item.position}
									onChange={(e) =>
										updateExperience(item.id, "position", e.target.value)
									}
								/>
							</Field>
							<Field label="Period">
								<Input
									value={item.period}
									onChange={(e) =>
										updateExperience(item.id, "period", e.target.value)
									}
								/>
							</Field>
							<Field label="Type">
								<Input
									value={item.type}
									onChange={(e) =>
										updateExperience(item.id, "type", e.target.value)
									}
								/>
							</Field>
							<Field label="Location">
								<Input
									value={item.location}
									onChange={(e) =>
										updateExperience(item.id, "location", e.target.value)
									}
								/>
							</Field>
							<Field label="Accent color">
								<Input
									type="color"
									value={item.color}
									onChange={(e) =>
										updateExperience(item.id, "color", e.target.value)
									}
									className="h-11 w-full p-1"
								/>
							</Field>
						</div>
						<Field label="Description">
							<Textarea
								value={item.description}
								onChange={(e) =>
									updateExperience(item.id, "description", e.target.value)
								}
								rows={3}
							/>
						</Field>
						<div className="grid gap-4 md:grid-cols-2">
							<Field label="Highlights">
								<Textarea
									value={fromLines(item.responsibilities)}
									onChange={(e) =>
										updateExperience(
											item.id,
											"responsibilities",
											toLines(e.target.value),
										)
									}
									rows={5}
									placeholder="One highlight per line"
								/>
							</Field>
							<Field label="Technologies">
								<Textarea
									value={fromLines(item.tech)}
									onChange={(e) =>
										updateExperience(item.id, "tech", toLines(e.target.value))
									}
									rows={5}
									placeholder="One technology per line"
								/>
							</Field>
						</div>
					</div>
				))}
			</div>
		</EditorSection>
	);
};

export default Experience;
