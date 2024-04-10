"use client";
import { GetPrayersForDate } from "@/libs/timing";
import { PrayerTimes } from "adhan";
import styles from "../../adhan.module.css";
import { RefObject, useEffect, useRef, useState } from "react";
import moment, { max } from "moment";
import _ from "lodash";

export const AdhanTimesCarousel = ({
	date,
	setDate,
}: {
	date: Date;
	setDate: (date: Date) => void;
}) => {
	const [tomorrowDate, setTomorrowDate] = useState(
		new Date(date.getTime() + 86400000)
	);
	const [yesterdayDate, setYesterdayDate] = useState(
		new Date(date.getTime() - 86400000)
	);

	useEffect(() => {
		setTimeout(() => {
			if (carousel.current == null) return;
			if (currentElem.current == null) return;
			currentElem.current.scrollIntoView({
				behavior: "instant",
				block: "center",
				inline: "center",
			});
		}, 50);
	}, [date]);

	useEffect(() => {
		setTimeout(() => {
			setTomorrowDate(new Date(date.getTime() + 86400000));
			setYesterdayDate(new Date(date.getTime() - 86400000));
		}, 100);
	}, [date]);

	const carousel = useRef<HTMLDivElement>(null);
	const currentElem = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={carousel}
			onScroll={_.debounce(() => {
				if (carousel.current == null) return;
				if (currentElem.current == null) return;
				const carouselRect = carousel.current.getBoundingClientRect();

				// Make a variable to get which page the carousel is on
				const page = Math.round(
					carousel.current.scrollLeft / carouselRect.width
				);

				// Make a variable to get the maximum amount of pages
				const maxPage =
					Math.round(
						carousel.current.scrollWidth / carouselRect.width
					) - 1;

				if (maxPage == 1) {
					if (page == 1) {
						setDate(tomorrowDate);
					}
				}

				if (maxPage == 2) {
					if (page == 0) {
						setDate(yesterdayDate);
					}
					if (page == 2) {
						setDate(tomorrowDate);
					}
				}

				console.log(page, maxPage);
			}, 20)}
			className={styles.prayerTimesCarousel}
		>
			{date.toDateString() != new Date(Date.now()).toDateString() && (
				<AdhanTimes date={yesterdayDate} />
			)}
			<AdhanTimes makeRef={currentElem} date={date} />
			<AdhanTimes date={tomorrowDate} />
		</div>
	);
};

const AdhanTimes = ({
	date,
	makeRef,
}: {
	date: Date;
	makeRef?: RefObject<HTMLDivElement>;
}) => {
	const [adhanTimes, setAdhanTimes] = useState<PrayerTimes | null>(null);

	useEffect(() => {
		(async () => {
			const times = await GetPrayersForDate(date);
			setAdhanTimes(times);
		})();
	}, [date]);

	return (
		<div ref={makeRef} className={styles.prayerTimes}>
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
