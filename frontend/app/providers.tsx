"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "../i18n/routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

declare module "@react-types/shared" {
	interface RouterConfig {
		routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
	}
}

export function Providers({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<NextUIProvider navigate={router.push}>{children}</NextUIProvider>
		</QueryClientProvider>
	);
}
