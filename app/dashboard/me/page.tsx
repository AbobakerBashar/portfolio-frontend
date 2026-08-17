"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Save, UserRound } from "lucide-react";
import {
	DEFAULT_PROFILE,
	loadProfile,
	saveProfile,
	type DashboardProfile,
} from "@/lib/profile";

const inputClass =
	"w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-all bg-transparent";

export default function MePage() {
	const [profile, setProfile] = useState<DashboardProfile>(loadProfile());
	const [saved, setSaved] = useState(false);

	const handleChange = (key: keyof DashboardProfile, value: string) => {
		setProfile((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const next = saveProfile(profile);
		setProfile(next);
		setSaved(true);
		window.setTimeout(() => setSaved(false), 2000);
	};

	const resetProfile = () => {
		const next = saveProfile(DEFAULT_PROFILE);
		setProfile(next);
		setSaved(true);
		window.setTimeout(() => setSaved(false), 2000);
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
						form="profile-form"
						className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
						style={{
							background: "linear-gradient(135deg, #6366f1, #06b6d4)",
						}}
					>
						<Save className="h-4 w-4" />
						Save changes
					</button>
				</div>
			</div>

			<div className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
				<form
					id="profile-form"
					onSubmit={handleSubmit}
					className="space-y-6 glass rounded-2xl p-6 md:p-8"
					style={{ border: "1px solid var(--border)" }}
				>
					<div className="grid gap-5 md:grid-cols-2">
						<label className="space-y-2 text-sm md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Full name
							</span>
							<input
								value={profile.fullName}
								onChange={(e) => handleChange("fullName", e.target.value)}
								className={inputClass}
								style={{
									borderColor: "var(--border)",
									color: "var(--foreground)",
								}}
							/>
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Professional title
							</span>
							<input
								value={profile.title}
								onChange={(e) => handleChange("title", e.target.value)}
								className={inputClass}
								style={{
									borderColor: "var(--border)",
									color: "var(--foreground)",
								}}
							/>
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Tagline
							</span>
							<input
								value={profile.tagline}
								onChange={(e) => handleChange("tagline", e.target.value)}
								className={inputClass}
								style={{
									borderColor: "var(--border)",
									color: "var(--foreground)",
								}}
							/>
						</label>

						<label className="space-y-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Location
							</span>
							<input
								value={profile.location}
								onChange={(e) => handleChange("location", e.target.value)}
								className={inputClass}
								style={{
									borderColor: "var(--border)",
									color: "var(--foreground)",
								}}
							/>
						</label>

						<label className="space-y-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Availability
							</span>
							<input
								value={profile.availability}
								onChange={(e) => handleChange("availability", e.target.value)}
								className={inputClass}
								style={{
									borderColor: "var(--border)",
									color: "var(--foreground)",
								}}
							/>
						</label>

						<label className="space-y-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Email
							</span>
							<input
								type="email"
								value={profile.email}
								onChange={(e) => handleChange("email", e.target.value)}
								className={inputClass}
								style={{
									borderColor: "var(--border)",
									color: "var(--foreground)",
								}}
							/>
						</label>

						<label className="space-y-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Phone
							</span>
							<input
								value={profile.phone}
								onChange={(e) => handleChange("phone", e.target.value)}
								className={inputClass}
								style={{
									borderColor: "var(--border)",
									color: "var(--foreground)",
								}}
							/>
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								GitHub URL
							</span>
							<input
								value={profile.github}
								onChange={(e) => handleChange("github", e.target.value)}
								className={inputClass}
								style={{
									borderColor: "var(--border)",
									color: "var(--foreground)",
								}}
							/>
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								LinkedIn URL
							</span>
							<input
								value={profile.linkedin}
								onChange={(e) => handleChange("linkedin", e.target.value)}
								className={inputClass}
								style={{
									borderColor: "var(--border)",
									color: "var(--foreground)",
								}}
							/>
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Website URL
							</span>
							<input
								value={profile.website}
								onChange={(e) => handleChange("website", e.target.value)}
								className={inputClass}
								style={{
									borderColor: "var(--border)",
									color: "var(--foreground)",
								}}
							/>
						</label>

						<label className="space-y-2 md:col-span-2">
							<span
								className="font-medium"
								style={{ color: "var(--foreground)" }}
							>
								Bio
							</span>
							<textarea
								rows={5}
								value={profile.bio}
								onChange={(e) => handleChange("bio", e.target.value)}
								className={inputClass}
								style={{
									borderColor: "var(--border)",
									color: "var(--foreground)",
									resize: "vertical",
								}}
							/>
						</label>
					</div>
				</form>

				<div className="space-y-6">
					<div
						className="glass rounded-2xl p-6"
						style={{ border: "1px solid var(--border)" }}
					>
						<div className="flex items-center gap-3 mb-5">
							<div
								className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
								style={{
									background: "linear-gradient(135deg, #6366f1, #06b6d4)",
								}}
							>
								<UserRound className="h-5 w-5" />
							</div>
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
									{profile.fullName}
								</h2>
							</div>
						</div>

						<div className="space-y-3">
							<p className="font-medium" style={{ color: "#6366f1" }}>
								{profile.title}
							</p>
							<p
								className="text-sm leading-relaxed"
								style={{ color: "var(--muted-foreground)" }}
							>
								{profile.tagline}
							</p>
							<div
								className="text-sm"
								style={{ color: "var(--muted-foreground)" }}
							>
								{profile.location}
							</div>
							<div
								className="text-sm"
								style={{ color: "var(--muted-foreground)" }}
							>
								{profile.availability}
							</div>
							<div
								className="pt-3 text-sm space-y-1"
								style={{ color: "var(--foreground)" }}
							>
								<div>{profile.email}</div>
								<div>{profile.phone}</div>
								<div>{profile.github}</div>
								<div>{profile.linkedin}</div>
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
							{profile.bio}
						</p>
					</div>
				</div>
			</div>

			{saved && (
				<div
					className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium"
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
	);
}
