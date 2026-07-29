"use client";

import { useRef } from "react";
import { parseCSV, ParseResult } from "@src/lib/csv-parser";

import { IconUpload } from "../assets/icons";

import "@src/styles/FileUploader.css";

interface Props {
	onParsed: (result: ParseResult) => void;
}

const fileFormats = [".csv", ".tsv", ".txt", ".json", ".xlsx"];

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

	return (
		<div
			className="file-upload w-full max-w-[720px] py-14 px-8 border-dashed border-border-strong border-[1.5px] rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer bg-surface hover:bg-accent-soft hover:border-accent transition-colors duration-200"
			onClick={() => inputRef.current?.click()}
		>
			<input ref={inputRef} type="file" accept=".csv" onChange={handleChange} hidden />
			<div className="icon flex justify-center items-center w-[56px] h-[56px] rounded-xl text-accent bg-accent-soft">
				<IconUpload />
			</div>
			<h4 className="text-[18px]">Drop your file here, or click to browse</h4>
			<p className="text-text-2 text-[13px]">Up to 50 MB · Parsed in your browser, never uploaded</p>
			<div className="formats flex gap-3">
				{fileFormats.map((format) => (
					<span key={format}>{format}</span>
				))}
			</div>
			<div className="flex gap-3">
				<button className="bg-accent text-on-accent">Try the sample dataset</button>
				<button className="text-text border-1 border-border-strong">How it works</button>
			</div>
		</div>
	);
}
