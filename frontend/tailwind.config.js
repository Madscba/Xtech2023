/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      width:{
        'fit': 'fit-content'
      },
      height:{
        'fit': 'fit-content'
      }
    },
  },
  plugins: [],
}
