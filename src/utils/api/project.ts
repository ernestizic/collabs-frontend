import { axiosInstance } from "@/lib/axios";
import {
	CreateProjectPayload,
	CreateProjectResponse,
	GetProjectResponse,
	ProjectsResponse,
} from "../types/api/project";

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
