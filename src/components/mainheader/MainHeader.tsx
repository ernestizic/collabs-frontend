// import { ListChevronsDownUp } from "lucide-react";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "../ui/select";
// import {
// 	Tooltip,
// 	TooltipContent,
// 	TooltipTrigger,
// } from "@/components/ui/tooltip";
import Searchbar from "../globalSearch/Searchbar";
import Notification from "../notification/Notification";

const MainHeader = () => {
	return (
		<div className="h-[72px] fixed z-10 top-0 w-[calc(100%-272px)] bg-white border-b flex items-center justify-between px-[24px]">
			<div className="flex items-center">
				{/* <header className="text-2xl font-semibold">Hello, Ernest</header> */}
				{/* <Select>
					<SelectTrigger className="min-w-[180px] border-none shadow-none [&_svg:not([class*='text-'])]:text-[#000] [&_svg:not([class*='text-'])]:size-[18px]">
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="flex items-center bg-primary/20 px-4 py-2 rounded">
									<ListChevronsDownUp size={20} />
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Select project to browse through</p>
							</TooltipContent>
						</Tooltip>
						<SelectValue placeholder="Theme" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">Light</SelectItem>
						<SelectItem value="dark">Dark</SelectItem>
						<SelectItem value="system">System</SelectItem>
					</SelectContent>
				</Select> */}
			</div>
			<div className="flex items-center gap-10">
				<Searchbar />
				<Notification />
			</div>
		</div>
	);
};

export default MainHeader;
