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

export function drawBarChart({ ctx, data, options, scales, hoveredBar }: DrawBarChart): void {
	if (!data || data.length === 0) return;

	const { width, height } = options;

	const { xScale, yScale } = scales;

	ctx.clearRect(0, 0, width, height);

	data.forEach((d) => {
		const x = xScale(d.label) ?? 0;
		const y = yScale(d.value);
		ctx.save();
		if (hoveredBar && hoveredBar.label === d.label) {
			ctx.fillStyle = "#e3e3e3";
		}
		ctx.fillRect(x, y, xScale.bandwidth(), yScale(0) - y);
		ctx.restore();
	});
}

export const getBarAtPoints = (x: number, data: BarChartData[], xScale: ScaleBand<string>): BarChartData | null => {
	return (
		data.find((d) => {
			const barX = xScale(d.label) ?? 0;
			const barWidth = xScale.bandwidth();
			return x >= barX && x <= barX + barWidth;
		}) ?? null
	);
};
