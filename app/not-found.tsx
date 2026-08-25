"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-linear-to-b from-background to-background/95 flex items-center justify-center px-4 py-8">
			<div className="max-w-md w-full space-y-8 text-center">
				{/* 404 Number */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="space-y-4"
				>
					<h1 className="text-9xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
						404
					</h1>
					<p className="text-3xl font-bold text-foreground">Page Not Found</p>
				</motion.div>

				{/* Description */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="space-y-3"
				>
					<p className="text-muted-foreground text-lg">
						Oops! The page you&apos;re looking for doesn&apos;t exist or has
						been moved.
					</p>
					<p className="text-sm text-muted-foreground">
						Let me help you find what you&apos;re looking for.
					</p>
				</motion.div>

				{/* Action Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
				>
					<Link
						href="/"
						className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
					>
						Go Home
					</Link>
					<Link
						href="/#about"
						className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-card transition-colors duration-200"
					>
						View Portfolio
					</Link>
				</motion.div>

				{/* Navigation Links */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="space-y-2 pt-4"
				>
					<p className="text-sm text-muted-foreground mb-4">Quick Links</p>
					<div className="flex flex-col gap-2">
						<Link
							href="/#projects"
							className="text-muted-foreground hover:text-primary/80 transition-colors text-sm"
						>
							Projects
						</Link>
						<Link
							href="/#contact"
							className="text-muted-foreground hover:text-primary/80 transition-colors text-sm"
						>
							Contact
						</Link>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
