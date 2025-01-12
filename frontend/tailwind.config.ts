import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			// colors: {
			// 	background: "var(--background)",
			// 	foreground: "var(--foreground)",
			// },
			screens: {
				xs: "480px",
				"3xl": "1920px",
			},
			fontFamily: {
				sans: [
					'"Inter"',
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
			},
		},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				"default-theme": {
					extend: "dark",
					colors: {
						background: "#111111",
						foreground: "#F5F5F5",
						primary: {
							50: "#FFF3E0",
							100: "#FFE0B2",
							200: "#FFCC80",
							300: "#FFB74D",
							400: "#FFA726",
							500: "#FF9800",
							600: "#FB8C00",
							700: "#F57C00",
							800: "#EF6C00",
							900: "#E65100",
							DEFAULT: "#FF9800",
							foreground: "#F5F5F5",
						},
						focus: "#FF9800",
					},
					layout: {
						disabledOpacity: "0.3",
						radius: {
							small: "4px",
							medium: "6px",
							large: "8px",
						},
						borderWidth: {
							small: "1px",
							medium: "2px",
							large: "3px",
						},
					},
				},
			},
		}),
	],
} satisfies Config;
