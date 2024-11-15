import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        fill: {
          1: "rgba(255, 255, 255, 0.10)",
        },
        bankGradient: "#0179FE",
        indigo: {
          500: "#6172F3",
          700: "#3538CD",
        },
        success: {
          25: "#F6FEF9",
          50: "#ECFDF3",
          100: "#D1FADF",
          600: "#039855",
          700: "#027A48",
          900: "#054F31",
        },
        pink: {
          25: "#FEF6FB",
          100: "#FCE7F6",
          500: "#EE46BC",
          600: "#DD2590",
          700: "#C11574",
          900: "#851651",
        },
        blue: {
          25: "#F5FAFF",
          100: "#D1E9FF",
          500: "#2E90FA",
          600: "#1570EF",
          700: "#175CD3",
          900: "#194185",
        },
        sky: {
          1: "#F3F9FF",
        },
        black: {
          1: "#00214F",
          2: "#344054",
        },
        gray: {
          25: "#FCFCFD",
          200: "#EAECF0",
          300: "#D0D5DD",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          900: "#101828",
        },
      },
      backgroundImage: {
        "bank-gradient": "linear-gradient(90deg, #0179FE 0%, #4893FF 100%)",
        "gradient-mesh": "url('/icons/gradient-mesh.svg')",
        "bank-green-gradient": "linear-gradient(90deg, #01797A 0%, #489399 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        form: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        chart: "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
        profile: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        creditCard: "8px 10px 16px 0px rgba(0, 0, 0, 0.05)",
      },
      fontFamily: {
        inter: "var(--font-inter)",
        "ibm-plex-serif": "var(--font-ibm-plex-serif)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { 
            transform: "translateY(0px) translateX(0px)",
          },
          "50%": { 
            transform: "translateY(-20px) translateX(10px)",
          },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "image-rotate": {
          "0%": { transform: "rotateX(25deg)" },
          "25%": { transform: "rotateX(25deg) scale(0.9)" },
          "60%": { transform: "none" },
          "100%": { transform: "none" },
        },
        "image-glow": {
          "0%": {
            opacity: "0",
            "animation-timing-function": "cubic-bezier(0.74,0.25,0.76,1)",
          },
          "10%": {
            opacity: "1",
            "animation-timing-function": "cubic-bezier(0.12,0.01,0.08,0.99)",
          },
          "100%": {
            opacity: "0.2",
          },
        },
        "sketch-lines": {
          "0%": { "stroke-dashoffset": "1" },
          "50%": { "stroke-dashoffset": "0" },
          "99%": { "stroke-dashoffset": "0" },
          "100%": { visiblity: "hidden" },
        },
        "glow-line-horizontal": {
          "0%": { opacity: "0", transform: "translateX(0)" },
          "5%": { opacity: "1", transform: "translateX(0)" },
          "90%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateX(min(60vw, 45rem))" },
        },
        "glow-line-vertical": {
          "0%": { opacity: "0", transform: "translateY(0)" },
          "5%": { opacity: "1", transform: "translateY(0)" },
          "90%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateY(min(21vw, 45rem))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "spotlight": "spotlight 2s ease .75s 1 forwards",
        "gradient": "gradient 6s linear infinite",
        "image-rotate": "image-rotate 1.4s ease forwards",
        "image-glow": "image-glow 4.8s ease-out forwards",
        "sketch-lines": "sketch-lines 1.2s ease forwards",
        "glow-line-horizontal": "glow-line-horizontal 3s ease-in forwards",
        "glow-line-vertical": "glow-line-vertical 3s ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;