import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// ── Brand mark ──────────────────────────────────────────────────────────────
const LogoMark = (p: IconProps) => (
	<svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...p}>
		<rect x="8" y="16" width="3" height="6" rx="0.6" fill="currentColor" />
		<rect x="14" y="12" width="3" height="10" rx="0.6" fill="currentColor" opacity="0.8" />
		<rect x="20" y="8" width="3" height="14" rx="0.6" fill="currentColor" opacity="0.55" />
	</svg>
);

// ── Theme switch icons ──────────────────────────────────────────────────────
const IconSun = (p: IconProps) => (
	<svg
		width="13"
		height="13"
		viewBox="0 0 14 14"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		strokeLinecap="round"
		{...p}
	>
		<circle cx="7" cy="7" r="2.6" />
		<path d="M7 1.2v1.5M7 11.3v1.5M1.2 7h1.5M11.3 7h1.5M3.1 3.1l1.05 1.05M9.85 9.85l1.05 1.05M3.1 10.9l1.05-1.05M9.85 4.15l1.05-1.05" />
	</svg>
);
const IconMoon = (p: IconProps) => (
	<svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" {...p}>
		<path d="M11.8 8.4a4.6 4.6 0 0 1-6.2-6.2.6.6 0 0 0-.78-.78A5.8 5.8 0 1 0 12.6 9.18a.6.6 0 0 0-.8-.78z" />
	</svg>
);
const IconCup = (p: IconProps) => (
	<svg
		width="13"
		height="13"
		viewBox="0 0 14 14"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.4"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...p}
	>
		<path d="M2.5 4.2h7.3v4.3a2.6 2.6 0 0 1-2.6 2.6H5.1A2.6 2.6 0 0 1 2.5 8.5V4.2Z" />
		<path d="M9.8 5.4h1.1a1.5 1.5 0 0 1 0 3h-1.1" />
		<path d="M4.4 2.4q.2.7 0 1.2M6.2 2.2q.2.8 0 1.4M8 2.4q.2.7 0 1.2" />
	</svg>
);

const THEMES = [
	{ id: "light", label: "Light", Icon: IconSun },
	{ id: "dark", label: "Dark", Icon: IconMoon },
	{ id: "cream", label: "Cream", Icon: IconCup },
];

// ── Chart-type icons (12px) ─────────────────────────────────────────────────
const IconBar = (p: IconProps) => (
	<svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
		<rect x="1.5" y="7.5" width="2.2" height="5" rx="0.4" fill="currentColor" />
		<rect x="5.4" y="4.5" width="2.2" height="8" rx="0.4" fill="currentColor" />
		<rect x="9.3" y="1.5" width="2.2" height="11" rx="0.4" fill="currentColor" />
	</svg>
);
const IconLine = (p: IconProps) => (
	<svg
		width="14"
		height="14"
		viewBox="0 0 14 14"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...p}
	>
		<path d="M1.5 10 L4.5 6 L7.5 8 L10 4 L12.5 5.5" />
	</svg>
);
const IconScatter = (p: IconProps) => (
	<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" {...p}>
		<circle cx="2.5" cy="10" r="1.1" />
		<circle cx="5.5" cy="6.5" r="1.1" />
		<circle cx="8" cy="9" r="1.1" />
		<circle cx="10.5" cy="3.5" r="1.1" />
		<circle cx="11.5" cy="7" r="1.1" />
		<circle cx="4" cy="4" r="1.1" />
	</svg>
);
const IconArea = (p: IconProps) => (
	<svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
		<path d="M1 10 L4 6 L7 8 L10 4 L13 6 L13 13 L1 13 Z" fill="currentColor" opacity="0.3" />
		<path
			d="M1 10 L4 6 L7 8 L10 4 L13 6"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			fill="none"
		/>
	</svg>
);
const IconHeatmap = (p: IconProps) => (
	<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" {...p}>
		<rect x="1" y="1" width="3.5" height="3.5" opacity="0.25" />
		<rect x="5" y="1" width="3.5" height="3.5" opacity="0.55" />
		<rect x="9" y="1" width="3.5" height="3.5" opacity="0.85" />
		<rect x="1" y="5" width="3.5" height="3.5" opacity="0.55" />
		<rect x="5" y="5" width="3.5" height="3.5" opacity="0.85" />
		<rect x="9" y="5" width="3.5" height="3.5" opacity="0.4" />
		<rect x="1" y="9" width="3.5" height="3.5" opacity="0.85" />
		<rect x="5" y="9" width="3.5" height="3.5" opacity="0.4" />
		<rect x="9" y="9" width="3.5" height="3.5" opacity="0.15" />
	</svg>
);

