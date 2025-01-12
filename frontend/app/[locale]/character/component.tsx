"use client";
import { useUserInfo } from "@/app/hooks/useUserInfo";
import { Skeleton } from "@nextui-org/react";

export default function Character() {
	const { user, isUserLoading } = useUserInfo();

	const isLoaded: boolean = !isUserLoading && !!user;
	return (
		<div className="flex flex-col gap-4">
			<Skeleton className="rounded-lg w-64" isLoaded={isLoaded}>
				<h1 className="text-4xl">Hello, {user?.username}!</h1>
			</Skeleton>
			<Skeleton className="rounded-lg w-64" isLoaded={isLoaded}>
				<p className="text-2xl">Email: {user?.email}</p>
			</Skeleton>
		</div>
	);
}
