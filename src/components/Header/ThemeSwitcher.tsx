"use client";

import { useTheme } from "next-themes";
import { clsx } from "clsx";

import { THEMES } from "@src/helper/const";
import { ThemesIcons } from "@src/helper/Theme";

const ThemeSwitcher = () => {
	const { resolvedTheme: activeTheme, setTheme } = useTheme();
	const themeSwitcher = (theme: string) => {
		setTheme(theme);
	};
	return (
		<div className="theme-switcher flex br-10px gap-5 ml-auto color-text-3 bg-surface-3 p-2">
			{THEMES.map((theme) => (
				<button
					key={theme}
					className={clsx("rounded-full hover:color-on-accent", { "color-accent": activeTheme === theme })}
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
