"use client";

import dynamic from "next/dynamic";
import { MENU_ITEMS } from "@src/helper/const";
import { LogoMark } from "@/src/assets/icons";
const ThemeSwitcher = dynamic(() => import("@src/components/Header/ThemeSwitcher"), {
	ssr: false,
	loading: () => <div style={{ width: "116px", height: "36px" }}></div>,
});

const Header = () => {
	return (
		<header className="w-full flex gap-5 justify-between items-center sticky top-0 z-[9999] p-4 xl:px-8 bg-background/80 backdrop-blur-sm border-b border-surface-3">
			<div className="logo flex gap-3 items-center">
				<LogoMark width={32} height={32} className="text-surface bg-accent rounded-lg" />
				<div className="logo-text w-116">Data to Canvas</div>
			</div>
			<div className="menu flex gap-5 items-center">
				{MENU_ITEMS.map((item) => (
					<a key={item.href} href={item.href} className="hover:underline">
						{item.label}
					</a>
				))}
			</div>
			<ThemeSwitcher />
		</header>
	);
};

export default Header;
