import { Search } from "js-search";
import { useState, useEffect, useRef } from "react";
import styles from "./manual.module.css";
import cities from "cities.json";
import { AutoObtainCity, SetCityManually } from "@/libs/location";
import { Dialogue } from "@/components/dialogue";
import { useRouter } from "next/navigation";
import { Navigation } from "lucide-react";

export const ManualInputForm = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [engine, setEngine] = useState<Search>(new Search("name"));

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		engine.addIndex("name");
		engine.addDocuments(cities as any);
	}, []);

	return (
		<div className={styles.manualSearch}>
			<div className={styles.header}>
				<div></div>
				<div>
					<h3>Choose a location</h3>
				</div>
				<div></div>
			</div>
			<div className={styles.searchBox}>
				<input
					onKeyUp={(e) => {
						const currentQuery = e.currentTarget.value;

						setTimeout(() => {
							const searchQuery = inputRef.current?.value;
							if (currentQuery == searchQuery) {
								setSearchQuery(currentQuery);
							}
						}, 200);
					}}
					placeholder={"City name"}
					type="search"
					ref={inputRef}
				/>
				<button
					onClick={(e) => {
						AutoObtainCity();
					}}
					className={styles.locatorButton}
				>
					<Navigation size={16} />
				</button>
			</div>
			{searchQuery && (
				<ManualInputResults query={searchQuery} engine={engine} />
			)}
		</div>
	);
};

const ManualInputResults = ({
	query,
	engine,
}: {
	query: string;
	engine: Search;
}) => {
	const [results, setResults] = useState<any[]>([]);

	useEffect(() => {
		setResults(engine.search(query));
	}, [query]);

	return (
		<div className={styles.results}>
			{results.map((city: any) => {
				return (
					<Result
						key={city.id}
						name={city.name}
						country={city.country}
						longitude={city.lng}
						latitude={city.lat}
					/>
				);
			})}

			{results.length === 0 && query.length > 0 && (
				<div>
					<p>No results found</p>
				</div>
			)}
		</div>
	);
};

const Result = ({
	name,
	country,
	longitude,
	latitude,
}: {
	name: string;
	country: string;
	longitude: number;
	latitude: number;
}) => {
	const [result, setResult] = useState<boolean | null>(null);
	const [showDialogue, setShowDialogue] = useState(false);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			if (result === true) {
				await SetCityManually(name, latitude, longitude);
				location.reload();
			}

			setShowDialogue(false);
		})();
	}, [result]);

	return (
		<>
			<button
				onClick={() => {
					setShowDialogue(true);
				}}
				className={styles.result}
			>
				<div>
					{name}, {country}
				</div>
			</button>
			{showDialogue && (
				<Dialogue
					message={`Changing location to ${name} will update all prayer times to reflect the new location. In addition to this, your location will no longer be updated automatically and Qibla direction will be disabled.`}
					acceptOptionName={"Proceed"}
					declineOptionName={"Cancel"}
					setResult={setResult}
				/>
			)}
		</>
	);
};
