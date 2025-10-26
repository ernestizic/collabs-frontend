import { User } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

type State = {
	user: User | null;
	access_token: string | null;
	hasHydrated: boolean;
};

type Actions = {
	setUser: (user: User) => void;
	setAccessToken: (token: string) => void;
	setHasHydrated: (state: boolean) => void;
	clearUser: () => void;
};

const initState = {
	user: null,
	access_token: Cookies.get("access_token") || null,
	hasHydrated: false,
};

export const useUser = create<State & Actions>()(
	persist(
		(set) => ({
			...initState,
			setUser: (user) => set(() => ({ user: user })),
			setAccessToken: (token) => {
				Cookies.set("access_token", token);
				set({ access_token: token });
			},
			setHasHydrated: (state) => set({ hasHydrated: state }),
			clearUser: () => {
				Cookies.remove("access_token");
				set(() => ({ access_token: null, user: null }));
			},
		}),
		{
			name: "collabs-user",
			partialize: (state) => ({
				user: state.user,
				access_token: state.access_token,
			}),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		}
	)
);
