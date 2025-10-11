import { ApiMeta, User } from "..";

export interface CreateUserPayload {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export interface SignInPayload {
	email: string;
	password: string;
}

export interface verifyEmailPayload {
	email: string;
	code: string;
}

export interface ResetPasswordPayload {
	email: string;
	password: string;
	code: string;
}

export interface CreateUserResponse extends ApiMeta {
	data: User;
}
