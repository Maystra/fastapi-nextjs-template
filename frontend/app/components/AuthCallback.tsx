"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { apiRequest } from "@/app/utils/api";
import { useAuthStore } from "@/app/store/authStore";
import { AuthData } from "@/app/types/auth";
import { Alert, Spinner } from "@nextui-org/react";
import { useTranslations } from "next-intl";

interface AuthCallbackProps {
	provider: string;
}

export default function AuthCallback({ provider }: AuthCallbackProps) {
	const router = useRouter();
	const setAuthStorage = useAuthStore((state) => state.setAuthStorage);
	const [error, setError] = useState<string | null>(null);

	const t = useTranslations("AuthCallbackPage");

	useEffect(() => {
		const handleAuth = async () => {
			const queryParams = new URLSearchParams(window.location.search);
			const queryString = queryParams.toString();
			const endpoint = `/auth/${provider}/callback?${queryString}`;

			try {
				setAuthStorage({ access_token: null, login_invisible: true });
				const data: AuthData = await apiRequest(endpoint, {
					method: "GET",
				});

				setAuthStorage({ access_token: data.access_token, login_invisible: false });
				router.push("/character");
			} catch (error) {
				console.log("Authentication failed:", error);
				setError("AUTHENTICATION_ERROR");
			}
		};

		handleAuth();
	}, [router, setAuthStorage, provider]);

	return (
		<div className="w-full h-full min-h-[calc(100vh-64px)] flex-auto flex flex-col items-center justify-center">
			{error ? (
				<div>
					<Alert color="danger">{t(error as keyof IntlMessages["AuthCallbackPage"])}</Alert>
				</div>
			) : (
				<div>
					<Spinner color="primary" label={t("authenticating")} labelColor="primary" size="lg" />
				</div>
			)}
		</div>
	);
}
