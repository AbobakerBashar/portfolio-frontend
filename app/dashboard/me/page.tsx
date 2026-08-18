"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	useCreateSettings,
	useSettings,
	useUpdateSettings,
	useUpdateSettingsAvatar,
} from "@/hooks/use-auth";
import { SettingsInputs } from "@/types/auth";
import {
	ArrowLeft,
	CheckCircle2,
	Loader,
	Save,
	Upload,
	UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FORM_VALUES: SettingsInputs = {
	profile: {
		name: "",
		tagline: "",
		title: "",
		bio: "",
		avatar: "",
	},
	contact: {
		email: "",
		phone: "",
		location: "",
	},
	socialLinks: {
		linkedin: "",
		github: "",
		instagram: "",
		twitter: "",
		website: "",
	},
	typingTexts: [],
	availability: {
		message: "",
		status: false,
	},
	resume: {
		url: "",
	},
};

export default function MePage() {
	const [errors, setErrors] = useState<Record<string, string> | null>(null);
	const [saved, setSaved] = useState(false);
	const [settings, setSettings] = useState<SettingsInputs>(FORM_VALUES);
	const [avatar, setAvatar] = useState("");

	const { data, isLoading } = useSettings();
	const { mutateAsync: createSettings, isPending: isCreating } =
		useCreateSettings();

	const { mutateAsync: updateAvatar, isPending: isUpdatingAvatar } =
		useUpdateSettingsAvatar();

	const { mutateAsync: update, isPending: isUpdating } = useUpdateSettings();

	const loading = isLoading || isCreating || isUpdating;

	useEffect(() => {
		const updateAvatar = () => {
			if (settings?.profile?.avatar) {
				setAvatar(settings.profile.avatar);
				return;
			}

			setAvatar("");
		};
		updateAvatar();
	}, [settings?.profile?.avatar]);

	const handleAvatarChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setErrors(null);

		const file = event.target.files?.[0];
		if (!file || isUpdatingAvatar || loading) return;

		const objectUrl = URL.createObjectURL(file);
		setAvatar(objectUrl);

		const formData = new FormData();
		formData.append("avatar", file);

		const res = await updateAvatar(formData);

		if (res.success) {
			setSaved(true);
		} else {
			if (res.errors) setErrors(res.errors);
			else if (res.message)
				setErrors({
					error: res.message,
				});
			else
				setErrors({
					error: "Faild to update settings avatar",
				});
		}
	};

	useEffect(() => {
		const setFormData = () => {
			if (loading) return;
			if (data?.settings) setSettings(data.settings);
		};
		setFormData();
	}, [data?.settings, loading]);

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement, HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
		key: keyof SettingsInputs,
	) => {
		if (key === "typingTexts") {
		} else
			setSettings((prev) => ({
				...prev,
				[key]: {
					...prev[key],
					[e.target.name]: e.target.value,
				},
			}));
	};

	const handleTypingTexts = (value: string, idx: number) => {
		if (idx < 0)
			return setSettings((prev) => ({
				...prev,
				typingTexts: [...prev.typingTexts, ""],
			}));

		setSettings((prev) => ({
			...prev,
			typingTexts: prev.typingTexts?.map((text, i) =>
				i === idx ? value : text,
			),
		}));
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (loading || isUpdatingAvatar) return;

		setErrors(null);
		setSaved(false);

		if (!settings) {
			const res = await createSettings(settings);

			if (res.success) {
				setSaved(true);
			} else {
				if (res.errors) setErrors(res.errors);
				else if (res.message)
					setErrors({
						error: res.message,
					});
				else
					setErrors({
						error: "Faild to create settings",
					});
			}
		} else {
			const res = await update(settings);

			if (res.success) {
				setSaved(true);
			} else {
				if (res.errors) setErrors(res.errors);
				else if (res.message)
					setErrors({
						error: res.message,
					});
				else
					setErrors({
						error: "Faild to create settings",
					});
			}
		}
	};

	const resetProfile = () => {
		setSettings(data?.settings || FORM_VALUES);
		setSaved(true);
	};

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
						My profile
					</h1>
					<p
						className="text-sm mt-1"
						style={{ color: "var(--muted-foreground)" }}
					>
						Update the personal details that show up on your portfolio.
					</p>
				</div>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={resetProfile}
						disabled={loading}
						className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
						style={{
							background: "var(--secondary)",
							border: "1px solid var(--border)",
							color: "var(--foreground)",
						}}
					>
						Reset
					</button>
					<button
						type="submit"
						disabled={loading}
						form="profile-form"
						className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
						style={{
							background: "linear-gradient(135deg, #6366f1, #06b6d4)",
						}}
					>
						{isCreating || isUpdating ? (
							<Loader className="w-4h-4 animate-spin" />
						) : (
							<>
								<Save className="h-4 w-4" />
								Save changes
							</>
						)}
					</button>
				</div>
			</div>
			<div
				className="glass rounded-2xl p-6 md:p-8"
				style={{ border: "1px solid var(--border)" }}
			>
				{" "}
				{errors?.error && <p className="text-destructive">{errors.error}</p>}
				{saved && (
					<div
						className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium w-fit"
						style={{
							background: "rgba(16,185,129,0.12)",
							border: "1px solid rgba(16,185,129,0.4)",
							color: "#10b981",
						}}
					>
						<CheckCircle2 className="h-4 w-4" />
						Profile saved
					</div>
				)}
			</div>

			<div className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
				<form
					id="profile-form"
					onSubmit={handleSubmit}
					className="space-y-6 glass rounded-2xl p-6 md:p-8"
					style={{ border: "1px solid var(--border)" }}
				>
					<div className="md:col-span-2">
						<div
							className="flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center"
							style={{ borderColor: "var(--border)" }}
						>
							<div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/10 bg-slate-900/40">
								{avatar ? (
									<Image
										src={avatar}
										alt="Avatar preview"
										fill
										sizes="100%"
										className="h-full w-full object-cover"
									/>
								) : (
									<div className="flex h-full w-full items-center justify-center bg-linear-to-br from-indigo-500 to-cyan-500 text-white">
										<UserRound className="h-8 w-8" />
									</div>
								)}
								<label className="absolute bottom-3 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-slate-900 text-white shadow-lg transition-transform hover:scale-105">
									<Upload className="h-4 w-4" />
									<input
										type="file"
										accept="image/*"
										onChange={handleAvatarChange}
										className="hidden"
									/>
								</label>
							</div>

							<div className="flex-1 space-y-2">
								<p
									className="text-sm font-medium"
									style={{ color: "var(--foreground)" }}
								>
									Profile photo
								</p>
								<p
									className="text-sm"
									style={{ color: "var(--muted-foreground)" }}
								>
									PNG, JPG, or WebP. This is only a preview for now.
								</p>
								<label
									className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:opacity-90"
									style={{
										background: "rgba(99,102,241,0.12)",
										border: "1px solid rgba(99,102,241,0.4)",
										color: "#6366f1",
									}}
								>
									<input
										type="file"
										accept="image/*"
										onChange={handleAvatarChange}
										className="hidden"
									/>
									Choose image
								</label>
							</div>
						</div>
					</div>
					<div className="grid gap-5 md:grid-cols-2">
						<label className="space-y-2 text-sm md:col-span-2">
							<span className="font-medium">Full name</span>
							<Input
								value={settings?.profile.name || ""}
								name="name"
								onChange={(e) => handleChange(e, "profile")}
								className="h-10"
							/>
							{errors?.["profile.name"] && (
								<p className="text-destructive">{errors["profile.name"]}</p>
							)}
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Professional title
							</span>
							<Input
								value={settings?.profile.title || ""}
								name="title"
								onChange={(e) => handleChange(e, "profile")}
								className="h-10"
							/>
							{errors?.["profile.title"] && (
								<p className="text-destructive">{errors["profile.title"]}</p>
							)}
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Tagline
							</span>
							<Input
								value={settings?.profile.tagline || ""}
								name="tagline"
								onChange={(e) => handleChange(e, "profile")}
								className="h-10"
							/>
							{errors?.["profile.tagline"] && (
								<p className="text-destructive">{errors["profile.tagline"]}</p>
							)}
						</label>

						<label className="space-y-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Location
							</span>
							<Input
								value={settings?.contact.location || ""}
								name="location"
								onChange={(e) => handleChange(e, "contact")}
								className="h-10"
							/>
							{errors?.["contact.location"] && (
								<p className="text-destructive">{errors["contact.location"]}</p>
							)}
						</label>

						<label className="space-y-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Availability
							</span>
							<Input
								value={settings?.availability.message || ""}
								name="message"
								onChange={(e) => handleChange(e, "availability")}
								className="h-10"
							/>
							{errors?.["availability.message"] && (
								<p className="text-destructive">
									{errors["availability.message"]}
								</p>
							)}
						</label>

						<label className="space-y-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Email
							</span>
							<Input
								type="email"
								value={settings?.contact.email || ""}
								name="email"
								onChange={(e) => handleChange(e, "contact")}
								className="h-10"
							/>
							{errors?.["contact.email"] && (
								<p className="text-destructive">{errors["contact.email"]}</p>
							)}
						</label>

						<label className="space-y-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Phone
							</span>
							<Input
								value={settings?.contact.phone || ""}
								name="phone"
								onChange={(e) => handleChange(e, "contact")}
								className="h-10"
							/>
							{errors?.["contact.phone"] && (
								<p className="text-destructive">{errors["contact.phone"]}</p>
							)}
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								GitHub URL
							</span>
							<Input
								value={settings?.socialLinks.github || ""}
								name="github"
								onChange={(e) => handleChange(e, "socialLinks")}
								className="h-10"
							/>
							{errors?.["socialLinks.github"] && (
								<p className="text-destructive">
									{errors["socialLinks.github"]}
								</p>
							)}
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								LinkedIn URL
							</span>
							<Input
								value={settings?.socialLinks.linkedin || ""}
								name="linkedin"
								onChange={(e) => handleChange(e, "socialLinks")}
								className="h-10"
							/>
							{errors?.["socialLinks.linkendin"] && (
								<p className="text-destructive">
									{errors["socialLinks.linkendin"]}
								</p>
							)}
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Instagram URL
							</span>
							<Input
								value={settings?.socialLinks.instagram || ""}
								name="instagram"
								onChange={(e) => handleChange(e, "socialLinks")}
								className="h-10"
							/>
							{errors?.["socialLinks.instagram"] && (
								<p className="text-destructive">
									{errors["socialLinks.instagram"]}
								</p>
							)}
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Twitter URL
							</span>
							<Input
								value={settings?.socialLinks.twitter || ""}
								name="twitter"
								onChange={(e) => handleChange(e, "socialLinks")}
								className="h-10"
							/>
							{errors?.["socialLinks.twitter"] && (
								<p className="text-destructive">
									{errors["socialLinks.twitter"]}
								</p>
							)}
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Resume URL
							</span>
							<Input
								value={settings?.resume.url || ""}
								name="url"
								onChange={(e) => handleChange(e, "resume")}
								className="h-10"
							/>
							{errors?.["resume.url"] && (
								<p className="text-destructive">{errors["resume.url"]}</p>
							)}
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Website URL
							</span>
							<Input
								value={settings?.socialLinks.website || ""}
								name="website"
								onChange={(e) => handleChange(e, "socialLinks")}
								className="h-10"
							/>
							{errors?.["socialLinks.website"] && (
								<p className="text-destructive">
									{errors["socialLinks.website"]}
								</p>
							)}
						</label>

						<div className=" md:col-span-2 grid md:grid-cols-2 gap-5">
							{settings.typingTexts?.map((text, idx) => (
								<label key={idx} className="space-y-2">
									<span
										className="font-medium"
										style={{ color: "var(--foreground)" }}
									>
										Typing text {idx + 1}
									</span>
									<Input
										value={text || ""}
										onChange={(e) => handleTypingTexts(e.target.value, idx)}
										className="h-10"
									/>
								</label>
							))}
							{errors?.typingTexts && (
								<p className="text-destructive md:col-span-2">
									{errors.typingTexts}
								</p>
							)}
							<Button
								onClick={() => handleTypingTexts("", -1)}
								variant="outline"
								className="w-fit"
							>
								Add text
							</Button>
						</div>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Bio
							</span>
							<Textarea
								rows={5}
								name="bio"
								value={settings?.profile.bio || ""}
								onChange={(e) => handleChange(e, "profile")}
								className="h-32 resize-none"
							/>
							{errors?.["profile.bio"] && (
								<p className="text-destructive">{errors["profile.bio"]}</p>
							)}
						</label>
					</div>
				</form>
				<div className="space-y-6">
					<div
						className="glass rounded-2xl p-6"
						style={{ border: "1px solid var(--border)" }}
					>
						<div className="flex items-center gap-3 mb-5">
							{settings?.profile.avatar ? (
								<div className="w-10 h-10 overflow-hidden rounded-full relative">
									<Image
										src={settings.profile.avatar}
										alt="Avatar"
										fill
										sizes="100%"
										className="object-cover h-full w-full rounded-full"
									/>
								</div>
							) : (
								<div
									className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
									style={{
										background: "linear-gradient(135deg, #6366f1, #06b6d4)",
									}}
								>
									<UserRound className="h-5 w-5" />
								</div>
							)}

							<div>
								<p
									className="text-xs uppercase tracking-[0.18em]"
									style={{ color: "var(--muted-foreground)" }}
								>
									Preview
								</p>
								<h2
									className="font-display font-semibold text-xl"
									style={{ color: "var(--foreground)" }}
								>
									{settings?.profile.name}
								</h2>
							</div>
						</div>

						<div className="space-y-3">
							<p className="font-medium" style={{ color: "#6366f1" }}>
								{settings?.profile.title}
							</p>
							<p
								className="text-sm leading-relaxed"
								style={{ color: "var(--muted-foreground)" }}
							>
								{settings?.profile.tagline}
							</p>
							<div
								className="text-sm"
								style={{ color: "var(--muted-foreground)" }}
							>
								{settings?.contact.location}
							</div>
							<div
								className="text-sm"
								style={{ color: "var(--muted-foreground)" }}
							>
								{settings?.availability.message}
							</div>
							<div
								className="pt-3 text-sm space-y-1"
								style={{ color: "var(--foreground)" }}
							>
								<p>{settings?.contact.email}</p>
								<p>{settings?.contact.phone}</p>
								<p>{settings?.socialLinks.github}</p>
								<p>{settings?.socialLinks.linkedin}</p>
								<p>{settings?.socialLinks.twitter}</p>
								<p>{settings?.socialLinks.instagram}</p>
							</div>
						</div>
					</div>

					<div
						className="glass rounded-2xl p-6"
						style={{ border: "1px solid var(--border)" }}
					>
						<p
							className="text-xs uppercase tracking-[0.18em] mb-3"
							style={{ color: "var(--muted-foreground)" }}
						>
							About
						</p>
						<p
							className="text-sm leading-relaxed"
							style={{ color: "var(--muted-foreground)" }}
						>
							{settings?.profile.bio}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
