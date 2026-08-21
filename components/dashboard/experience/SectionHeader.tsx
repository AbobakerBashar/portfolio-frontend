import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type SectionHeaderProps = {
	label: string;
	badge: string;
	color: string;
	isDeleting?: boolean;
	children?: React.ReactNode;
	setDeletingId?: () => void;
	onDelete: () => void;
};

function SectionHeader({
	label,
	badge,
	color,
	onDelete,
	children,
	isDeleting,
	setDeletingId,
}: SectionHeaderProps) {
	const [confirmDelete, setConfirmDelete] = useState(false);

	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
			<div>
				<div className="flex items-center gap-2 mb-1.5">
					<span
						className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md"
						style={{ background: `${color}15`, color }}
					>
						{badge}
					</span>
				</div>
				<h3
					className="font-display font-semibold text-lg"
					style={{ color: "var(--foreground)" }}
				>
					{label}
				</h3>
			</div>
			<div className="flex items-center gap-3">
				{children}
				{!confirmDelete ? (
					<Button
						type="button"
						variant="destructive"
						onClick={() => {
							setDeletingId?.();
							setConfirmDelete(true);
						}}
						className="cursor-pointer"
					>
						<Trash2 className="h-4 w-4" />
						Delete
					</Button>
				) : (
					<Button
						type="button"
						variant="destructive"
						onClick={onDelete}
						className="cursor-pointer"
					>
						{isDeleting ? "Deleting" : "Are you sure?"}
					</Button>
				)}
			</div>
		</div>
	);
}

export default SectionHeader;
