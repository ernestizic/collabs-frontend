import { Bell } from "lucide-react";
import { Button } from "../ui/button";

const Notification = () => {
	return (
		<div>
			<Button
				variant="ghost"
				aria-label="Notification"
				className="border rounded-full size-12 flex items-center justify-center relative"
			>
				{/* <span className="absolute inline-flex size-[15px] top-[6px] right-[8px] animate-ping rounded-full bg-primary opacity-75"></span> */}
				<Bell className="size-5" />
			</Button>
		</div>
	);
};

export default Notification;
