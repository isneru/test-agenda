import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans]
			},
			colors: {
				cex: '#e30613',
				foreground: '#525252',
				background: '#0a0a0a',
				text: '#f5f5f5'
			},
			screens: {
				print: { raw: 'print' }
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
} satisfies Config
