"use client";

import dynamic from "next/dynamic";

import { cn } from "@/src/helper";

import { LogoMark } from "@/src/assets/icons";
import { Menu, MenuMobile } from "@/src/components/Header/Menu";

const ThemeSwitcher = dynamic(() => import("@src/components/Header/ThemeSwitcher"), {
	ssr: false,
	loading: () => <div style={{ width: "88px", height: "32px" }}></div>,
});

const Header = () => {
	return (
		<header
			className={cn(
				"w-full flex gap-5 justify-between items-center sticky top-0 z-[9999] p-5 xl:px-10 bg-background/80 backdrop-blur-sm border-b border-border text-sm"
			)}
		>
			<div className="flex gap-2.5 items-center">
				<LogoMark width={26} height={26} className="text-surface bg-accent rounded-md" />
				<div className="font-bold text-[16px]">DataToCanvas</div>
			</div>
			<Menu />
			<ThemeSwitcher />
			<MenuMobile />
		</header>
	);
};

export default Header;
