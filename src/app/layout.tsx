import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
	title: "Deensure Base",
	description: "The Deensure base user-interface.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link href="/manifest.json" rel="manifest" />
			</head>
			<body>{children}</body>
		</html>
	);
}
