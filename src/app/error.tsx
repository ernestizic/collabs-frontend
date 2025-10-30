"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.log(error);
	}, [error]);
	return (
		<div className="h-screen flex items-center justify-center">
			<div className="flex items-center justify-center flex-col text-center gap-4">
				<h2 className="text-5xl">Oh no!</h2>

				<p className="text-3xl">
					Something went wrong, <br /> please try again!
				</p>

				<Button
					className="text-2xl mt-6 py-6 w-[200px]"
					onClick={() => reset()}
				>
					Try again
				</Button>
			</div>
		</div>
	);
}
