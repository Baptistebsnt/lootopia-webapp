/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          'fade-in-out': {
            '0%, 100%': { opacity: '0' },
            '50%': { opacity: '1' },
          },
        },
        animation: {
          'fade-in-out': 'fade-in-out 2.5s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  }
  