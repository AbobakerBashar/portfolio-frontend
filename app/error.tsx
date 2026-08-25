"use client";

import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log error details for debugging
		console.error("Application Error:", error);
	}, [error]);

	return (
		<div className="min-h-screen bg-lineare-to-b from-background to-background/95 flex items-center justify-center px-4 py-8">
			<div className="max-w-md w-full space-y-8 text-center">
				{/* Error Icon */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="flex justify-center"
				>
					<div className="p-4 rounded-full bg-destructive/10 border border-destructive/20">
						<AlertCircle className="w-12 h-12 text-destructive" />
					</div>
				</motion.div>

				{/* Error Message */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="space-y-4"
				>
					<h1 className="text-3xl font-bold text-foreground">
						Something Went Wrong
					</h1>
					<p className="text-muted-foreground text-lg">
						We encountered an unexpected error. Our team has been notified and
						were working to fix it.
					</p>
				</motion.div>

				{/* Error Details (in development only) */}
				{process.env.NODE_ENV === "development" && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="p-4 bg-card border border-border rounded-lg text-left"
					>
						<p className="text-xs text-muted-foreground font-mono wrap-break">
							{error.message || "An unknown error occurred"}
						</p>
						{error.digest && (
							<p className="text-xs text-muted-foreground mt-2">
								Error ID: {error.digest}
							</p>
						)}
					</motion.div>
				)}

				{/* Action Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="flex flex-col gap-4 pt-8"
				>
					<button
						onClick={() => reset()}
						className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
					>
						<RefreshCw className="w-4 h-4" />
						Try Again
					</button>
					<Link
						href="/"
						className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-card transition-colors duration-200"
					>
						Go Home
					</Link>
				</motion.div>

				{/* Support Link */}
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					className="text-sm text-muted-foreground pt-4"
				>
					If this problem persists, please{" "}
					<Link
						href="/#contact"
						className="text-accent hover:text-accent/80 transition-colors"
					>
						contact support
					</Link>
				</motion.p>
			</div>
		</div>
	);
}
