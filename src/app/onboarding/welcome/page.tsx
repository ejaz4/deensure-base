import React from "react";
import Logo from "@/assets/svg/logo.svg";
import { Button } from "@/components/button";
import styles from "../onboarding.module.css";
import Link from "next/link";

const WelcomePage = () => {
	return (
		<div className={styles.screenContent}>
			<Logo />
			<h1>Salaam!</h1>
			<p>Welcome to deensure, your new life companion.</p>

			<Link href={"/onboarding/setup"}>
				<Button>Get Started</Button>
			</Link>
		</div>
	);
};

export default WelcomePage;
