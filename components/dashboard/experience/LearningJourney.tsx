"use client";

import EditorSection from "@/components/dashboard/experience/EditorSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	useAddJourney,
	useDeleteJourney,
	useUpdateJourney,
} from "@/hooks/use-journey";
import { JourneyEntry } from "@/types/experience";
import { Pen, Sparkles } from "lucide-react";
import { useState } from "react";
import Field from "./Field";
import SectionHeader from "./SectionHeader";

const COLORS = ["#6366f1", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"];

const INITAIL_JOURNEY: Omit<JourneyEntry, "id"> = {
	year: "",
	title: "",
	description: "",
	color: "",
	order: 0,
};

const LearningJourney = ({ journeys }: { journeys: JourneyEntry[] }) => {
	const { mutateAsync: add, isPending: isAdding } = useAddJourney();
	const { mutateAsync: update, isPending: isUpdating } = useUpdateJourney();
	const { mutateAsync: deleteJourney, isPending: isDeleting } =
		useDeleteJourney();
	const [journey, setJourney] =
		useState<Omit<JourneyEntry, "id">>(INITAIL_JOURNEY);
	const [adding, setAdding] = useState(false);
	const [deletingId, setDeletingId] = useState("");
	const [errors, setErrors] = useState<Record<string, string> | null>(null);

	const [journeyToEdit, setJourneyToEdit] = useState<JourneyEntry>({
		...INITAIL_JOURNEY,
		id: "",
	});

	const updateJourney = (
		e:
			| React.ChangeEvent<HTMLInputElement, HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setJourneyToEdit((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const addJourney = () => {
		setAdding(true);
	};

	const removeJourney = async () => {
		if (!deletingId) {
			setErrors({
				deleteError:
					"Journey item not found. Please refresh the page and try again.",
			});
			return;
		}

		const res = await deleteJourney(deletingId);

		if (!res?.success) {
			setErrors({
				deleteError:
					res?.message ||
					"An unexpected error occurred. Please try again later.",
			});
		}
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement, HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setJourney((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleAddJourney = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isAdding) return;
		setErrors(null);
		if (
			!journey.year ||
			!journey.title ||
			!journey.description ||
			!journey.order
		) {
			setErrors({
				year: !journey.year ? "Year is required" : "",
				title: !journey.title ? "Title is required" : "",
				description: !journey.description ? "Description is required" : "",
				order: !journey.order ? "Order is required" : "",
			});
			return;
		}

		const res = await add({
			...journey,
			color:
				journey.color ||
				COLORS[(journeys.length ? journeys.length : 1) % COLORS.length],
		});

		if (res?.success) {
			setJourney({
				...INITAIL_JOURNEY,
			});
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

	const handleUpdateJourney = async () => {
		if (isAdding || isUpdating) return;
		setErrors(null);

		const jurneyToUpdate = journeys.find((j) => j.id === journeyToEdit.id);
		if (!jurneyToUpdate) {
			setErrors({
				general:
					"Journey item not found. Please refresh the page and try again.",
			});
			return;
		}

		const payload: JourneyEntry = {
			id: journeyToEdit.id,
			year: journeyToEdit.year || jurneyToUpdate?.year,
			title: journeyToEdit.title || jurneyToUpdate?.title,
			description: journeyToEdit.description || jurneyToUpdate?.description,
			color:
				journeyToEdit.color ||
				jurneyToUpdate?.color ||
				COLORS[journeys.length % COLORS.length],
			order: journeyToEdit.order || jurneyToUpdate?.order,
		};

		const res = await update(payload);

		if (res?.success) {
			setJourneyToEdit({ ...INITAIL_JOURNEY, id: "" });
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

	return (
		<EditorSection
			title="Learning Journey"
			description="Used by the animated journey timeline on the about section."
			icon={Sparkles}
			actionLabel="Add journey item"
			onAdd={addJourney}
		>
			{adding ? (
				<form
					className="glass rounded-2xl p-5 space-y-4 grid"
					onSubmit={handleAddJourney}
				>
					<div className="grid gap-4 md:grid-cols-2">
						<Field label="Year">
							<Input
								placeholder="2020"
								value={journey?.year}
								name="year"
								onChange={handleChange}
							/>
							{errors?.year && (
								<p className="text-xs text-red-500 mt-1">{errors.year}</p>
							)}
						</Field>
						<Field label="Accent color">
							<Input
								type="color"
								value={journey?.color}
								name="color"
								onChange={handleChange}
								className="h-11 w-full p-1"
							/>
						</Field>
					</div>
					<div className="grid gap-4 md:grid-cols-3">
						<Field label="Title" className="md:col-span-2">
							<Input
								value={journey.title}
								name="title"
								onChange={handleChange}
							/>
							{errors?.title && (
								<p className="text-xs text-red-500 mt-1">{errors.title}</p>
							)}
						</Field>
						<Field label="Order">
							<Input
								value={journey.order}
								type="number"
								min={1}
								name="order"
								onChange={handleChange}
							/>
							{errors?.order && (
								<p className="text-xs text-red-500 mt-1">{errors.order}</p>
							)}
						</Field>
					</div>

					<Field label="Description">
						<Textarea
							value={journey.description}
							name="description"
							onChange={handleChange}
							rows={3}
						/>
						{errors?.description && (
							<p className="text-xs text-red-500 mt-1">{errors.description}</p>
						)}
					</Field>

					{errors?.general && (
						<p className="text-xs text-red-500 mt-2">{errors.general}</p>
					)}

					<div className="flex mt-5 gap-2">
						<Button disabled={isAdding} type="submit" className="md:px-6">
							{isAdding ? "Adding..." : "Add journey"}
						</Button>
						<Button
							type="button"
							disabled={isAdding}
							variant="secondary"
							onClick={() => setAdding(false)}
							className="md:px-6"
						>
							Cancel
						</Button>
					</div>
				</form>
			) : (
				<div className="space-y-4">
					{journeys.map((item) => {
						const isEditing = journeyToEdit.id === item.id;
						return (
							<div
								key={item.id}
								className="glass rounded-2xl p-5 space-y-4"
								style={{ border: `1px solid ${item.color}22` }}
							>
								<SectionHeader
									label={item.title || "New journey item"}
									badge={item.year || "Journey"}
									color={item.color}
									onDelete={() => removeJourney()}
									isDeleting={isDeleting}
									setDeletingId={() => setDeletingId(item.id)}
								>
									{isEditing ? (
										<>
											<Button
												type="button"
												onClick={handleUpdateJourney}
												className="cursor-pointer"
											>
												{isUpdating ? "Updating..." : "Update"}
											</Button>
											<Button
												type="button"
												variant="secondary"
												className="cursor-pointer"
												onClick={() =>
													setJourneyToEdit({ ...INITAIL_JOURNEY, id: "" })
												}
											>
												Cancel
											</Button>
										</>
									) : (
										<Button
											type="button"
											onClick={() => setJourneyToEdit(item)}
											className="cursor-pointer"
										>
											<Pen className="h-4 w-4" />
											Edit
										</Button>
									)}
								</SectionHeader>

								<div className="grid gap-4 md:grid-cols-2">
									<Field label="Year">
										<Input
											disabled={!isEditing}
											value={isEditing ? journeyToEdit.year : item.year}
											name="year"
											onChange={updateJourney}
										/>
										{isEditing && errors?.year && (
											<p className="text-xs text-red-500 mt-1">{errors.year}</p>
										)}
									</Field>
									<Field label="Accent color">
										<Input
											disabled={!isEditing}
											type="color"
											value={isEditing ? journeyToEdit.color : item.color}
											name="color"
											onChange={updateJourney}
											className="h-11 w-full p-1"
										/>
										{isEditing && errors?.color && (
											<p className="text-xs text-red-500 mt-1">
												{errors.color}
											</p>
										)}
									</Field>
								</div>
								<div className="grid gap-4 md:grid-cols-3">
									<Field label="Title" className="md:col-span-2">
										<Input
											disabled={!isEditing}
											value={isEditing ? journeyToEdit.title : item.title}
											name="title"
											onChange={updateJourney}
										/>
										{isEditing && errors?.title && (
											<p className="text-xs text-red-500 mt-1">
												{errors.title}
											</p>
										)}
									</Field>
									<Field label="Order">
										<Input
											disabled={!isEditing}
											value={isEditing ? journeyToEdit.order : item.order}
											type="number"
											min={1}
											name="order"
											onChange={updateJourney}
										/>
										{isEditing && errors?.order && (
											<p className="text-xs text-red-500 mt-1">
												{errors.order}
											</p>
										)}
									</Field>
								</div>

								<Field label="Description">
									<Textarea
										disabled={!isEditing}
										value={
											isEditing ? journeyToEdit.description : item.description
										}
										name="description"
										onChange={updateJourney}
										rows={3}
									/>
									{isEditing && errors?.description && (
										<p className="text-xs text-red-500 mt-1">
											{errors.description}
										</p>
									)}
								</Field>
								{isEditing && errors?.general && (
									<p className="text-xs text-red-500 mt-2">{errors.general}</p>
								)}
							</div>
						);
					})}
				</div>
			)}
		</EditorSection>
	);
};

export default LearningJourney;
