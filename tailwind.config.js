/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"], // Added serif font for bookish feel
      },
      fontSize: {
        hero: ["3rem", { lineHeight: "1.2" }], // 48px
      },
      colors: {
        // Warm, book-inspired color palette
        primary: {
          50: "#faf6f0",
          100: "#f5ecdf",
          200: "#ead4ba",
          300: "#dcb58b",
          400: "#cc8e5d", // Warm terracotta/orange
          500: "#a86a3d", // Rich leather brown
          600: "#8c5430", // Darker brown
          700: "#6f4228",
          800: "#593421",
          900: "#492c1d",
        },
        secondary: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb3c8",
          400: "#829ab1", // Muted blue
          500: "#627d98", // Slate blue
          600: "#486581",
          700: "#334e68",
          800: "#243b53",
          900: "#102a43",
        },
        accent: {
          50: "#fff8e1",
          100: "#ffecb3",
          200: "#ffe082",
          300: "#ffd54f", // Warm yellow
          400: "#ffca28",
          500: "#ffc107", // Gold accent
          600: "#ffb300",
          700: "#ffa000",
          800: "#ff8f00",
          900: "#ff6f00",
        },
        neutral: {
          50: "#faf9f7", // Cream paper color
          100: "#f2f0eb",
          200: "#e8e4dd",
          300: "#d7d2c9",
          400: "#b6b0a4",
          500: "#978f80",
          600: "#756e61",
          700: "#605a4e",
          800: "#403c34",
          900: "#1c1b17",
        },
      },
      letterSpacing: {
        tight: "-0.015em",
        wide: "0.025em",
      },
      // Custom shadows for depth
      boxShadow: {
        book: "0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05)",
        "book-hover":
          "0 10px 25px rgba(0, 0, 0, 0.12), 0 5px 10px rgba(0, 0, 0, 0.06)",
      },
      // Animation extensions
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "bounce-slow": "bounce 1.5s infinite",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      // Custom keyframes
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
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
