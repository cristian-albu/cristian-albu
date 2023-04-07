/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--josefin)"],
        serif: ["var(--josefin)"],
      },
      typographt: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.blue.600"),
            },
          },
        },
      }),
      keyframes: {
        spin1: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spin2: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },

        antiSpin1: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        antiSpin2: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spinning1: "spin1 35s linear infinite",
        spinning2: "spin2 25s linear infinite",
        spinning3: "spin1 18s linear infinite",
        spinning4: "spin2 12s linear infinite",
        antiSpinning1: "antiSpin1 35s linear infinite",
        antiSpinning2: "antiSpin2 25s linear infinite",
        antiSpinning3: "antiSpin1 18s linear infinite",
        antiSpinning4: "antiSpin2 12s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
