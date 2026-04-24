"use client";

import { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, axisBottom, axisLeft } from "d3";
import { drawBarChart, BarChartData } from "@src/lib/canvas-barchart";

interface Props {
	data: BarChartData[];
	width: number;
	height: number;
}

const padding = { top: 20, right: 20, bottom: 20, left: 20 };

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
			.range([0, width])
			.padding(0.1);

		const yScale = scaleLinear()
			.domain([0, Math.max(...data.map((d) => d.value))])
			.range([height, 0]);

		const xAxis = axisBottom(xScale);
		const yAxis = axisLeft(yScale);
		svgContent.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
		svgContent.append("g").call(yAxis);

		const dpr = window.devicePixelRatio ?? 1;
		canvas.width = width * dpr;
		canvas.height = height * dpr;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
		ctx.scale(dpr, dpr);

		drawBarChart(ctx, data, { width, height, padding }, { xScale, yScale });
	}, [data, width, height]);

	return (
		<div className="bar-chart-container">
			<canvas ref={canvasRef} />
			<svg width={width} height={height}>
				<g ref={svgContentRef} className="svg-content"></g>
			</svg>
		</div>
	);
};

export default BarChart;
