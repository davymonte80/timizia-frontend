import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#10B981",
        accent: "#F59E0B",
        neutral: "#111827",
        "neutral-light": "#F3F4F6",
        error: "#EF4444",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
