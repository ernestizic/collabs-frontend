import { axiosInstance } from "@/lib/axios";
import {
	CreateUserPayload,
	CreateUserResponse,
	GetUserResponse,
	ResetPasswordPayload,
	SignInPayload,
	verifyEmailPayload,
} from "../types/api/auth";
import { ApiMeta } from "../types";

export const signup = async (
	payload: CreateUserPayload
): Promise<CreateUserResponse> => {
	try {
		const res = await axiosInstance.post(`auth/signup`, payload);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const login = async (
	payload: SignInPayload
): Promise<CreateUserResponse> => {
	try {
		const res = await axiosInstance.post(`auth/login`, payload);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const verifyEmail = async (
	payload: verifyEmailPayload
): Promise<CreateUserResponse> => {
	try {
		const res = await axiosInstance.post(`auth/verify-code`, payload);
		return res.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

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
		const res = await axiosInstance.post<ApiMeta>(`auth/logout`);
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
