"use client";

import EditorSection from "@/components/dashboard/experience/EditorSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	useAddExperience,
	useDeleteExperience,
	useEditExperience,
} from "@/hooks/use-experience";
import type { ExperienceEntry } from "@/types/experience";
import { Briefcase, Pen, Plus, X } from "lucide-react";
import { useState } from "react";
import Field from "./Field";
import SectionHeader from "./SectionHeader";

const COLORS = ["#6366f1", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"];

function fromLines(value: string[]) {
	return value.join("\n");
}

const INITIAL_EXPERIENCE: Omit<ExperienceEntry, "id"> = {
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

const Experience = ({ experiences }: { experiences: ExperienceEntry[] }) => {
	const { mutateAsync: add, isPending: isAdding } = useAddExperience();
	const { mutateAsync: update, isPending: isUpdating } = useEditExperience();
	const { mutateAsync: deleteExperience, isPending: isDeleting } =
		useDeleteExperience();

	const [experience, setExperience] =
		useState<Omit<ExperienceEntry, "id">>(INITIAL_EXPERIENCE);

	const [experienceToEdit, setExperienceToEdit] = useState<ExperienceEntry>({
		...INITIAL_EXPERIENCE,
		id: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [adding, setAdding] = useState(false);

	const removeExperience = async (id: string) => {
		if (isDeleting) return;

		setErrors({});

		const res = await deleteExperience(id);

		if (!res.success)
			setErrors({
				deleteError: res.message || "An unexpected error occurred.",
			});
	};

	// handle changes to the experience form and submit the new experience
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;

		if (name === "responsibilities" || name === "tech") {
			return;
		}

		setExperience((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChangeTechAndResponsibilities = (
		index: number,
		value: string,
		field: "responsibilities" | "tech",
	) => {
		setExperience((prev) => ({
			...prev,
			[field]: prev[field].map((item, i) => (i === index ? value : item)),
		}));
	};
	const handleAddExperience = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isAdding || isUpdating) return;

		setErrors({});

		if (
			!experience.company.trim() ||
			!experience.description.trim() ||
			!experience.position.trim() ||
			!experience.period.trim() ||
			!experience.type.trim() ||
			!experience.location.trim() ||
			!experience.responsibilities.length ||
			!experience.tech.length
		) {
			setErrors({
				company: !experience.company.trim() ? "Company is required" : "",
				description: !experience.description.trim()
					? "Description is required"
					: "",
				position: !experience.position.trim() ? "Position is required" : "",
				period: !experience.period.trim() ? "Period is required" : "",
				type: !experience.type.trim() ? "Type is required" : "",
				location: !experience.location.trim() ? "Location is required" : "",
				responsibilities: !experience.responsibilities.length
					? "At least one responsibility is required"
					: "",
				tech: !experience.tech.length
					? "At least one technology is required"
					: "",
			});
			return;
		}

		const color: string =
			experiences.length === 0
				? COLORS[0]
				: COLORS[experiences.length % COLORS.length];

		const res = await add({
			...experience,
			color,
			tech: experience.tech.filter(Boolean),
			responsibilities: experience.responsibilities.filter(Boolean),
		});
		if (res.success) {
			setAdding(false);
			setExperience(INITIAL_EXPERIENCE);
		} else {
			if (res.errors) {
				setErrors(res.errors);
			} else {
				setErrors({ general: res.message || "An unexpected error occurred." });
			}
		}
	};

	// Handle editing an existing experience entry
	const handleChangeForEdit = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;

		if (name === "responsibilities" || name === "tech") {
			return;
		}

		setExperienceToEdit((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChangeTechAndResponsibilitiesForEdit = (
		index: number,
		value: string,
		field: "responsibilities" | "tech",
	) => {
		setExperienceToEdit((prev) => ({
			...prev,
			[field]: prev[field].map((item, i) => (i === index ? value : item)),
		}));
	};

	const handleUpdateEducation = async () => {
		if (isAdding || isUpdating) return;
		setErrors({});

		const edtingingExperience = experiences.find(
			(item) => item.id === experienceToEdit.id,
		);
		if (!edtingingExperience) {
			setErrors({ general: "Experience entry not found." });
			return;
		}

		const color: string =
			experiences.indexOf(edtingingExperience) === 0
				? COLORS[0]
				: COLORS[experiences.indexOf(edtingingExperience) % COLORS.length];

		const payload: Omit<ExperienceEntry, "id"> = {
			company: experienceToEdit.company || edtingingExperience.company,
			position: experienceToEdit.position || edtingingExperience.position,
			period: experienceToEdit.period || edtingingExperience.period,
			type: experienceToEdit.type || edtingingExperience.type,
			location: experienceToEdit.location || edtingingExperience.location,
			description:
				experienceToEdit.description || edtingingExperience.description,
			responsibilities:
				experienceToEdit.responsibilities.length > 0
					? experienceToEdit.responsibilities
					: edtingingExperience.responsibilities,
			tech:
				experienceToEdit.tech.length > 0
					? experienceToEdit.tech
					: edtingingExperience.tech,
			color: color || edtingingExperience.color,
		};

		const res = await update({
			experience: {
				...payload,
				tech: experienceToEdit.tech.filter(Boolean),
				responsibilities: experienceToEdit.responsibilities.filter(Boolean),
			},
			id: experienceToEdit.id,
		});

		if (res.success) {
			setExperienceToEdit({ ...INITIAL_EXPERIENCE, id: "" });
		} else {
			if (res.errors) {
				setErrors(res.errors);
			} else {
				setErrors({ general: res.message || "An unexpected error occurred." });
			}
		}
	};

	return (
		<EditorSection
			title="Experience"
			description="These entries power the experience timeline on the portfolio site."
			icon={Briefcase}
			actionLabel="Add experience"
			onAdd={() => setAdding(true)}
			deleteError={errors.deleteError}
		>
			{adding ? (
				<form
					onSubmit={handleAddExperience}
					className="glass rounded-2xl p-5 space-y-4"
					style={{ border: `1px solid ${experience}22` }}
				>
					<div className="grid gap-4 md:grid-cols-2">
						<Field label="Company">
							<Input
								value={experience.company}
								name="company"
								onChange={handleChange}
							/>
							{errors.company && (
								<span className="text-xs text-red-500">{errors.company}</span>
							)}
						</Field>
						<Field label="Role">
							<Input
								value={experience.position}
								name="position"
								onChange={handleChange}
							/>
							{errors.position && (
								<span className="text-xs text-red-500">{errors.position}</span>
							)}
						</Field>
						<Field label="Period">
							<Input
								value={experience.period}
								name="period"
								onChange={handleChange}
							/>
							{errors.period && (
								<span className="text-xs text-red-500">{errors.period}</span>
							)}
						</Field>
						<Field label="Type">
							<Input
								value={experience.type}
								name="type"
								onChange={handleChange}
							/>
							{errors.type && (
								<span className="text-xs text-red-500">{errors.type}</span>
							)}
						</Field>
						<Field label="Location">
							<Input
								value={experience.location}
								name="location"
								onChange={handleChange}
							/>
							{errors.location && (
								<span className="text-xs text-red-500">{errors.location}</span>
							)}
						</Field>
						<Field label="Accent color">
							<Input
								type="color"
								value={experience.color}
								name="color"
								onChange={handleChange}
								className="h-11 w-full p-1"
							/>
							{errors.color && (
								<span className="text-xs text-red-500">{errors.color}</span>
							)}
						</Field>
					</div>
					<Field label="Description">
						<Textarea
							rows={3}
							name="description"
							value={experience.description}
							onChange={handleChange}
						/>
						{errors.description && (
							<span className="text-xs text-red-500">{errors.description}</span>
						)}
					</Field>
					<div className="grid gap-4 md:grid-cols-2 mt-3">
						{/* Responsibilities */}
						<Field label="Highlights">
							{experience.responsibilities.length > 0 ? (
								experience.responsibilities.map((resp, index) => (
									<div key={index} className="flex items-center gap-1">
										<Input
											className="h-11 flex-1 w-full p-1"
											value={resp}
											placeholder={`Highlight ${index + 1}`}
											name="responsibilities"
											onChange={(e) =>
												handleChangeTechAndResponsibilities(
													index,
													e.target.value,
													"responsibilities",
												)
											}
										/>
										<Button
											type="button"
											variant="outline"
											size="sm"
											className="px-1.5 py-1 cursor-pointer"
											onClick={() =>
												setExperience((prev) => ({
													...prev,
													responsibilities: prev.responsibilities.filter(
														(_, i) => i !== index,
													),
												}))
											}
										>
											<X className="h-3 w-3" />
										</Button>
									</div>
								))
							) : (
								<Input
									className="h-11 w-full p-1"
									value={experience.responsibilities[0]}
									placeholder={`Highlight 1`}
									name="responsibilities"
									onChange={(e) =>
										setExperience((prev) => ({
											...prev,
											responsibilities: [
												...prev.responsibilities,
												e.target.value,
											],
										}))
									}
								/>
							)}
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="absolute right-0 -top-2 rounded-full px-1.5 py-1 cursor-pointer"
								onClick={() =>
									setExperience((prev) => ({
										...prev,
										responsibilities: [...prev.responsibilities, ""],
									}))
								}
							>
								<Plus className="h-3 w-3" />
							</Button>
							{errors.responsibilities && (
								<span className="text-xs text-red-500">
									{errors.responsibilities}
								</span>
							)}
						</Field>

						{/* Technologies */}
						<Field label="Technologies">
							{experience.tech.length > 0 ? (
								experience.tech.map((tech, index) => (
									<div key={index} className="flex items-center gap-1">
										<Input
											className="h-11 flex-1 w-full p-1"
											value={tech}
											placeholder={`Technology ${index + 1}`}
											name="tech"
											onChange={(e) =>
												handleChangeTechAndResponsibilities(
													index,
													e.target.value,
													"tech",
												)
											}
										/>
										<Button
											type="button"
											variant="outline"
											size="sm"
											className="px-1.5 py-1 cursor-pointer"
											onClick={() =>
												setExperience((prev) => ({
													...prev,
													tech: prev.tech.filter((_, i) => i !== index),
												}))
											}
										>
											<X className="h-3 w-3" />
										</Button>
									</div>
								))
							) : (
								<Input
									className="h-11 w-full p-1"
									value={experience.tech[0]}
									placeholder={`Technology 1`}
									name="tech"
									onChange={(e) =>
										setExperience((prev) => ({
											...prev,
											tech: [...prev.tech, e.target.value],
										}))
									}
								/>
							)}
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="absolute right-0 -top-2 rounded-full px-1.5 py-1 cursor-pointer"
								onClick={() =>
									setExperience((prev) => ({
										...prev,
										tech: [...prev.tech, ""],
									}))
								}
							>
								<Plus className="h-3 w-3" />
							</Button>
							{errors.tech && (
								<span className="text-xs text-red-500">{errors.tech}</span>
							)}
						</Field>

						{errors.general && (
							<span className="text-xs text-red-500 my-2">
								{errors.general}
							</span>
						)}
					</div>
					<div className="flex justify-center gap-4 mt-6 mb-4">
						<Button
							type="submit"
							className="cursor-pointer w-1/2 md:w-1/4"
							disabled={isAdding}
						>
							{isAdding ? "Adding..." : "Add experience"}
						</Button>
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								setErrors({});
								setExperience(INITIAL_EXPERIENCE);
								setAdding(false);
							}}
							className="cursor-pointer w-1/2 md:w-1/4"
						>
							Cancel
						</Button>
					</div>
				</form>
			) : (
				<div className="space-y-4">
					{experiences.map((item) => {
						const isEditing = experienceToEdit.id === item.id;
						return (
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
													setExperienceToEdit({ ...INITIAL_EXPERIENCE, id: "" })
												}
											>
												Cancel
											</Button>
										</>
									) : (
										<Button
											type="button"
											onClick={() => setExperienceToEdit(item)}
											className="cursor-pointer"
										>
											<Pen className="h-4 w-4" />
											Edit
										</Button>
									)}
								</SectionHeader>
								<div className="grid gap-4 md:grid-cols-2">
									<Field label="Company">
										<Input
											value={
												isEditing ? experienceToEdit.company : item.company
											}
											name="company"
											disabled={!isEditing}
											onChange={handleChangeForEdit}
										/>
										{errors.company && (
											<span className="text-xs text-red-500">
												{errors.company}
											</span>
										)}
									</Field>
									<Field label="Role">
										<Input
											value={
												isEditing ? experienceToEdit.position : item.position
											}
											name="position"
											disabled={!isEditing}
											onChange={handleChangeForEdit}
										/>
										{errors.position && (
											<span className="text-xs text-red-500">
												{errors.position}
											</span>
										)}
									</Field>
									<Field label="Period">
										<Input
											value={isEditing ? experienceToEdit.period : item.period}
											name="period"
											disabled={!isEditing}
											onChange={handleChangeForEdit}
										/>
										{errors.period && (
											<span className="text-xs text-red-500">
												{errors.period}
											</span>
										)}
									</Field>
									<Field label="Type">
										<Input
											value={isEditing ? experienceToEdit.type : item.type}
											name="type"
											disabled={!isEditing}
											onChange={handleChangeForEdit}
										/>
										{errors.type && (
											<span className="text-xs text-red-500">
												{errors.type}
											</span>
										)}
									</Field>
									<Field label="Location">
										<Input
											value={
												isEditing ? experienceToEdit.location : item.location
											}
											name="location"
											disabled={!isEditing}
											onChange={handleChangeForEdit}
										/>
										{errors.location && (
											<span className="text-xs text-red-500">
												{errors.location}
											</span>
										)}
									</Field>
									<Field label="Accent color">
										<Input
											type="color"
											name="color"
											value={isEditing ? experienceToEdit.color : item.color}
											disabled={!isEditing}
											onChange={handleChangeForEdit}
											className="h-11 w-full p-1"
										/>
										{errors.color && (
											<span className="text-xs text-red-500">
												{errors.color}
											</span>
										)}
									</Field>
								</div>
								<Field label="Description">
									<Textarea
										value={
											isEditing
												? experienceToEdit.description
												: item.description
										}
										name="description"
										disabled={!isEditing}
										onChange={handleChangeForEdit}
										rows={3}
									/>
								</Field>
								{errors.description && (
									<span className="text-xs text-red-500">
										{errors.description}
									</span>
								)}
								{isEditing ? (
									<div className="grid gap-4 md:grid-cols-2 mt-5">
										{/* Responsibilities */}
										<Field label="Highlights">
											{experienceToEdit.responsibilities.length > 0 ? (
												experienceToEdit.responsibilities.map((resp, index) => (
													<div key={index} className="flex items-center gap-1">
														<Input
															className="h-11 flex-1 w-full p-1"
															value={resp}
															placeholder={`Highlight ${index + 1}`}
															name="responsibilities"
															onChange={(e) =>
																handleChangeTechAndResponsibilitiesForEdit(
																	index,
																	e.target.value,
																	"responsibilities",
																)
															}
														/>
														<Button
															type="button"
															variant="outline"
															size="sm"
															className="px-1.5 py-1 cursor-pointer"
															onClick={() =>
																setExperienceToEdit((prev) => ({
																	...prev,
																	responsibilities:
																		prev.responsibilities.filter(
																			(_, i) => i !== index,
																		),
																}))
															}
														>
															<X className="h-3 w-3" />
														</Button>
													</div>
												))
											) : (
												<Input
													className="h-11 w-full p-1"
													value={experienceToEdit.responsibilities[0]}
													placeholder={`Highlight 1`}
													name="responsibilities"
													onChange={(e) =>
														handleChangeTechAndResponsibilitiesForEdit(
															0,
															e.target.value,
															"responsibilities",
														)
													}
												/>
											)}
											<Button
												type="button"
												variant="outline"
												size="sm"
												className="absolute right-0 -top-2 rounded-full px-1.5 py-1 cursor-pointer"
												onClick={() =>
													setExperienceToEdit((prev) => ({
														...prev,
														responsibilities: [...prev.responsibilities, ""],
													}))
												}
											>
												<Plus className="h-3 w-3" />
											</Button>
											{errors.responsibilities && (
												<span className="text-xs text-red-500">
													{errors.responsibilities}
												</span>
											)}
											{errors.responsibilties && (
												<span className="text-xs text-red-500">
													{errors.responsibilties}
												</span>
											)}
										</Field>

										{/* Technologies */}
										<Field label="Technologies">
											{experienceToEdit.tech.length > 0 ? (
												experienceToEdit.tech.map((tech, index) => (
													<div key={index} className="flex items-center gap-1">
														<Input
															className="h-11 flex-1 w-full p-1"
															value={tech}
															placeholder={`Technology ${index + 1}`}
															name="tech"
															onChange={(e) =>
																handleChangeTechAndResponsibilitiesForEdit(
																	index,
																	e.target.value,
																	"tech",
																)
															}
														/>
														<Button
															type="button"
															variant="outline"
															size="sm"
															className="px-1.5 py-1 cursor-pointer"
															onClick={() =>
																setExperienceToEdit((prev) => ({
																	...prev,
																	tech: prev.tech.filter((_, i) => i !== index),
																}))
															}
														>
															<X className="h-3 w-3" />
														</Button>
													</div>
												))
											) : (
												<Input
													className="h-11 w-full p-1"
													value={experience.tech[0]}
													placeholder={`Technology 1`}
													name="tech"
													onChange={(e) =>
														handleChangeTechAndResponsibilitiesForEdit(
															0,
															e.target.value,
															"tech",
														)
													}
												/>
											)}
											<Button
												type="button"
												variant="outline"
												size="sm"
												className="absolute right-0 -top-2 rounded-full px-1.5 py-1 cursor-pointer"
												onClick={() =>
													setExperienceToEdit((prev) => ({
														...prev,
														tech: [...prev.tech, ""],
													}))
												}
											>
												<Plus className="h-3 w-3" />
											</Button>
											{errors.tech && (
												<span className="text-xs text-red-500">
													{errors.tech}
												</span>
											)}
											{errors.tech && (
												<span className="text-xs text-red-500">
													{errors.tech}
												</span>
											)}
										</Field>
									</div>
								) : (
									<div className="grid gap-4 md:grid-cols-2">
										<Field label="Highlights">
											<Textarea
												value={fromLines(item.responsibilities)}
												disabled={!isEditing}
												rows={5}
												placeholder="One highlight per line"
											/>
										</Field>
										<Field label="Technologies">
											<Textarea
												value={fromLines(item.tech)}
												disabled={!isEditing}
												rows={5}
												placeholder="One technology per line"
											/>
										</Field>
									</div>
								)}
								{errors.general && (
									<span className="text-xs text-red-500 my-2">
										{errors.general}
									</span>
								)}
							</div>
						);
					})}
				</div>
			)}
		</EditorSection>
	);
};

export default Experience;
