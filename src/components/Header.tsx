const menuItems = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "About",
		href: "/about",
	},
];

const Header = () => {
	return (
		<header className="flex sticky top-0 z-[9999] p-4 xl:px-8 bg-background/80 backdrop-blur-sm">
			<div className="logo">Data to Canvas</div>
			<div className="menu flex gap-5 ml-auto">
				{menuItems.map((item) => (
					<a key={item.href} href={item.href} className="hover:underline">
						{item.label}
					</a>
				))}
			</div>
		</header>
	);
};

export default Header;
