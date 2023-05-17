/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'primary': ' #02ACE8',
        'base': '#BCE3FF',
        'accent': '#FDC60A',
        'dark': '#242424'
      },
      width:{
        'fit': 'fit-content',
        'inherit': 'inherit',
        'fill': '-webkit-fill-available'
      },
      maxWidth:{
        'container-limit': '500px',
        'text-limit': '700px',
        'lg-container-limit': '1400px',
      },
      height:{
        'fit': 'fit-content',
        'inherit': 'inherit'
      }
    },
  },
  plugins: [],
}
