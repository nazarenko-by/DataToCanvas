"use client";

import { useRef, useEffect } from "react";
import { scaleBand, scaleLinear, max } from "d3";
import { drawBarChart, BarChartData, getBarAtPoints } from "@src/lib/canvas-barchart";

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

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const xScale = scaleBand()
			.domain(data.map((d) => d.label))
			.range([padding.left, width - padding.right])
			.padding(0.1);

		const yScale = scaleLinear()
			.domain([0, max(data, (d) => d.value) ?? 0])
			.range([height - padding.bottom, padding.top]);

		const dpr = window.devicePixelRatio ?? 1;
		canvas.width = width * dpr;
		canvas.height = height * dpr;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
		ctx.scale(dpr, dpr);

		drawBarChart({ ctx, data, options: { width, height, padding, themeMode }, scales: { xScale, yScale } });

		const handleMouseMove = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const hoveredBar = getBarAtPoints(x, data, xScale);
			drawBarChart({
				ctx,
				data,
				options: { width, height, padding, themeMode },
				scales: { xScale, yScale },
				hoveredBar,
			});
		};

		canvas.addEventListener("mousemove", handleMouseMove);

		return () => canvas.removeEventListener("mousemove", handleMouseMove);
	}, [data, width, height]);

	return (
		<div className="bar-chart-container relative">
			<canvas className="relative z-10" ref={canvasRef} />
		</div>
	);
};

export default BarChart;
