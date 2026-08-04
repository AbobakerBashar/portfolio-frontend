import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Abobaker Yagoub Bashar | Full-Stack JavaScript Developer",
	description:
		"Premium portfolio for Abobaker Yagoub Bashar, a full-stack JavaScript developer crafting modern, scalable web products.",
	keywords: [
		"full-stack developer",
		"Next.js",
		"TypeScript",
		"portfolio",
		"web development",
	],
	metadataBase: new URL("https://abobaker.dev"),
	openGraph: {
		title: "Abobaker Yagoub Bashar | Full-Stack JavaScript Developer",
		description:
			"Explore my work spanning full-stack product engineering, modern frontend systems, and high-performance backend architecture.",
		url: "https://abobaker.dev",
		siteName: "Abobaker Portfolio",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="min-h-full">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
