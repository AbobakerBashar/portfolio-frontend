import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	actionLabel: string;
	onAdd: () => void;
	children: React.ReactNode;
	deleteError?: string;
};

export default function EditorSection({
	title,
	description,
	icon: Icon,
	actionLabel,
	onAdd,
	children,
	deleteError,
}: Props) {
	return (
		<section className="space-y-4">
			<div>
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<div className="flex items-center gap-2 mb-1">
							<Icon className="h-4 w-4 text-[#6366f1]" />
							<h2
								className="font-display font-semibold text-xl"
								style={{ color: "var(--foreground)" }}
							>
								{title}
							</h2>
						</div>
						<p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
							{description}
						</p>
					</div>
					<Button
						type="button"
						onClick={onAdd}
						className="gap-2 text-white self-start"
						style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)" }}
					>
						<Plus className="h-4 w-4" />
						{actionLabel}
					</Button>
				</div>
				{deleteError && (
					<span className="text-xs text-red-500">{deleteError}</span>
				)}
				{children}
			</div>
		</section>
	);
}
