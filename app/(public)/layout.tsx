import CustomCursor from "@/components/common/CustomCursor";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import type { Metadata } from "next";

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
		<main className="public min-h-full">
			<LoadingScreen />
			<CustomCursor />
			<Navbar />
			{children}
			<Footer />
		</main>
	);
}
