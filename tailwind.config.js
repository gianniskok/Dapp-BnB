module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens:{
      sm: "640px",
      // => @media (min-width: 640px){ ... }
      md: "768px",
      // => @media (min-width: 7680px){ ... }
      lg: "1024px",
      // => @media (min-width: 1024px){ ... }
      xl: "1980px",
      // => @media (min-width: 1280px){ ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}