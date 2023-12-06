import generated from '@tailwindcss/forms'
import preline from 'preline/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '2rem',
      },
    },
  },
  plugins: [
    generated,
    preline
  ],
}
