"use client";

import { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, axisBottom, axisLeft, max } from "d3";
import { drawBarChart, BarChartData, getBarAtPoints } from "@src/lib/canvas-barchart";

interface Props {
	data: BarChartData[];
	width: number;
	height: number;
}

const padding = { top: 20, right: 20, bottom: 30, left: 30 };

const BarChart = ({ data, width, height }: Props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const svgContentRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const svgContent = select(svgContentRef.current);
		if (!svgContent) return;

		const xScale = scaleBand()
			.domain(data.map((d) => d.label))
			.range([padding.left, width - padding.right])
			.padding(0.1);

		const yScale = scaleLinear()
			.domain([0, max(data, (d) => d.value) ?? 0])
			.range([height - padding.bottom, padding.top]);

		const xAxis = axisBottom(xScale);
		const yAxis = axisLeft(yScale);

		svgContent
			.select<SVGGElement>(".x-axis")
			.attr("transform", `translate(0, ${height - padding.bottom})`)
			.transition()
			.duration(750)
			.call(xAxis);
		svgContent
			.select<SVGGElement>(".y-axis")
			.attr("transform", `translate(${padding.left}, 0)`)
			.transition()
			.duration(750)
			.call(yAxis);

		const dpr = window.devicePixelRatio ?? 1;
		canvas.width = width * dpr;
		canvas.height = height * dpr;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
		ctx.scale(dpr, dpr);

		drawBarChart({ ctx, data, options: { width, height, padding }, scales: { xScale, yScale } });

		const handleMouseMove = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const hoveredBar = getBarAtPoints(x, data, xScale);
			drawBarChart({ ctx, data, options: { width, height, padding }, scales: { xScale, yScale }, hoveredBar });
		};

		canvas.addEventListener("mousemove", handleMouseMove);

		return () => canvas.removeEventListener("mousemove", handleMouseMove);
	}, [data, width, height]);

	return (
		<div className="bar-chart-container relative">
			<canvas className="relative z-10" ref={canvasRef} />
			<svg width={width} height={height} className="absolute top-0">
				<g ref={svgContentRef} className="svg-content">
					<g className="x-axis" />
					<g className="y-axis" />
				</g>
			</svg>
		</div>
	);
};

export default BarChart;
