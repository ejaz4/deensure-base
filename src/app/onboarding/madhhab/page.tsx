"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/assets/svg/logo-64-dark.svg";
import { Button } from "@/components/button";
import styles from "../onboarding.module.css";
import { useRouter } from "next/navigation";
import { DevicePadding, DevicePaddingType } from "@/components/device/padding";
import { useRef } from "react";

import backgrounds from "../backgrounds.module.css";
import { Check, ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import { Radio } from "@/components/radio";
import { SaveStorageFile } from "@/libs/mal";

const MadhhabPage = () => {
	const screenContent = useRef<HTMLDivElement>(null);
	const screenBackground = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const [selectedMadhhab, setSelectedMadhhab] = useState<string>("hanafi");

	const goToUrl = (url: string) => {
		if (screenContent.current) {
			screenContent.current.classList.remove(styles.fadeUpEntry);
			screenContent.current.classList.add(styles.fadeUp);
			screenContent.current.addEventListener("animationend", (e) => {
				e.stopPropagation();
			});

			if (screenBackground.current) {
				screenBackground.current.classList.add(backgrounds.fadeUpExit);
				screenBackground.current.addEventListener(
					"animationend",
					(e) => {
						router.push(url);
					}
				);
			}
		}
	};

	return (
		<div
			ref={screenBackground}
			className={`${backgrounds.bubblyRainbow} ${backgrounds.bubblyRainbowEntry}`}
		>
			<DevicePadding type={DevicePaddingType.StatusBar} />
			<div
				className={`${styles.screenContent} ${styles.fadeUpEntry}`}
				ref={screenContent}
			>
				<div
					className={styles.welcomeHeader}
					style={{
						justifyContent: "center",
					}}
				>
					<Logo></Logo>
				</div>

				<div className={styles.setupText}>
					<h1>Which Madhhab do you follow?</h1>

					<p>Please choose the Madhhab you follow.</p>
					<p>
						Your choice may change the Asr time displayed in the
						app.
					</p>

					<Radio
						hook={setSelectedMadhhab}
						options={{
							hanafi: "Hanafi",
							shafi: "Shafi'i",
							maliki: "Maliki",
							hanbali: "Hanbali",
						}}
					/>
				</div>

				<div className={styles.horizButtonContainer}>
					<Button
						onClick={async () => {
							goToUrl("/onboarding/done");
						}}
						image={<ChevronLeft size={16} />}
					/>
					<Button
						onClick={async () => {
							goToUrl("/default/adhaan");
							SaveStorageFile("madhhab", selectedMadhhab);
						}}
						image={<Check size={16} />}
					>
						Bismillah
					</Button>
				</div>
			</div>
		</div>
	);
};

export default MadhhabPage;
