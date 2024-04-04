// Android MAL Library

export const GetLocation = async () => {
	const location: {
		longitude: number;
		latitude: number;
	} = JSON.parse(Android.GetLocation());

	console.log(location);
	return location;
};

export const SaveStorageFile = async (fileName: string, data: string) => {
	const ls = window.localStorage;
	ls.setItem(fileName, data);
};

export const LoadStorageFile = async (fileName: string) => {
	const ls = window.localStorage;
	return ls.getItem(fileName);
};

export enum HapticType {
	Light,
	Medium,
	Heavy,
}

export const Haptic = (
	type: HapticType.Light | HapticType.Medium | HapticType.Heavy
) => {
	Android.Haptic(type);
};

export const Dialogue = (message: string) => {
	alert(message);
};

export const StatusBarHeight = () => {
	const height = Android.StatusBarHeight();

	return height;
	// return 0;
};
