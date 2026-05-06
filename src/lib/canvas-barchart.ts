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

export function drawBarChart({ ctx, data, options, scales, hoveredBar }: DrawBarChart): void {
	if (!data || data.length === 0) return;

	const { width, height } = options;
	const { xScale, yScale } = scales;
	console.log(3, options.themeMode);
	if (!options.themeMode) {
		options.themeMode = "light";
	}
	const isDarkMode: boolean = options.themeMode === "dark";

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

export const drawAxis = ({ ctx, type, scale, options }: DrawAxis) => {
	const { width, height, padding, themeMode } = options;
	const isDarkMode = themeMode === "dark";
	const isBandScale = "bandwidth" in scale;
	let ticks: number[] | string[] = [];
	if (isBandScale) {
		ticks = scale.domain();
	} else {
		const pixelsPerTick = 50;
		const size = type === "top" || type === "bottom" ? width : height;

		const ticksCount = Math.max(2, Math.floor(size / pixelsPerTick));
		ticks = scale.ticks(ticksCount);

		if (ticks.length > size / pixelsPerTick) {
			ticks = scale.ticks(ticksCount / 2);
		}
	}

	const [rangeMin, rangeMax] = scale.range();

	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = isDarkMode ? "white" : "black";
	ctx.fillStyle = isDarkMode ? "white" : "black";
	ctx.font = "10px sans-serif";

	if (type === "bottom" || type === "top") {
		const isBottom = type === "bottom";
		const y = isBottom ? height - padding.bottom : padding.top;
		ctx.textAlign = "center";
		ctx.textBaseline = isBottom ? "top" : "bottom";
		ctx.moveTo(rangeMin, y);
		ctx.lineTo(rangeMax, y);
		ticks.forEach((tick) => {
			let x = scale(tick as any) ?? 0;
			if (isBandScale) {
				const bandWidth = scale.bandwidth();
				x += bandWidth / 2;
			}
			ctx.moveTo(x, y);
			ctx.lineTo(x, isBottom ? y + 5 : y - 5);
			ctx.fillText(tick.toString(), x, isBottom ? y + 7 : y - 7);
		});
	} else {
		const isLeft = type === "left";
		const x = isLeft ? padding.left : width - padding.right;
		ctx.textAlign = isLeft ? "right" : "left";
		ctx.textBaseline = "middle";
		ctx.moveTo(x, rangeMin);
		ctx.lineTo(x, rangeMax);
		ticks.forEach((tick) => {
			const y = scale(tick as any) ?? 0;
			ctx.moveTo(x, y);
			ctx.lineTo(isLeft ? x - 5 : x + 5, y);
			ctx.fillText(tick.toString(), isLeft ? x - 7 : x + 7, y);
		});
	}

	ctx.stroke();
	ctx.restore();
};

export const getBarAtPoints = (x: number, data: BarChartData[], xScale: ScaleBand<string>): BarChartData | null => {
	return (
		data.find((d) => {
			const barX = xScale(d.label) ?? 0;
			const barWidth = xScale.bandwidth();
			return x >= barX && x <= barX + barWidth;
		}) ?? null
	);
};

export const exportCanvasToPNG = ({
	data,
	options,
	scales,
	exportScale = 1,
	filename = "chart.png",
}: CanvasToPng): void => {
	const tempCanvas = document.createElement("canvas");
	const ctx = tempCanvas.getContext("2d");

	if (!ctx) return;

	const { width, height } = options;

	tempCanvas.width = width * exportScale;
	tempCanvas.height = height * exportScale;
	ctx.scale(exportScale, exportScale);

	drawBarChart({ ctx, data, options, scales });

	const url = tempCanvas.toDataURL("image/png");
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.click();

	link.remove();
	tempCanvas.remove();
};
