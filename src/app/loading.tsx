import { BarLoader } from "react-spinners";

const LoadingPage = () => {
	return (
		<div className="h-screen w-screen flex items-center justify-center bg-primary/10">
			<BarLoader width={150} color="var(--primary)" className="bg-accent"  />
		</div>
	);
};

export default LoadingPage;
