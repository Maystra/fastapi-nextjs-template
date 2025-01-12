import { Button } from "@nextui-org/react";
import { FaDiscord } from "react-icons/fa"; // , FaGoogle
import { apiRequest } from "../utils/api";
import { useTranslations } from "next-intl";

export const OAuthButtons = () => {
	const t = useTranslations("LoginRegisterPage");

	// const handleGoogleAuth = async () => {
	// 	const data: { authorization_url: string } = await apiRequest("/auth/google/authorize", {
	// 		method: "GET",
	// 	});

	// 	if (!data.authorization_url) {
	// 		throw new Error("REQUEST_ERROR");
	// 	}

	// 	window.location.href = data.authorization_url;
	// };

	const handleDiscordAuth = async () => {
		const data: { authorization_url: string } = await apiRequest("/auth/discord/authorize", {
			method: "GET",
		});

		if (!data.authorization_url) {
			throw new Error("REQUEST_ERROR");
		}

		window.location.href = data.authorization_url;
	};

	return (
		<>
			<div className="flex items-center my-4">
				<div className="flex-grow border-t border-gray-500/40"></div>
				<span className="mx-3 text-gray-500/40">{t("OR")}</span>
				<div className="flex-grow border-t border-gray-500/40"></div>
			</div>
			{/* <Button
				startContent={<FaGoogle />}
				className="bg-blue-600/70"
				onPress={() => {
					handleGoogleAuth();
				}}
			>
				{t("google_register_button")}
			</Button> */}
			<Button
				startContent={<FaDiscord />}
				className="bg-indigo-500/70"
				onPress={() => {
					handleDiscordAuth();
				}}
			>
				{t("discord_register_button")}
			</Button>
		</>
	);
};
