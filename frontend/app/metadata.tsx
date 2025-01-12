// filepath: /c:/Users/Night/Desktop/nextjs_test/app/metadata.tsx
import { getLocale, getTranslations } from "next-intl/server";
import Favicon from "@/public/favicon.ico";

export async function generatePageMetadata(titleIdentifier?: string) {
	const locale = await getLocale();
	const t = await getTranslations({ locale, namespace: "TabNames" });
	const metadata_t = await getTranslations({ locale, namespace: "Metadata" });

	const title = titleIdentifier
		? `${t(titleIdentifier as keyof IntlMessages["TabNames"])} | ${t("project_name")}`
		: t("project_name");

	return {
		title,
		description: metadata_t("description"),
		keywords: metadata_t("keywords"),
		icons: [{ rel: "icon", url: Favicon.src }],
		openGraph: {
			title,
			description: metadata_t("description"),
			images: [{ url: "https://cryptic-project.su/img/art.webp" }],
			url: "https://cryptic-project.su",
		},
	};
}
