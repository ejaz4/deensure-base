import React, { useState } from "react";
import styles from "./radio.module.css";
import { Haptic, HapticType } from "@/libs/mal";

interface RadioOption {
	[key: string]: string;
}

export const Radio = ({
	options,
	hook,
}: {
	options: RadioOption;
	hook: (option: string) => void;
}) => {
	const [selected, setSelected] = useState<string>(Object.keys(options)[0]);

	return (
		<div className={styles.radioContainer}>
			{Object.keys(options).map((key) => (
				<div
					onTouchStart={() => {
						Haptic(HapticType.Light);
					}}
					onClick={() => {
						setSelected(key);
						hook(key);
					}}
					key={key}
					className={`${styles.radioItem} ${
						selected == key ? styles.selected : ""
					}`}
				>
					<h4>{options[key]}</h4>
				</div>
			))}
		</div>
	);
};
