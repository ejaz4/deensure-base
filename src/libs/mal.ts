// Android MAL Library

export const GetLocation = async () => {
	Android.test();
	return {
		latitude: 0,
		longitude: 0,
	};
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
	if (!window.navigator.vibrate) return;
	switch (type) {
		case HapticType.Light:
			window.navigator.vibrate(10);
			break;
		case HapticType.Medium:
			window.navigator.vibrate(50);
			break;
		case HapticType.Heavy:
			window.navigator.vibrate(100);
			break;
	}
};

export const Dialogue = (message: string) => {
	alert(message);
};
