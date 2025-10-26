import { ApiMeta, PaginationType } from "..";
import { Collaborator } from "./project";

export type TaskType = "TASK" | "BUG" | "FEATURE";

export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export type Task = {
	columnId: string;
	type: TaskType;
	title: string;
	description: string | null;
	priority: TaskPriority | null;
	startDate: Date | null;
	endDate: Date | null;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	assignees: Assignee[];
};

export interface Assignee {
	taskId: string;
	collaboratorId: number;
	collaborator: Collaborator;
}

export type CreateTaskPayload = {
	title: string;
	description?: string;
	type?: TaskType;
	assignees?: number[];
	columnId?: string;
	priority?: TaskPriority;
	startDate?: Date;
	endDate?: Date;
};

export interface CreateTaskResponse extends ApiMeta {
	data: Task;
}

export interface FetchTasksResponse extends ApiMeta {
	data: {
		pagination: PaginationType;
		tasks: Task[];
	};
}
