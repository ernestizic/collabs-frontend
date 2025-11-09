export const queryKeys = {
	user: ["auth-user"] as const,
	projects: ["projects"] as const,
	members: ["members"] as const,
	projectBoards: (projectId: number) => ["project-boards", projectId],
	tasksOnBoard: (boardId: string) => ["tasks", boardId],
	taskDetail: (taskId: string) => ["task-detail", taskId],
};
