import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#022B3A',
          700: '#1F7A8C',
          surface: '#E1E5F2',
          soft: '#BFDBF7',
        },
      },
    },
  },
  darkMode: ['class'],
}

export default config
