/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['DM Sans', 'sans-serif'],
          serif: ['Playfair Display', 'serif'],
        },
        colors: {
          primary: '#FF385C',
          secondary: '#222222',
          gray: '#717171',
          lightGray: '#F7F7F7',
        },
      },
    },
    plugins: [],
  }