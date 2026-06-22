"use client";

import dynamic from "next/dynamic";
import { cn } from "@/src/helper";
import { MENU_ITEMS } from "@src/helper/const";
import { LogoMark } from "@/src/assets/icons";
const ThemeSwitcher = dynamic(() => import("@src/components/Header/ThemeSwitcher"), {
	ssr: false,
	loading: () => <div style={{ width: "116px", height: "36px" }}></div>,
});

const Header = () => {
	return (
		<header
			className={cn(
				"w-full flex gap-5 justify-between items-center sticky top-0 z-[9999] p-5 xl:px-10 bg-background/80 backdrop-blur-sm border-b border-border text-sm"
			)}
		>
			<div className="logo flex gap-2.5 items-center">
				<LogoMark width={26} height={26} className="text-surface bg-accent rounded-md" />
				<div className="logo-text font-bold text-[16px]">DataToCanvas</div>
			</div>
			<div className="menu flex gap-5 items-center text-text-2">
				{MENU_ITEMS.map((item) => (
					<a key={item.href} href={item.href} className={cn("hover:text-text")}>
						{item.label}
					</a>
				))}
			</div>
			<ThemeSwitcher />
		</header>
	);
};

export default Header;
