/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Use class for dark mode
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // DaisyUI supports light/dark
  },
};
