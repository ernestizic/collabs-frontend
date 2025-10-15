import { axiosInstance } from "@/lib/axios";
import { GetUserResponse, ResetPasswordPayload } from "../types/api/auth";
import { ApiMeta } from "../types";
import axios from "axios";

export const resendEmailVerificationCode = async (payload: {
	email: string;
}): Promise<ApiMeta> => {
	try {
		const res = await axiosInstance.post(
			`auth/send-verification-code`,
			payload
		);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const sendResetPasswordCode = async (
	email: string
): Promise<ApiMeta> => {
	try {
		const res = await axiosInstance.post(`auth/forgot-password?email=${email}`);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const resetPassword = async (
	payload: ResetPasswordPayload
): Promise<ApiMeta> => {
	try {
		const res = await axiosInstance.post(`auth/reset-password`, payload);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const logout = async () => {
	try {
		const res = await axios.post(`/api/logout`);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getAuthenticatedUser = async () => {
	try {
		const res = await axiosInstance.get<GetUserResponse>(`auth/me`);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};
