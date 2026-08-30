import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BellRing, KeyRound, Mail, ShieldCheck, UserPlus } from "lucide-react";

export default function SettingsPage() {
	return (
		<div className="space-y-8">
			<div>
				<h1
					className="font-display font-bold text-2xl md:text-3xl"
					style={{ color: "var(--foreground)" }}
				>
					Settings
				</h1>
				<p
					className="text-sm mt-1"
					style={{ color: "var(--muted-foreground)" }}
				>
					Manage notifications, security, and admin access.
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<section
					className="glass rounded-2xl p-6 md:p-8"
					style={{ border: "1px solid var(--border)" }}
				>
					<div className="flex items-center gap-3 mb-5">
						<div
							className="h-10 w-10 rounded-xl flex items-center justify-center"
							style={{ background: "rgba(99,102,241,0.12)", color: "#6366f1" }}
						>
							<BellRing className="h-5 w-5" />
						</div>
						<div>
							<h2
								className="font-display font-semibold text-lg"
								style={{ color: "var(--foreground)" }}
							>
								Notifications
							</h2>
							<p
								className="text-xs"
								style={{ color: "var(--muted-foreground)" }}
							>
								Choose what updates admins should receive.
							</p>
						</div>
					</div>

					<div className="space-y-4">
						<NotificationItem
							title="New contact messages"
							description="Get notified when visitors send messages from the site."
							defaultChecked
						/>
						<NotificationItem
							title="Project status reminders"
							description="Weekly reminder to review and update your portfolio projects."
							defaultChecked
						/>
						<NotificationItem
							title="Security alerts"
							description="Critical alerts for login attempts and account updates."
							defaultChecked
						/>
					</div>

					<div className="mt-6 flex justify-end">
						<Button type="button" className="px-4">
							Save Preferences
						</Button>
					</div>
				</section>

				<section
					className="glass rounded-2xl p-6 md:p-8"
					style={{ border: "1px solid var(--border)" }}
				>
					<div className="flex items-center gap-3 mb-5">
						<div
							className="h-10 w-10 rounded-xl flex items-center justify-center"
							style={{ background: "rgba(6,182,212,0.14)", color: "#0891b2" }}
						>
							<ShieldCheck className="h-5 w-5" />
						</div>
						<div>
							<h2
								className="font-display font-semibold text-lg"
								style={{ color: "var(--foreground)" }}
							>
								Account Security
							</h2>
							<p
								className="text-xs"
								style={{ color: "var(--muted-foreground)" }}
							>
								Update login email and password.
							</p>
						</div>
					</div>

					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="account-email" className="gap-1.5">
								<Mail className="h-3.5 w-3.5" />
								Account Email
							</Label>
							<Input
								id="account-email"
								type="email"
								placeholder="admin@example.com"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="current-password" className="gap-1.5">
								<KeyRound className="h-3.5 w-3.5" />
								Current Password
							</Label>
							<Input
								id="current-password"
								type="password"
								placeholder="Enter current password"
							/>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="new-password">New Password</Label>
								<Input
									id="new-password"
									type="password"
									placeholder="At least 8 characters"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirm-password">Confirm Password</Label>
								<Input
									id="confirm-password"
									type="password"
									placeholder="Repeat new password"
								/>
							</div>
						</div>
					</div>

					<div className="mt-6 flex justify-end">
						<Button type="button" className="px-4">
							Update Account
						</Button>
					</div>
				</section>
			</div>

			<section
				className="glass rounded-2xl p-6 md:p-8"
				style={{ border: "1px solid var(--border)" }}
			>
				<div className="flex items-center gap-3 mb-5">
					<div
						className="h-10 w-10 rounded-xl flex items-center justify-center"
						style={{ background: "rgba(34,197,94,0.14)", color: "#16a34a" }}
					>
						<UserPlus className="h-5 w-5" />
					</div>
					<div>
						<h2
							className="font-display font-semibold text-lg"
							style={{ color: "var(--foreground)" }}
						>
							Add New Admin
						</h2>
						<p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
							Invite another admin with dashboard access.
						</p>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-3">
					<div className="space-y-2">
						<Label htmlFor="admin-name">Full Name</Label>
						<Input id="admin-name" type="text" placeholder="Jane Doe" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="admin-email">Email Address</Label>
						<Input
							id="admin-email"
							type="email"
							placeholder="jane@example.com"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="admin-role">Role</Label>
						<Input id="admin-role" type="text" value="Admin" readOnly />
					</div>
				</div>

				<div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
					<p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
						This UI is ready for backend integration to send invitations.
					</p>
					<Button type="button" className="px-4">
						Send Invite
					</Button>
				</div>
			</section>
		</div>
	);
}

function NotificationItem({
	title,
	description,
	defaultChecked = false,
}: {
	title: string;
	description: string;
	defaultChecked?: boolean;
}) {
	return (
		<div
			className="rounded-xl px-4 py-3 flex items-start justify-between gap-3"
			style={{ background: "var(--muted)" }}
		>
			<div>
				<p
					className="text-sm font-semibold"
					style={{ color: "var(--foreground)" }}
				>
					{title}
				</p>
				<p
					className="text-xs mt-1"
					style={{ color: "var(--muted-foreground)" }}
				>
					{description}
				</p>
			</div>
			<Switch defaultChecked={defaultChecked} aria-label={title} />
		</div>
	);
}
