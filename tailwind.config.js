/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#67e8f9', // A lighter cyan
          DEFAULT: '#06b6d4', // The main cyan
          dark: '#0e7490', // A darker cyan for hover states
        },
        secondary: '#f59e0b', // A warm amber/yellow for accents
        neutral: {
          100: '#f8fafc', // Very light gray for backgrounds
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // A clean, modern font
      },
    },
  },
  plugins: [],
}