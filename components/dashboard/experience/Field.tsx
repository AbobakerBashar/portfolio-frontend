import React from "react";

function Field({
	label,
	children,
	className,
}: {
	label: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<label className={`space-y-1.5 relative ${className || ""}`}>
			<span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
				{label}
			</span>
			{children}
		</label>
	);
}

export default Field;
