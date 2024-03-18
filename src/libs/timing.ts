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
	const coords = JSON.parse((await LoadStorageFile("coords")) as string);
	const madhab = await LoadStorageFile("madhhab");

	let madhabInput = "shafi";

	if (coords == null) return;

	if (madhab == "hanafi") madhabInput = "hanafi";

	const coordinates = new Coordinates(coords.latitude, coords.longitude);

	const params = CalculationMethod.MuslimWorldLeague();
	params.madhab = madhabInput as CalculationParameters["madhab"];

	const date = new Date(Date.now());

	let prayerTimes = new PrayerTimes(coordinates, date, params);
	let nextPrayer = prayerTimes.nextPrayer();
	let prayerTime = prayerTimes.timeForPrayer(nextPrayer);

	if (nextPrayer == "none") {
		prayerTimes = new PrayerTimes(
			coordinates,
			new Date(Date.now() + 86400000),
			params
		);

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
