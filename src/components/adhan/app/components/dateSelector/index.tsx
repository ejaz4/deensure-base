import styles from "../../adhan.module.css";

export const DateSelector = ({
	currentDate,
	setCurrentDate,
}: {
	currentDate: Date;
	setCurrentDate: (date: Date) => void;
}) => {
	return (
		<div
			onScroll={(e) => {
				e;
			}}
			className={styles.dateSelector}
		>
			{[...Array(Math.round(scrollX) + Math.round(outerWidth / 4))].map(
				(_, i) => (
					<DateItem
						key={i}
						date={new Date(Date.now() + i * 86400000)}
						setCurrentDate={setCurrentDate}
						selected={
							currentDate.getMonth() ===
								new Date(
									Date.now() + i * 86400000
								).getMonth() &&
							currentDate.getFullYear() ===
								new Date(
									Date.now() + i * 86400000
								).getFullYear() &&
							currentDate.getDate() ===
								new Date(Date.now() + i * 86400000).getDate()
						}
					/>
				)
			)}
		</div>
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
	var localisedDate = date.toLocaleDateString(navigator.language, {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

	if (date.getFullYear() == new Date(Date.now()).getFullYear()) {
		if (date.getMonth() === new Date(Date.now()).getMonth()) {
			if (date.getDate() === new Date(Date.now()).getDate()) {
				localisedDate = "Today";
			}

			if (date.getDate() === new Date(Date.now() + 86400000).getDate()) {
				localisedDate = "Tomorrow";
			}

			if (date.getDate() === new Date(Date.now() - 86400000).getDate()) {
				localisedDate = "Yesterday";
			}
		}
	}

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
