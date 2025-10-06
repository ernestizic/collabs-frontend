import { Badge } from "@/components/ui/badge";
import {
	ArrowLeft,
	ArrowRight,
	ArrowUp10,
	Ellipsis,
	PencilLine,
	Trash2,
} from "lucide-react";
import { Plus } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import TaskCard from "./TaskCard";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const KanbanBoard = () => {
	return (
		<div className="h-full min-w-[350px] w-[350px] rounded-2xl bg-accent p-[16px] flex flex-col">
			<div className="flex flex-col gap-2 pb-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="size-[8px] rounded-full block bg-[#2016d6]" />
						<span className="font-semibold text-gray-700">In Progress</span>
						<Badge className="bg-primary/20 text-black">0/4</Badge>
					</div>
					<div className="flex gap-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									className="size-[28px]"
									variant="ghost"
									aria-label="Add task to this column"
								>
									<Plus />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								Add task to this column
							</TooltipContent>
						</Tooltip>

						<DropdownMenu modal={false}>
							<Tooltip>
								<TooltipTrigger asChild>
									<DropdownMenuTrigger asChild>
										<Button
											className="size-[28px]"
											variant="ghost"
											aria-label="More options"
										>
											<Ellipsis />
										</Button>
									</DropdownMenuTrigger>
								</TooltipTrigger>
								<TooltipContent side="bottom">
									More column options
								</TooltipContent>
							</Tooltip>
							<DropdownMenuContent>
								<DropdownMenuLabel className="text-[#000]/60">
									Tasks
								</DropdownMenuLabel>
								<DropdownMenuItem variant="destructive" className="text-base">
									<Trash2 /> Delete all
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuLabel className="text-[#000]/60">
									Column
								</DropdownMenuLabel>
								<DropdownMenuItem className="text-base">
									<ArrowUp10 /> Set limit
								</DropdownMenuItem>
								<DropdownMenuItem className="text-base">
									<PencilLine /> Edit details
								</DropdownMenuItem>
								<DropdownMenuItem variant="destructive" className="text-base">
									<Trash2 /> Delete
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuLabel className="text-[#000]/60">
									Position
								</DropdownMenuLabel>
								<DropdownMenuItem className="text-base">
									<ArrowLeft /> Move left
								</DropdownMenuItem>
								<DropdownMenuItem className="text-base">
									<ArrowRight /> Move right
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<p className="text-sm text-[#000]/60">
					This item hasn&apos;t been started
				</p>
			</div>

			<div className="flex-1 overflow-auto flex flex-col gap-2">
				{Array.from({ length: 2 }).map((item, idx) => (
					<TaskCard key={idx} />
				))}
			</div>
		</div>
	);
};

export default KanbanBoard;
