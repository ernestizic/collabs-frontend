import { ProjectsResponse } from "@/utils/types/api/project";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ProjectPage = async () => {
	const cookieStore = await cookies();
	const cookie = cookieStore.toString();
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}projects/user`,
			{
				headers: {
					cookie,
				},
			}
		);
		const data: ProjectsResponse = await res.json();
		const firstProject = data.data.projects[0].id;

		if (!firstProject) {
			redirect(`/dashboard`);
		}
		redirect(`/project/${firstProject}/tasks`);
	} catch (error) {
		// eslint-disable-next-line
		if ((error as any).digest?.startsWith("NEXT_REDIRECT")) throw error;
		redirect("/dashboard");
	}
};

export default ProjectPage;
