"use client";

import { useSyncExternalStore, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";

import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { useDataStore } from "@src/store/useDataStore";

import { FileUpload } from "@src/components/FileUpload";
import BarChart from "@src/components/BarChart";
import { BarChartData } from "@src/lib/charts/types";
import { ParseResult } from "@src/lib/csv-parser";

type ThemeMode = "dark" | "light";

export default function Home() {
	const { fileData, setFileData, xKeys, setXKeys, yKeys, setYKeys, xActive, setXActive, yActive, setYActive } =
		useStoreWithEqualityFn(useDataStore, (state) => ({ ...state }), shallow);
	const [error, setError] = useState<string | null>(null);

	// const router = useRouter()

	function useTheme(): ThemeMode {
		return useSyncExternalStore(
			(callback) => {
				const media = window.matchMedia("(prefers-color-scheme: dark)");
				media.addEventListener("change", callback);
				return () => media.removeEventListener("change", callback);
			},
			() => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
			() => "light"
		);
	}

	const themeMode: ThemeMode = useTheme();

	const handleParsed = (result: ParseResult) => {
		if (!result.success) {
			setError(result.error);
			return;
		}

		// router.push("/chart");

		setXActive(null);
		setYActive(null);
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
	}, [xActive, yActive, fileData]);

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
			{chartData && <BarChart data={chartData} width={600} height={400} themeMode={themeMode} />}
		</main>
	);
}
