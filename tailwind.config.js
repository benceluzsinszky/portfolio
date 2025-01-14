/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        "scroll-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "scroll-right": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0%)" },
        },
      },
      animation: {
        "scroll-left": "scroll-left 25s linear infinite",
        "scroll-right": "scroll-right 25s linear infinite",
      },
      dropShadow: {
        green: ["0 0px 6px green", "0 0px 6px green"],
      },
    },
  },
  plugins: [],
};
