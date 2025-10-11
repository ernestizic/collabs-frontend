import { User } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
	user: User | null;
	hasHydrated: boolean;
};

type Actions = {
	setUser: (user: User) => void;
	setHasHydrated: (state: boolean) => void;
	clearUser: () => void;
};

const initState = {
	user: null,
	hasHydrated: false,
};

export const useUser = create<State & Actions>()(
	persist(
		(set) => ({
			...initState,
			setUser: (user) => set(() => ({ user: user })),
			setHasHydrated: (state) => set({ hasHydrated: state }),
			clearUser: () => set({ user: null }),
		}),
		{
			name: "collabs-user",
			partialize: (state) => ({
				user: state.user,
			}),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		}
	)
);
