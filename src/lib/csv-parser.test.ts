import { describe, it, expect } from "vitest";
import { parseCSV } from "./csv-parser";

describe("parseCSV", () => {
	it("returns rows when given a valid CSV", () => {
		const input = "name,age\nAlice,30\nBob,25";
		const result = parseCSV(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.rows).toHaveLength(2);
			expect(result.rows[0].name).toBe("Alice");
		}
	});

	it("returns error when given an empty string", () => {
		const result = parseCSV("");
		expect(result.success).toBe(false);
	});

	it("returns rows when given a CSV with spaces", () => {
		const input = "name, age\n Alice , 30 ";
		const result = parseCSV(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.rows).toHaveLength(1);
			expect(result.rows[0].name).toBe("Alice");
		}
	});
});
