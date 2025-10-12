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

const TaskPage = () => {
	const { activeProject } = useProject();
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
							{Array.from({ length: 6 })
								.slice(0, 3)
								.map((_, idx) => (
									<Avatar key={idx}>
										<AvatarImage
											src="https://github.com/shadcn.png"
											alt="@shadcn"
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								))}
							<div className="size-8 border-2 border-white rounded-full flex items-center justify-center bg-light-grey text-sm font-semibold z-1">
								+1
							</div>
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
			</div>

			<TaskDetail />
		</div>
	);
};

export default TaskPage;
