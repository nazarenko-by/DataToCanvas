import BarChart from "@/src/components/BarChart";

export default function Home() {
	return (
		<BarChart
			data={[
				{ label: "A", value: 10 },
				{ label: "B", value: 20 },
				{ label: "C", value: 30 },
				{ label: "D", value: 40 },
				{ label: "E", value: 50 },
			]}
			width={600}
			height={400}
		/>
	);
}
