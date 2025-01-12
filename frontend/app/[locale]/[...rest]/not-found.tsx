import { useTranslations } from "next-intl";

export default function NotFoundPage() {
	const t = useTranslations("NotFoundPage");
	return (
		<div className="w-full h-full min-h-[calc(100vh-64px)] gap-4 flex-auto flex flex-col items-center justify-center text-center">
			<h1 className="text-3xl">{t("not_found_title")}</h1>
			<h2 className="text-lg">{t("not_found_description")}</h2>
		</div>
	);
}
