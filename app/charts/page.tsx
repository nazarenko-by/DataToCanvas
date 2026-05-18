"use client";

import { useMemo } from "react";
import { useRouter } from "next/router";

const ChartPage = () => {
	const router = useRouter();

	const active = useMemo(() => {
		const tab = router.query.tab;
		if (tab == undefined) return "";
		if (typeof tab === "string") return tab;
		return "";
	}, [router.query.tab]);

	return <div>{active ? <h1>Chart Page</h1> : <h1>Not Active</h1>}</div>;
};

export default ChartPage;
