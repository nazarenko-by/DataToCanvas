"use client";

import { useTheme } from "next-themes";

import { cn } from "@/src/helper";
import { THEMES } from "@src/helper/const";
import { ThemesIcons } from "@src/helper/Theme";

const ThemeSwitcher = () => {
	const { resolvedTheme: activeTheme, setTheme } = useTheme();
	const themeSwitcher = (theme: string) => {
		setTheme(theme);
	};
	return (
		<div className="theme-switcher flex rounded-full gap-5 color-text-3 bg-surface-3 p-2">
			{THEMES.map((theme) => (
				<button
					key={theme}
					className={cn("rounded-full hover:text-text-2", { "text-accent": activeTheme === theme })}
					title={`Switch to ${theme} theme`}
					onClick={() => themeSwitcher(theme)}
				>
					{ThemesIcons({ theme, p: { className: "w-5 h-5" } })}
				</button>
			))}
		</div>
	);
};

export default ThemeSwitcher;
