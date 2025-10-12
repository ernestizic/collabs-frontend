import { ApiMeta, PaginationType } from "..";

export interface CreateProjectPayload {
	name: string;
	description?: string;
}

export interface CreateProjectResponse extends ApiMeta {
	data: {
		name: string;
		description: string | null;
		isOpen: boolean;
		id: number;
		createdAt: Date;
		updatedAt: Date;
		ownerId: number;
	};
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

export interface Collaborator {
	id: number;
	role: "MEMBER";
	userId: number;
	projectId: number;
	user: {
		firstname: string;
		lastname: string;
	};
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
