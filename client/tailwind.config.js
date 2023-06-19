/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customDark: "#474747",
        customWhite: "#fcfcfc",

        customTooDark: "#161417",

        customSky: "#3eebf7",
        customYellow: "#ffff0a",
      },
      screens: {
        sm: "240px", // Small screens, such as smartphones
        md: "940px", // Medium screens, such as tablets
        lg: "1024px", // Large screens, such as laptops
        xl: "1280px", // Extra-large screens, such as desktops
        "2xl": "1400px",
        "3xl": "1530px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ "dark","luxury"],
  },
};
