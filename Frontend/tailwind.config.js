import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes:[
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'retro',
      'cyborg',
      'valentine',
      'synthwave',
      'dracula',
      'cmyk',
      'winter',
      'lofi',
      'pastel',
      'fantasy',
      'halloween',
      'coffee',
      'garden',
      'forest',
      'sunset',
      'acid',
      'nord',
      'dim',
      'black',
      'luxury',
      'wireframe',
      'night',
      'lemonade',
      'autumn',
      'business',
      'aqua',
      'cyberpunk',
      'synthwave',
      'corporate',
      
    ]
  }
}

