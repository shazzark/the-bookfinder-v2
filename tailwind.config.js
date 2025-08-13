/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["3rem", { lineHeight: "1.2" }], // 48px
      },
      colors: {
        primary: {
          500: "#3A7AB3",
          600: "#2E6396",
          700: "#234D79",
        },
        accent: {
          500: "#C69963",
          600: "#B78343",
        },
        ui: {
          black: "#111827",
          gray: {
            100: "#F3F4F6",
            500: "#6B7280",
            800: "#1F2937",
          },
          green: {
            600: "#16A34A",
            700: "#15803D",
          },
        },
      },
      letterSpacing: {
        tight: "-0.015em",
        wide: "0.025em",
      },
      // New spinner animations
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "bounce-slow": "bounce 1.5s infinite",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      // Custom keyframes if you want more control
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};
