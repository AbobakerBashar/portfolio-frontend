"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Logo({ className = "" }: { className?: string }) {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = mounted && resolvedTheme === "dark";

	const textColor = isDark ? "#e2e8f0" : "#1e293b";
	const taglineColor = isDark ? "#94a3b8" : "#64748b";

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 400 120"
			className={className}
			width="400"
			height="120"
		>
			<defs>
				<linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#6366f1" />
					<stop offset="100%" stopColor="#06b6d4" />
				</linearGradient>
			</defs>

			{/* Icon Circle */}
			<rect
				x="0"
				y="10"
				width="100"
				height="100"
				rx="24"
				fill="url(#brandGradient)"
			/>

			{/* Initials "AB" */}
			<text
				x="50"
				y="78"
				fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
				fontSize="42"
				fontWeight="700"
				fill="white"
				textAnchor="middle"
				letterSpacing="-2"
			>
				AB
			</text>

			<circle cx="78" cy="28" r="6" fill="#06b6d4" opacity="0.6" />

			{/* Name: Abobaker */}
			<text
				x="120"
				y="52"
				fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
				fontSize="32"
				fontWeight="300"
				fill={textColor}
				letterSpacing="-0.5"
			>
				Abobaker
			</text>

			{/* Last Name: Yagoub Bashar */}
			<text
				x="120"
				y="82"
				fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
				fontSize="32"
				fontWeight="700"
				fill="url(#brandGradient)"
				letterSpacing="-0.5"
			>
				Yagoub Bashar
			</text>

			{/* Title */}
			<text
				x="120"
				y="105"
				fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
				fontSize="12"
				fontWeight="500"
				fill={taglineColor}
				letterSpacing="2"
			>
				SOFTWARE ENGINEER
			</text>
		</svg>
	);
}
