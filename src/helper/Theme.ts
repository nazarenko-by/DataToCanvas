import { SVGProps } from "react";
import { IconSun, IconMoon, IconCup } from "@src/assets/icons";

type IconProps = SVGProps<SVGSVGElement>;

export const ThemesIcons = ({ theme, p }: { theme: string; p: IconProps }) => {
	if (theme === "light") return IconSun(p);
	if (theme === "dark") return IconMoon(p);
	if (theme === "cream") return IconCup(p);
	return null;
};
