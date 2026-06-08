import { IconCheck } from "@/src/assets/icons";

const Footer = () => {
	return (
		<footer className="footer flex flex-col items-center bg-surface text-sm">
			<div className="footer-inner mx-12 py-4 px-8"></div>
			<div className="footer-bar mb-2 flex justify-between items-center border-t border-border py-[20px] px-[80px] w-full max-w-[60%] text-[13px] text-text-3">
				<p>&copy; {new Date().getFullYear()} DataToChart. A pet-project, built in the open source.</p>
				<div className="footer-badges flex gap-3">
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
