"use client";

import React from "react";
import Logo from "@/assets/svg/logo-64-dark.svg";
import { Button } from "@/components/button";
import styles from "../onboarding.module.css";
import { AutoObtainCity } from "@/libs/location";
import { Dialogue, LoadStorageFile } from "@/libs/mal";
import { useRouter } from "next/navigation";
import { DevicePadding, DevicePaddingType } from "@/components/device/padding";
import { useRef } from "react";
import backgrounds from "../backgrounds.module.css";
import { ChevronLeft, LocateIcon, LockIcon, Navigation } from "lucide-react";

const SetupPage = () => {
	const screenContent = useRef<HTMLDivElement>(null);
	const screenBackground = useRef<HTMLDivElement>(null);
	const router = useRouter();

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
					<h1>Where are you?</h1>
					<p>
						To use deensure&apos;s core service, you need to provide
						a location to get adhan timings.
					</p>
					<p>
						You can let deensure automatically obtain location
						information.
					</p>
				</div>

				<div className={styles.horizButtonContainer}>
					<Button
						image={<ChevronLeft size={16} />}
						onClick={async () => {
							goToUrl("/onboarding/welcome");
						}}
					></Button>
					<Button
						image={<Navigation size={16} />}
						onClick={async () => {
							const locationObtain = await AutoObtainCity();
							goToUrl("/onboarding/done");
							return true;
						}}
						withStates={true}
					>
						Obtain Automatically
					</Button>
				</div>

				<div className={`${styles.setupText} ${styles.subText}`}>
					<LockIcon size={16} />
					<p>
						Location data is processed locally at all times and
						never leaves your device.
					</p>
					<p>Learn more about the security of deensure</p>
				</div>
			</div>
		</div>
	);
};

export default SetupPage;
