/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a8e6cf",
        "bg-light": "#f9f9f9",
        "bg-dark": "#131f1a",
        "text-main": "#121715",
        "text-sub": "#688279",
        "border-light": "#dde4e1",
        "card-dark": "#1c2a24",
      },
      fontFamily: {
        maru: ["ZenMaruGothic_400Regular", "ZenMaruGothic_500Medium", "ZenMaruGothic_700Bold"],
      },
      borderRadius: {
        DEFAULT: "16px",
        lg: "24px",
        xl: "48px",
      },
    },
  },
  plugins: [],
};
