const { color } = require('framer-motion');

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#121212',
				secondary: '#3B82F6',
				tertiary: '#8B5CF6',
			},
			scrollBehavior: {
				smooth: 'smooth',
			},
		},
	},
	plugins: [],
};
