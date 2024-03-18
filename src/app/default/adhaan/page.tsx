"use client";
import { NextPrayer } from "@/components/adhan/nextprayer";
import styles from "../app.module.css";
import { DevicePadding } from "@/components/device/padding";
import LogoDark from "@/assets/svg/logo-64-dark.svg";
import LogoLight from "@/assets/svg/logo-64-light.svg";
import { useEffect, useRef } from "react";
import { Button } from "@/components/button";

const AdhaanTab = () => {
	const transformYRef = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	if (transformYRef.current) {
	// 		transformYRef.current.classList.add(styles.logoEntry);
	// 	}
	// }, [transformYRef]);
	return (
		<div>
			<DevicePadding />
			<div className={styles.screenContent}>
				<div className={`${styles.header}`}>
					<div></div>
					<div className={`${styles.logoEntry}`}>
						<div className={styles.logoScale}>
							<LogoDark />
						</div>
					</div>
					<div></div>
				</div>

				<div className={styles.pageContent}>
					<NextPrayer />
					<Button onClick={() => {}}>Click here!</Button>
				</div>
			</div>
		</div>
	);
};

export default AdhaanTab;
