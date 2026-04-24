import { describe, it, expect } from "vitest";
import { parseCSV } from "@/src/lib/csv-parser";

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
		if (!result.success) {
			expect(result.error).toBe("Empty string");
		}
	});

	it("returns error when given an invalid CSV", () => {
		const result = parseCSV("invalid");
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe("Empty data");
		}
	});

	it("returns error when given an empty CSV", () => {
		const result = parseCSV("\n");
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe("Cannot parse headers");
		}
	});

	it("returns error when given empty headers", () => {
		const result = parseCSV("\n Alice, 30\nBob, 25");
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe("Cannot parse headers");
		}
	});

	it("returns rows when given a CSV only with headers", () => {
		const result = parseCSV("name,age");
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe("Empty data");
		}
	});

	it("returns error when given an empty CSV rows", () => {
		const result = parseCSV("name,age\n");
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe("Empty data");
		}
	});

	it("returns headers when given a CSV", () => {
		const input = "name,age\nAlice,30\nBob,25";
		const result = parseCSV(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.headers).toHaveLength(2);
			expect(result.headers).toEqual(["name", "age"]);
		}
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

	it("returns rows when given a CSV with one column", () => {
		const input = "name\n Alice\nBob";
		const result = parseCSV(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.rows).toHaveLength(2);
			expect(result.rows[0].name).toBe("Alice");
			expect(result.rows[1].name).toBe("Bob");
		}
	});

	it("returns rows when given a CSV with many rows and empty row", () => {
		const input = "name, age, height\n Alice , 30, 170\n\nBob , 25, 180";
		const result = parseCSV(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.rows).toHaveLength(2);
			expect(result.rows[0].name).toBe("Alice");
			expect(result.rows[1].name).toBe("Bob");
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

	it("returns rows when given a CSV without some cells", () => {
		const input = "name, age, height\n Alice , , 170\nBob , 25";
		const result = parseCSV(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.rows).toHaveLength(2);
			expect(result.rows[0].name).toBe("Alice");
			expect(result.rows[0].age).toBe("");
			expect(result.rows[1].name).toBe("Bob");
			expect(result.rows[1].height).toBe(null);
		}
	});
});
