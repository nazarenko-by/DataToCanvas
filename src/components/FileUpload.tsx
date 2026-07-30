"use client";

import { useRef, useState, MouseEvent, DragEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { parseCSV, ParseResult } from "@src/lib/csv-parser";

import { IconUpload } from "../assets/icons";

import "@src/styles/FileUploader.css";
import { cn } from "../helper";

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
				"file-upload border-dashed border-border-strong border-[1.5px] bg-surface hover:bg-accent-soft hover:border-accent transition-colors duration-200",
				{ "bg-accent-soft border-accent": isDragging }
			)}
			onClick={() => inputRef.current?.click()}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
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
				<button className="bg-accent text-on-accent" onClick={(e) => onButtonClick(e, "/chart")}>
					Try the sample dataset
				</button>
				<button className="text-text border-1 border-border-strong" onClick={(e) => onButtonClick(e, "/about")}>
					How it works
				</button>
			</div>
		</div>
	);
};

export default FileUpload;
