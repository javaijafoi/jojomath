import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
        russo: ["Russo One", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        gyro: {
          DEFAULT: "hsl(var(--gyro))",
          foreground: "hsl(var(--gyro-foreground))",
        },
        menacing: "hsl(var(--menacing))",
        "stand-glow": "hsl(var(--stand-glow))",
        "answer-1": "hsl(var(--answer-1))",
        "answer-2": "hsl(var(--answer-2))",
        "answer-3": "hsl(var(--answer-3))",
        "answer-4": "hsl(var(--answer-4))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "menacing-float": {
          "0%, 100%": { transform: "translateY(0) rotate(-5deg)", opacity: "0.8" },
          "50%": { transform: "translateY(-25px) rotate(5deg)", opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.8", filter: "brightness(1.3)" },
        },
        "screen-shake": {
          "0%, 100%": { transform: "translate(0)" },
          "10%": { transform: "translate(-8px, 4px)" },
          "20%": { transform: "translate(8px, -4px)" },
          "30%": { transform: "translate(-8px, 4px)" },
          "40%": { transform: "translate(8px, -4px)" },
          "50%": { transform: "translate(-6px, 3px)" },
          "60%": { transform: "translate(6px, -3px)" },
          "70%": { transform: "translate(-4px, 2px)" },
          "80%": { transform: "translate(4px, -2px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "menacing": "menacing-float 2.5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "screen-shake": "screen-shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
