/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}"
  ],
  theme: {
    extend: {
      colors:{
        colorPrimario: '#4f9eec',
        colorSecundario: '#3a88d6',
        colorTerciario: '#abc9e7',
        colorResaltado: '#2173c5'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

