import { ScaleBand, ScaleLinear } from "d3";

export interface BarChartData {
	label: string;
	value: number;
}

export interface BarChartOptions {
	width: number;
	height: number;
	padding: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
	themeMode?: "dark" | "light";
}

export interface BarChartScales {
	xScale: ScaleBand<string>;
	yScale: ScaleLinear<number, number>;
}

export interface DrawBarChart {
	ctx: CanvasRenderingContext2D;
	data: BarChartData[];
	options: BarChartOptions;
	scales: BarChartScales;
	hoveredBar?: BarChartData | null;
}

export interface DrawAxis {
	ctx: CanvasRenderingContext2D;
	type: "top" | "right" | "bottom" | "left";
	scale: ScaleBand<string> | ScaleLinear<number, number>;
	options: BarChartOptions;
}

export interface CanvasToPng {
	data: BarChartData[];
	options: BarChartOptions;
	scales: BarChartScales;
	exportScale?: number;
	filename?: string;
}
