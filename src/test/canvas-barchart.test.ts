import { describe, it, expect, vi } from "vitest";
import { scaleBand, scaleLinear } from "d3";
import { drawBarChart, BarChartScales, BarChartData } from "@src/lib/canvas-barchart";

const mockCtx = {
	clearRect: vi.fn(),
	fillRect: vi.fn(),
	fillText: vi.fn(),
	beginPath: vi.fn(),
	closePath: vi.fn(),
} as unknown as CanvasRenderingContext2D;

const width = 400;
const height = 300;
const padding = { top: 20, right: 20, bottom: 20, left: 20 };
const xScale = scaleBand();
const yScale = scaleLinear();

const setDomain = (data: BarChartData[], scales: BarChartScales) => {
	scales.xScale.domain(data.map((d) => d.label));
	scales.yScale.domain([0, Math.max(...data.map((d) => d.value))]);
};

describe("drawBarChart", () => {
	it("don't throw if data is empty", () => {
		expect(() => drawBarChart(mockCtx, [], { width, height, padding }, { xScale, yScale })).not.toThrow();
	});

	it("call clearRect to clear the canvas before drawing", () => {
		const data = [{ label: "A", value: 10 }];
		setDomain(data, { xScale, yScale });
		drawBarChart(mockCtx, data, { width, height, padding }, { xScale, yScale });
		expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 400, 300);
	});
});
