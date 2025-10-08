import { useState } from "react";
import Datepicker from "@/components/global/Datepicker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/useQueryParams";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { ChevronDown, FlagTriangleRight, ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const tabs = ["Comments", "Activity"];
const TaskDetail = () => {
	const { localParamState, removeMultipleParams } = useQueryParams();
	const [currTab, setCurrTab] = useState(tabs[0]);
	const [selectedDate, setSelectedDate] = useState<DateRange>();

	const handleOpenChange = () => {
		removeMultipleParams(["pane", "taskId"]);
	};

	return (
		<Sheet
			open={localParamState.pane === "task"}
			onOpenChange={handleOpenChange}
		>
			<SheetContent
				showCloseButton={false}
				className="min-w-[80%] 2xl:min-w-[70%] rounded-l-2xl overflow-hidden"
			>
				<SheetHeader className="sr-only">
					<SheetTitle>Task Details</SheetTitle>
					<SheetDescription>
						This modal contains all task details
					</SheetDescription>
				</SheetHeader>
				<div className="h-[70px] px-[24px] border-b flex items-center justify-between">
					<div>
						<div>Created on 25 Jan 2025</div>
					</div>
					<div>
						<Button
							onClick={handleOpenChange}
							variant="outline"
							className="rounded-full"
						>
							<X />
						</Button>
					</div>
				</div>

				<div className="flex-1 overflow-auto flex items-start">
					<div className="flex-1 p-[16px] h-full overflow-auto">
						<header className="text-2xl font-semibold mb-2">
							Prepare a competitive analysis to be presented to stackeholders
						</header>

						<ul className="flex flex-col gap-4 mt-[30px]">
							<li className="flex gap-2">
								<p className="w-[200px] text-black/70">Status</p>
								<div className="flex-1">
									<Badge
										variant="secondary"
										className="text-[green] bg-[green]/10"
									>
										Completed
									</Badge>
								</div>
							</li>
							<li className="flex gap-2">
								<p className="w-[200px] text-black/70">Created By</p>
								<div className="flex-1">
									<div className="flex items-center gap-2 text-sm py-1 rounded w-max">
										<Avatar className="size-6">
											<AvatarImage src="https://github.com/shadcn.png" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
										Me
									</div>
								</div>
							</li>
							<li className="flex gap-2">
								<p className="w-[200px] text-black/70">Assigned to</p>
								<div className="flex-1 flex gap-2 flex-wrap">
									{Array.from({ length: 1 }).map((item, idx) => (
										<div
											key={idx}
											className="border flex items-center gap-2 text-sm p-1 rounded bg-accent w-max"
										>
											<Avatar className="size-6">
												<AvatarImage src="https://github.com/shadcn.png" />
												<AvatarFallback>CN</AvatarFallback>
											</Avatar>
											Olivier Giroud
										</div>
									))}
								</div>
							</li>
							<li className="flex gap-2">
								<p className="w-[200px] text-black/70">Priority</p>
								<div className="flex-1">
									<Badge className="bg-[#e7513d]/20 rounded text-[#f31b0b]">
										<FlagTriangleRight size={18} /> High
									</Badge>
								</div>
							</li>
							<li className="flex gap-2">
								<p className="w-[200px] text-black/70">Timeline</p>
								<div className="flex-1">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="ghost"
												className="w-max h-[32px] flex items-center gap-4 justify-between"
											>
												{selectedDate
													? `${dayjs(selectedDate?.from).format(
															"LL"
													  )} - ${dayjs(selectedDate?.to).format("LL")}`
													: "No timeline set"}{" "}
												<ChevronDown />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="min-w-[300px]">
											<Datepicker
												mode="range"
												selectedRange={selectedDate}
												onSelectRange={setSelectedDate}
											/>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</li>
							<li className="flex gap-2">
								<p className="w-[200px] text-black/70">Labels</p>
								<div className="flex-1 flex items-center gap-2 flex-wrap">
									{Array.from({ length: 2 }).map((item, idx) => (
										<Badge
											key={idx}
											variant="secondary"
											className="text-[blue] bg-[blue]/10"
										>
											Bug
										</Badge>
									))}
								</div>
							</li>
						</ul>

						<div className="text-base text-black/70 border p-4 rounded-2xl mt-6 min-h-[200px]">
							No description provided
						</div>

						<div className="mt-[30px]">
							<p className="font-semibold">Attachments</p>

							<div className="flex flex-wrap gap-2 mt-2">
								<div className="flex items-center gap-2 border w-max p-2 rounded-[4px] bg-accent">
									<ImagePlus />
									<div className="flex flex-col">
										<p className="text-sm font-semibold">Daily bread.png</p>
										<span className="text-xs">23.4 MB</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-[40%] bg-accent h-full overflow-auto">
						<div className="flex gap-2 border-b">
							{tabs.map((item, idx) => (
								<Button
									onClick={() => {
										setCurrTab(item);
									}}
									variant="outline"
									key={idx}
									className={cn(
										"mt-0.5 border-b-0 border-x-0 border-t-0 rounded-none text-base capitalize",
										{
											"border-b-2 border-primary text-primary":
												item === currTab,
										}
									)}
								>
									{item}
								</Button>
							))}
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default TaskDetail;
