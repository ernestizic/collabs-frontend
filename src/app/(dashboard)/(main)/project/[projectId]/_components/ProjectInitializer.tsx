"use client";

import { ReactNode, useEffect, useState } from "react";
import { useProject } from "@/store/useProject";
import { redirect, useParams, useRouter } from "next/navigation";
import { getProject } from "@/utils/api/project";
import { BarLoader } from "react-spinners";
import useProjectPusher from "@/hooks/useProjectPusher";

const ProjectInitializer = ({ children }: { children: ReactNode }) => {
	const { projectId } = useParams();
	const router = useRouter();
	useProjectPusher(Number(projectId))

	const { setActiveProject, activeProject } = useProject();
	const [isLoading, setIsLoading] = useState(false);

	const initProject = async () => {
		if (!projectId) return;
		setIsLoading(true);
		try {
			const res = await getProject(Number(projectId));
			setActiveProject(res.data);
			setIsLoading(false);
		} catch (error) {
			console.log("error loading project", error)
			setIsLoading(false);
			router.replace("/dashboard");
		}
	};

	useEffect(() => {
		initProject();
		// eslint-disable-next-line
	}, [projectId]);

	if (!projectId) redirect("/dashboard")

	if (isLoading && !activeProject)
		return (
			<div className="h-[calc(100vh-72px)] w-full flex items-center justify-center bg-primary/10">
				<BarLoader width={150} color="var(--primary)" className="bg-accent"  />
			</div>
		);

	return <div>{children}</div>;
};

export default ProjectInitializer;
