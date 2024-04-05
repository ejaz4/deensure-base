import { GetPrayersForDate } from "@/libs/timing";
import { CurrentPrayer } from "./components/currentPrayer";
import { useEffect } from "react";

export const AdhanTimingPage = () => {
	useEffect(() => {
		(async () => {
			console.log(await GetPrayersForDate(new Date(Date.now())));
		})();
	}, []);
	return <CurrentPrayer />;
};
