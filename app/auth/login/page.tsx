"use client";

import AuthImage from "@/components/AuthImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/use-auth";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<Record<string, string> | null>(null);

	const { mutateAsync: login, isPending: isLoggingIn } = useLogin();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (isLoggingIn) return;

		setErrors(null);
		if (!email.trim() || !password)
			return setErrors({
				error: "Please fill all fields",
			});

		const res = await login({ email: email.trim(), password });

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
					Sign in
				</h1>
				<p className="text-sm mt-1 mb-8 text-muted-foreground">
					Sign in to manage your portfolio.
				</p>

				<form className="p-4 md:p-8 border rounded-2xl" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<Label htmlFor="email" className="space-y-1 text-sm mt-3">
							<span>Email</span>
						</Label>
						<Input
							value={email}
							id="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
						{errors?.email && (
							<p className="text-destructive">{errors.email}</p>
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
							<p className="text-destructive">{errors.password}</p>
						)}
					</div>

					{errors?.error && (
						<p className="text-destructive my-2">{errors.error}</p>
					)}

					<div className="flex items-center justify-between mt-8">
						<Button
							type="submit"
							disabled={isLoggingIn}
							className="inline-flex items-center gap-2 cursor-pointer text-white px-6"
						>
							{isLoggingIn ? (
								<Loader className="w-4 h-4 animate-spin" />
							) : (
								"Login"
							)}
						</Button>
						<Link
							href="/auth/register"
							className="text-sm"
							style={{ color: "#6366f1" }}
						>
							Sign up
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
}
