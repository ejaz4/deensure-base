"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/assets/svg/logo-64-dark.svg";
import { Button } from "@/components/button";
import styles from "../onboarding.module.css";
import { AutoObtainCity } from "@/libs/location";
import { Dialogue, LoadStorageFile } from "@/libs/mal";
import { useRouter } from "next/navigation";
import { DevicePadding, DevicePaddingType } from "@/components/device/padding";
import { useRef } from "react";

import backgrounds from "../backgrounds.module.css";
import { RotateCw } from "lucide-react";

const DonePage = () => {
	const screenContent = useRef<HTMLDivElement>(null);
	const screenBackground = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const [city, setCity] = useState("");

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

	const getLocationFromFile = async () => {
		const location = await LoadStorageFile("coords");
		if (location) {
			setCity(JSON.parse(location).city);
		}
	};

	useEffect(() => {
		getLocationFromFile();
	}, []);

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
					<h1>You&apos;re in {city}</h1>
					<p>
						Your location is set to {city}. You can change this in
						settings at any time.
					</p>

					<p>
						If you have provided location access, deensure will
						periodically use your location again to update your city
						incase you leave {city}, but this behaviour can be
						turned off in settings.
					</p>
				</div>

				<div className={styles.horizButtonContainer}>
					<Button
						onClick={async () => {
							goToUrl("/onboarding/setup");
						}}
						image={<RotateCw size={16} />}
					/>
					<Button
						onClick={async () => {
							goToUrl("/onboarding/done");
						}}
					>
						Bismillah
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DonePage;
