import { Suspense } from "react";
import styles from "./manual.module.css";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ManualInputSkel = ({
	setOpen,
}: {
	setOpen: (value: boolean) => void;
}) => {
	return (
		<div className={styles.manualSearchContainer}>
			<ManualInputForm />
			<div
				onClick={() => setOpen(false)}
				className={styles.manualSearchBackdrop}
			></div>
		</div>
	);
};

const ManualInputForm = () => {
	return (
		<div className={styles.manualSearch}>
			<div className={styles.header}>
				<div></div>
				<div>
					<Skeleton height={24} width={160} />
				</div>
				<div></div>
			</div>
			<div className={styles.searchBox}>
				<Skeleton height={44} width={"100%"} borderRadius={12} />
			</div>
			<div>
				<Skeleton count={5} />
			</div>
		</div>
	);
};

export const SearchForLocation = ({
	setOpen,
}: {
	setOpen: (value: boolean) => void;
}) => {
	const ManualInput = React.lazy(() => import("./container"));

	return (
		<Suspense fallback={<ManualInputSkel setOpen={setOpen} />}>
			<ManualInput setOpen={setOpen} />
		</Suspense>
	);
};
