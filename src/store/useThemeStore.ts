import { create } from "zustand";

interface ThemeState {
	themeMode: string;
	setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
	themeMode: "light",
	setTheme: (theme) => set({ themeMode: theme }),
}));