const IconCheck = (p: IconProps) => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...p}
	>
		<path d="M3.5 8.5l3 3 6-7"></path>
	</svg>
);

const IconCross = (p: IconProps) => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...p}
	>
		<path d="M4.5 4.5l7 7m-7 0l7-7"></path>
	</svg>
);

const IconGithub = (p: IconProps) => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}>
		<path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z" />
	</svg>
);

const IconInstagram = (p: IconProps) => (
	<svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor" {...p}>
		<path d="M256,49.471c67.266,0,75.233.257,101.8,1.469,24.562,1.121,37.9,5.224,46.778,8.674a78.052,78.052,0,0,1,28.966,18.845,78.052,78.052,0,0,1,18.845,28.966c3.45,8.877,7.554,22.216,8.674,46.778,1.212,26.565,1.469,34.532,1.469,101.8s-0.257,75.233-1.469,101.8c-1.121,24.562-5.225,37.9-8.674,46.778a83.427,83.427,0,0,1-47.811,47.811c-8.877,3.45-22.216,7.554-46.778,8.674-26.56,1.212-34.527,1.469-101.8,1.469s-75.237-.257-101.8-1.469c-24.562-1.121-37.9-5.225-46.778-8.674a78.051,78.051,0,0,1-28.966-18.845,78.053,78.053,0,0,1-18.845-28.966c-3.45-8.877-7.554-22.216-8.674-46.778-1.212-26.564-1.469-34.532-1.469-101.8s0.257-75.233,1.469-101.8c1.121-24.562,5.224-37.9,8.674-46.778A78.052,78.052,0,0,1,78.458,78.458a78.053,78.053,0,0,1,28.966-18.845c8.877-3.45,22.216-7.554,46.778-8.674,26.565-1.212,34.532-1.469,101.8-1.469m0-45.391c-68.418,0-77,.29-103.866,1.516-26.815,1.224-45.127,5.482-61.151,11.71a123.488,123.488,0,0,0-44.62,29.057A123.488,123.488,0,0,0,17.3,90.982C11.077,107.007,6.819,125.319,5.6,152.134,4.369,179,4.079,187.582,4.079,256S4.369,333,5.6,359.866c1.224,26.815,5.482,45.127,11.71,61.151a123.489,123.489,0,0,0,29.057,44.62,123.486,123.486,0,0,0,44.62,29.057c16.025,6.228,34.337,10.486,61.151,11.71,26.87,1.226,35.449,1.516,103.866,1.516s77-.29,103.866-1.516c26.815-1.224,45.127-5.482,61.151-11.71a128.817,128.817,0,0,0,73.677-73.677c6.228-16.025,10.486-34.337,11.71-61.151,1.226-26.87,1.516-35.449,1.516-103.866s-0.29-77-1.516-103.866c-1.224-26.815-5.482-45.127-11.71-61.151a123.486,123.486,0,0,0-29.057-44.62A123.487,123.487,0,0,0,421.018,17.3C404.993,11.077,386.681,6.819,359.866,5.6,333,4.369,324.418,4.079,256,4.079h0Z" />
		<path d="M256,126.635A129.365,129.365,0,1,0,385.365,256,129.365,129.365,0,0,0,256,126.635Zm0,213.338A83.973,83.973,0,1,1,339.974,256,83.974,83.974,0,0,1,256,339.973Z" />
		<circle cx="390.476" cy="121.524" r="30.23" />
	</svg>
);

const IconMail = (p: IconProps) => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...p}
	>
		<rect x="3" y="5" width="18" height="14" rx="2"></rect>
		<path d="M3 7l9 6 9-6"></path>
	</svg>
);

export {
	THEMES,
	LogoMark,
	IconSun,
	IconMoon,
	IconCup,
	IconBar,
	IconLine,
	IconScatter,
	IconArea,
	IconHeatmap,
	IconCheck,
	IconCross,
	IconGithub,
	IconInstagram,
	IconMail,
};
