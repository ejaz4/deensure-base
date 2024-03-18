"use client";

import { Haptic, HapticType } from "@/libs/mal";
import styles from "./button.module.css";
import { useState } from "react";
import { Loader } from "lucide-react";

export const Button = ({
	children,
	onClick,
	type,
	image,
	withStates,
}: {
	children?: React.ReactNode;
	onClick?: () => void;
	type?: "primary" | "secondary";
	image?: React.ReactNode;
	withStates?: boolean;
}) => {
	const [isProcessing, setIsProcessing] = useState(false);
	const noText = !children ? styles.noText : "";
	const primary = type === "primary" ? styles.primary : "";

	const buttonClass = `${styles.button} ${noText} ${primary}`;

	return (
		<button
			className={buttonClass}
			onClick={async (e: any) => {
				if (withStates) {
					setIsProcessing(true);

					const response = onClick && (await onClick());
					setIsProcessing(false);
				}

				onClick && !withStates && (await onClick());
			}}
			onTouchStart={(e: any) => {
				Haptic(HapticType.Light);
			}}
		>
			{children && children}
			{image && !isProcessing && image}
			{isProcessing && <Loader className={styles.spinner} size={16} />}
		</button>
	);
};
