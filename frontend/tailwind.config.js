/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'primary': 'rgb(79 70 229)',
        'accent': '#B1FFE8'
      },
      width:{
        'fit': 'fit-content',
        'inherit': 'inherit'
      },
      height:{
        'fit': 'fit-content',
        'inherit': 'inherit'
      }
    },
  },
  plugins: [],
}
