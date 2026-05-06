"use client";

import { useRef, useEffect } from "react";
import { scaleBand, scaleLinear, max } from "d3";
import { drawBarChart, BarChartData, getBarAtPoints, exportCanvasToPNG } from "@src/lib/canvas-barchart";

interface BarChartPadding {
	top: number;
	right: number;
	bottom: number;
	left: number;
}
interface Props {
	data: BarChartData[];
	width: number;
	height: number;
	padding?: BarChartPadding;
	themeMode?: "dark" | "light";
}

const PADDING = { top: 20, right: 20, bottom: 30, left: 30 };

const BarChart = ({ data, width, height, padding = PADDING, themeMode = "light" }: Props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const xScaleRef = useRef(scaleBand());
	const yScaleRef = useRef(scaleLinear());

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		xScaleRef.current
			.domain(data.map((d) => d.label))
			.range([padding.left, width - padding.right])
			.padding(0.1);

		yScaleRef.current.domain([0, max(data, (d) => d.value) ?? 0]).range([height - padding.bottom, padding.top]);

		const dpr = window.devicePixelRatio ?? 1;
		canvas.width = width * dpr;
		canvas.height = height * dpr;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
		ctx.scale(dpr, dpr);

		drawBarChart({
			ctx,
			data,
			options: { width, height, padding, themeMode },
			scales: { xScale: xScaleRef.current, yScale: yScaleRef.current },
		});

		const handleMouseMove = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const hoveredBar = getBarAtPoints(x, data, xScaleRef.current);
			drawBarChart({
				ctx,
				data,
				options: { width, height, padding, themeMode },
				scales: { xScale: xScaleRef.current, yScale: yScaleRef.current },
				hoveredBar,
			});
		};

		canvas.addEventListener("mousemove", handleMouseMove);

		return () => canvas.removeEventListener("mousemove", handleMouseMove);
	}, [data, width, height]);

	const handleExport = () => {
		exportCanvasToPNG({
			data,
			options: { width, height, padding, themeMode },
			scales: { xScale: xScaleRef.current, yScale: yScaleRef.current },
			exportScale: 1,
		});
	};

	return (
		<div className="bar-chart-container relative">
			<canvas className="relative z-10" ref={canvasRef} />
			<button onClick={handleExport}>Export PNG</button>
		</div>
	);
};

export default BarChart;
