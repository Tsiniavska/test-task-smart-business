/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        violet: {
          400: '#504E6A',
        },
        red: {
          550: '#F52D2D',
          300: '#ee6b6e',
        },
      },
      fontFamily: {
        base: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        base: ['16px'],
      },
    },
  },
  plugins: [],
};
