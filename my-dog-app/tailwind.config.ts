import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react' // Importe o plugin do NextUI

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}', // Adicione esta linha
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class', // Habilite o dark mode se desejar
  plugins: [nextui()], // Adicione o plugin do NextUI
}

export default config