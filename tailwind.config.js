/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a8e6cf",
        secondary: "#2d9d6f",
        destructive: "#ff3b30",
        "bg-light": "#f9f9f9",
        "bg-dark": "#131f1a",
        "text-main": "#121715",
        "text-sub": "#688279",
        "label-secondary": "#8e8e93",
        "border-light": "#dde4e1",
        separator: "rgba(60, 60, 67, 0.12)",
        "fill-secondary": "rgba(120, 120, 128, 0.16)",
        "fill-tertiary": "rgba(120, 120, 128, 0.12)",
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
