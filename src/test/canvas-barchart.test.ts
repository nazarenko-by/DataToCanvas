import { describe, it, expect, vi } from "vitest";
import { scaleBand, scaleLinear } from "d3";
import { drawBarChart, drawAxis, exportCanvasToPNG, BarChartScales, BarChartData } from "@src/lib/canvas-barchart";

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

describe("drawAxis", () => {
	it("draws axis without throwing", () => {
		const data = [{ label: "A", value: 10 }];
		setDomain(data, { xScale, yScale });
		expect(() =>
			drawBarChart({ ctx: mockCtx, data, options: { width, height, padding }, scales: { xScale, yScale } })
		).not.toThrow();
	});

	it("call drawAxis to draw the axis", () => {
		const data = [
			{ label: "A", value: 10 },
			{ label: "B", value: 20 },
		];
		mockCtx.beginPath = vi.fn();
		setDomain(data, { xScale, yScale });
		drawAxis({ ctx: mockCtx, type: "bottom", options: { width, height, padding }, scale: xScale });
		expect(mockCtx.beginPath).toHaveBeenCalledTimes(1);
	});

	it("should set white colors for dark mode", () => {
		const scale = scaleBand().domain(["A"]).range([0, 100]);
		const mockAxis = { ...mockCtx, strokeStyle: "", fillStyle: "", restore: vi.fn() };

		drawAxis({
			ctx: mockAxis,
			type: "bottom",
			scale: scale as any,
			options: { width, height, padding, themeMode: "dark" },
		});
		expect(mockAxis.strokeStyle).toBe("#fff");
		expect(mockAxis.fillStyle).toBe("#fff");
	});

	it("should call fillText for each tick", () => {
		const scale = scaleBand().domain(["A", "B", "C"]).range([0, 300]);
		mockCtx.fillText = vi.fn();
		drawAxis({
			ctx: mockCtx,
			type: "bottom",
			scale: scale as any,
			options: { width, height, padding, themeMode: "light" },
		});
		expect(mockCtx.fillText).toHaveBeenCalledTimes(3);
	});
});

describe("exportCanvasToPNG", () => {
	it("should create a temporary canvas and trigger download", () => {
		const linkMock = { click: vi.fn(), remove: vi.fn(), href: "", download: "" };
		const canvasMock = {
			...mockCtx,
			getContext: vi.fn(() => ({
				scale: vi.fn(),
			})),
			toDataURL: vi.fn(() => "data:image/png;base64,123"),
			width: 0,
			height: 0,
			remove: vi.fn(),
		};

		vi.spyOn(document, "createElement").mockImplementation((tag) => {
			if (tag === "canvas") return canvasMock as any;
			if (tag === "a") return linkMock as any;
			return {} as any;
		});

		exportCanvasToPNG({
			data: [],
			options: { width: 500, height: 300, padding },
			scales: {} as any,
			exportScale: 2,
			filename: "test-chart.png",
		});

		expect(canvasMock.width).toBe(1000);
		expect(linkMock.download).toBe("test-chart.png");
		expect(linkMock.click).toHaveBeenCalled();

		vi.restoreAllMocks();
	});
});
