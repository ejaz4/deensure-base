import { Button } from "../button";
import styles from "./dialogue.module.css";

export const Dialogue = ({
	message,
	acceptOptionName,
	declineOptionName,
	setResult,
}: {
	message: string;
	acceptOptionName: string;
	declineOptionName: string;
	setResult: (result: boolean) => void;
}) => {
	return (
		<div>
			<div className={styles.dialogue}>
				<div>{message}</div>
				<Button onClick={() => setResult(true)} type="primary">
					{acceptOptionName}
				</Button>
				<Button onClick={() => setResult(false)}>
					{declineOptionName}
				</Button>
			</div>
			<div className={styles.backdrop}></div>
		</div>
	);
};
