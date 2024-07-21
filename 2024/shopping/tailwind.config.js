/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        brand: '#95b1ff'
      }
    }
  },

  plugins: []
}
