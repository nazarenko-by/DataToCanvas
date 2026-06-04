import { IconCheck } from "@/src/assets/icons";

const Footer = () => {
	return (
		<footer className="footer mx-12 py-4 px-8 text-center">
			<div className="footer-inner mb-2"></div>
			<div className="footer-bar w-full mb-2 flex justify-between items-center">
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
