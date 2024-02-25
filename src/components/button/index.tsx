"use client";

import styles from "./button.module.css";

export const Button = ({
	children,
	onClick,
	type = "primary",
}: {
	children: React.ReactNode;
	onClick?: () => void;
	type?: "primary" | "secondary";
}) => {
	return (
		<button
			className={type == "secondary" ? styles.secondaryBtn : ""}
			onClick={onClick && onClick}
		>
			{children}
		</button>
	);
};
