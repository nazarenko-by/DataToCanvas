export type CsvRow = Record<string, string | null>;

export type ParseResult =
	| { success: true; rows: CsvRow[]; headers: string[] }
	| { success: false; error: string; rows?: CsvRow[] };

export const parseCSV = (csvText: string): ParseResult => {
	if (!csvText) return { success: false, error: "Empty string" };
	const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

	let lines = csvText.split(/\r?\n/);
	if (lines[0].trim() === "") return { success: false, error: "Cannot parse headers" };
	lines = lines.filter((line) => line.trim() !== "");
	if (lines.length < 2) return { success: false, error: "Empty data" };

	const headers = lines[0].split(regex).map((h) => h.trim().replace(/^[“"‘'«]|[”"’'»]$/g, ""));

	const rows = lines.slice(1).map((line) => {
		const values = line.split(regex);
		return headers.reduce(
			(obj, header, index) => {
				let val = values[index] ?? null;
				if (val) val = val.trim().replace(/^[“"‘'«]|[”"’'»]$/g, "") ?? null;
				obj[header] = val;
				return obj;
			},
			{} as Record<string, string | null>
		);
	});
	return { success: true, rows, headers };
};
