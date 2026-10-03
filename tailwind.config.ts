import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sajith: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc5fb",
          400: "#36a5f6",
          500: "#0066cc", // Primary Sajith Blue
          600: "#0055b3", // Active/Hover Blue
          700: "#004494",
          800: "#003673",
          900: "#00244d",
          950: "#001530",
        },
        navy: {
          900: "#0a192f",
          800: "#0f233d",
          700: "#1e3a5f",
        },
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#f8fafc",
          muted: "#f1f5f9",
          border: "#e2e8f0",
          borderBlue: "#dbeafe",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 50, 120, 0.05)",
        card: "0 2px 8px -2px rgba(0, 70, 160, 0.08), 0 1px 4px -1px rgba(0, 0, 0, 0.04)",
        elevated: "0 8px 24px -4px rgba(0, 85, 179, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        modal: "0 20px 40px -12px rgba(0, 40, 100, 0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
