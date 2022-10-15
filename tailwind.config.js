/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: {
          darker: "#492912",
          "darker-hover": "#73401C",
          default: "#D49D76",
          light: "#F0D0C0",
          secundary: "#2293E2",
        },
      },
      colors: {
        primary: "#5E3711",
        secundary: "#2293E2",
      },
    },
  },
  plugins: [],
};
