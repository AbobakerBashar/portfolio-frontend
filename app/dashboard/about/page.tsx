"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
	useAbout,
	useCreateAbout,
	useUpdateAbout,
	useUpdateAboutImage,
} from "@/hooks/use-about";
import type { AboutType } from "@/types/about";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Spinner from "@/components/ui/spinner";
import Image from "next/image";

export default function DashboardAboutPage() {
	const [form, setForm] = useState<AboutType>({
		heading: "",
		intro: "",
		background: "",
		mindset: "",
		careerGoal: "",
	});
	const [image, setImage] = useState<{ file: File | null; preview: string }>({
		preview: "",
		file: null,
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [saved, setSaved] = useState(false);
	const [edit, setEdit] = useState(true);

	const { data, isLoading } = useAbout();
	const { mutateAsync: createAbout, isPending: isCreating } = useCreateAbout();
	const { mutateAsync: updateAbout, isPending: isUpdating } = useUpdateAbout();
	const { mutateAsync: updateAboutImage, isPending: isUpdatingImage } =
		useUpdateAboutImage();

	const about = data?.about;
	const loading = isCreating || isUpdating || isLoading || isUpdatingImage;

	useEffect(() => {
		if (isLoading) return;
		const initializeForm = () => {
			if (data?.about) {
				setForm({
					heading: data.about.heading || "",
					intro: data.about.intro || "",
					background: data.about.background || "",
					mindset: data.about.mindset || "",
					careerGoal: data.about.careerGoal || "",
				});
			} else {
				setForm({
					heading: "",
					intro: "",
					background: "",
					mindset: "",
					careerGoal: "",
				});
			}
		};
		initializeForm();
	}, [data, isLoading]);

	useEffect(() => {
		if (isLoading) return;
		const initializeImage = () => {
			if (data?.about?.image) {
				setImage({ file: null, preview: data.about.image.url });
			}
		};
		initializeImage();
	}, [data, isLoading]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		if (!form) return;
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (isUpdatingImage) return;
		if (!file) return;
		if (image.preview) URL.revokeObjectURL(image.preview);
		const preview = URL.createObjectURL(file);
		setErrors({});

		if (edit) {
			const formData = new FormData();
			formData.append("image", file);
			const res = await updateAboutImage(formData);

			if (res?.success) {
				setSaved(true);
				setTimeout(() => setSaved(false), 2200);
				URL.revokeObjectURL(image.preview);
				setImage({ file: null, preview: res.about?.image.url || "" });
				setEdit(true);
				setForm((prev) => ({
					heading: prev.heading,
					intro: prev.intro,
					background: prev.background,
					mindset: prev.mindset,
					careerGoal: prev.careerGoal,
				}));
			} else {
				if (res?.message) setErrors({ general: res?.message });
				else if (res?.errors) setErrors(res.errors);
				else setErrors({ general: "An error occurred" });
			}
			return;
		}

		setErrors((prev) => ({ ...prev, image: "", general: "" }));
		setImage({ file, preview });
	};

	const handleCreate = async () => {
		if (
			!form.heading ||
			!form.intro ||
			!form.background ||
			!form.mindset ||
			!form.careerGoal ||
			!image.file
		) {
			setErrors({
				heading: !form.heading ? "Heading is required" : "",
				intro: !form.intro ? "Intro is required" : "",
				background: !form.background ? "Background is required" : "",
				mindset: !form.mindset ? "Mindset is required" : "",
				careerGoal: !form.careerGoal ? "Career Goal is required" : "",
				image: !image.file ? "Image is required" : "",
			});
			return;
		}
		const formData = new FormData();
		formData.append("heading", form.heading);
		formData.append("intro", form.intro);
		formData.append("background", form.background);
		formData.append("mindset", form.mindset);
		formData.append("careerGoal", form.careerGoal);
		formData.append("image", image.file);

		const res = await createAbout(formData);
		if (res?.success) {
			setSaved(true);
			setTimeout(() => setSaved(false), 2200);
			URL.revokeObjectURL(image.preview);
			setImage({ file: null, preview: res.about?.image.url || "" });
			setEdit(true);
			setForm((prev) => ({
				heading: prev.heading,
				intro: prev.intro,
				background: prev.background,
				mindset: prev.mindset,
				careerGoal: prev.careerGoal,
			}));
		} else {
			if (res?.message) setErrors({ general: res?.message });
			else if (res?.errors) setErrors(res.errors);
			else setErrors({ general: "An error occurred" });
		}
	};

	const handleUpdate = async () => {
		const payload: AboutType & {
			image?: {
				url: string;
				publicId: string;
			};
		} = {
			heading: form.heading || about?.heading || "",
			intro: form.intro || about?.intro || "",
			background: form.background || about?.background || "",
			mindset: form.mindset || about?.mindset || "",
			careerGoal: form.careerGoal || about?.careerGoal || "",
			image: about?.image,
		};
		const res = await updateAbout(payload);
		if (res?.success) {
			setImage({ file: null, preview: res.about?.image.url || "" });
			setEdit(true);
			setForm((prev) => ({
				heading: prev.heading,
				intro: prev.intro,
				background: prev.background,
				mindset: prev.mindset,
				careerGoal: prev.careerGoal,
			}));
			setSaved(true);
			setTimeout(() => setSaved(false), 2200);
		} else {
			if (res?.errors) {
				setErrors(res.errors);
			} else setErrors({ general: res?.message || "An error occurred" });
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (loading) return;
		setErrors({});
		if (!edit) {
			await handleCreate();
		} else {
			await handleUpdate();
		}
	};

	if (isLoading)
		return (
			<Spinner
				label="Loading about..."
				className="justify-center min-h-[85vh]"
			/>
		);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="space-y-3">
					<Link
						href="/dashboard"
						className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80 mb-4"
						style={{ color: "#6366f1" }}
					>
						<ArrowLeft className="h-3.5 w-3.5" />
						Back to dashboard
					</Link>
					<h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">
						Manage About
					</h1>
					<p className="text-sm text-muted-foreground">
						Edit the About section displayed on your portfolio.
					</p>
				</div>

				<div className="flex items-center gap-3">
					<Button
						className="ml-2"
						onClick={() => setEdit(!edit)}
						variant="outline"
						disabled={loading}
					>
						{edit ? "Switch to Create" : "Switch to Edit"}
					</Button>
					<Button
						variant="outline"
						onClick={() => {
							setErrors({});
							if (!about) {
								setForm({
									heading: "",
									intro: "",
									background: "",
									mindset: "",
									careerGoal: "",
								});
								if (image.preview) URL.revokeObjectURL(image.preview);
								setImage({ file: null, preview: "" });
								return;
							}

							setForm({
								heading: about.heading,
								intro: about.intro,
								background: about.background,
								mindset: about.mindset,
								careerGoal: about.careerGoal,
							});
							if (image.preview) URL.revokeObjectURL(image.preview);
							setImage({ file: null, preview: "" });
						}}
					>
						Reset
					</Button>
					<Button
						className="ml-2"
						type="submit"
						form="about-form"
						disabled={loading}
					>
						Save
					</Button>
				</div>
			</div>

			{errors.general && (
				<p className="text-sm text-destructive">{errors.general}</p>
			)}

			<form id="about-form" onSubmit={handleSubmit} className="grid gap-4">
				<label className="space-y-1">
					<div className="font-medium">Heading</div>
					<Input name="heading" value={form.heading} onChange={handleChange} />
					{errors.heading && (
						<p className="text-sm text-destructive">{errors.heading}</p>
					)}
				</label>

				<label className="space-y-1">
					<div className="font-medium">Intro</div>
					<Textarea
						name="intro"
						value={form.intro}
						onChange={handleChange}
						rows={3}
					/>
					{errors.intro && (
						<p className="text-sm text-destructive">{errors.intro}</p>
					)}
				</label>

				<label className="space-y-1">
					<div className="font-medium">Background</div>
					<Textarea
						name="background"
						value={form.background}
						onChange={handleChange}
						rows={4}
					/>
					{errors.background && (
						<p className="text-sm text-destructive">{errors.background}</p>
					)}
				</label>

				<label className="space-y-1">
					<div className="font-medium">Mindset</div>
					<Textarea
						name="mindset"
						value={form.mindset}
						onChange={handleChange}
						rows={3}
					/>
					{errors.mindset && (
						<p className="text-sm text-destructive">{errors.mindset}</p>
					)}
				</label>

				<label className="space-y-1">
					<div className="font-medium">Career Goal</div>
					<Textarea
						name="careerGoal"
						value={form.careerGoal}
						onChange={handleChange}
						rows={3}
					/>
					{errors.careerGoal && (
						<p className="text-sm text-destructive">{errors.careerGoal}</p>
					)}
				</label>

				<label className="space-y-1">
					<div className="font-medium">About image</div>
					<Input
						type="file"
						accept="image/*"
						disabled={isUpdatingImage}
						onChange={handleImageChange}
					/>
					{errors.image && (
						<p className="text-sm text-destructive">{errors.image}</p>
					)}
					{image.preview && (
						<div className="mt-2">
							<Image
								src={image.preview}
								alt="About preview"
								width={480}
								height={240}
								unoptimized
								className="h-40 w-auto rounded-md border object-cover"
							/>
						</div>
					)}
				</label>

				<div className="flex items-center gap-3">
					<Button type="submit" disabled={loading}>
						{isCreating || isUpdating ? "Saving..." : "Save"}
					</Button>
					{saved && <div className="text-green-600">Saved</div>}
				</div>
			</form>
		</div>
	);
}
