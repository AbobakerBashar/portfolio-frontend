import { Loader, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
	const { mutateAsync: logout, isPending } = useLogout();
	const router = useRouter();

	const handleLogout = async () => {
		const res = await logout();
		if (res.success) router.replace("/auth/login");
	};
	return (
		<Button
			onClick={handleLogout}
			variant="destructive"
			className="w-full cursor-pointer justify-start"
		>
			{isPending ? (
				<Loader className="w-4 h-4 animate-spin" />
			) : (
				<>
					<LogOut className="w-4 h-4" />
					Logout
				</>
			)}
		</Button>
	);
};

export default LogoutButton;
