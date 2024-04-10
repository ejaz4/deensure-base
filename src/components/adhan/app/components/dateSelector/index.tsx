"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import styles from "../../adhan.module.css";
import { LoadStorageFile } from "@/libs/mal";
import { Loader, MapPin, Navigation } from "lucide-react";
import { ManualInput } from "@/components/location/search/manual";
import { SearchForLocation } from "@/components/location/search/skeleton";

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
						<Loader size={16} />
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
	const [automated, setAutomated] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const coords = JSON.parse(
				(await LoadStorageFile("coords")) as string
			);

			if (coords == null) return null;
			setLocation(coords.city);

			if (coords.automated) {
				setAutomated(true);
			}
		})();
	}, []);

	return (
		<>
			<button
				onClick={(e) => {
					setOpen(true);
				}}
				className={styles.dateSelectorItem}
			>
				{automated && <Navigation size={16} />}
				{!automated && <MapPin size={16} />}
				{location}
			</button>

			{open && <SearchForLocation setOpen={setOpen} />}
		</>
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
	const elemRef = useRef<HTMLButtonElement>(null);

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

	useEffect(() => {
		setTimeout(() => {
			if (selected) {
				if (elemRef.current) {
					elemRef.current.scrollIntoView({
						behavior: "smooth",
						block: "center",
						// inline: "center",
					});
				}
			}
		}, 100);
	}, [selected]);

	return (
		<button
			ref={elemRef}
			onClick={() => setCurrentDate(date)}
			className={`${styles.dateSelectorItem} ${
				selected ? styles.dateSelectorItemActive : ""
			}`}
		>
			{localisedDate}
		</button>
	);
};
