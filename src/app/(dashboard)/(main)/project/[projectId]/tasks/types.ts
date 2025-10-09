export enum TaskView {
	kanban = "kanban",
	list = "list",
	table = "table",
}

export type TaskViewKey = keyof typeof TaskView;

export interface BoardType {
	id: string;
	name: string;
	description: string;
	position: number;
	color_identifier: string;
}
