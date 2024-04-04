"use client";
import { Footer } from "@/components/footer";
import { StatusBarHeight } from "@/libs/mal";
import { useState, useEffect } from "react";

const DefaultApp = ({ children }: { children: React.ReactNode }) => {
	const [statusBarHeight, setStatusBarHeight] = useState(0);

	useEffect(() => {
		const height = StatusBarHeight();
		setStatusBarHeight(height);
	}, []);

	return (
		<div>
			<div>{children}</div>
			<style>
				{`:root {
					--status-bar-height: ${statusBarHeight}px
				}`}
			</style>
		</div>
	);
};

export default DefaultApp;
