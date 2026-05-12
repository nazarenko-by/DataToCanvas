import { DrawAxis, CanvasToPng } from "@src/lib/charts/types";
import { drawBarChart } from "@src/lib/charts/bar";

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
	ctx.strokeStyle = isDarkMode ? "#fff" : "#000";
	ctx.fillStyle = isDarkMode ? "#fff" : "#000";

	ctx.font = "10px sans-serif";

	if (type === "bottom" || type === "top") {
		const isBottom = type === "bottom";
		const y = isBottom ? height - padding.bottom : padding.top;
		ctx.textAlign = "center";
		ctx.textBaseline = isBottom ? "top" : "bottom";
		ctx.moveTo(rangeMin, y);
		ctx.lineTo(rangeMax, y);
		ticks.forEach((tick) => {
			let x: number = 0;
			if (isBandScale) {
				x = scale(tick as string) ?? 0;
				const bandWidth = scale.bandwidth();
				x += bandWidth / 2;
			} else {
				x = scale(tick as number) ?? 0;
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
			let y: number = 0;
			if (isBandScale) {
				y = scale(tick as string) ?? 0;
				const bandWidth = scale.bandwidth();
				y += bandWidth / 2;
			} else {
				y = scale(tick as number) ?? 0;
			}
			ctx.moveTo(x, y);
			ctx.lineTo(isLeft ? x - 5 : x + 5, y);
			ctx.fillText(tick.toString(), isLeft ? x - 7 : x + 7, y);
		});
	}

	ctx.stroke();
	ctx.restore();
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
