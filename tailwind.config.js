/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: "#f875aa",
        lightPink: "#FFDFDF",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
