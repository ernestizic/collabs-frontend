import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryParams } from "@/hooks/useQueryParams";
import {
	ArrowRightLeft,
	CalendarFold,
	Ellipsis,
	Expand,
	Flag,
	FlagTriangleRight,
	// MessagesSquare,
	Trash2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { Task } from "@/utils/types/api/task";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
	TooltipTrigger,
	Tooltip,
	TooltipContent,
} from "@/components/ui/tooltip";
import { useUser } from "@/store";
import { colors } from "@/utils/constants";
dayjs.extend(localizedFormat);

type TaskCardProps = {
	task: Task;
};

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(({ task }, ref) => {
	const { user } = useUser();
	const pathname = usePathname();
	const { redirectWithParams, localParamState } = useQueryParams();

	return (
		<div ref={ref} className="bg-white p-[8px] rounded border">
			<div className="flex items-center justify-between mb-2">
				{task.priority ? (
					<Badge
						className={cn("rounded capitalize", {
							"text-[#] bg-[#82b5f9]/20": task.priority === "LOW",
							"bg-[#f1ac0a]/20 rounded text-[#f1ac0a]":
								task.priority === "MEDIUM",
							"bg-[#f1300a]/20 rounded text-[#f10a0a]":
								task.priority === "HIGH",
						})}
					>
						<FlagTriangleRight size={18} /> {task.priority?.toLowerCase()}
					</Badge>
				) : (
					<div className="text-xs font-medium flex items-center gap-2">
						<Flag size={16} color="#112dce" /> Normal priority
					</div>
				)}

				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Button
							className="size-[28px]"
							variant="ghost"
							aria-label="More options"
							title="More options"
						>
							<Ellipsis />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							className="text-base"
							onClick={() =>
								redirectWithParams(pathname, {
									...localParamState,
									pane: "task",
									taskId: task.id,
								})
							}
						>
							<Expand /> View task
						</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger className="text-base">
								<ArrowRightLeft /> Move to column
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem>Backlog</DropdownMenuItem>
									<DropdownMenuItem>In progress</DropdownMenuItem>
									<DropdownMenuItem>In review</DropdownMenuItem>
									<DropdownMenuItem>Done</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>

						<DropdownMenuItem variant="destructive" className="text-base">
							<Trash2 /> Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Button
				onClick={() =>
					redirectWithParams(pathname, {
						...localParamState,
						pane: "task",
						taskId: task.id,
					})
				}
				variant="link"
				className="font-semibold mb-[3px] truncate hover:underline hover:text-primary p-0 h-auto"
			>
				{task.title}
			</Button>
			<p className="text-sm text-black/70 truncate">{task.description}</p>

			<div className="max-2xl:hidden my-2 flex items-center justify-between">
				<span className="font-semibold text-sm text-[#686363]">Assignees:</span>
				<div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
					{task?.assignees.slice(0, 3).map((member, idx) => (
						<Tooltip key={idx}>
							<TooltipTrigger>
								<Avatar key={idx} className="size-6">
									<AvatarImage src="https://github.com" alt="@shadcn" />
									<AvatarFallback
										className="text-sm font-semibold"
										style={{ background: colors[idx] }}
									>
										{member?.collaborator?.user?.firstname?.charAt(0)}
									</AvatarFallback>
								</Avatar>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								{member.collaborator?.userId === user?.id
									? "You"
									: member.collaborator?.user.firstname}
							</TooltipContent>
						</Tooltip>
					))}
					{task.assignees.length > 3 && (
						<div className="size-6 border-2 border-white rounded-full flex items-center justify-center bg-light-grey text-sm font-semibold z-1">
							+{task.assignees.length - 1}
						</div>
					)}
				</div>
			</div>

			<div className="flex items-center justify-between mt-4">
				<div className="flex items-center gap-2 text-sm">
					<CalendarFold size={18} />{" "}
					{task.endDate
						? dayjs(task.endDate).format("DD MMM YYYY")
						: "No due date"}
				</div>

				{task.endDate && task.endDate < new Date() && (
					<Badge variant="secondary" className="text-[#c71e1e] bg-[#f99f9f]/20">
						Overdue
					</Badge>
				)}
			</div>

			{/* <div className="max-2xl:hidden text-xs border-t mt-4 pt-2">
				<div className="flex items-center gap-2">
					<MessagesSquare size={14} /> 12 comments
				</div>
			</div> */}
		</div>
	);
});

TaskCard.displayName = "Task card";

export default TaskCard;
