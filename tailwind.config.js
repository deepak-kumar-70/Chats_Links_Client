/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    color: {
      primary: {
        DEFAULT: '#D1F4CC', 
        hover: 'red', 
      },
      secondary: {
        DEFAULT: colors.neutral[200],
        hover: colors.neutral[300],
        border: colors.neutral[400],
        text: colors.neutral[500],
        dark: colors.neutral[800],
      
      },
    },
  },
  plugins: [],
}