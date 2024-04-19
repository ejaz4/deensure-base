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
			<Backdrop setOpen={setOpen} />
		</div>
	);
};

export const Backdrop = ({
	setOpen,
}: {
	setOpen: (value: boolean) => void;
}) => {
	return (
		<div
			onClick={(e) => {
				e.currentTarget.classList.add(styles.backdropExit);
			}}
			onAnimationEnd={(e) => {
				if (e.animationName == styles.backdropFade)
					e.currentTarget.classList.remove(styles.backdropEntry);

				if (e.animationName == styles.backdropFadeOut) setOpen(false);
			}}
			className={`${styles.manualSearchBackdrop}`}
		></div>
	);
};

export default ManualInput;
