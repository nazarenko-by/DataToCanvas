import { LogoMark, IconGithub, IconInstagram, IconMail } from "@/src/assets/icons";

const icons = [
	{ icon: IconGithub, link: "https://github.com/nazarenko-by", title: "GitHub" },
	{ icon: IconInstagram, link: "https://www.instagram.com/nby.frontend/", title: "Instagram" },
	{ icon: IconMail, link: "mailto:bodean56@ukr.net", title: "Email" },
];
const Info = () => {
	return (
		<div className="flex flex-col gap-4 md:basis-[28%]">
			<div className="flex items-center gap-2">
				<LogoMark width={26} height={26} className="text-surface bg-accent rounded-md" />
				<div className="logo-text font-bold text-[16px]">DataToCanvas</div>
			</div>
			<p className="text-text-2 text-[14px]">
				The fastest way to turn a spreadsheet into a chart you can actually share. Free and open-source.
			</p>
			<div className="flex gap-2 text-text-2 text-[13px]">
				{icons.map((item) => (
					<a
						key={item.title}
						href={item.link}
						target="_blank"
						rel="noopener noreferrer"
						className="w-[34px] h-[34px] bg-surface-2 flex justify-center items-center border border-border rounded-md hover:text-accent hover:border-accent transition-all duration-200"
						title={item.title}
					>
						<item.icon />
					</a>
				))}
			</div>
		</div>
	);
};

export default Info;
