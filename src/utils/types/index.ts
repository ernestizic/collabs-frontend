export type User = {
	email: string;
	id: number;
	firstname: string;
	lastname: string;
	email_verified_at: Date | null;
	createdAt: Date;
};

export type ApiMeta = {
	status: boolean;
	message: string;
};

export type ApiError = {
	error: boolean;
	message: string | string[];
	statusCode: number;
};
