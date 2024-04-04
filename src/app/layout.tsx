import type { Metadata } from "next";
import "./globals.css";
import { useEffect, useState } from "react";
import { StatusBarHeight } from "@/libs/mal";
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
				<link href="/manifest.json" rel="manifest" />
			</head>
			<body>{children}</body>
		</html>
	);
}
