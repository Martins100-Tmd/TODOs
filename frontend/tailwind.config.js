/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pop: ["Poppins"],
      },
      width: {
        Ten: ["14%"],
        nine: ["90%"],
        40: ["40%"],
        // 200: ["200px"],
        30: ["30%"],
      },
      height: {
        500: ["380px"],
        150: ["150px"],
      },
      backgroundColor: {
        black4: ["rgba(0, 0, 0, 0.1)"],
        blue_1: ["rgb(0, 0, 0)"],
      },
      screens: {
        eight: "900px",
        five: "500px",
        seven: "753px",
      },
      maxHeight: {
        500: ["350px"],
      },
      maxWidth: {
        klose: "100ch",
      },
      minHeight: {
        250: "250px",
        400: "400px",
        150: "150px",
      },
    },
  },
  plugins: [],
};
