export {};

declare global {
	interface AndroidType {
		field1: string;
		test: () => void;
	}
	declare var Android: AndroidType;
}
