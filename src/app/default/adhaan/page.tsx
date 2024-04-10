"use client";
import { NextPrayer, NextPrayerBackdrop } from "@/components/adhan/nextprayer";
import styles from "../app.module.css";
import { DevicePadding } from "@/components/device/padding";
import LogoDark from "@/assets/svg/logo-64-dark.svg";
import LogoLight from "@/assets/svg/logo-64-light.svg";
import { useEffect, useRef } from "react";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { AppWidget } from "@/components/adhan/widget";
import { AdhanTimingPage } from "@/components/adhan/app";

const AdhaanTab = () => {
	const logoRef = useRef<HTMLDivElement>(null);
	const pageContentRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		if (logoRef.current) {
			logoRef.current.addEventListener("animationend", () => {
				logoRef.current?.classList.remove(styles.logoEntry);

				logoRef.current?.classList.add(styles.logo);
			});
		}
	}, [logoRef]);

	useEffect(() => {
		if (pageContentRef.current) {
			pageContentRef.current.addEventListener("animationend", () => {
				pageContentRef.current?.classList.remove(
					styles.pageContentAnimation
				);
			});
		}
	}, [pageContentRef]);

	return (
		<div>
			<DevicePadding />
			<div className={styles.screenContent}>
				<div className={`${styles.header}`}>
					<div></div>
					<div ref={logoRef} className={`${styles.logoEntry}`}>
						<div className={styles.logoScale}>
							<LogoDark />
						</div>
					</div>
					<div></div>
				</div>

				<div
					ref={pageContentRef}
					className={`${styles.pageContent} ${styles.pageContentAnimation}`}
				>
					<AppWidget
						content={<NextPrayer />}
						backdrop={<NextPrayerBackdrop />}
						app={<AdhanTimingPage />}
					/>
					<div
						style={{
							width: "50%",
							display: "flex",
							justifyContent: "flex-start",
							alignSelf: "flex-start",
						}}
					>
						<AppWidget
							content={<NextPrayer />}
							backdrop={<NextPrayerBackdrop />}
							app={<AdhanTimingPage />}
						/>
					</div>
					<AppWidget
						content={
							<div style={{ color: "black" }}>
								Another widget!
							</div>
						}
						backdrop={<></>}
						app={<></>}
					/>
					<Button
						onClick={() => {
							router.push("/onboarding/welcome");
						}}
					>
						Click here!
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AdhaanTab;
