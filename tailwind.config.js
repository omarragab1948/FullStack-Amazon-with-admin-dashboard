/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#2c3e50",
        second: "#157075",
        secondhover: "#0F4D54",
        sidebar: "#2c3e50",
        header: "#2c3e50",
        body: "#333333"
      },
    },
  },
  plugins: [],
};
