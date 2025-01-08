/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        grow_pulse: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)", opacity: 0.2 },
          "100%": { transform: "scale(1)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)" },
          "50%": { boxShadow: "0 0 10px 5px green" },
          "100%": { boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)" },
        },
      },

      animation: {
        grow_pulse: "grow_pulse 1s infinite",
        glow: "glow 1s infinite",
      },
      dropShadow: {
        green: ["0 0px 6px green", "0 0px 6px green"],
      },
    },
  },
  plugins: [],
};
