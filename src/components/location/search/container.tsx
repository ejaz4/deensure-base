"use client";
import { Suspense, useEffect, useState } from "react";
import styles from "./manual.module.css";
import { Search } from "js-search";
import { ManualInputForm } from "./form";

export const ManualInput = async ({
	setOpen,
}: {
	setOpen: (value: boolean) => void;
}) => {
	return (
		<div className={styles.manualSearchContainer}>
			<Suspense>
				<ManualInputForm />
			</Suspense>
			<div
				onClick={() => setOpen(false)}
				className={styles.manualSearchBackdrop}
			></div>
		</div>
	);
};

export default ManualInput;
