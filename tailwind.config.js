/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  daisyui: {
    themes: [
      "light",
      {
        mytheme: {
          primary: "#FF8E1F",
          secondary: "#252525",
          accent: "#FFF8F4",
          neutral: "#3d4451",
          dark: "#4A4A4A",
          "base-100": "#ffffff",
        },
      },
    ],
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      fontFamily: {
        header: ["Rubik", "sans-serif"],
        body: ["Roboto", "sans-serif"],
        abc: ["Lobster", "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
};
