import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

import { ParseResult } from "@src/lib/csv-parser";

interface DataState {
	fileData: ParseResult | null;
	xKeys: string[] | null;
	yKeys: string[] | null;
	xActive: string | null;
	yActive: string | null;
	setFileData: (data: ParseResult | null) => void;
	setXKeys: (keys: string[] | null) => void;
	setYKeys: (keys: string[] | null) => void;
	setXActive: (key: string | null) => void;
	setYActive: (key: string | null) => void;
}

export const useDataStore = createWithEqualityFn<DataState>(
	(set) => ({
		fileData: null,
		xKeys: null,
		yKeys: null,
		xActive: null,
		yActive: null,
		setFileData: (data) => set({ fileData: data }),
		setXKeys: (keys) => set({ xKeys: keys }),
		setYKeys: (keys) => set({ yKeys: keys }),
		setXActive: (key) => set({ xActive: key }),
		setYActive: (key) => set({ yActive: key }),
	}),
	shallow
);
