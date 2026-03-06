/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./script.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebefff',
          200: '#d6deff',
          300: '#b3c1ff',
          400: '#8a9dff',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
          800: '#434190',
          900: '#3c366b',
        },
        secondary: {
          400: '#9f7aea',
          500: '#764ba2',
          600: '#6b3fa0',
          700: '#5e3891',
        }
      },
      animation: {
        'glow': 'glow 1.5s ease-in-out infinite',
        'slideIn': 'slideIn 0.3s ease-out',
        'fadeOut': 'fadeOut 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%, 100%': {
            textShadow: '0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff',
          },
          '50%': {
            textShadow: '0 0 20px #ffffff, 0 0 30px #ffffff, 0 0 40px #ffffff, 0 0 50px #ffffff',
          },
        },
        slideIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeOut: {
          '0%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
        },
      },
    },
  },
  plugins: [],
}