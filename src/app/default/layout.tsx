import { Footer } from "@/components/footer";

const DefaultApp = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<div>{children}</div>

			<Footer />
		</div>
	);
};

export default DefaultApp;
