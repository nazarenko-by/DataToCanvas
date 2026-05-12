import { ScaleBand } from "d3";
import { BarChartData, DrawBarChart } from "@src/lib/charts/types";
import { drawAxis } from "@src/lib/charts/utils";

export function drawBarChart({ ctx, data, options, scales, hoveredBar }: DrawBarChart): void {
	if (!data || data.length === 0) return;

	const { width, height } = options;
	const { xScale, yScale } = scales;

	const themeMode = options.themeMode ?? "light";
	const isDarkMode: boolean = themeMode === "dark";

	ctx.clearRect(0, 0, width, height);

	drawAxis({ ctx, type: "bottom", scale: xScale, options });
	drawAxis({ ctx, type: "left", scale: yScale, options });

	data.forEach((d) => {
		const x = xScale(d.label) ?? 0;
		const y = yScale(d.value);
		ctx.fillStyle = isDarkMode ? "#fff" : "#000";
		ctx.save();
		if (hoveredBar && hoveredBar.label === d.label) {
			ctx.fillStyle = isDarkMode ? "#333" : "#e3e3e3";
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
