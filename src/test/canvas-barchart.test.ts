import { describe, it, expect, vi } from "vitest";
import { scaleBand, scaleLinear } from "d3";
import { drawBarChart, BarChartScales, BarChartData } from "@src/lib/canvas-barchart";

const mockCtx = {
	clearRect: vi.fn(),
	fillRect: vi.fn(),
	fillText: vi.fn(),
	beginPath: vi.fn(),
	closePath: vi.fn(),
	moveTo: vi.fn(),
	lineTo: vi.fn(),
	stroke: vi.fn(),
	save: vi.fn(function (this: typeof mockCtx) {
		savedFillStyle = this.fillStyle as string;
	}),
	restore: vi.fn(function (this: typeof mockCtx) {
		this.fillStyle = savedFillStyle;
	}),
	fillStyle: "",
} as unknown as CanvasRenderingContext2D;

let savedFillStyle = "";

const width = 400;
const height = 300;
const padding = { top: 20, right: 20, bottom: 20, left: 20 };
const xScale = scaleBand().range([padding.left, width - padding.right]);
const yScale = scaleLinear().range([height - padding.bottom, padding.top]);

const setDomain = (data: BarChartData[], scales: BarChartScales) => {
	scales.xScale.domain(data.map((d) => d.label));
	scales.yScale.domain([0, Math.max(...data.map((d) => d.value))]);
};

describe("drawBarChart", () => {
	it("don't throw if data is empty", () => {
		expect(() =>
			drawBarChart({ ctx: mockCtx, data: [], options: { width, height, padding }, scales: { xScale, yScale } })
		).not.toThrow();
	});

	it("call clearRect to clear the canvas before drawing", () => {
		const data = [{ label: "A", value: 10 }];
		setDomain(data, { xScale, yScale });
		drawBarChart({ ctx: mockCtx, data, options: { width, height, padding }, scales: { xScale, yScale } });
		expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 400, 300);
	});

	it("call fillRect to draw the bars", () => {
		const data = [
			{ label: "A", value: 10 },
			{ label: "B", value: 20 },
		];
		mockCtx.fillRect = vi.fn();
		setDomain(data, { xScale, yScale });
		drawBarChart({ ctx: mockCtx, data, options: { width, height, padding }, scales: { xScale, yScale } });
		expect(mockCtx.fillRect).toHaveBeenCalledTimes(2);
	});

	it("call hoveredBar", () => {
		const data = [
			{ label: "A", value: 10 },
			{ label: "B", value: 20 },
		];
		mockCtx.fillStyle = "";
		setDomain(data, { xScale, yScale });
		const fillStyles: string[] = [];
		mockCtx.fillRect = vi.fn(() => {
			fillStyles.push(mockCtx.fillStyle as string);
		});
		drawBarChart({
			ctx: mockCtx,
			data,
			options: { width, height, padding },
			scales: { xScale, yScale },
			hoveredBar: data[0],
		});
		expect(fillStyles[0]).toBe("#e3e3e3");
		expect(fillStyles[1]).not.toBe("#e3e3e3");
	});
});
