"use client";
import { GetPrayersForDate } from "@/libs/timing";
import { CurrentPrayer } from "./components/currentPrayer";
import { useEffect, useState } from "react";
import { DateSelector } from "./components/dateSelector";
import styles from "./adhan.module.css";

export const AdhanTimingPage = () => {
	const [currentDate, setCurrentDate] = useState<Date>(new Date(Date.now()));

	const dateNow = currentDate;

	useEffect(() => {
		(async () => {
			console.log(await GetPrayersForDate(new Date(Date.now())));
		})();
	}, []);

	return (
		<div>
			<div className={styles.dateHeader}>
				{currentDate != dateNow && (
					<h1>
						{currentDate.toLocaleDateString(navigator.language, {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</h1>
				)}
				{currentDate == dateNow && <CurrentPrayer />}
			</div>
			<div>
				<DateSelector
					currentDate={currentDate}
					setCurrentDate={setCurrentDate}
				/>
			</div>
		</div>
	);
};
