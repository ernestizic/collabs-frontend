import { ApiMeta, MemberRole, User } from "..";

export interface GetMembersResponse extends ApiMeta {
	data: {
		user: Partial<User>;
		id: number;
		role: MemberRole;
		userId: number;
		projectId: number;
	}[];
}
