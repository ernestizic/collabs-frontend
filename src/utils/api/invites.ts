import { axiosInstance } from "@/lib/axios";
import { SendInvitePayload } from "../types/api/project";
import { ApiMeta } from "../types";
import { GetMembersResponse } from "../types/api/members";
import { useProject } from "@/store/useProject";

export const sendInvite = async (
	payload: SendInvitePayload
): Promise<ApiMeta> => {
	try {
		const res = await axiosInstance.post(`members/invite-user`, payload);
		return res.data;
	} catch (e) {
		throw e;
	}
};

export const getAllMembers = async (): Promise<GetMembersResponse> => {
	const projectId = useProject.getState().activeProject?.id;
	try {
		const res = await axiosInstance.get(`members?projectId=${projectId}`);
		return res.data;
	} catch (e) {
		throw e;
	}
};
