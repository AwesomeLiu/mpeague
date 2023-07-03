/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "red": "#ff0000",
        "white": "#ffffff",
        "green": "#118745",
        "same": {
          100: "#333333",
          200: "#666666",
          300: "#999999",
          400: "#bbbbbb",
          500: "#eeeeee",
        }
      },
      animation: {
        "rebounce": "rebounce 1s infinite",
      },
      keyframes: {
        "rebounce": {
          "0%, 100%": {
            transform: "translateY(0%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          }
        },
      }
    }
  },
  plugins: [],
}
