import { BarLoader } from "react-spinners";

const LoadingPage = () => {
	return (
		<div className="h-screen w-screen flex items-center justify-center bg-primary/10">
			<BarLoader width={150} />
		</div>
	);
};

export default LoadingPage;
