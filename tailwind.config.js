/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/App.vue",
    "./src/components/**/*.{vue,js,ts,jsx,tsx}",
    "./src/pages/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
