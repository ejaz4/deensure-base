"use client";

import React, { useEffect, useState } from "react";
import styles from "./onboarding.module.css";
import { StatusBarHeight } from "@/libs/mal";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
	const [statusBarHeight, setStatusBarHeight] = useState(0);

	useEffect(() => {
		const height = StatusBarHeight();
		setStatusBarHeight(height);
	}, []);

	return (
		<>
			<div className={styles.onboarding}>{children}</div>
			<style>
				{`:root {
					--status-bar-height: ${statusBarHeight}px
				}`}
			</style>
		</>
	);
};

export default OnboardingLayout;
