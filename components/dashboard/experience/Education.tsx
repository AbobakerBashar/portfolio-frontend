"use client";

import EditorSection from "@/components/dashboard/experience/EditorSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	useAddEducation,
	useDeleteEducation,
	useUpdateEducation,
} from "@/hooks/use-education";
import { EducationEntry } from "@/types/experience";
import { GraduationCap, Pen } from "lucide-react";
import { useState } from "react";
import Field from "./Field";
import SectionHeader from "./SectionHeader";

const COLORS = ["#6366f1", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"];

const INITAIL_EDUCATION: EducationEntry = {
	school: "",
	degree: "",
	period: "",
	location: "",
	description: "",
	icon: "🎓",
	color: COLORS[0],
};

const Education = ({
	educationEntries,
}: {
	educationEntries: (EducationEntry & { id: string })[];
}) => {
	const { mutateAsync: add, isPending: isAdding } = useAddEducation();
	const { mutateAsync: update, isPending: isUpdating } = useUpdateEducation();
	const { mutateAsync: deletEducation, isPending: isDeleting } =
		useDeleteEducation();
	const [adding, setAdding] = useState(false);
	const [education, setEducation] = useState<EducationEntry>(INITAIL_EDUCATION);
	const [educationToEdit, setEducationToEdit] = useState<
		EducationEntry & { id: string }
	>({ ...INITAIL_EDUCATION, id: "" });
	const [errors, setErrors] = useState<Record<string, string>>({});

	const removeEducation = async (id: string) => {
		if (isAdding || isUpdating || isDeleting) return;
		const res = await deletEducation(id);
		if (!res?.success) {
			setErrors({
				general:
					res?.message ||
					"An unexpected error occurred. Please try again later.",
			});
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setEducation((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const updateEducation = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setEducationToEdit((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleAddEducation = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isAdding || isUpdating || isDeleting) return;

		setErrors({});

		if (
			!education.school ||
			!education.degree ||
			!education.period ||
			!education.location ||
			!education.description
		) {
			setErrors({
				school: !education.school ? "School is required." : "",
				degree: !education.degree ? "Degree is required." : "",
				period: !education.period ? "Period is required." : "",
				location: !education.location ? "Location is required." : "",
				description: !education.description ? "Description is required." : "",
			});
			return;
		}

		const color = educationEntries.length
			? COLORS[educationEntries.length % COLORS.length]
			: COLORS[0];

		const res = await add({
			...education,
			color,
		});

		if (res?.success) {
			setEducation(INITAIL_EDUCATION);
			setAdding(false);
		} else {
			if (res?.errors) {
				setErrors(res.errors);
			} else if (res?.message) {
				setErrors({ general: res?.message });
			} else {
				setErrors({
					general: "An unexpected error occurred. Please try again later.",
				});
			}
		}
	};

	const handleUpdateEducation = async () => {
		if (isAdding || isUpdating || isDeleting) return;

		setErrors({});

		const editedEducation = educationEntries.find(
			(entry) => entry.id === educationToEdit.id,
		);
		if (!editedEducation) {
			setErrors({ general: "Education entry not found." });
			return;
		}

		const payload: EducationEntry = {
			school: educationToEdit.school || editedEducation.school,
			degree: educationToEdit.degree || editedEducation.degree,
			period: educationToEdit.period || editedEducation.period,
			location: educationToEdit.location || editedEducation.location,
			description: educationToEdit.description || editedEducation.description,
			icon: educationToEdit.icon || editedEducation.icon,
			color: educationToEdit.color || editedEducation.color,
		};

		const res = await update({
			education: payload,
			id: educationToEdit.id,
		});

		if (res?.success) {
			setEducationToEdit({ ...INITAIL_EDUCATION, id: "" });
		} else {
			setErrors({
				general: "An unexpected error occurred. Please try again later.",
			});
		}
	};

	return (
		<EditorSection
			title="Education"
			description="Shown in the about section as your formal learning path."
			icon={GraduationCap}
			actionLabel="Add education"
			onAdd={() => setAdding(true)}
		>
			{adding ? (
				<form
					onSubmit={handleAddEducation}
					className="glass rounded-2xl p-5 space-y-4"
					style={{ border: `1px solid ${education.color}22` }}
				>
					<div className="grid gap-4 md:grid-cols-2">
						<Field label="School">
							<Input
								value={education.school}
								name="school"
								onChange={handleChange}
							/>
							{errors.school && (
								<p className="text-sm text-red-500">{errors.school}</p>
							)}
						</Field>
						<Field label="Degree">
							<Input
								value={education.degree}
								name="degree"
								onChange={handleChange}
							/>
							{errors.degree && (
								<p className="text-sm text-red-500">{errors.degree}</p>
							)}
						</Field>
						<Field label="Period">
							<Input
								value={education.period}
								name="period"
								onChange={handleChange}
							/>
							{errors.period && (
								<p className="text-sm text-red-500">{errors.period}</p>
							)}
						</Field>
						<Field label="Location">
							<Input
								value={education.location}
								name="location"
								onChange={handleChange}
							/>
							{errors.location && (
								<p className="text-sm text-red-500">{errors.location}</p>
							)}
						</Field>
						<Field label="Icon">
							<Input
								value={education.icon}
								name="icon"
								onChange={handleChange}
							/>
							{errors.icon && (
								<p className="text-sm text-red-500">{errors.icon}</p>
							)}
						</Field>
						<Field label="Accent color">
							<Input
								type="color"
								value={education.color}
								name="color"
								onChange={handleChange}
								className="h-11 w-full p-1"
							/>
							{errors.color && (
								<p className="text-sm text-red-500">{errors.color}</p>
							)}
						</Field>
					</div>
					<Field label="Description">
						<Textarea
							value={education.description}
							name="description"
							onChange={handleChange}
							rows={3}
						/>{" "}
						{errors.description && (
							<p className="text-sm text-red-500">{errors.description}</p>
						)}
					</Field>

					{errors.general && (
						<p className="text-sm text-red-500 my-2">{errors.general}</p>
					)}

					<div className="flex justify-center gap-4 mt-6 mb-4">
						<Button
							type="submit"
							className="cursor-pointer w-1/2 md:w-1/4"
							disabled={isAdding}
						>
							{isAdding ? "Adding..." : "Add education"}
						</Button>
						<Button
							type="button"
							variant="secondary"
							onClick={() => setAdding(false)}
							className="cursor-pointer w-1/2 md:w-1/4"
						>
							Cancel
						</Button>
					</div>
				</form>
			) : (
				<div className="space-y-4">
					{educationEntries.map((item) => {
						const isEditing = educationToEdit.id === item.id;
						return (
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
								>
									{isEditing ? (
										<>
											<Button
												type="button"
												onClick={handleUpdateEducation}
												className="cursor-pointer"
											>
												{isUpdating ? "Updating..." : "Update"}
											</Button>
											<Button
												type="button"
												variant="secondary"
												className="cursor-pointer"
												onClick={() =>
													setEducationToEdit({ ...INITAIL_EDUCATION, id: "" })
												}
											>
												Cancel
											</Button>
										</>
									) : (
										<Button
											type="button"
											onClick={() => setEducationToEdit(item)}
											className="cursor-pointer"
										>
											<Pen className="h-4 w-4" />
											Edit
										</Button>
									)}
								</SectionHeader>
								<div className="grid gap-4 md:grid-cols-2">
									<Field label="School">
										<Input
											value={isEditing ? educationToEdit.school : item.school}
											disabled={!isEditing}
											name="school"
											onChange={updateEducation}
										/>{" "}
										{errors.school && (
											<p className="text-sm text-red-500">{errors.school}</p>
										)}
									</Field>
									<Field label="Degree">
										<Input
											value={isEditing ? educationToEdit.degree : item.degree}
											disabled={!isEditing}
											name="degree"
											onChange={updateEducation}
										/>{" "}
										{errors.degree && (
											<p className="text-sm text-red-500">{errors.degree}</p>
										)}
									</Field>
									<Field label="Period">
										<Input
											value={isEditing ? educationToEdit.period : item.period}
											disabled={!isEditing}
											name="period"
											onChange={updateEducation}
										/>{" "}
										{errors.period && (
											<p className="text-sm text-red-500">{errors.period}</p>
										)}
									</Field>
									<Field label="Location">
										<Input
											value={
												isEditing ? educationToEdit.location : item.location
											}
											disabled={!isEditing}
											name="location"
											onChange={updateEducation}
										/>{" "}
										{errors.location && (
											<p className="text-sm text-red-500">{errors.location}</p>
										)}
									</Field>
									<Field label="Icon">
										<Input
											value={isEditing ? educationToEdit.icon : item.icon}
											disabled={!isEditing}
											name="icon"
											onChange={updateEducation}
										/>{" "}
										{errors.icon && (
											<p className="text-sm text-red-500">{errors.icon}</p>
										)}
									</Field>
									<Field label="Accent color">
										<Input
											type="color"
											value={isEditing ? educationToEdit.color : item.color}
											disabled={!isEditing}
											name="color"
											onChange={updateEducation}
											className="h-11 w-full p-1"
										/>{" "}
										{errors.color && (
											<p className="text-sm text-red-500">{errors.color}</p>
										)}
									</Field>
								</div>
								<Field label="Description">
									<Textarea
										value={
											isEditing ? educationToEdit.description : item.description
										}
										rows={3}
										disabled={!isEditing}
										name="description"
										onChange={updateEducation}
									/>{" "}
									{errors.description && (
										<p className="text-sm text-red-500">{errors.description}</p>
									)}
								</Field>{" "}
								{errors.general && (
									<p className="text-sm text-red-500 my-2">{errors.general}</p>
								)}
							</div>
						);
					})}
				</div>
			)}
		</EditorSection>
	);
};

export default Education;
