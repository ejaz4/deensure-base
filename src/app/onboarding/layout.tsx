"use client";

import React from "react";
import styles from "./onboarding.module.css";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
	return <div className={styles.onboarding}>{children}</div>;
};

export default OnboardingLayout;
