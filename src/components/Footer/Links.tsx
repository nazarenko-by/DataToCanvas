import { cn } from "@/src/helper";

interface LinksProps {
	className?: string;
	title?: string;
	links?: { text: string; href: string }[];
}

const Links = ({ className, title, links }: LinksProps) => {
	return (
		<div className={cn(`footer-links`, className)}>
			<h5 className="text-text-3 text-[11px] font-bold mb-3 uppercase">{title}</h5>
			{links?.map((item) => (
				<a
					key={item.text}
					href={item.href}
					className="hover:text-accent block text-[14px] pt-1 pb-1 text-text-2 transition-colors duration-200"
				>
					{item.text}
				</a>
			))}
		</div>
	);
};

export default Links;
