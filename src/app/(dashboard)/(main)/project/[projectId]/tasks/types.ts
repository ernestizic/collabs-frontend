export enum TaskView {
	kanban = "kanban",
	list = "list",
	table = "table",
}

export type TaskViewKey = keyof typeof TaskView;
