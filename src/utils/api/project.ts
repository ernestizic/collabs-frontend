import { axiosInstance } from "@/lib/axios";
import {
	CreateColumnPayload,
	CreateColumnResponse,
	CreateProjectPayload,
	CreateProjectResponse,
	GetColumnsResponse,
	GetProjectResponse,
	ProjectsResponse,
	UpdateColumnPayload,
} from "../types/api/project";
import { useProject } from "@/store/useProject";
import { ApiMeta } from "../types";

export const createProject = async (
	payload: CreateProjectPayload
): Promise<CreateProjectResponse> => {
	try {
		const res = await axiosInstance.post(`projects`, payload);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getProjects = async (page = 1): Promise<ProjectsResponse> => {
	try {
		const res = await axiosInstance.get(`projects/user?page=${page}`);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getProject = async (id: number): Promise<GetProjectResponse> => {
	try {
		const res = await axiosInstance.get(`projects/${id}`);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getColumns = async (
	projectId: number
): Promise<GetColumnsResponse> => {
	try {
		const res = await axiosInstance.get(`projects/${projectId}/columns`);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const createColumn = async (
	createColumnpayload: CreateColumnPayload
): Promise<CreateColumnResponse> => {
	const projectId = useProject.getState().activeProject?.id;
	try {
		const res = await axiosInstance.post(
			`projects/${projectId}/create-column`,
			createColumnpayload
		);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const deleteColumn = async (columnId: string): Promise<ApiMeta> => {
	const projectId = useProject.getState().activeProject?.id;
	try {
		const res = await axiosInstance.delete(
			`projects/${projectId}/column/${columnId}`
		);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const updateColumn = async (
	columnId: string,
	payload: UpdateColumnPayload
): Promise<CreateColumnResponse> => {
	const projectId = useProject.getState().activeProject?.id;
	try {
		const res = await axiosInstance.patch(
			`projects/${projectId}/column/${columnId}`,
			payload
		);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};
