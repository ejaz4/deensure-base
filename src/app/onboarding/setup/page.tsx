"use client";

import React from "react";
import Logo from "@/assets/svg/logo.svg";
import { Button } from "@/components/button";
import styles from "../onboarding.module.css";
import { AutoObtainCity } from "@/libs/location";
import { Dialogue, LoadStorageFile } from "@/libs/mal";

const SetupPage = () => {
	return (
		<div className={styles.screenContent}>
			<h1>Where are you?</h1>
			<p>
				To use deensure&apos;s core service, you need to provide a
				location to get adhan timings.
			</p>
			<p>
				You can let deensure automatically obtain location information
				or enter a city to get guidance for.
			</p>
			<Button
				onClick={async () => {
					const geolo = await AutoObtainCity();

					if (geolo) {
						Dialogue(
							"Location set to " +
								JSON.parse(
									(await LoadStorageFile("coords")) as string
								).city.cityName
						);
					}
				}}
			>
				Obtain Automatically
			</Button>
			<Button type={"secondary"}>Manually enter city</Button>

			<span className={"disclaimer"}>
				deensure always uses on-device processing of your location.
			</span>
		</div>
	);
};

export default SetupPage;
