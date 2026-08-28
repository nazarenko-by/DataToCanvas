import { cn } from "@/src/helper";
import { IconCheck } from "@/src/assets/icons";
import Info from "@src/components/Footer/Info";
import Links from "@src/components/Footer/Links";

const links = [
	{
		title: "Product",
		links: [
			{ text: "Home", href: "/" },
			{ text: "Chart Builder", href: "/chart" },
			{ text: "Chart Types", href: "/chart-types" },
			{ text: "Export & Share", href: "/export" },
		],
	},
	{
		title: "Resources",
		links: [
			{ text: "Documentation", href: "/docs" },
			{ text: "Sample Dataset", href: "/sample-dataset" },
			{ text: "Changelog", href: "/changelog" },
			{ text: "About", href: "/about" },
		],
	},
	{
		title: "Open Source",
		links: [
			{ text: "GitHub Repo", href: "https://github.com/nazarenko-by/DataToCanvas" },
			{ text: "Report an issue", href: "/report" },
			{ text: "Contribute", href: "/contribute" },
			{ text: "License", href: "/license" },
		],
	},
];

const Footer = () => {
	return (
		<footer className="flex flex-col items-center bg-surface text-sm">
			<div className={cn("container-px", "py-4 flex items-center gap-4 justify-between flex-wrap")}>
				<Info />
				{links.map((item) => (
					<Links key={item.title} title={item.title} links={item.links} />
				))}
			</div>
			<div className="mb-2 flex justify-between items-center gap-2 border-t border-border py-[20px] container-px w-full max-w-[90%] md:max-w-[60%] text-[13px] text-text-3">
				<p>&copy; {new Date().getFullYear()} DataToChart. A pet-project, built in the open source.</p>
				<div className="footer-badges flex gap-3 flex-wrap">
					{["No tracking", "100% client-side", "Open source"].map((text) => (
						<span key={text} className="flex gap-2 items-center">
							<IconCheck className="text-accent" />
							{text}
						</span>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
