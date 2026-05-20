export const THEMES: string[] = ["light", "dark", "cream"];
export const THEME_COLORS: { [key: string]: { background: string; accent: string; hover: string; text: string } } = {
	light: {
		background: "#f6f8fb",
		accent: "#0d9488",
		hover: "#0d948985",
		text: "#0a0e14",
	},
	dark: {
		background: "#0a0e14",
		accent: "#5eead4",
		hover: "#5eead485",
		text: "#e6edf6",
	},
	cream: {
		background: "#f5efe1",
		accent: "#b45309",
		hover: "#b4530985",
		text: "#2c2415",
	},
};
