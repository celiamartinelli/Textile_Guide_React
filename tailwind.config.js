module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        lightsage: '#adc9b8',
        sage: '#89a594',
        cream: '#ffe5d9',
        lightPink: '#ffcad4',
        pink: '#f4acb8',
        brown: '#9e8189',
      },
      fontFamily: {
        'thasadith-regular': ['Thasadith', 'sans-serif'],
        'thasadith-bold': ['Thasadith', 'sans-serif'],
        'thasadith-regular-italic': ['Thasadith', 'sans-serif'],
        'thasadith-bold-italic': ['Thasadith', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
