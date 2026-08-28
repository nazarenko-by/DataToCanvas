"use client";

import { useRef, useState, MouseEvent, DragEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@src/helper";
import { parseCSV, ParseResult } from "@src/lib/csv-parser";

import { IconUpload } from "@src/assets/icons";

interface Props {
	onParsed: (result: ParseResult) => void;
}

const fileFormats = [".csv", ".tsv", ".txt", ".json", ".xlsx"];

const FileUpload = ({ onParsed }: Props) => {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	const [isDragging, setIsDragging] = useState(false);

	const readFile = (file: File) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			const text = event.target?.result;
			if (typeof text !== "string") return;
			onParsed(parseCSV(text));
		};
		reader.readAsText(file);
	};

	const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.currentTarget.contains(e.relatedTarget as Node)) {
			return;
		}
		setIsDragging(false);
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};
	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const file = e.dataTransfer?.files?.[0];
		if (file) readFile(file);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) readFile(file);
	};

	const onButtonClick = (e: MouseEvent, path: string) => {
		e.stopPropagation();
		router.push(path);
	};

	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center gap-4 w-full max-auto max-w-[720px]",
				"p-14 px-8 rounded-xl text-center cursor-pointer",
				"bg-surface border-dashed border-border-strong border-[1.5px]",
				"transition-[transform_0.12s,box-shadow_0.15s,filter_0.15s] ease-in-out",
				"hover:bg-accent-soft hover:border-accent",
				{ "bg-accent-soft border-accent": isDragging }
			)}
			onClick={() => inputRef.current?.click()}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<input ref={inputRef} type="file" accept=".csv" onChange={handleChange} hidden />
			<div className="flex justify-center items-center w-14 h-14 rounded-xl text-accent bg-accent-soft">
				<IconUpload />
			</div>
			<div className="space-y-1">
				<h4 className="text-[18px] font-medium text-text">Drop your file here, or click to browse</h4>
				<p className="text-text-2 text-[13px]">Up to 50 MB · Parsed in your browser, never uploaded</p>
			</div>
			<div className="flex gap-3 flex-wrap justify-center">
				{fileFormats.map((format) => (
					<span
						key={format}
						className="text-[11px] px-[9px] py-[3px] rounded-full bg-surface-2 text-text-2 font-mono border border-border"
					>
						{format}
					</span>
				))}
			</div>
			<div className="flex gap-3 mt-2">
				<button className="btn bg-accent text-on-accent" onClick={(e) => onButtonClick(e, "/chart")}>
					Try the sample dataset
				</button>
				<button
					className="btn text-text border border-border-strong"
					onClick={(e) => onButtonClick(e, "/about")}
				>
					How it works
				</button>
			</div>
		</div>
	);
};

export default FileUpload;
