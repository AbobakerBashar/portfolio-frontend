import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen">
			<Sidebar />
			<main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen">
				<div className="max-w-6xl mx-auto p-4 md:p-8">{children}</div>
			</main>
		</div>
	);
}
