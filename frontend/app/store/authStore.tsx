import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthData } from "@/app/types/auth";

interface AuthState {
	authStorage: AuthData;
	setAuthStorage: (authStorage: Partial<AuthData>) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			authStorage: { access_token: null, login_invisible: false },
			setAuthStorage: (authStorage) =>
				set((state) => ({
					authStorage: { ...state.authStorage, ...authStorage },
				})),
		}),

		{
			name: "auth-storage",
		}
	)
);
