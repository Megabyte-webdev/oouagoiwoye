/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        bgBlue: '#010035',
      },
      fontFamily: {
        cursive: ["UnifrakturCook"],
      },
      gradientColorStops: {
        'bgBlue': '#010035',
      }
    },
  },
  plugins: [],
}

