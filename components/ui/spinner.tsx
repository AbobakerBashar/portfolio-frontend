"use client";

import { Loader } from "lucide-react";
import React from "react";

type SpinnerProps = {
	size?: number; // pixels
	className?: string;
	label?: string;
};

export default function Spinner({
	size = 20,
	className = "",
	label,
}: SpinnerProps) {
	return (
		<div className={`flex items-center gap-2 ${className}`} role="status">
			<Loader size={size} className="animate-spin text-primary" />
			{label ? (
				<span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
					{label}
				</span>
			) : null}
			<style jsx>{`
				.animate-spin-origin {
					animation: spinner-rotate 0.9s linear infinite;
				}
				@keyframes spinner-rotate {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
			`}</style>
		</div>
	);
}
