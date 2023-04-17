/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#4EB093',
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
