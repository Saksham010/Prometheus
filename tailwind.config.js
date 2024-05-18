/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      'pixel':['Press Start 2P', 'ui-monospace','ui-sans-serif']
    },
    maxWidth:{
      '8xl':'90rem'
    },
  

  },
  plugins: [],
}