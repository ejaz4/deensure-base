import {
	CalculationMethod,
	CalculationParameters,
	Coordinates,
	PrayerTimes,
} from "adhan";
import moment from "moment";
import { LoadStorageFile } from "./mal";
import title from "title";

export const GetNextPrayer = async () => {
	let prayerTimes = await SetupPrayersObject(new Date(Date.now()));
	if (prayerTimes == null) return null;

	let nextPrayer = prayerTimes.nextPrayer();
	let prayerTime = prayerTimes.timeForPrayer(nextPrayer);

	if (nextPrayer == "none") {
		prayerTimes = await SetupPrayersObject(new Date(Date.now() + 86400000));
		if (prayerTimes == null) return null;

		nextPrayer = "fajr";
		prayerTime = prayerTimes.fajr;
	}

	moment.locale(navigator.language);

	return {
		formatted: moment(prayerTimes.timeForPrayer(nextPrayer)).fromNow(true),
		time: prayerTimes.timeForPrayer(nextPrayer),
		name: title(nextPrayer),
	};
};

export const GetPrayersForDate = async (date: Date) => {
	const prayerTimes = await SetupPrayersObject(date);
	if (prayerTimes == null) return null;

	return prayerTimes;
};

export const GetCurrentPrayer = async () => {
	const prayerTimes = await SetupPrayersObject(new Date(Date.now()));
	if (prayerTimes == null) return null;

	const currentPrayer = prayerTimes.currentPrayer();

	return {
		name: title(currentPrayer),
		time: prayerTimes.timeForPrayer(currentPrayer),
	};
};

export const SetupPrayersObject = async (date: Date) => {
	const coords = JSON.parse((await LoadStorageFile("coords")) as string);
	const madhab = await LoadStorageFile("madhhab");

	let madhabInput = "shafi";

	if (coords == null) return null;

	if (madhab == "hanafi") madhabInput = "hanafi";

	const coordinates = new Coordinates(coords.latitude, coords.longitude);

	const params = CalculationMethod.MoonsightingCommittee();
	params.madhab = madhabInput as CalculationParameters["madhab"];

	var date = new Date(date ? date : Date.now());

	return new PrayerTimes(coordinates, date, params);
};
