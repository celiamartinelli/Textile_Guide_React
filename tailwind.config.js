module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        lightsage: '#d8e2dc',
        sage: '#adc9b8',
        darkSage: '#89a594',
        cream: '#ffe5d9',
        lightPink: '#ffcad4',
        pink: '#f4acb8',
        brown: '#9e8189',
        darkBrown: '#6d6875',
        rosyBrown: '#bfa4a4',
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
