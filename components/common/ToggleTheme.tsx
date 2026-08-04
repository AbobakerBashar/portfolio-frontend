import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ToggleTheme = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, systemTheme } = useTheme();

	const resolvedTheme = theme === "system" ? systemTheme : theme;
	const isDark = resolvedTheme === "dark";

	useEffect(() => {
		const mount = () => setMounted(true);
		mount();
	}, []);

	if (!mounted) return null;

	return (
		<button
			onClick={() => setTheme(isDark ? "light" : "dark")}
			className="p-2 rounded-xl transition-all duration-200 hover:bg-white/5"
			style={{ color: "var(--muted-foreground)" }}
			aria-label="Toggle theme"
		>
			{isDark ? (
				<SunMedium className="h-4 w-4" />
			) : (
				<Moon className="h-4 w-4" />
			)}
		</button>
	);
};

export default ToggleTheme;
