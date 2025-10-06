import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	CalendarFold,
	Ellipsis,
	FlagTriangleRight,
	MessagesSquare,
} from "lucide-react";

const TaskCard = () => {
	return (
		<div className="bg-white p-[8px] rounded border">
			<div className="flex items-center justify-between mb-2">
				<div className="text-[14px] flex items-center gap-2">
					{/* <Badge className="bg-[#f1ac0a]/20 rounded text-[#f1ac0a]">
					  <FlagTriangleRight size={18} /> Medium
          </Badge> */}
					{/* <Badge className="bg-[#f1300a]/20 rounded text-[#f10a0a]">
					  <FlagTriangleRight size={18} /> High
          </Badge> */}
					<Badge className="bg-[#82b5f9]/20 rounded text-[#0751c8]">
						<FlagTriangleRight size={18} /> Low
					</Badge>
					Ticket #1
				</div>

				<Button
					className="size-[28px]"
					variant="ghost"
					aria-label="More options"
					title="More options"
				>
					<Ellipsis />
				</Button>
			</div>
			<p className="font-semibold mb-[3px] truncate">This is the task title</p>
			<p className="text-sm text-black/70 truncate">
				This is the task description
			</p>

			<div className="max-2xl:hidden my-2 flex items-center justify-between">
				<span className="font-semibold text-sm text-[#686363]">Assignees:</span>
				<div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
					{Array.from({ length: 6 })
						.slice(0, 3)
						.map((_, idx) => (
							<Avatar key={idx} className="size-6">
								<AvatarImage
									src="https://github.com/shadcn.png"
									alt="@shadcn"
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						))}
					<div className="size-6 border-2 border-white rounded-full flex items-center justify-center bg-light-grey text-sm font-semibold z-1">
						+1
					</div>
				</div>
			</div>

			<div className="flex items-center justify-between mt-4">
				<div className="flex items-center gap-2 text-sm">
					<CalendarFold size={18} /> 02 Nov 2025
				</div>
				<Badge variant="secondary" className="text-[#c71e1e] bg-[#f99f9f]/20">
					Overdue
				</Badge>
			</div>

			<div className="max-2xl:hidden text-xs border-t mt-4 pt-2">
				<div className="flex items-center gap-2">
					<MessagesSquare size={14} /> 12 comments
				</div>
			</div>
		</div>
	);
};

export default TaskCard;
