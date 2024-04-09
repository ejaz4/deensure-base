"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import styles from "../../adhan.module.css";
import { LoadStorageFile } from "@/libs/mal";
import { Navigation } from "lucide-react";

export const DateSelector = ({
	currentDate,
	setCurrentDate,
}: {
	currentDate: Date;
	setCurrentDate: (date: Date) => void;
}) => {
	const locationItem = useMemo(
		() => (
			<Suspense
				fallback={
					<button className={styles.dateSelectorItem}>
						<Navigation size={16} />
					</button>
				}
			>
				<LocationItem />
			</Suspense>
		),
		[]
	);
	return (
		<div className={styles.dateSelector}>
			{locationItem}
			{[...Array(365)].map((_, i) => (
				<DateItem
					key={i}
					date={new Date(Date.now() + i * 86400000)}
					setCurrentDate={setCurrentDate}
					selected={
						currentDate.getMonth() ===
							new Date(Date.now() + i * 86400000).getMonth() &&
						currentDate.getFullYear() ===
							new Date(Date.now() + i * 86400000).getFullYear() &&
						currentDate.getDate() ===
							new Date(Date.now() + i * 86400000).getDate()
					}
				/>
			))}
		</div>
	);
};

const LocationItem = async () => {
	const [location, setLocation] = useState<string>("");

	useEffect(() => {
		(async () => {
			const coords = JSON.parse(
				(await LoadStorageFile("coords")) as string
			);

			if (coords == null) return null;

			setLocation(coords.city);
		})();
	}, []);

	return (
		<button className={styles.dateSelectorItem}>
			<Navigation size={16} /> {location}
		</button>
	);
};

const DateItem = ({
	date,
	setCurrentDate,
	selected,
}: {
	date: Date;
	setCurrentDate: (date: Date) => void;
	selected: boolean;
}) => {
	const [localisedDate, setLocalisedDate] = useState<string>();

	useEffect(() => {
		setLocalisedDate(
			date.toLocaleDateString(navigator.language, {
				weekday: "long",
				month: "long",
				day: "numeric",
			})
		);

		if (date.getFullYear() == new Date(Date.now()).getFullYear()) {
			if (date.getMonth() === new Date(Date.now()).getMonth()) {
				if (date.getDate() === new Date(Date.now()).getDate()) {
					setLocalisedDate("Today");
				}

				if (
					date.getDate() === new Date(Date.now() + 86400000).getDate()
				) {
					setLocalisedDate("Tomorrow");
				}

				if (
					date.getDate() === new Date(Date.now() - 86400000).getDate()
				) {
					setLocalisedDate("Yesterday");
				}
			}
		}
	}, [date]);

	return (
		<button
			onClick={() => setCurrentDate(date)}
			className={`${styles.dateSelectorItem} ${
				selected ? styles.dateSelectorItemActive : ""
			}`}
		>
			{localisedDate}
		</button>
	);
};
