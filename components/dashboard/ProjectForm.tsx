"use client";

import { useState } from "react";
import { Loader, Plus, Trash2, X } from "lucide-react";
import type { ProjectFormValues } from "@/types/project";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
	useAddProject,
	useUpdateProject,
	useUpdateProjectImage,
} from "@/hooks/use-projects";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CATEGORIES: ProjectFormValues["category"][] = [
	"Full Stack",
	"Frontend",
	"Backend",
];

const COLOR_PRESETS = [
	"#6366f1",
	"#06b6d4",
	"#8b5cf6",
	"#f59e0b",
	"#10b981",
	"#ef4444",
];

const FORM = {
	title: "",
	category: "Frontend",
	image: null,
	preview: "",
	description: "",
	features: [],
	tech: [],
	github: "",
	demo: "",
	color: "",
};

type Props = {
	initialValues?: ProjectFormValues;
	submitLabel?: string;
	editting?: boolean;
	id?: string;
};

export default function ProjectForm({
	initialValues,
	submitLabel = "Save Project",
	id,
	editting,
}: Props) {
	const [formValues, setFormValues] = useState<ProjectFormValues>(
		initialValues || {
			...FORM,
			category: "Frontend",
		},
	);
	const [errors, setErrors] = useState<Partial<Record<string, string>> | null>(
		null,
	);

	const [changImage, setChangeImage] = useState(false);

	const { mutateAsync: add, isPending: isAdding } = useAddProject();
	const { mutateAsync: update, isPending: isUpdatting } = useUpdateProject();
	const { mutateAsync: updateImg, isPending: isUpdattingImg } =
		useUpdateProjectImage();

	const isLoading = isAdding || isUpdatting || isUpdattingImg;

	const isSubmitting = isAdding || isUpdatting;

	const [techInput, setTechInput] = useState("");

	const router = useRouter();

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const preview = URL.createObjectURL(file);
		setFormValues((prev) => ({ ...prev, image: file, preview }));
	};

	const handleEditImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (isLoading) return;
		setErrors(null);

		const file = e.target.files?.[0];
		if (!file) return;
		const preview = URL.createObjectURL(file);
		setFormValues((prev) => ({ ...prev, image: file, preview }));

		const formData = new FormData();
		formData.append("image", file);

		if (editting && id) {
			const res = await updateImg({ id, value: formData });
			if (res && res.success) {
				URL.revokeObjectURL(formValues.preview);
				router.replace("/dashboard/projects");
			} else {
				if (res && res.errors) setErrors(res.errors);
				else setErrors({ error: res?.message || "Something went wrong" });
			}
		}
	};
	const removeImage = () => {
		setFormValues((prev) => ({ ...prev, image: null, preview: "" }));
		URL.revokeObjectURL(formValues.preview);
	};

	const updateFeature = (index: number, value: string) => {
		const next = [...formValues.features];
		next[index] = value;

		setFormValues((prev) => ({
			...prev,
			features: next,
		}));
	};

	const addFeature = () => {
		setFormValues((prev) => ({
			...prev,
			features: [...formValues.features, ""],
		}));
	};

	const removeFeature = (feat: string) => {
		setFormValues((prev) => ({
			...prev,
			features: formValues.features.filter((f) => f !== feat),
		}));
	};

	const addTech = (value: string) => {
		const trimmed = value.trim();
		if (!trimmed) return;
		const existing = formValues.tech.map((t) => t.toLowerCase());
		if (!existing.includes(trimmed.toLowerCase())) {
			setFormValues((prev) => ({
				...prev,
				tech: [...formValues.tech, trimmed],
			}));
		}
		setTechInput("");
	};

	const addTechFromInput = () => addTech(techInput);

	const removeTech = (tech: string) => {
		setFormValues((prev) => ({
			...prev,
			tech: formValues.tech.filter((f) => f !== tech),
		}));
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement, HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;

		if (name === "tech") {
			setFormValues((prev) => ({
				...prev,
				tech: [...formValues.tech, value],
			}));
			return;
		}

		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleEdit = async () => {
		setErrors(null);

		Object.entries(formValues).map(([k, v]) => {
			if (k === "image") return;

			if (k === "features" && Array.isArray(v)) {
				if (!v.length)
					setErrors((prev) => ({ ...prev, [k]: `This field is required.` }));
				return;
			}
			if (k === "tech" && Array.isArray(v)) {
				if (!v.length)
					setErrors((prev) => ({ ...prev, [k]: `This field is required.` }));
				return;
			}

			if (!v)
				setErrors((prev) => ({ ...prev, [k]: `This field is required.` }));
		});

		if (errors && Object.entries(errors).length) return;

		const res = await update({ id: id || "", values: formValues });

		router.replace("/dashboard/projects");
		if (res && res.success) {
		} else {
			if (res && res.errors) setErrors(res.errors);
			else setErrors({ error: res?.message || "Something went wrong" });
		}
	};

	const handleCreate = async () => {
		setErrors(null);

		Object.entries(formValues).map(([k, v]) => {
			if (k === "features" && Array.isArray(v)) {
				if (!v.length)
					setErrors((prev) => ({ ...prev, [k]: `This field is required.` }));
				return;
			}
			if (k === "tech" && Array.isArray(v)) {
				if (!v.length)
					setErrors((prev) => ({ ...prev, [k]: `This field is required.` }));
				return;
			}

			if (!v)
				setErrors((prev) => ({ ...prev, [k]: `This field is required.` }));
		});

		if (errors && Object.entries(errors).length) return;

		const formData = new FormData();
		Object.entries(formValues).map(([k, v]) => {
			if (k === "features") {
				formData.append(k, JSON.stringify(v));

				return;
			}
			if (k === "tech" && Array.isArray(v)) {
				formData.append(k, JSON.stringify(v));

				return;
			}
			if (v && !Array.isArray(v)) formData.append(k, v);
		});

		const res = await add(formData);

		if (res && res.success) {
			URL.revokeObjectURL(formValues.preview);
			router.replace("/dashboard/projects");
		} else {
			if (res && res.errors) setErrors(res.errors);
			else setErrors({ error: res?.message || "Something went wrong" });
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (isLoading) return;

		if (editting) await handleEdit();
		else await handleCreate();
	};

	return (
		<>
			<div className="flex gap-5 bg-accent py-2 px-5 rounded-2xl mb-8">
				<Button
					disabled={isLoading}
					onClick={() => setChangeImage(false)}
					variant="outline"
					className={`cursor-pointer ${changImage ? "" : "text-primary"}`}
				>
					Edit content
				</Button>
				<Button
					disabled={isLoading}
					onClick={() => setChangeImage(true)}
					className={`cursor-pointer ${!changImage ? "" : "text-primary"}`}
					variant="outline"
				>
					Edit Image
				</Button>
			</div>
			{changImage ? (
				<Field
					label="Image"
					error={errors?.image || errors?.error}
					className="w-full max-w-md mx-auto"
				>
					<div className="space-y-3">
						{/* Preview */}
						{formValues.preview ? (
							<div
								className="relative rounded-xl overflow-hidden border"
								style={{
									borderColor: "var(--border)",
									background: "var(--secondary)",
								}}
							>
								<Image
									src={formValues.preview}
									width={100}
									height={100}
									alt="Preview"
									className="w-full h-40 object-cover"
								/>
								{isUpdattingImg ? (
									<Loader className="w-8 h-8 animate-spin absolute top-1/2 left-1/2 -translate-1/2 text-primary" />
								) : (
									<button
										type="button"
										onClick={removeImage}
										className="absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
										style={{
											background: "rgba(0,0,0,0.6)",
											backdropFilter: "blur(8px)",
										}}
										aria-label="Remove image"
									>
										<X className="h-4 w-4" />
									</button>
								)}
							</div>
						) : (
							<div
								className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors cursor-pointer hover:border-indigo-500/50"
								style={{
									borderColor: "var(--bo rder)",
									background: "var(--secondary)",
								}}
								onClick={() =>
									document.getElementById("project-image-input")?.click()
								}
							>
								<div
									className="w-10 h-10 rounded-lg flex items-center justify-center"
									style={{ background: "var(--card)" }}
								>
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										width="18"
										height="18"
										style={{ color: "var(--muted-foreground)" }}
									>
										<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
										<circle cx="8.5" cy="8.5" r="1.5" />
										<polyline points="21 15 16 10 5 21" />
									</svg>
								</div>
								<p
									className="text-sm font-medium"
									style={{ color: "var(--foreground)" }}
								>
									Click to upload an image
								</p>
								<p
									className="text-xs"
									style={{ color: "var(--muted-foreground)" }}
								>
									PNG, JPG or SVG — up to 5MB
								</p>
							</div>
						)}
						<input
							disabled={isLoading}
							id="project-image-input"
							type="file"
							name="image"
							accept="image/*"
							onChange={handleEditImg}
							className="hidden"
						/>
					</div>
				</Field>
			) : (
				<form
					onSubmit={handleSubmit}
					className="grid md:grid-cols-2 gap-6"
					noValidate
				>
					{/* Left column */}
					<div className="space-y-5">
						<Field label="Title" error={errors?.title}>
							<input
								name="title"
								value={formValues.title}
								onChange={handleChange}
								placeholder="e.g. ShopSphere E-Commerce"
								className={inputClass(!!errors?.title)}
							/>
						</Field>

						<Field label="Category">
							<div className="flex flex-wrap gap-2">
								{CATEGORIES.map((cat) => (
									<button
										type="button"
										key={cat}
										onClick={() =>
											setFormValues((prev) => ({ ...prev, category: cat }))
										}
										className={cn(
											"px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
											formValues.category === cat
												? "text-white"
												: "text-muted-foreground hover:text-foreground",
										)}
										style={{
											background:
												formValues.category === cat
													? "linear-gradient(135deg, #6366f1, #06b6d4)"
													: "var(--secondary)",
											border: "1px solid var(--border)",
										}}
									>
										{cat}
									</button>
								))}
							</div>
						</Field>

						<Field label="Image" error={errors?.image}>
							<div className="space-y-3">
								{/* Preview */}
								{formValues.preview ? (
									<div
										className="relative rounded-xl overflow-hidden border"
										style={{
											borderColor: "var(--border)",
											background: "var(--secondary)",
										}}
									>
										<Image
											src={formValues.preview}
											width={100}
											height={100}
											alt="Preview"
											className="w-full h-40 object-cover"
										/>
										<button
											type="button"
											onClick={removeImage}
											className="absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
											style={{
												background: "rgba(0,0,0,0.6)",
												backdropFilter: "blur(8px)",
											}}
											aria-label="Remove image"
										>
											<X className="h-4 w-4" />
										</button>
									</div>
								) : (
									<div
										className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors cursor-pointer hover:border-indigo-500/50"
										style={{
											borderColor: "var(--bo rder)",
											background: "var(--secondary)",
										}}
										onClick={() =>
											document.getElementById("project-image-input")?.click()
										}
									>
										<div
											className="w-10 h-10 rounded-lg flex items-center justify-center"
											style={{ background: "var(--card)" }}
										>
											<svg
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												width="18"
												height="18"
												style={{ color: "var(--muted-foreground)" }}
											>
												<rect
													x="3"
													y="3"
													width="18"
													height="18"
													rx="2"
													ry="2"
												/>
												<circle cx="8.5" cy="8.5" r="1.5" />
												<polyline points="21 15 16 10 5 21" />
											</svg>
										</div>
										<p
											className="text-sm font-medium"
											style={{ color: "var(--foreground)" }}
										>
											Click to upload an image
										</p>
										<p
											className="text-xs"
											style={{ color: "var(--muted-foreground)" }}
										>
											PNG, JPG or SVG — up to 5MB
										</p>
									</div>
								)}
								<input
									id="project-image-input"
									type="file"
									name="image"
									accept="image/*"
									onChange={handleImageChange}
									className="hidden"
								/>
							</div>
						</Field>

						<Field label="Description" error={errors?.description}>
							<textarea
								name="description"
								value={formValues.description}
								onChange={handleChange}
								rows={4}
								placeholder="A short description of the project..."
								className={cn(inputClass(!!errors?.description), "resize-none")}
							/>
						</Field>

						<Field label="Accent Color">
							<div className="flex flex-wrap items-center gap-2">
								{COLOR_PRESETS.map((c) => (
									<button
										type="button"
										key={c}
										onClick={() =>
											setFormValues((prev) => ({ ...prev, color: c }))
										}
										className="w-7 h-7 rounded-full transition-transform duration-200 hover:scale-110"
										style={{
											background: c,
											border:
												formValues.color === c ? "2px solid white" : "none",
											outline:
												formValues.color === c ? "2px solid " + c : "none",
											boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
										}}
										aria-label={`Set color ${c}`}
									/>
								))}
								<input
									type="color"
									name="color"
									value={formValues.color}
									onChange={handleChange}
									className="w-7 h-7 rounded-full cursor-pointer"
									title="Custom color"
								/>
							</div>
						</Field>
					</div>

					{/* Right column */}
					<div className="space-y-5">
						<Field label="Features" error={errors?.features}>
							<div className="space-y-2">
								{formValues.features.map((feature, index) => (
									<div key={index} className="flex gap-2">
										<input
											value={feature}
											onChange={(e) => updateFeature(index, e.target.value)}
											placeholder={`Feature ${index + 1}`}
											className={inputClass(false)}
										/>
										<button
											type="button"
											onClick={() => removeFeature(feature)}
											className="p-2 rounded-lg text-muted-foreground hover:text-red-500 transition-colors shrink-0"
											style={{ background: "var(--secondary)" }}
											aria-label="Remove feature"
										>
											<Trash2 className="h-3.5 w-3.5" />
										</button>
									</div>
								))}
								<AddButton label="Add feature" onClick={addFeature} />
							</div>
						</Field>

						<Field label="Tech Stack" error={errors?.tech}>
							<div className="space-y-2">
								<div className="flex gap-2">
									<input
										value={techInput}
										onChange={(e) => setTechInput(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												addTechFromInput();
											}
										}}
										placeholder="Type a technology and press Enter"
										className={inputClass(false)}
									/>
									<button
										type="button"
										onClick={addTechFromInput}
										className="px-3 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
										style={{
											background: "linear-gradient(135deg, #6366f1, #06b6d4)",
										}}
									>
										Add
									</button>
								</div>
								<div className="flex flex-wrap gap-2">
									{formValues.tech.map((t, index) => (
										<span
											key={index}
											className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono"
											style={{
												background: "var(--secondary)",
												color: "var(--foreground)",
											}}
										>
											{t}
											<button
												type="button"
												onClick={() => removeTech(t)}
												className="text-muted-foreground hover:text-red-500 transition-colors"
												aria-label="Remove tech"
											>
												<X className="h-3 w-3" />
											</button>
										</span>
									))}
								</div>
							</div>
						</Field>

						<Field label="GitHub URL" error={errors?.github}>
							<input
								name="github"
								value={formValues.github}
								onChange={handleChange}
								placeholder="https://github.com/..."
								className={inputClass(false)}
							/>
						</Field>

						<Field label="Demo URL" error={errors?.demo}>
							<input
								name="demo"
								value={formValues.demo}
								onChange={handleChange}
								placeholder="https://..."
								className={inputClass(false)}
							/>
						</Field>
					</div>

					{errors?.error && (
						<p className="m-2 text-xs text-red-500">{errors.error}</p>
					)}

					{/* Actions */}
					<div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
						<Button
							type="button"
							variant="secondary"
							className="cursor-pointer px-5"
							disabled={isLoading}
							onClick={() => setFormValues({ ...FORM, category: "Frontend" })}
						>
							Reset
						</Button>

						<Button
							type="submit"
							disabled={isLoading}
							className="cursor-pointer px-5"
						>
							{isSubmitting ? (
								<Loader className="w-4 h-4 animate-spin" />
							) : (
								submitLabel
							)}
						</Button>
					</div>
				</form>
			)}
		</>
	);
}

function Field({
	label,
	error,
	children,
	className,
}: {
	className?: string;
	label: string;
	error?: string;
	children: React.ReactNode;
}) {
	return (
		<div className={className}>
			<label
				className="block text-xs font-mono font-semibold uppercase tracking-wider mb-1.5"
				style={{ color: "var(--muted-foreground)" }}
			>
				{label}
			</label>
			{children}
			{error && <p className="mt-1 text-xs text-red-500">{error}</p>}
		</div>
	);
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
			style={{
				background: "var(--secondary)",
				border: "1px dashed var(--border)",
			}}
		>
			<Plus className="h-3 w-3" />
			{label}
		</button>
	);
}

function inputClass(hasError: boolean) {
	return cn(
		"w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200",
		"focus:ring-2 border border-border",
		hasError
			? "border-red-500 focus:ring-red-500/20"
			: "focus:ring-indigo-500/20",
	);
}
