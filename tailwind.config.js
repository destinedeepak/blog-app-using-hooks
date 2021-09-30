module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        primary: '#5CB85B',
        secondary: '#ffed4a',
        danger: '#e3342f',
      },
      backgroundColor: (theme) => ({
        primary: '#5CB85B',
        secondary: '#333333',
        danger: '#e3342f',
      }),
      borderColor: (theme) => ({
        DEFAULT: theme('colors.gray.300', 'currentColor'),
        primary: '#5CB85B',
        secondary: '#ffed4a',
        danger: '#e3342f',
      }),
      flex: {
        30: '0 1 30%',
        70: '0 1 70%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
