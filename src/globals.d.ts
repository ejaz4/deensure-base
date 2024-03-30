export {};

declare global {
	interface AndroidType {
		field1: string;
		test: () => void;
		GetLocation: () => string;
		Haptic: (type: number) => void;
	}
	declare var Android: AndroidType;
}
