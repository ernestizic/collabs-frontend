import { Button } from "../ui/button";

const ErrorDisplay = ({ buttonFn }: { buttonFn: () => void }) => {
	return (
		<div className="text-center w-[600px]">
			<h1 className="text-4xl">Oops! Something went wrong</h1>
			<p className="text-lg mt-8">
				We encountered an error while trying to load your data. Will you please
				try one more time? Pretty please 🤗
			</p>

			<Button className="h-[52px] w-[200px] text-lg mt-10" onClick={buttonFn}>
				Try again
			</Button>
		</div>
	);
};

export default ErrorDisplay;
