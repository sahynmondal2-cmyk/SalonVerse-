/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        espresso: '#120E0D',
        surface: '#1D1715',
        cream: '#F5EEE4',
        champagne: '#C9A77A',
        rose: '#B9827A',
        muted: '#9E948B',
        borderLight: 'rgba(255,255,255,0.10)',
        borderDark: 'rgba(0,0,0,0.10)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
