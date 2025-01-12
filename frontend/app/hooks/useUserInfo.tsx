import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/utils/api";
import { useAuthStore } from "@/app/store/authStore";
import { User } from "@/app/types/user";

const fetchUser = async (): Promise<User> => {
	return apiRequest<User>("/users/me", {
		method: "GET",
	});
};

// значения для токена: null - грузятся данные, undefined - токен не задан, string - токен задан
export const useUserInfo = () => {
	const { authStorage, setAuthStorage } = useAuthStore();

	const {
		data: user,
		error: userError,
		isLoading: isUserLoading,
	} = useQuery<User>({
		queryKey: ["user", authStorage.access_token],
		queryFn: fetchUser,
		enabled: !!authStorage.access_token,
		retry: (failureCount, error) => {
			if (error instanceof Error && error.message.includes("Unauthorized")) {
				return false;
			}
			return failureCount < 3;
		},
	});

	useEffect(() => {
		if (user && !user.is_active) {
			setAuthStorage({ access_token: undefined, login_invisible: false });
		}
	}, [user, isUserLoading, setAuthStorage]);

	useEffect(() => {
		if (userError) {
			console.log("Token validation failed");
			setAuthStorage({ access_token: undefined, login_invisible: false });
		}
	}, [userError, setAuthStorage]);

	return { user, userError, isUserLoading };
};
