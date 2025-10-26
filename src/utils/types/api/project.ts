import { ApiMeta, PaginationType, User } from "..";

export interface CreateProjectPayload {
	name: string;
	description?: string;
}

export interface CreateProjectResponse extends ApiMeta {
	data: Omit<Project, "collaborators">;
}

export interface ProjectsResponse extends ApiMeta {
	data: {
		pagination: PaginationType;
		projects: Omit<Project, "collaborators">[];
	};
}

export interface GetProjectResponse extends ApiMeta {
	data: Project;
}

export interface GetColumnsResponse extends ApiMeta {
	data: Column[];
}

export interface Collaborator {
	id: number;
	role: "MEMBER" | "ADMIN";
	userId: number;
	projectId: number;
	user: Partial<User>;
}

export interface Project {
	id: number;
	name: string;
	description: string;
	isOpen: boolean;
	createdAt: Date;
	updatedAt: Date;
	ownerId: number;
	collaborators: Collaborator[];
}

export interface Column {
	id: string;
	name: string;
	description: string | null;
	position: number;
	taskCount: number;
	identifier: string | null;
	column_limit: number | null;
	projectId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateColumnPayload {
	name: string;
	description?: string;
	identifier: string;
}
export interface CreateColumnResponse extends ApiMeta {
	data: Column;
}

export interface UpdateColumnPayload {
	name?: string;
	description?: string;
	identifier?: string;
	column_limit?: number;
}
