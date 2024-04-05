"use client";
import { GetPrayersForDate } from "@/libs/timing";
import { CurrentPrayer } from "./components/currentPrayer";
import { useEffect, useState } from "react";
import { DateSelector } from "./components/dateSelector";
import styles from "./adhan.module.css";

export const AdhanTimingPage = () => {
	const [currentDate, setCurrentDate] = useState<Date>(new Date(Date.now()));

	const [dateNow, setDateNow] = useState<Date>(new Date(Date.now()));

	useEffect(() => {
		(async () => {
			console.log(await GetPrayersForDate(new Date(Date.now())));
		})();

		setDateNow(new Date(Date.now()));
	}, []);

	return (
		<div>
			<div className={styles.dateHeader}>
				{currentDate.toDateString() != dateNow.toDateString() && (
					<h1>
						{currentDate.toLocaleDateString(navigator.language, {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</h1>
				)}
				{currentDate.toDateString() == dateNow.toDateString() && (
					<CurrentPrayer />
				)}
			</div>
			<div>
				<DateSelector
					currentDate={currentDate}
					setCurrentDate={setCurrentDate}
				/>
			</div>
			<div>
				<p>{currentDate.toDateString()}</p>
				<p>{dateNow.toDateString()}</p>
			</div>
		</div>
	);
};
