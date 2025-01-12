import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://cryptic-project.su",
			lastModified: new Date(),
			alternates: {
				languages: {
					en: "https://cryptic-project.su/en",
					ru: "https://cryptic-project.su/ru",
				},
			},
		},
		{
			url: "https://cryptic-project.su/leaderboard",
			lastModified: new Date(),
			alternates: {
				languages: {
					en: "https://cryptic-project.su/en/leaderboard",
					ru: "https://cryptic-project.su/ru/leaderboard",
				},
			},
		},
	];
}
