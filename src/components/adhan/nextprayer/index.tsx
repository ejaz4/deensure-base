"use client";

import { LoadStorageFile } from "@/libs/mal";
import {
	Coordinates,
	CalculationMethod,
	PrayerTimes,
	Qibla,
	CalculationParameters,
} from "adhan";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import title from "title";
import styles from "../adhan.module.css";
import "moment/min/locales";
import { GetNextPrayer } from "@/libs/timing";
import { Hourglass } from "lucide-react";

export const NextPrayer = () => {
	const [loading, setLoading] = useState(true);
	const [currentDisplay, setCurrentDisplay] = useState<string | null>(
		"counting"
	);

	const [nextPrayer, setNextPrayer] = useState<string | null>(null);
	const [nextPrayerTime, setNextPrayerTime] = useState<Date | null>(null);

	const prayerDummy = useRef<HTMLDivElement>(null);
	const prayerElem = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (prayerElem.current) {
			prayerElem.current.addEventListener("click", () => {
				if (prayerElem.current == null) return;
				if (prayerDummy.current == null) return;

				const prayerElemRect =
					prayerElem.current.getBoundingClientRect();

				console.log(prayerElemRect);

				if (prayerDummy.current.style.display == "none") {
					prayerDummy.current.style.width =
						prayerElemRect.width + "px";
					prayerDummy.current.style.height =
						prayerElemRect.height + "px";
					prayerDummy.current.style.display = "block";

					prayerElem.current.style.top = prayerElemRect.top + "px";
					prayerElem.current.style.left = prayerElemRect.left + "px";
					prayerElem.current.style.maxWidth =
						prayerElemRect.width + "px";
					prayerElem.current.style.maxHeight =
						prayerElemRect.height + "px";

					prayerElem.current.classList.add(styles.nextPrayerLaunch);
				}
			});
		}
	}, [prayerElem]);

	const [nextPrayerFormatted, setNextPrayerFormatted] = useState<
		string | null
	>(null);

	const refreshTiming = async () => {
		console.log("Getting next prayer");
		const nextPrayer = await GetNextPrayer();

		if (nextPrayer == null) return;

		setNextPrayerFormatted(nextPrayer?.formatted);
		setNextPrayerTime(nextPrayer?.time);
		setNextPrayer(nextPrayer?.name);
	};

	useEffect(() => {
		refreshTiming();
		setInterval(() => {
			refreshTiming();
		}, 1000);
	}, []);

	return (
		<div
			style={{
				width: "100%",
			}}
		>
			<div ref={prayerElem} className={styles.nextPrayer}>
				<div className={styles.nextPrayerContent}>
					<div>
						<div className={styles.featureIndicator}>
							<Hourglass size={16} color={"white"} />
						</div>
					</div>
					<div className={styles.nextPrayerSub}>
						<div className={styles.nextPrayerText}>
							<p className={styles.nextPrayerName}>
								{nextPrayer} in
							</p>
							<h1>{nextPrayerFormatted}</h1>
						</div>
						<div className={styles.nextPrayerDescriptor}>
							<span>Prayer Times</span>
						</div>
					</div>
				</div>
				<div className={styles.nextPrayerBackdrop}>
					<img src="/images/backdrops/prayer-mid.png" alt="" />
					<div className={styles.nextPrayerNoise} />
				</div>
			</div>
			<div
				style={{
					display: "none",
				}}
				ref={prayerDummy}
				className={styles.nextPrayerDummy}
			></div>
		</div>
	);
};
