/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "../adhan.module.css";
import "moment/min/locales";
import { GetNextPrayer } from "@/libs/timing";
import { Hourglass } from "lucide-react";
import { Haptic, HapticType } from "@/libs/mal";

export const AppWidget = ({
	content,
	app,
	backdrop,
}: {
	content: React.ReactNode;
	app: React.ReactNode;
	backdrop: React.ReactNode;
}) => {
	const appDummy = useRef<HTMLDivElement>(null);
	const appElem = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (appElem.current) {
			appElem.current.addEventListener("click", () => {
				if (appElem.current == null) return;
				if (appDummy.current == null) return;

				const appElemRect = appElem.current.getBoundingClientRect();

				console.log(appElemRect);

				if (appDummy.current.style.display == "none") {
					appDummy.current.style.width = appElemRect.width + "px";
					appDummy.current.style.height = appElemRect.height + "px";
					appDummy.current.style.display = "block";

					appElem.current.style.top = appElemRect.top + "px";
					appElem.current.style.left = appElemRect.left + "px";
					appElem.current.style.maxWidth = appElemRect.width + "px";
					appElem.current.style.maxHeight = appElemRect.height + "px";

					appElem.current.classList.add(styles.nextPrayerLaunch);
				}
			});
		}
	}, [appElem]);

	return (
		<div
			style={{
				width: "100%",
			}}
			onTouchStart={(e) => {
				Haptic(HapticType.Light);
			}}
		>
			<div ref={appElem} className={styles.nextPrayer}>
				{content}
				{backdrop}
			</div>
			<div
				style={{
					display: "none",
				}}
				ref={appDummy}
				className={styles.nextAppDummy}
			></div>
		</div>
	);
};
