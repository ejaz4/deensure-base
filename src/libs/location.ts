// Onboard location services
// Allows for private, offline and on-device location services and geocoding.

import { GetLocation, SaveStorageFile } from "./mal";
import { findPlaceByCoordinate } from "offline-country-or-place-locator";
import CitiesJSON from "@/assets/geo/cities.json";
import title from "title";

export const AutoObtainCity = async () => {
	// Automatically geocode city.
	const position: {
		longitude: number;
		latitude: number;
	} = await GetLocation();

	if (!position) return false;

	const city = await findPlaceByCoordinate(
		CitiesJSON as any,
		position.latitude,
		position.longitude
	);

	await SaveStorageFile(
		"coords",
		JSON.stringify({
			latitude: position.latitude,
			longitude: position.longitude,
			city: title(city.properties.NAME),
			automated: true,
		})
	);
	return true;
};

export const SetCityManually = async (
	city: string,
	latitude: number,
	longitude: number
) => {
	console.log("Setting city manually", city, latitude, longitude);
	await SaveStorageFile(
		"coords",
		JSON.stringify({
			latitude,
			longitude,
			city,
			automated: false,
		})
	);
};
