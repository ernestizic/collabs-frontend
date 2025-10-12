import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { useRouter } from "next/navigation";

const ProjectsEmptyState = () => {
	const router = useRouter();
	return (
		<div>
			<Empty>
				<EmptyHeader>
					<EmptyTitle className="text-3xl font-bold">No Projects Yet</EmptyTitle>
					<EmptyDescription className="text-lg">
						You haven&apos;t created any projects yet. Get started by creating
						your first project.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button onClick={() => router.push("/create-project")}>
							Create Project
						</Button>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
};

export default ProjectsEmptyState;
