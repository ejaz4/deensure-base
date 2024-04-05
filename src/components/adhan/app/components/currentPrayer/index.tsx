import { GetCurrentPrayer } from "@/libs/timing";
import { useEffect, useState } from "react";

export const CurrentPrayer = () => {
	const [prayerName, setPrayerName] = useState<string>("");

	useEffect(() => {
		(async () => {
			const currentPrayer = await GetCurrentPrayer();
			if (currentPrayer == null) return;

			setPrayerName(currentPrayer.name);
		})();
	}, []);

	return <h1>{prayerName}</h1>;
};
