import { ProjectsResponse } from "@/utils/types/api/project";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import { useProject } from "@/store/useProject";

const ProjectPage = async () => {
	const activeProject = useProject.getState().activeProject;
	const token = Cookies.get("access_token");

	if (activeProject) redirect(`/project/${activeProject.id}/tasks`);

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}projects/user`,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
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
