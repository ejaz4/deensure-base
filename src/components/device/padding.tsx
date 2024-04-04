import styles from "./device.module.css";

export enum DevicePaddingType {
	StatusBar,
	NavigationBar,
}

export const DevicePadding = ({
	type = DevicePaddingType.StatusBar,
}: {
	type?: DevicePaddingType;
}) => {
	return <div className={styles.statusBarPadding}></div>;
};
