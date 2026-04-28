"use client";

import { useMemo, useState } from "react";
import { FileUpload } from "@src/components/FileUpload";
import BarChart from "@src/components/BarChart";
import { BarChartData } from "@src/lib/canvas-barchart";
import { ParseResult } from "@src/lib/csv-parser";

export default function Home() {
	const [fileData, setFileData] = useState<ParseResult | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [xKeys, setXKeys] = useState<string[] | null>(null);
	const [yKeys, setYKeys] = useState<string[] | null>(null);
	const [xActive, setXActive] = useState<string | undefined>();
	const [yActive, setYActive] = useState<string | undefined>();

	const handleParsed = (result: ParseResult) => {
		if (!result.success) {
			setError(result.error);
			return;
		}

		setXActive(undefined);
		setYActive(undefined);
		setFileData(result);

		const keys = result.headers;
		const yKeys = keys.filter(
			(key) => key !== "id" && (typeof result.rows[0][key] === "number" || !isNaN(Number(result.rows[0][key])))
		);

		setXKeys(keys);
		setYKeys(yKeys);
	};

	const chartData: BarChartData[] | null = useMemo(() => {
		if (xActive && yActive && fileData) {
			const chartData = fileData.rows?.map((row) => ({
				label: row[xActive] as string,
				value: +(row[yActive] ?? 0),
			})) as BarChartData[];
			return chartData;
		}
		return null;
	}, [xActive, yActive, fileData?.rows]);

	return (
		<main>
			<FileUpload onParsed={handleParsed} />
			{xKeys && (
				<select value={xActive || ""} onChange={(e) => setXActive(e.target.value)}>
					<option value="" style={{ display: "none" }}>
						Select the X-coordinate
					</option>
					{xKeys.map((key) => (
						<option key={key} value={key}>
							{key}
						</option>
					))}
				</select>
			)}
			{yKeys && (
				<select value={yActive || ""} onChange={(e) => setYActive(e.target.value)}>
					<option value="" style={{ display: "none" }}>
						Select the Y-coordinate
					</option>
					{yKeys.map((key) => (
						<option key={key} value={key}>
							{key}
						</option>
					))}
				</select>
			)}
			{error && <p>{error}</p>}
			{chartData && <BarChart data={chartData} width={600} height={400} />}
		</main>
	);
}
