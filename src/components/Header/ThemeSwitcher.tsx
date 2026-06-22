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
		<div className="theme-switcher flex rounded-full gap-0.5 color-text-2 bg-surface-3 p-0.75">
			{THEMES.map((theme) => (
				<button
					key={theme}
					className={cn("rounded-full text-text-3 p-1.5", {
						"text-accent bg-surface": activeTheme === theme,
						"hover:text-text-2": activeTheme !== theme,
					})}
					title={`Switch to ${theme} theme`}
					onClick={() => themeSwitcher(theme)}
				>
					{ThemesIcons({ theme, p: { className: "w-3.5 h-3.5" } })}
				</button>
			))}
		</div>
	);
};

export default ThemeSwitcher;
