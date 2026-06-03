/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        netflix: {
          red: '#e50914',
          dark: '#141414',
          gray: '#1a1a1a',
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(229,9,20,0.4), 0 0 20px rgba(229,9,20,0.2)' },
          '50%': { boxShadow: '0 0 16px rgba(229,9,20,0.6), 0 0 40px rgba(229,9,20,0.3)' },
        },
      },
    },
  },
  plugins: [],
}
