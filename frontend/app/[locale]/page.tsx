"use client";

import { Button } from "@nextui-org/button";
import { FaBookOpen, FaShieldAlt, FaChartPie, FaBitcoin } from "react-icons/fa";
import { useTranslations } from "next-intl";
// import { useRouter } from "../../i18n/routing";
// import { Link } from "@/i18n/routing";

export default function Home() {
	// const router = useRouter();
	const t = useTranslations("LandingPage");
	const featuresData = [
		{
			title: t("section_storyline_title"),
			description: t("section_storyline_description"),
			icon: <FaBookOpen />,
		},
		{
			title: t("section_fights_title"),
			description: t("section_fights_description"),
			icon: <FaShieldAlt />,
		},
		{
			title: t("section_characters_title"),
			description: t("section_characters_description"),
			icon: <FaChartPie />,
		},
		{
			title: t("section_economy_title"),
			description: t("section_economy_description"),
			icon: <FaBitcoin />,
		},
	];

	return (
		<>
			<div
				className="fixed inset-0 bg-top lg:bg-center bg-cover bg-no-repeat h-100vh w-full"
				style={{
					backgroundImage: `url('/img/art.webp')`,
				}}
			></div>
			<div className="flex flex-col items-center justify-center w-100vw h-100vh min-h-[calc(100vh-64px)]">
				<div className="w-full md:w-4/5 lg:w-3/4 h-4/5 p-6 flex flex-col justify-between items-center xl:items-start gap-y-20 md:gap-y-24 py-16">
					<div className="backdrop-blur shadow-xl bg-black/45 w-full lg:w-2/3 2xl:w-1/2 min-w-0 lg:min-w-[600px] max-h-fit h-3/5 rounded-xl p-8 sm:p-12 flex flex-col justify-center gap-y-6">
						<h1 className="text-foreground text-3xl sm:text-5xl">
							{t("hero_title_discover")}{" "}
							<span className="text-primary">{t("hero_title_reason")}</span>{" "}
							{t("hero_title_behind")}
						</h1>
						<p className="text-foreground text-lg sm:text-xl">{t("hero_description")}</p>
						<div className="w-full flex justify-center xl:justify-start">
							<Button
								color="primary"
								radius="lg"
								size="lg"
								variant="shadow"
								className="mt-3 w-[275px] text-black text-lg"
								isDisabled={true}
							>
								{t("button_in_development")}
							</Button>
						</div>
					</div>
					<div className="w-full h-1/4 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 justify-center gap-4">
						{featuresData.map((item, index) => (
							<div
								key={index}
								className="backdrop-blur shadow-xl border-[1px] border-primary-300/60 bg-black/40 rounded-xl p-4 text-foreground flex flex-col gap-y-4 text-wrap"
							>
								<h2 className="text-2xl flex items-center gap-x-2.5 text-primary-400">
									{item.icon} {item.title}
								</h2>
								<p className="text-base">{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
