"use client";

import { LoadStorageFile } from "@/libs/mal";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import { useEffect, useState } from "react";
import moment from "moment";
import title from "title";
import styles from "../adhan.module.css";
import "moment/min/locales";

export const NextPrayer = () => {
	const [loading, setLoading] = useState(true);
	const [coords, setCoords] = useState<{
		latitude: number;
		longitude: number;
		city: string;
	} | null>(null);

	const [currentDisplay, setCurrentDisplay] = useState<string | null>(
		"counting"
	);

	const [nextPrayer, setNextPrayer] = useState<string | null>(null);
	const [nextPrayerTime, setNextPrayerTime] = useState<Date | null>(null);

	const [nextPrayerFormatted, setNextPrayerFormatted] = useState<
		string | null
	>(null);

	useEffect(() => {
		(async () => {
			setCoords(JSON.parse((await LoadStorageFile("coords")) as string));
		})();
	}, []);

	useEffect(() => {
		console.log(coords);
		if (coords == null) {
			return;
		}

		const coordinates = new Coordinates(coords.latitude, coords.longitude);
		const params = CalculationMethod.UmmAlQura();
		const date = new Date(Date.now());

		const prayerTimes = new PrayerTimes(coordinates, date, params);
		moment.locale(navigator.language);

		setInterval(() => {
			setNextPrayer(title(prayerTimes.nextPrayer()));
			setNextPrayerTime(
				prayerTimes.timeForPrayer(prayerTimes.nextPrayer())
			);

			setNextPrayerFormatted(
				moment(
					prayerTimes.timeForPrayer(prayerTimes.nextPrayer())
				).fromNow()
			);
			setLoading(false);
		}, 10);

		setTimeout(() => {
			setCurrentDisplay("static");
		}, 2250);
	}, [coords]);

	return (
		<>
			{!loading && (
				<>
					{currentDisplay == "counting" && (
						<div className={styles.nextPrayerCounting}>
							<p>{nextPrayer}</p>
							<div className={styles.nextPrayerModule}>
								<h1>{nextPrayerFormatted}</h1>
							</div>
						</div>
					)}

					{currentDisplay == "static" && (
						<div className={styles.nextPrayerStatic}>
							<div className={styles.nextPrayerModule}>
								<span>
									{nextPrayer} {nextPrayerFormatted}
								</span>
							</div>
							<h1>
								{moment(nextPrayerTime)
									.locale(navigator.language)

									.format("LT")}
							</h1>
						</div>
					)}
				</>
			)}
			{loading && <p>Loading...</p>}
		</>
	);
};
