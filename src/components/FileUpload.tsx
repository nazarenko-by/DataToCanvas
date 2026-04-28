"use client";

import { useRef } from "react";
import { parseCSV, ParseResult } from "@src/lib/csv-parser";

interface Props {
	onParsed: (result: ParseResult) => void;
}

export function FileUpload({ onParsed }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			const text = event.target?.result;
			if (typeof text !== "string") return;
			onParsed(parseCSV(text));
		};
		reader.readAsText(file);
	};

	return <input ref={inputRef} type="file" accept=".csv" onChange={handleChange} />;
}
