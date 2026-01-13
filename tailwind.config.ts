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
        background: "#FBFAF7",
        surface: "#FFFFFF",
        gold: {
          DEFAULT: "#C9A24F",
          light: "#E7D7A8",
        },
        purple: {
          DEFAULT: "#8B5CF6",
          light: "#A78BFA",
          dark: "#6D28D9",
        },
        blue: {
          DEFAULT: "#3B82F6",
          light: "#60A5FA",
          dark: "#2563EB",
        },
        pink: {
          DEFAULT: "#EC4899",
          light: "#F472B6",
        },
        text: {
          primary: "#111111",
          secondary: "#5A5A5A",
        },
        border: "#E8E3D9",
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
        inter: ["var(--font-inter)"],
      },
      borderRadius: {
        "2xl": "1rem",
      },
      boxShadow: {
        luxury: "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06)",
        colorful: "0 10px 40px rgba(139, 92, 246, 0.15), 0 4px 12px rgba(59, 130, 246, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        "gradient-axes": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-archetypes": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
