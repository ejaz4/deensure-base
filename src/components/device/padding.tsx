export enum DevicePaddingType {
	StatusBar,
	NavigationBar,
}

export const DevicePadding = ({
	type = DevicePaddingType.StatusBar,
}: {
	type?: DevicePaddingType;
}) => {
	return <div></div>;
};
