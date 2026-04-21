export type CsvRow = Record<string, string>

export type ParseResult =
    | { success: true; rows: CsvRow[]; headers: string[] }
    | { success: false; error: string }

export function parseCSV(raw: string): ParseResult {
    if (!raw) return { success: false, error: "Empty string" }
    const lines = raw.split("\n")
    const headers = lines[0].split(",")
    const rows = lines.slice(1).map((line) => {
        const values = line.split(",")
        const row: CsvRow = {}
        for (let i = 0; i < headers.length; i++) {
            row[headers[i]] = values[i].replaceAll(" ", "")
        }
        return row
    })
    return { success: true, rows, headers }
}