/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation:{
        'right-left' : 'righttoleft 0.5s linear'
      },
      keyframes:{
'righttoleft':{
  '0%': { transform: 'translateX(-50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
}
      }
    },
  },
  plugins: [],
}