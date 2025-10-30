"use client";

import { ReactNode, useEffect, useState } from "react";
import { useProject } from "@/store/useProject";
import { redirect, useParams } from "next/navigation";
import { getProject } from "@/utils/api/project";
import { BarLoader } from "react-spinners";

const ProjectInitializer = ({ children }: { children: ReactNode }) => {
	const { projectId } = useParams();
	const { setActiveProject } = useProject();
	const [isLoading, setIsLoading] = useState(false);

	const initProject = async () => {
		if (!projectId) redirect("/dashboard");
		setIsLoading(true);
		try {
			const res = await getProject(Number(projectId));
			setActiveProject(res.data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			redirect("/dashboard");
		}
	};

	useEffect(() => {
		initProject();
		// eslint-disable-next-line
	}, [projectId]);

	if (isLoading)
		return (
			<div className="h-[calc(100vh-72px)] w-full flex items-center justify-center bg-primary/10">
				<BarLoader width={150} color="var(--primary)" className="bg-accent"  />
			</div>
		);

	return <div>{children}</div>;
};

export default ProjectInitializer;
