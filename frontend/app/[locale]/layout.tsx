import { Rubik } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import PageTransition from "../transition";
import { GoogleAnalytics } from "@next/third-parties/google";
import { generatePageMetadata } from "@/app/metadata";
import { Locale } from "@/app/types/locale";
import MainNavbar from "@/app/components/navbar";

export async function generateMetadata() {
	return generatePageMetadata();
}

const rubikSans = Rubik({
	variable: "--font-rubik-sans",
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as Locale)) {
		notFound();
	}

	// Providing all messages to the client side is the easiest way to get started
	const messages = await getMessages({ locale });

	return (
		<html lang={locale} className="dark">
			<head>
				<meta name="author" content="Maystra" />
				<meta name="robots" content="index, follow" />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="language" content={locale === "ru" ? "Russian" : "English"} />
				<meta name="twitter:card" content="summary_large_image" />

				<GoogleAnalytics gaId="G-NBC8S1CJZH" />
			</head>
			<body
				className={`${rubikSans.variable} font-[family-name:var(--font-rubik-sans)] antialiased bg-black default-theme h-100vh min-h-[100vh] bg-gradient-to-tr from-[#170801] via-[#050505] to-[#050505] overflow-x-hidden`}
			>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Providers>
						<div className="relative min-h-[100vh] flex flex-col">
							<MainNavbar />
							<PageTransition>{children}</PageTransition>
						</div>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
