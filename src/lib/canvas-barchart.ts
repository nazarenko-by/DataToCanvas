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

export function drawBarChart(
	ctx: CanvasRenderingContext2D,
	data: BarChartData[],
	options: BarChartOptions,
	scales: BarChartScales
): void {
	if (!data || data.length === 0) return;

	const { width, height } = options;

	const { xScale, yScale } = scales;

	ctx.clearRect(0, 0, width, height);

	data.forEach((d) => {
		const x = xScale(d.label) ?? 0;
		const y = yScale(d.value);
		ctx.fillRect(x, y, xScale.bandwidth(), yScale(0) - y);
	});
}
