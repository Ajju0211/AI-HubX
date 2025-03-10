/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // tailwind.config.js
  theme: {
    extend: {
      animation: {
        'gradient-flash': 'gradientFlash 3s infinite',
      },
      keyframes: {
        gradientFlash: {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
          shimmer: {
            "0%": { transform: "translateX(-100%)" },
            "100%": { transform: "translateX(100%)" }
          },
          pulseGlow: {
            "0%, 100%": { opacity: 1, transform: "scale(1)" },
            "50%": { opacity: 0.7, transform: "scale(1.1)" }
          },
          typing: {
            "0%": { opacity: 0.2 },
            "50%": { opacity: 1 },
            "100%": { opacity: 0.2 }
          }
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
        pulseGlow: "pulseGlow 1.8s infinite",
        typing: "typing 1.5s infinite"
      },
    },
  },
  plugins: [],
  corePlugins: {
    scrollBehavior: true,
  },
}

