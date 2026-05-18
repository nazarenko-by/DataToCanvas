import { ImageResponse } from "next/og";

import { LogoMark } from "@/src/assets/icons";

export default function Icon() {
	return new ImageResponse(
		<LogoMark
			width={32}
			height={32}
			style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
		/>,
		{ width: 32, height: 32 }
	);
}
