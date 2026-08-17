"use client";

import AuthImage from "@/components/AuthImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/use-auth";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<Record<string, string> | null>(null);

	const { mutateAsync: registerUser, isPending: isSubmitting } = useRegister();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrors(null);
		if (isSubmitting) return;

		if (!email.trim() || !password.trim() || !name.trim())
			return setErrors({
				error: "Please provide all fields",
			});

		const res = await registerUser({
			email: email.trim(),
			password: password.trim(),
			name: name.trim(),
		});

		if (res?.success) {
			router.replace("/dashboard");
		} else {
			if (res?.errors) setErrors(res.errors);
			else if (res?.message)
				setErrors({
					error: res?.message,
				});
			else setErrors({ error: "Registration failed" });
		}
	};

	return (
		<section className="grid md:grid-cols-2 min-h-screen">
			<AuthImage />
			<div className="p-8 bg-card">
				<h1 className="font-display font-bold text-2xl text-foreground">
					Create account
				</h1>
				<p className="text-sm mt-1 mb-8 text-muted-foreground">
					Create a new account to manage your portfolio.
				</p>

				<form className="p-4 md:p-8 border rounded-2xl" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<Label htmlFor="name" className="space-y-1 text-sm">
							<span>Full name</span>
						</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>{" "}
						{errors?.name && <p className="text-destructive">{errors?.name}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="email" className="space-y-1 text-sm mt-3">
							<span>Email</span>
						</Label>
						<Input
							value={email}
							id="email"
							onChange={(e) => setEmail(e.target.value)}
						/>{" "}
						{errors?.email && (
							<p className="text-destructive">{errors?.email}</p>
						)}
					</div>
					<div className="space-y-2 mt-3">
						<Label htmlFor="password" className="space-y-1 text-sm">
							<p>Password</p>{" "}
						</Label>
						<Input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{errors?.password && (
							<p className="text-destructive">{errors?.password}</p>
						)}
					</div>
					{errors?.error && (
						<p className="text-destructive my-2">{errors?.error}</p>
					)}
					<div className="flex items-center justify-between mt-8">
						<Button
							type="submit"
							disabled={isSubmitting}
							className="inline-flex items-center gap-2 cursor-pointer text-white px-6"
						>
							{isSubmitting ? (
								<Loader className="w-4 h-4 animate-spin" />
							) : (
								"Create account"
							)}
						</Button>
						<Link
							href="/auth/login"
							className="text-sm"
							style={{ color: "#6366f1" }}
						>
							Sign in
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
}
