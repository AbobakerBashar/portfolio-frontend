"use client";

// import type { SkillFormValues } from "@/typs/skill";
import { SKILL_CATEGORIES, SKILL_CATEGORY_COLORS } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { SkillFormValues } from "@/types/skill";
import { useAddSkill, useUpdateSkill } from "@/hooks/use-skills";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const ICON_PRESETS = [
	"⚛️",
	"▲",
	"TS",
	"JS",
	"🎨",
	"🌐",
	"🟢",
	"🚀",
	"🍃",
	"🔧",
	"🔌",
	"🔐",
	"💳",
	"☁️",
	"🐙",
	"📮",
	"💻",
	"🎯",
	"🐍",
	"🔥",
	"📦",
	"⚡",
	"🛠️",
	"🧩",
	"📡",
	"💾",
];

const DEFAULT_FORM_VALUES: SkillFormValues = {
	name: "",
	proficiency: 0,
	icon: "",
	category: "Frontend",
	color: SKILL_CATEGORY_COLORS["Frontend"],
	order: 1,
	featured: false,
};

type Props = {
	submitLabel?: string;
	initialValues?: SkillFormValues;
	isSubmitting?: boolean;
	onSubmit?: () => void;
	id?: string;
	isEdting?: boolean;
};

export default function SkillForm({
	submitLabel = "Save Skill",
	initialValues,
	id,
	isEdting,
}: Props) {
	const [formValues, setFormValues] = useState<SkillFormValues>(
		initialValues || DEFAULT_FORM_VALUES,
	);
	const [formErrors, setFormErrors] = useState<
		Partial<Record<keyof SkillFormValues, string>>
	>({});
	const [generalError, setGeneralError] = useState<string>("");

	const router = useRouter();

	const handleCancel = () => {
		setFormValues(DEFAULT_FORM_VALUES);
		setFormErrors({});
		setGeneralError("");
		router.push("/dashboard/skills");
	};

	const { mutateAsync: addSkill, isPending: isAdding } = useAddSkill();
	const { mutateAsync: update, isPending: isUpdating } = useUpdateSkill();

	const isLoading = isAdding || isUpdating;

	const handleUpdate = async () => {
		setFormErrors({});
		setGeneralError("");
		if (isLoading) return;

		if (!formValues.name.trim()) {
			setFormErrors((prev) => ({ ...prev, name: "Skill name is required" }));
			return;
		}
		if (!formValues.category.trim()) {
			setFormErrors((prev) => ({
				...prev,
				category: "Skill category is required",
			}));
			return;
		}
		if (!formValues.proficiency) {
			setFormErrors((prev) => ({
				...prev,
				proficiency: "Skill proficiency is required",
			}));
			return;
		}

		const res = await update({ id: id || "", values: formValues });
		if (res.success) {
			setFormValues(DEFAULT_FORM_VALUES);
		} else {
			if (res.errors) setFormErrors(res.errors);
			else setGeneralError(res.message);
		}
	};

	const handleCreate = async () => {
		setFormErrors({});
		setGeneralError("");
		if (isAdding) return;
		if (!formValues.name.trim()) {
			setFormErrors((prev) => ({ ...prev, name: "Skill name is required" }));
			return;
		}
		if (!formValues.category.trim()) {
			setFormErrors((prev) => ({
				...prev,
				category: "Skill category is required",
			}));
			return;
		}
		if (!formValues.proficiency) {
			setFormErrors((prev) => ({
				...prev,
				proficiency: "Skill proficiency is required",
			}));
			return;
		}

		const res = await addSkill(formValues);
		if (res.success) {
			setFormValues(DEFAULT_FORM_VALUES);
		} else {
			if (res.errors) setFormErrors(res.errors);
			else setGeneralError(res.message);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (isEdting && id) await handleUpdate();
		else await handleCreate();
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-xl space-y-6" noValidate>
			<div>
				<Label
					htmlFor="category"
					className="text-xs font-mono font-semibold uppercase tracking-wider mb-1.5"
				>
					Skill Name
				</Label>
				<Input
					id="category"
					placeholder="e.g. React, Node.js, TypeScript"
					value={formValues.name}
					onChange={(e) =>
						setFormValues((prev) => ({ ...prev, name: e.target.value }))
					}
				/>
				{formErrors.name && (
					<p className="text-xs text-red-500 mt-2">{formErrors.name}</p>
				)}
			</div>

			{/* Category */}
			<Label className="text-xs font-mono font-semibold uppercase tracking-wider mb-1.5">
				Select Category
			</Label>
			<div>
				<div className="flex flex-wrap gap-2">
					{SKILL_CATEGORIES.map((cat) => (
						<button
							type="button"
							key={cat}
							onClick={() =>
								setFormValues((prev) => ({ ...prev, category: cat }))
							}
							className={cn(
								"cursor-pointer px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
								formValues.category === cat
									? "text-white"
									: "text-muted-foreground hover:text-foreground",
							)}
							style={{
								background:
									formValues.category === cat
										? SKILL_CATEGORY_COLORS[cat]
										: "var(--secondary)",
								border: `1px solid ${
									formValues.category === cat
										? SKILL_CATEGORY_COLORS[cat]
										: "var(--border)"
								}`,
							}}
						>
							{cat}
						</button>
					))}
				</div>
				{formErrors.category && (
					<p className="text-xs text-red-500 mt-2">{formErrors.category}</p>
				)}
			</div>

			{/* Level slider */}
			<div>
				<Label
					htmlFor="level"
					className="text-xs font-mono font-semibold uppercase tracking-wider mb-1.5"
				>
					Proficiency Level
				</Label>
				<div className="flex items-center gap-4">
					<Input
						type="range"
						min={0}
						max={100}
						step={1}
						value={formValues.proficiency}
						onChange={(e) =>
							setFormValues((prev) => ({
								...prev,
								proficiency: Number(e.target.value),
							}))
						}
						className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
						style={{
							background: `linear-gradient(to right, ${SKILL_CATEGORY_COLORS[formValues.category]} 0%, ${SKILL_CATEGORY_COLORS[formValues.category]} ${formValues.proficiency}%, var(--border) ${formValues.proficiency}%, var(--border) 100%)`,
							outline: "none",
						}}
					/>
					<span
						className="w-10 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
						style={{
							background: `${SKILL_CATEGORY_COLORS[formValues.category]}15`,
							color: SKILL_CATEGORY_COLORS[formValues.category],
						}}
					>
						{formValues.proficiency}%
					</span>
				</div>
				{formErrors.proficiency && (
					<p className="text-xs text-red-500 mt-2">{formErrors.proficiency}</p>
				)}
			</div>

			{/* Icon picker */}
			<div>
				<Label
					htmlFor="icon"
					className="text-xs font-mono font-semibold uppercase tracking-wider mb-1.5"
				>
					Icon
				</Label>
				<Input
					id="icon"
					placeholder="Enter an emoji or text (e.g. ⚛️ or TS)"
					value={formValues.icon}
					onChange={(e) =>
						setFormValues((prev) => ({ ...prev, icon: e.target.value }))
					}
				/>
				{formErrors.icon && (
					<p className="text-xs text-red-500 mt-2">{formErrors.icon}</p>
				)}
			</div>

			{/* Quick pick presets */}
			<div className="flex flex-wrap gap-1.5">
				{ICON_PRESETS.map((icon) => (
					<button
						type="button"
						key={icon}
						onClick={() => setFormValues((prev) => ({ ...prev, icon }))}
						className={cn(
							"cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-200 hover:scale-110",
							formValues.icon === icon
								? "opacity-100"
								: "opacity-60 hover:opacity-100",
						)}
						style={{
							background: `${SKILL_CATEGORY_COLORS[formValues.category]}10`,
							color: SKILL_CATEGORY_COLORS[formValues.category],
							boxShadow:
								formValues.icon === icon
									? `0 0 0 2px ${SKILL_CATEGORY_COLORS[formValues.category]}`
									: "none",
						}}
						aria-label={`Select icon ${icon}`}
					>
						{icon}
					</button>
				))}
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div>
					<Label
						htmlFor="order"
						className="text-xs font-mono font-semibold uppercase tracking-wider mb-1.5"
					>
						Display Order
					</Label>
					<Input
						type="number"
						min={1}
						value={formValues.order}
						onChange={(e) =>
							setFormValues((prev) => ({
								...prev,
								order: Number(e.target.value),
							}))
						}
					/>
					{formErrors.order && (
						<p className="text-xs text-red-500 mt-2">{formErrors.order}</p>
					)}
				</div>
				<div className="flex flex-col justify-between">
					<Label
						htmlFor="featured"
						className="text-xs font-mono font-semibold uppercase tracking-wider mb-1.5"
					>
						Featured
					</Label>
					<Switch
						className="h-12 w-12"
						checked={formValues.featured}
						onCheckedChange={(checked) =>
							setFormValues((prev) => ({ ...prev, featured: checked }))
						}
					/>
					{formErrors.featured && (
						<p className="text-xs text-red-500 mt-2">{formErrors.featured}</p>
					)}
				</div>
			</div>
			{generalError && (
				<p className="text-xs text-red-500 mt-2">{generalError}</p>
			)}
			{/* Actions */}
			<div className="flex items-center justify-end gap-3 pt-2">
				<Button
					disabled={isLoading}
					onClick={handleCancel}
					type="reset"
					variant="secondary"
					className="cursor-pointer"
				>
					Cancel
				</Button>

				<Button
					disabled={isLoading}
					type="submit"
					variant="default"
					className="cursor-pointer"
				>
					{isLoading ? (
						<>
							<Loader className="mr-2 h-4 w-4 animate-spin" />
							Saving...
						</>
					) : (
						submitLabel
					)}
				</Button>
			</div>
		</form>
	);
}
