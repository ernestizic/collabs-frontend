import { axiosInstance } from "@/lib/axios";
import {
	CreateTaskPayload,
	CreateTaskResponse,
	FetchTasksResponse,
} from "../types/api/task";
import { useProject } from "@/store/useProject";

export const createTask = async (
	payload: CreateTaskPayload
): Promise<CreateTaskResponse> => {
	const projectId = useProject.getState().activeProject?.id;
	try {
		const res = await axiosInstance.post(
			`projects/${projectId}/tasks`,
			payload
		);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const fetchTasks = async (
	page = 1,
	columnId?: string,
	type?: string
): Promise<FetchTasksResponse> => {
	const projectId = useProject.getState().activeProject?.id;

	try {
		const params = new URLSearchParams({ page: String(page) });

		if (columnId) params.append("columnId", columnId);
		if (type) params.append("type", type);

		const url = `projects/${projectId}/tasks?${params.toString()}`;

		const res = await axiosInstance.get(url);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};
