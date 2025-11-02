import { axiosInstance } from "@/lib/axios";
import { SendInvitePayload } from "../types/api/project";
import { ApiMeta } from "../types";

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
