import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"], // Enables dark mode via class
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Blue
        secondary: "#10B981", // Green
        accent: "#F59E0B", // Yellow
        neutral: "#111827", // Dark text
        "neutral-light": "#F3F4F6", // Light bg
        error: "#EF4444", // Red
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
