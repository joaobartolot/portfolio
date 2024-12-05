/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		extend: {
			fontFamily: {
				display: ['Montserrat', 'sans-serif'],
				sans: ['Nunito', 'sans-serif'],
				body: ['Roboto Mono', 'monospace'],
			},
			colors: {
				'rich-black': {
					DEFAULT: '#111827',
					100: '#030508',
					200: '#070a10',
					300: '#0a0e17',
					400: '#0e131f',
					500: '#111827',
					600: '#2d3f66',
					700: '#4866a5',
					800: '#8197c8',
					900: '#c0cbe3',
				},
				'raisin-black': {
					DEFAULT: '#1e2534',
					100: '#06070a',
					200: '#0c0f15',
					300: '#12161f',
					400: '#181d29',
					500: '#1e2534',
					600: '#3d4b6a',
					700: '#5c72a1',
					800: '#92a1c0',
					900: '#c9d0e0',
				},
				gunmetal: {
					DEFAULT: '#27303f',
					100: '#080a0d',
					200: '#101319',
					300: '#171d26',
					400: '#1f2633',
					500: '#27303f',
					600: '#465672',
					700: '#677da2',
					800: '#9aa8c1',
					900: '#ccd4e0',
				},
				charcoal: {
					DEFAULT: '#374151',
					100: '#0b0d10',
					200: '#161a21',
					300: '#212731',
					400: '#2d3542',
					500: '#374151',
					600: '#56657e',
					700: '#7a8aa5',
					800: '#a6b1c3',
					900: '#d3d8e1',
				},
				'paynes-gray': {
					DEFAULT: '#48556a',
					100: '#0e1115',
					200: '#1d222a',
					300: '#2b3340',
					400: '#3a4455',
					500: '#48556a',
					600: '#637592',
					700: '#8997ae',
					800: '#b0bac9',
					900: '#d8dce4',
				},
			},
		},
		keyframes: {
			slowBounce: {
				'0%, 100%': { transform: 'translateY(5px)' },
				'50%': { transform: 'translateY(0px)' }, // Adjust for larger bounce
			},
		},
		animation: {
			slowBounce: 'slowBounce 1s ease-in-out infinite', // Slower and smoother bounce
		},
	},
	plugins: [
		require('@tailwindcss/typography'), // Aprimoramento de tipografia
		require('@tailwindcss/aspect-ratio'), // Útil para manter proporções de imagens
	],
};
