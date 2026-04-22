export type CsvRow = Record<string, string>

export type ParseResult =
    | { success: true; rows: CsvRow[]; headers: string[] }
    | { success: false; error: string }

export function parseCSV(csvText: string): ParseResult {
    if (!csvText) return { success: false, error: "Empty string" }
    const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

    const lines = csvText.trim().split(/\r?\n/);
    const headers = lines[0].split(regex).map(h => h.replace(/^"|"$/g, '').trim());

    const rows = lines.slice(1).map(line => {
        const values = line.split(regex);
        return headers.reduce((obj, header, index) => {
            let val = values[index] ?? "";
            val = val.replace(/^"|"$/g, '').trim();
            obj[header] = val;
            return obj;
        }, {} as Record<string, string>);
    })
    return { success: true, rows, headers }
}