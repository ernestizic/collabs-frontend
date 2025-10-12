import { Project } from "@/utils/types/api/project";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
	activeProject: Project | null;
};

type Actions = {
	setActiveProject: (project: Project) => void;
};

const initState = {
	activeProject: null,
};

export const useProject = create<State & Actions>()(
	persist(
		(set) => ({
			...initState,
			setActiveProject: (project) => set(() => ({ activeProject: project })),
		}),
		{
			name: "collabs-active-project",
			partialize: (state) => ({
				activeProject: state.activeProject,
			}),
		}
	)
);
