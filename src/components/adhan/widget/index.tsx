"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "../adhan.module.css";
import "moment/min/locales";
import { GetNextPrayer } from "@/libs/timing";
import { ChevronDown, Hourglass, X } from "lucide-react";
import { Haptic, HapticType } from "@/libs/mal";
import { DevicePadding, DevicePaddingType } from "@/components/device/padding";

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
	const [appOpen, setAppOpen] = useState(false);

	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const widgetContent = useRef<HTMLDivElement>(null);

	const appContent = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log("App open", appOpen);
		if (appOpen) {
			if (appElem.current == null) return;
			appElem.current.classList.remove(styles.nextPrayerLaunch);
			appElem.current.classList.add(styles.nextPrayerOpen);
		} else {
			if (appElem.current == null) return;
			if (appDummy.current == null) return;

			appDummy.current.style.display = "none";
			appElem.current.classList.remove(styles.nextPrayerClose);
			appElem.current.style.width = "";
			appElem.current.style.height = "";
			appElem.current.style.top = "";
			appElem.current.style.left = "";
			appElem.current.style.maxWidth = "";
			appElem.current.style.maxHeight = "";
		}
	}, [appOpen]);

	const openApp = () => {
		if (appElem.current == null) return;
		if (appDummy.current == null) return;

		const appElemRect = appElem.current.getBoundingClientRect();

		if (appDummy.current.style.display == "none") {
			appDummy.current.style.width = appElemRect.width + "px";
			appDummy.current.style.height = appElemRect.height + "px";
			appDummy.current.style.display = "block";

			appElem.current.style.top = appElemRect.top + "px";
			appElem.current.style.left = appElemRect.left + "px";
			appElem.current.style.maxWidth = appElemRect.width + "px";
			appElem.current.style.maxHeight = appElemRect.height + "px";

			// TODO Migrate legacy nextPrayerLaunch to new appElem
			appElem.current.classList.add(styles.nextPrayerLaunch);
		}
	};

	const closeApp = () => {
		if (appElem.current == null) return;
		if (appDummy.current == null) return;

		if (appElem.current.classList.contains(styles.nextPrayerLaunch)) return;

		appElem.current.classList.remove(styles.nextPrayerOpen);
		appElem.current.classList.add(styles.nextPrayerClose);
		// appElem.current.style.maxWidth = width + "px";
		// appElem.current.style.maxHeight = height + "px";
		// appElem.current.style.top = y + "px";
		// appElem.current.style.left = x + "px";
	};

	return (
		<div
			style={{
				width: "100%",
			}}
			onTouchStart={(e) => {
				if (!appOpen) {
					Haptic(HapticType.Light);
				}
			}}
		>
			<div
				ref={appElem}
				onClick={() => openApp()}
				className={styles.nextPrayer}
				onAnimationEnd={(e) => {
					if (appElem.current == null) return;
					if (appDummy.current == null) return;

					console.log(e.currentTarget.className);

					if (
						appElem.current.classList.contains(
							styles.nextPrayerLaunch
						)
					) {
						setAppOpen(true);
					} else if (
						appElem.current.classList.contains(
							styles.nextPrayerOpen
						)
					) {
						setAppOpen(true);
					} else {
						setAppOpen(false);
					}
					console.log("Transition end");
				}}
			>
				<div
					ref={widgetContent}
					onTransitionEnd={() => {
						if (appElem.current == null) return;
						if (widgetContent.current == null) return;
						if (appContent.current == null) return;

						if (!appOpen) {
							widgetContent.current.classList.add(
								styles.nextPrayerContentHide
							);
							appContent.current.classList.add(
								styles.appContainerShow
							);
						} else {
							widgetContent.current.classList.remove(
								styles.nextPrayerContentHide
							);
							appContent.current.classList.remove(
								styles.appContainerShow
							);
						}
					}}
					className={styles.nextPrayerContent}
				>
					{content}
				</div>

				<div className={styles.nextPrayerBackdrop}>{backdrop}</div>

				<div
					ref={appContent}
					onTouchEnd={(e) => {
						if (e.currentTarget.scrollTop < 10) {
							closeApp();
						}
					}}
					onTransitionEnd={() => {
						if (appElem.current == null) return;
						if (widgetContent.current == null) return;
						if (appContent.current == null) return;

						if (!appOpen) {
							widgetContent.current.classList.add(
								styles.nextPrayerContentHide
							);
							appContent.current.classList.add(
								styles.appContainerShow
							);
						} else {
							widgetContent.current.classList.remove(
								styles.nextPrayerContentHide
							);
							appContent.current.classList.remove(
								styles.appContainerShow
							);
						}
					}}
					className={styles.appContainer}
				>
					<div className={styles.appGestureIcon}>
						<ChevronDown color="white" />
					</div>
					<div className={styles.appGesture}>
						<DevicePadding type={DevicePaddingType.StatusBar} />
						{appOpen && app && app}
					</div>
				</div>
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
