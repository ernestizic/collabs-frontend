import { pusher } from "@/lib/pusherClient";
import { queryKeys } from "@/lib/queryKeys";
import { Column } from "@/utils/types/api/project";
import { Task } from "@/utils/types/api/task";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useProjectPusher = (projectId: number) => {
	const queryClient = useQueryClient();
	useEffect(() => {
		if (!projectId) return;
		const channel = pusher.subscribe(`private-project-${projectId}`);

		channel.bind("pusher:subscription_succeeded", () => {
			console.log("Subscription succeeded");

			channel.bind("column-created", (data: Column) => {
				if (data) {
					queryClient.invalidateQueries({
						queryKey: queryKeys.projectBoards(data.projectId),
					});
				}
			});

			channel.bind(
				"column-deleted",
				(data: { deleted: boolean; projectId: number }) => {
					if (data.deleted) {
						queryClient.invalidateQueries({
							queryKey: queryKeys.projectBoards(data.projectId),
						});
					}
				}
			);

			channel.bind("column-updated", (data: Column) => {
				if (data) {
					queryClient.invalidateQueries({
						queryKey: queryKeys.projectBoards(data.projectId),
					});
				}
			});

			channel.bind("task-created", (data: Task) => {
				if (data) {
					queryClient.invalidateQueries({
						queryKey: queryKeys.tasksOnBoard(data.columnId),
					});
				}
			});
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [projectId, queryClient]);
};

export default useProjectPusher;
