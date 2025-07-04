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
        bgBlue: '#010035',
      },
      colors: {
        royal: "#0B35A2",
        deep: "#010035"
      }, borderWidth: {
        thin: "0.5px"
      }
    },
  },
  plugins: [],
}

