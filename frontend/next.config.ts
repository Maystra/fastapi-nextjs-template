import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	publicRuntimeConfig: {
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000",
	},
};

export default withNextIntl(nextConfig);
