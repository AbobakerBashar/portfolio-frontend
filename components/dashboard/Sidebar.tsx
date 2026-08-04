"use client";

import { FolderKanban, LayoutDashboard, Menu, Plus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ToggleTheme from "@/components/common/ToggleTheme";

const NAV_ITEMS = [
	{ href: "/dashboard", label: "Overview", icon: LayoutDashboard },
	{ href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
	{ href: "/dashboard/projects/new", label: "Add Project", icon: Plus },
];

export default function Sidebar() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Mobile top bar */}
			<div className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-14 glass border-b border-border">
				<div className="flex items-center gap-2">
					<button
						onClick={() => setOpen((o) => !o)}
						className="p-2 rounded-lg hover:bg-white/5"
						style={{ color: "var(--muted-foreground)" }}
						aria-label="Toggle menu"
					>
						{open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
					</button>
					<Link
						href="/dashboard"
						className="font-display font-semibold text-sm"
						style={{ color: "var(--foreground)" }}
					>
						Dashboard
					</Link>
				</div>
				<ToggleTheme />
			</div>

			{/* Mobile drawer */}
			{open && (
				<div className="lg:hidden fixed inset-0 z-30 pt-14">
					<div
						className="absolute inset-0"
						style={{ background: "rgba(0,0,0,0.5)" }}
						onClick={() => setOpen(false)}
					/>
					<aside className="relative w-64 h-full glass border-r border-border p-4">
						<NavList pathname={pathname} onNavigate={() => setOpen(false)} />
					</aside>
				</div>
			)}

			{/* Desktop sidebar */}
			<aside className="hidden lg:flex fixed top-0 bottom-0 left-0 w-64 flex-col glass border-r border-border z-40">
				<div className="flex items-center gap-2 px-5 h-16 border-b border-border">
					<div
						className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold font-display"
						style={{
							background: "linear-gradient(135deg, #6366f1, #06b6d4)",
						}}
					>
						A
					</div>
					<span
						className="font-display font-semibold text-sm"
						style={{ color: "var(--foreground)" }}
					>
						Abobaker<span style={{ color: "#6366f1" }}>.</span>dev
					</span>
				</div>
				<div className="flex-1 overflow-y-auto p-4">
					<NavList pathname={pathname} />
				</div>
				<div className="p-4 border-t border-border">
					<Link
						href="/"
						className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							width="16"
							height="16"
						>
							<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
							<polyline points="9 22 9 12 15 12 15 22" />
						</svg>
						Back to site
					</Link>
				</div>
			</aside>
		</>
	);
}

function NavList({
	pathname,
	onNavigate,
}: {
	pathname: string;
	onNavigate?: () => void;
}) {
	return (
		<nav className="space-y-1">
			{NAV_ITEMS.map((item) => {
				const active =
					item.href === "/dashboard"
						? pathname === item.href
						: pathname.startsWith(item.href);
				return (
					<Link
						key={item.href}
						href={item.href}
						onClick={onNavigate}
						className={cn(
							"flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
							active
								? "text-white"
								: "text-muted-foreground hover:text-foreground hover:bg-white/5",
						)}
						style={
							active
								? {
										background: "linear-gradient(135deg, #6366f1, #06b6d4)",
									}
								: undefined
						}
					>
						<item.icon className="h-4 w-4" />
						{item.label}
					</Link>
				);
			})}
		</nav>
	);
}
