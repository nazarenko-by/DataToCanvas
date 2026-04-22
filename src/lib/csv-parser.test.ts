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
		const input = "name, age\n Alice , 30\nBob , 25";
		const result = parseCSV(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.rows).toHaveLength(2);
			expect(result.rows[0].name).toBe("Alice");
			expect(result.rows[1].name).toBe("Bob");
		}
	});

	it("returns rows when given a CSV with double quotes", () => {
		const input = 'name, age\n "Alice" , 30\n"Bob" , 25';
		const result = parseCSV(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.rows).toHaveLength(2);
			expect(result.rows[0].name).toBe("Alice");
			expect(result.rows[1].name).toBe("Bob");
		}
	});

	it("returns rows when given a CSV with single quotes", () => {
		const input = "name, age\n 'Alice' , 30\n'Bob' , 25";
		const result = parseCSV(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.rows).toHaveLength(2);
			expect(result.rows[0].name).toBe("Alice");
			expect(result.rows[1].name).toBe("Bob");
		}
	});

	it("returns rows when givven a CSV with many rows and empty row", () => {
		const input = "name, age, height\n Alice , 30, 170\n\nBob , 25, 180";
		const result = parseCSV(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.rows).toHaveLength(3);
			expect(result.rows[0].name).toBe("Alice");
			expect(result.rows[2].name).toBe("Bob");
		}
	});

	it("returns rows when given a CSV with empty cells", () => {
		const input = "name, age, height\n Alice , , 170\nBob , 25, 180";
		const result = parseCSV(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.rows).toHaveLength(2);
			expect(result.rows[0].name).toBe("Alice");
			expect(result.rows[0].age).toBe("");
			expect(result.rows[1].name).toBe("Bob");
		}
	});
});
