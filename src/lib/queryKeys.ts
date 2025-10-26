export const queryKeys = {
	user: ["auth-user"] as const,
	projects: ["projects"] as const,
	projectBoards: (projectId: number) => ["project-boards", projectId],
	tasksOnBoard: (boardId: string) => ["tasks", boardId],
};
