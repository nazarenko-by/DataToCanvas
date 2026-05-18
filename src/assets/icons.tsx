import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// ── Brand mark ──────────────────────────────────────────────────────────────
const LogoMark = (p: IconProps) => (
	<svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...p}>
		<rect x="2" y="9" width="2.5" height="5" rx="0.6" fill="currentColor" />
		<rect x="6.75" y="5" width="2.5" height="9" rx="0.6" fill="currentColor" opacity="0.8" />
		<rect x="11.5" y="2" width="2.5" height="12" rx="0.6" fill="currentColor" opacity="0.55" />
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

export { THEMES, LogoMark, IconSun, IconMoon, IconCup, IconBar, IconLine, IconScatter, IconArea, IconHeatmap };
