"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";

import { THEME_COLORS } from "@src/helper/const";

const getLogoSvg = (color: string, background: string) => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="32" height="32" fill="none">
        <rect width="16" height="16" rx="3" fill="${background}" />
        
        <rect x="2" y="9" width="2.5" height="5" rx="0.6" fill="${color}" />
        <rect x="6.75" y="5" width="2.5" height="9" rx="0.6" fill="${color}" opacity="0.8" />
        <rect x="11.5" y="2" width="2.5" height="12" rx="0.6" fill="${color}" opacity="0.55" />
    </svg>
`;

export function FaviconManager() {
	const { resolvedTheme: activeColor = "light" } = useTheme();

	useEffect(() => {
		let link: HTMLLinkElement = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
		if (!link) {
			link = document.createElement("link");
			link.rel = "icon";
			document.head.appendChild(link);
		}

		link.type = "image/svg+xml";

		const svgString = getLogoSvg(THEME_COLORS[activeColor].accent, THEME_COLORS[activeColor].background);

		link.href = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
	}, [activeColor]);

	return null;
}
