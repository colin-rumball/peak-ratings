import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ff-navy-blue": "#172c66", // text
        "ff-cream": "#fef6e4", // bg
        "ff-light-pink": "#f3d2c1", // border
        "ff-pink": "#f582ae", // primary
        "ff-dark-pink": "#ff3d6a", // primary offset
        "ff-pale-cyan": "#8bd3dd", // secondary
        "ff-green": "#006e8a",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        tlp: "url('/images/TLP_bg.png')",
      },
      animation: {
        "modal-open": "modal-open 0.3s ease-out",
        "modal-close": "modal-close 0.3s ease-in-out",
        bounce2: "bounce2 1.0s ease",
        bounce3: "bounce3 1.0s ease",
        "fade-in": "fade-in 1.0s ease-in-out",
        shine: "shine 1.0s ease-in-out",
      },
      keyframes: {
        "modal-open": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.1)", opacity: "50" },
          "100%": { transform: "scale(1.0)", opacity: "100" },
        },
        "modal-close": {
          "0%": { transform: "scale(1.0)", opacity: "100" },
          "100%": { transform: "scale(0.3)", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "100" },
        },
        bounce2: {
          "0%": { transform: "scale(1,1) translateY(0)" },
          "10%": { transform: "scale(1.1,.9) translateY(0)" },
          "30%": { transform: "scale(.9,1.1) translateY(-100px)" },
          "50%": { transform: "scale(1.05,.95) translateY(0)" },
          "57%": { transform: "scale(1,1) translateY(-7px)" },
          "64%": { transform: "scale(1,1) translateY(0)" },
          "100%": { transform: "scale(1,1) translateY(0)" },
        },
        bounce3: {
          "0%": { transform: "scale(0,0) translateY(0)" },
          "10%": { transform: "scale(1.1,1.1) translateY(0)" },
          "100%": { transform: "scale(1,1) translateY(0)" },
        },
        shine: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "100", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
