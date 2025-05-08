/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0f0fe',
          200: '#bae0fd',
          300: '#7cc9fb',
          400: '#38acf5',
          500: '#0e90e0',
          600: '#0072c0',
          700: '#015a9c',
          800: '#064d81',
          900: '#0b406c',
          950: '#082848',
        },
        secondary: {
          50: '#f8f6f3',
          100: '#efe9e2',
          200: '#ded1c3',
          300: '#c9b29d',
          400: '#b38f74',
          500: '#a27759',
          600: '#8f634a',
          700: '#77513e',
          800: '#634436',
          900: '#533a30',
          950: '#2d1e19',
        },
        accent: {
          50: '#fef7ee',
          100: '#fdebcc',
          200: '#fbd599',
          300: '#f9b75b',
          400: '#f79829',
          500: '#ef7410',
          600: '#dc5109',
          700: '#b9370c',
          800: '#942d10',
          900: '#782810',
          950: '#411307',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 10px rgba(0, 0, 0, 0.05)',
        medium: '0 6px 20px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};