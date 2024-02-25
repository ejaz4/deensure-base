// Onboard location services
// Allows for private, offline and on-device location services and geocoding.

import { GetLocation, SaveStorageFile } from "./mal";
import { getNearestCity } from "offline-geocode-city";

export let geocoderStarted = false;

export const AutoObtainCity = async () => {
	// Automatically geocode city.
	const position: {
		longitude: number;
		latitude: number;
	} = await GetLocation();

	if (!position) return false;

	const city = getNearestCity(position.latitude, position.longitude);
	SaveStorageFile(
		"coords",
		JSON.stringify({
			latitude: position.latitude,
			longitude: position.longitude,
			city: city,
		})
	);
	return true;
};
