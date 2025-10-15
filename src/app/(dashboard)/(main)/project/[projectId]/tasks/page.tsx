"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Header from "./_components/Header";
import { TaskView, TaskViewKey } from "./types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import KanbanView from "./_components/views/kanban/KanbanView";
import TaskDetail from "./_components/taskDetail/TaskDetail";
import TeamModal from "@/components/team/TeamModal";
import { useProject } from "@/store/useProject";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/store";
import ListView from "./_components/views/list/ListView";
import TableView from "./_components/views/table/TableView";

const colors = ["#e6de0f", "#6d9e9b", "#ed9e9e"];
const TaskPage = () => {
	const { activeProject } = useProject();
	const { user } = useUser();
	const pathname = usePathname();
	const router = useRouter();
	const param = useSearchParams();
	const viewTypeFromParam = param.get("view") as TaskViewKey;
	const [activeView, setActiveView] = useState<TaskViewKey>(
		viewTypeFromParam ?? TaskView.kanban
	);

	return (
		<div>
			<div className="px-[24px]">
				<div className="flex items-center gap-16 justify-between h-[120px]">
					<div className="truncate">
						<header className="text-3xl font-semibold mb-2">
							{activeProject?.name}
						</header>
						<p className="truncate">{activeProject?.description}</p>
					</div>

					<div className="flex items-center gap-4">
						<div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
							{activeProject?.collaborators.slice(0, 3).map((member, idx) => (
								<Tooltip key={idx}>
									<TooltipTrigger>
										<Avatar key={idx}>
											<AvatarImage src="https://github.com" alt="@shadcn" />
											<AvatarFallback
												className="text-sm font-semibold"
												style={{ background: colors[idx] }}
											>
												{member.user.firstname.charAt(0)}
											</AvatarFallback>
										</Avatar>
									</TooltipTrigger>
									<TooltipContent side="bottom">
										{member.userId === user?.id ? "You" : member.user.firstname}
									</TooltipContent>
								</Tooltip>
							))}
							{activeProject && activeProject?.collaborators.length > 3 && (
								<div className="size-9 border-2 border-white rounded-full flex items-center justify-center bg-light-grey text-sm font-semibold z-1">
									+{activeProject?.collaborators.length - 1}
								</div>
							)}
						</div>

						<Button
							variant="outline"
							onClick={() => router.push(`${pathname}/create`)}
						>
							<Plus /> Create Task
						</Button>
						<TeamModal />
					</div>
				</div>
				<Header view={activeView} setView={setActiveView} />
			</div>

			<div className="px-[24px] py-[16px] h-[calc(100vh-235px)]">
				{activeView === "kanban" && <KanbanView />}
				{activeView === "list" && <ListView />}
				{activeView === "table" && <TableView />}
			</div>

			<TaskDetail />
		</div>
	);
};

export default TaskPage;
