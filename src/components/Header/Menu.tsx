"use client";
import { useState } from "react";

import { cn } from "@/src/helper";

import { MENU_ITEMS } from "@src/helper/const";

const MenuItems = () => {
	return MENU_ITEMS.map((item) => (
		<a key={item.href} href={item.href} className={cn("hover:text-text")}>
			{item.label}
		</a>
	));
};
export const Menu = () => {
	return (
		<div className="hidden md:flex gap-5 items-center text-text-2">
			<MenuItems />
		</div>
	);
};

export const MenuMobile = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex md:hidden gap-5 items-center text-text-2">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					"w-8 h-8 flex justify-center items-center rounded-md hover:bg-accent/20 transition-colors",
					isOpen && "bg-accent/20"
				)}
			>
				<span className="sr-only">Menu</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-5 h-5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
			{isOpen && (
				<div className="absolute top-16 right-5 bg-background border border-border rounded-md p-4 flex flex-col gap-2">
					<MenuItems />
				</div>
			)}
		</div>
	);
};
