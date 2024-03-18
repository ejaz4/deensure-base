"use client";
import React, { useEffect, useRef } from "react";
import Logo from "@/assets/svg/logo-64-light.svg";
import { Button } from "@/components/button";
import styles from "../onboarding.module.css";
import Link from "next/link";
import SalahImage from "@/assets/svg/art/welcome-1.svg";
import backgrounds from "../backgrounds.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { DevicePadding, DevicePaddingType } from "@/components/device/padding";

const WelcomePage = () => {
	const [currentSlide, setCurrentSlide] = React.useState(0);

	const screenContent = useRef<HTMLDivElement>(null);
	const screenBackground = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const goToUrl = (url: string) => {
		if (screenContent.current) {
			screenContent.current.classList.add(styles.fadeUp);
			screenContent.current.addEventListener("animationend", (e) => {
				e.stopPropagation();
			});

			if (screenBackground.current) {
				screenBackground.current.classList.add(backgrounds.fadeUpExit);
				screenBackground.current.addEventListener(
					"animationend",
					(e) => {
						router.push(url);
					}
				);
			}
		}
	};

	return (
		<div
			ref={screenBackground}
			className={`${backgrounds.blue} ${backgrounds.fadeDownEntry}`}
		>
			<DevicePadding type={DevicePaddingType.StatusBar} />
			<div className={styles.screenContent} ref={screenContent}>
				<div className={styles.welcomeHeader}>
					<div>
						<Logo></Logo>
					</div>
					<div>
						<CarouselDots currentSlide={currentSlide} />
					</div>
					<div>
						<a
							className={"clickableButton"}
							onClick={() => {
								goToUrl("/onboarding/setup");
							}}
						>
							Skip
						</a>
					</div>
				</div>

				<WelcomeCarousel
					currentSlide={currentSlide}
					setCurrentSlide={setCurrentSlide}
					goToUrl={goToUrl}
				/>
			</div>
		</div>
	);
};

const CarouselDots = ({ currentSlide }: { currentSlide: number }) => {
	return (
		<div className={styles.carouselDots}>
			<div
				className={`${styles.carouselDot} ${
					currentSlide === 0 ? styles.active : ""
				}`}
			></div>
			<div
				className={`${styles.carouselDot} ${
					currentSlide === 1 ? styles.active : ""
				}`}
			></div>
			<div
				className={`${styles.carouselDot} ${
					currentSlide === 2 ? styles.active : ""
				}`}
			></div>
		</div>
	);
};

const WelcomeCarousel = ({
	currentSlide,
	setCurrentSlide,
	goToUrl,
}: {
	currentSlide: number;
	setCurrentSlide: (slide: number) => void;
	goToUrl: (url: string) => void;
}) => {
	const carousel = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (carousel.current) {
			carousel.current.addEventListener("scroll", (e) => {
				if (!carousel.current) return;
				const scroll = carousel.current.scrollLeft;
				const width = carousel.current.clientWidth;
				const total = carousel.current.scrollWidth;
				const slide = Math.floor(scroll / width);
				console.log(slide);
				setCurrentSlide(slide);
			});
		}
	}, [carousel]);

	const nextSlide = () => {
		if (carousel.current) {
			const width = carousel.current.clientWidth;
			carousel.current.scrollBy({
				left: width,
				behavior: "smooth",
			});
		}
	};

	const previousSlide = () => {
		if (carousel.current) {
			const width = carousel.current.clientWidth;
			carousel.current.scrollBy({
				left: -width,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className={styles.welcomeCarousel} ref={carousel}>
			<div className={styles.welcomeItem}>
				<img src={"/images/art/welcome-1.png"} alt="Welcome" />
				<div className={styles.welcomeText}>
					<h1>Stay on top of salah</h1>
					<span>
						Know the next salah, the direction of the Qibla and set
						up prayer alerts in seconds
					</span>
				</div>

				<div className={styles.welcomeButtonContainer}>
					<Button
						onClick={nextSlide}
						image={<ChevronRight size={16} />}
					>
						<span>Next</span>
					</Button>
				</div>
			</div>

			<div className={styles.welcomeItem}>
				<img src={"/images/art/welcome-1.png"} alt="Welcome" />
				<div className={styles.welcomeText}>
					<h1>Keep connected with your mosque</h1>
					<span>
						Hear the adhan live, sign up to events and help develop
						your local community
					</span>
				</div>

				<div className={styles.welcomeButtonContainer}>
					<Button
						onClick={previousSlide}
						image={<ChevronLeft size={16} />}
					></Button>
					<Button
						onClick={nextSlide}
						image={<ChevronRight size={16} />}
					>
						<span>Next</span>
					</Button>
				</div>
			</div>

			<div className={styles.welcomeItem}>
				<img src={"/images/art/welcome-1.png"} alt="Welcome" />
				<div className={styles.welcomeText}>
					<h1>Free, private and open source</h1>
					<span>
						Deensure is built to respect your privacy and is
						available for anyone to adapt and change
					</span>
				</div>

				<div className={styles.welcomeButtonContainer}>
					<Button
						onClick={previousSlide}
						image={<ChevronLeft size={16} />}
					></Button>
					<Button
						onClick={() => {
							goToUrl("/onboarding/setup");
						}}
						type={"primary"}
					>
						<span>Setup</span>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default WelcomePage;
