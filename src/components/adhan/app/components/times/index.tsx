"use client";
import { GetPrayersForDate } from "@/libs/timing";
import { PrayerTimes } from "adhan";
import styles from "../../adhan.module.css";
import { useEffect, useState } from "react";
import moment from "moment";

export const AdhanTimes = ({ date }: { date: Date }) => {
	const [adhanTimes, setAdhanTimes] = useState<PrayerTimes | null>(null);

	useEffect(() => {
		(async () => {
			const times = await GetPrayersForDate(date);
			setAdhanTimes(times);
		})();
	}, [date]);

	return (
		<div className={styles.prayerTimes}>
			{adhanTimes && (
				<>
					<AdhanTimeElement
						time={adhanTimes.fajr}
						name="Fajr"
						date={date}
					/>
					<AdhanTimeElement
						time={adhanTimes.sunrise}
						name="Sunrise"
						date={date}
						showRelative={false}
					/>
					<AdhanTimeElement
						time={adhanTimes.dhuhr}
						name="Dhuhr"
						date={date}
					/>
					<AdhanTimeElement
						time={adhanTimes.asr}
						name="Asr"
						date={date}
					/>
					<AdhanTimeElement
						time={adhanTimes.maghrib}
						name="Maghrib"
						date={date}
					/>
					<AdhanTimeElement
						time={adhanTimes.isha}
						name="Isha"
						date={date}
					/>
				</>
			)}
		</div>
	);
};

const AdhanTimeElement = ({
	time,
	name,
	date,
	showRelative = true,
}: {
	time: Date;
	name: string;
	date: Date;
	showRelative?: boolean;
}) => {
	const [relativeTime, setRelativeTime] = useState<string | null>(null);
	const [localisedTime, setLocalisedTime] = useState<string | null>(null);

	useEffect(() => {
		moment.locale(navigator.language);
		setRelativeTime(moment(time).fromNow());
		setLocalisedTime(
			time.toLocaleTimeString(navigator.language, {
				hour: "2-digit",
				minute: "2-digit",
			})
		);
	}, [date, time]);

	return (
		<div className={styles.prayerTimeItem}>
			<div className={styles.prayerTimeMeta}>
				<span className={styles.prayerName}>{name}</span>
				{showRelative && (
					<span className={styles.prayerRelTime}>{relativeTime}</span>
				)}
			</div>
			<div>
				{localisedTime && (
					<span className={styles.prayerTime}>{localisedTime}</span>
				)}
			</div>
		</div>
	);
};
