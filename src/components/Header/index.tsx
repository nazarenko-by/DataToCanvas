"use client";

import dynamic from "next/dynamic";
import { MENU_ITEMS } from "@src/helper/const";
const ThemeSwitcher = dynamic(() => import("@src/components/Header/ThemeSwitcher"), { ssr: false });

const Header = () => {
	return (
		<header className="flex gap-10 sticky top-0 z-[9999] p-4 xl:px-8 bg-background/80 backdrop-blur-sm">
			<div className="logo">Data to Canvas</div>
			<ThemeSwitcher />
			<div className="menu flex gap-5">
				{MENU_ITEMS.map((item) => (
					<a key={item.href} href={item.href} className="hover:underline">
						{item.label}
					</a>
				))}
			</div>
		</header>
	);
};

export default Header;
