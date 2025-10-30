import { useEffect, useState } from "react";
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
import { DateRange } from "react-day-picker";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { getTaskById } from "@/utils/api/tasks";
import { BarLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import dayjs from "dayjs";
import { useProject } from "@/store/useProject";
dayjs.extend(localizedFormat);

const tabs = ["Comments", "Activity"];
const TaskDetail = () => {
	const { activeProject } = useProject();
	const { localParamState, removeMultipleParams } = useQueryParams();
	const [currTab, setCurrTab] = useState(tabs[0]);
	const [selectedDate, setSelectedDate] = useState<DateRange>();
	const taskId = localParamState.taskId;
	const { data, isPending } = useQuery({
		queryKey: queryKeys.taskDetail(taskId as string),
		queryFn: () => getTaskById(taskId as string),
		enabled: !!taskId,
	});
	const task = data?.data;
	const creator = activeProject?.collaborators.find(
		(member) => member.id === task?.creatorId
	);

	const assignees = task?.assignees.map((item) => {
		const collaborator = activeProject?.collaborators.find(
			(col) => col.id === item.collaboratorId
		);
		return {
			...item,
			collaborator,
		};
	});

	const handleOpenChange = () => {
		removeMultipleParams(["pane", "taskId"]);
	};

	useEffect(() => {
		if (task?.startDate && task?.endDate) {
			setSelectedDate({
				from: task?.startDate,
				to: task?.endDate,
			});
		}
	}, [task]);

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
						<div>Created on {dayjs(task?.createdAt).format("DD MMM YYYY")}</div>
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
						{isPending ? (
							<div className="flex items-center justify-center h-full">
								<BarLoader color="var(--primary)" className="bg-accent" />
							</div>
						) : (
							<>
								<header className="text-2xl font-semibold mb-2">
									{task?.title}
								</header>

								<ul className="flex flex-col gap-4 mt-[30px]">
									<li className="flex gap-2">
										<p className="w-[200px] text-black/70">Status</p>
										<div className="flex-1">
											<Badge
												className="font-bold text-sm"
												variant="secondary"
												style={{
													color: `${task?.column.identifier}`,
													background: `color-mix(in srgb, ${task?.column.identifier} 10%, white)`,
												}}
											>
												{task?.column.name}
											</Badge>
										</div>
									</li>
									<li className="flex gap-2">
										<p className="w-[200px] text-black/70">Created By</p>
										<div className="flex-1">
											<div className="flex items-center gap-2 text-sm py-1 rounded w-max">
												<Avatar className="size-6">
													<AvatarImage src="" />
													<AvatarFallback>
														{creator?.user.firstname?.charAt(0)}
													</AvatarFallback>
												</Avatar>
												{creator?.user.firstname} {creator?.user.lastname}
											</div>
										</div>
									</li>
									<li className="flex gap-2">
										<p className="w-[200px] text-black/70">Assigned to</p>
										<div className="flex-1 flex gap-2 flex-wrap">
											{!assignees?.length && "No one"}
											{assignees?.map((item, idx) => (
												<div
													key={idx}
													className="border flex items-center gap-2 text-sm p-1 rounded w-max"
												>
													<Avatar className="size-6">
														<AvatarImage src="" />
														<AvatarFallback>
															{item.collaborator?.user.firstname?.charAt(0)}
														</AvatarFallback>
													</Avatar>
													{item.collaborator?.user.firstname}{" "}
													{item.collaborator?.user.lastname}
												</div>
											))}
										</div>
									</li>
									<li className="flex gap-2">
										<p className="w-[200px] text-black/70">Priority</p>
										<div className="flex-1">
											{task?.priority ? (
												<Badge
													className={cn("rounded capitalize", {
														"text-[#] bg-[#82b5f9]/20":
															task?.priority === "LOW",
														"bg-[#f1ac0a]/20 rounded text-[#f1ac0a]":
															task?.priority === "MEDIUM",
														"bg-[#f1300a]/20 rounded text-[#f10a0a]":
															task?.priority === "HIGH",
													})}
												>
													<FlagTriangleRight size={18} />{" "}
													{task?.priority?.toLowerCase()}
												</Badge>
											) : (
												"Normal"
											)}
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
										<p className="w-[200px] text-black/70">Type</p>
										<div className="flex-1 flex items-center gap-2 flex-wrap">
											<Badge
												variant="secondary"
												className={cn("text-[blue] bg-[blue]/10", {
													"text-[#d29922] bg-[#d29922]/10":
														task?.type === "FEATURE",
													"text-[#f85154] bg-[#f85154]/10":
														task?.type === "BUG",
												})}
											>
												{task?.type}
											</Badge>
										</div>
									</li>
								</ul>

								<div className="text-base text-black/70 border p-4 rounded-2xl mt-6 min-h-[200px]">
									{task?.description || "No description provided"}
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
							</>
						)}
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
