/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				"t-green": "#2aa198",
				"t-black": "#121212",
				"n-red": "#cb4b16"
			},
			fontFamily: {
				inter: ["Inter", ...defaultTheme.fontFamily.sans],
				hack: ["Hack", ...defaultTheme.fontFamily.mono],
			},
		},
	},
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
