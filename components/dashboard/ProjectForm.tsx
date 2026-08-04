"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Trash2, X } from "lucide-react";
import type { ProjectFormValues } from "@/lib/projects";
import { cn } from "@/lib/utils";

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

export default function ProjectForm({
	initialValues,
	onSubmit,
	onCancel,
	submitLabel = "Save Project",
	isSubmitting = false,
}: {
	initialValues?: ProjectFormValues;
	onSubmit: (values: ProjectFormValues) => void;
	onCancel?: () => void;
	submitLabel?: string;
	isSubmitting?: boolean;
}) {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<ProjectFormValues>({
		defaultValues: initialValues ?? {
			title: "",
			category: "Full Stack",
			image: "",
			description: "",
			features: [""],
			tech: [""],
			github: "",
			demo: "",
			color: COLOR_PRESETS[0],
		},
	});

	const selectedColor = watch("color");
	const features = watch("features") ?? [];
	const tech = watch("tech") ?? [];
	const [techInput, setTechInput] = useState("");

	const updateFeature = (index: number, value: string) => {
		const next = [...features];
		next[index] = value;
		setValue("features", next);
	};

	const addFeature = () => {
		setValue("features", [...features, ""]);
	};

	const removeFeature = (index: number) => {
		setValue(
			"features",
			features.filter((_, i) => i !== index),
		);
	};

	const addTech = (value: string) => {
		const trimmed = value.trim();
		if (!trimmed) return;
		const existing = tech.map((t) => t.toLowerCase());
		if (!existing.includes(trimmed.toLowerCase())) {
			setValue("tech", [...tech, trimmed]);
		}
		setTechInput("");
	};

	const addTechFromInput = () => addTech(techInput);

	const removeTech = (index: number) => {
		setValue(
			"tech",
			tech.filter((_, i) => i !== index),
		);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid md:grid-cols-2 gap-6"
			noValidate
		>
			{/* Left column */}
			<div className="space-y-5">
				<Field label="Title" error={errors.title?.message}>
					<input
						{...register("title", { required: "Title is required" })}
						placeholder="e.g. ShopSphere E-Commerce"
						className={inputClass(!!errors.title)}
					/>
				</Field>

				<Field label="Category">
					<div className="flex flex-wrap gap-2">
						{CATEGORIES.map((cat) => (
							<button
								type="button"
								key={cat}
								onClick={() => setValue("category", cat)}
								className={cn(
									"px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
									watch("category") === cat
										? "text-white"
										: "text-muted-foreground hover:text-foreground",
								)}
								style={{
									background:
										watch("category") === cat
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

				<Field label="Image URL" error={errors.image?.message}>
					<input
						{...register("image", { required: "Image URL is required" })}
						placeholder="https://images.unsplash.com/..."
						className={inputClass(!!errors.image)}
					/>
				</Field>

				<Field label="Description" error={errors.description?.message}>
					<textarea
						{...register("description", {
							required: "Description is required",
							minLength: {
								value: 20,
								message: "Description must be at least 20 characters",
							},
						})}
						rows={4}
						placeholder="A short description of the project..."
						className={cn(inputClass(!!errors.description), "resize-none")}
					/>
				</Field>

				<Field label="Accent Color">
					<div className="flex flex-wrap items-center gap-2">
						{COLOR_PRESETS.map((c) => (
							<button
								type="button"
								key={c}
								onClick={() => setValue("color", c)}
								className="w-7 h-7 rounded-full transition-transform duration-200 hover:scale-110"
								style={{
									background: c,
									border: selectedColor === c ? "2px solid white" : "none",
									outline: selectedColor === c ? "2px solid " + c : "none",
									boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
								}}
								aria-label={`Set color ${c}`}
							/>
						))}
						<input
							type="color"
							{...register("color")}
							value={selectedColor}
							onChange={(e) => setValue("color", e.target.value)}
							className="w-7 h-7 rounded-full cursor-pointer"
							title="Custom color"
						/>
					</div>
				</Field>
			</div>

			{/* Right column */}
			<div className="space-y-5">
				<Field label="Features">
					<div className="space-y-2">
						{features.map((feature, index) => (
							<div key={index} className="flex gap-2">
								<input
									value={feature}
									onChange={(e) => updateFeature(index, e.target.value)}
									placeholder={`Feature ${index + 1}`}
									className={inputClass(false)}
								/>
								<button
									type="button"
									onClick={() => removeFeature(index)}
									className="p-2 rounded-lg text-muted-foreground hover:text-red-500 transition-colors flex-shrink-0"
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

				<Field label="Tech Stack">
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
							{tech.map((t, index) => (
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
										onClick={() => removeTech(index)}
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

				<Field label="GitHub URL">
					<input
						{...register("github")}
						placeholder="https://github.com/..."
						className={inputClass(false)}
					/>
				</Field>

				<Field label="Demo URL">
					<input
						{...register("demo")}
						placeholder="https://..."
						className={inputClass(false)}
					/>
				</Field>
			</div>

			{/* Actions */}
			<div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						style={{ background: "var(--secondary)" }}
					>
						Cancel
					</button>
				)}
				<button
					type="submit"
					disabled={isSubmitting}
					className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:opacity-90 disabled:opacity-60 disabled:hover:scale-100"
					style={{
						background: "linear-gradient(135deg, #6366f1, #06b6d4)",
					}}
				>
					{isSubmitting ? "Saving…" : submitLabel}
				</button>
			</div>
		</form>
	);
}

function Field({
	label,
	error,
	children,
}: {
	label: string;
	error?: string;
	children: React.ReactNode;
}) {
	return (
		<div>
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
		"focus:ring-2",
		hasError
			? "border-red-500 focus:ring-red-500/20"
			: "focus:ring-indigo-500/20",
	);
}
