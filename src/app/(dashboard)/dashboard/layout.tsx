import Searchbar from "@/components/globalSearch/Searchbar";
import Notification from "@/components/notification/Notification";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const ProjectDashboardLayout = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div>
			<div className="h-[72px] fixed z-10 top-0 w-screen bg-white border-b flex items-center justify-between px-[24px]">
				<div className="flex items-center gap-20">
					<Link href="/dashboard" className="font-semibold text-2xl">
						Col<span className="text-primary">labs</span>
					</Link>

					<Searchbar />
				</div>
				<div className="flex items-center gap-4">
					<Notification />
					<Avatar className="size-10">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>
			</div>
			<div className="mt-[72px] min-h-[calc(100vh-72px)] bg-primary/5">
				{children}
			</div>
		</div>
	);
};

export default ProjectDashboardLayout;
