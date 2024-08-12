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
        // LightMode
        lightBackground: '#74A186',
        lightBackgroundLight: '#adc9b8',
        lightBackgroundLightHover: '#bcddc9',
        lightText: '#333',
        lightTextLight: '#666',
        lightBackgroundCream: '#ffe5d9',

        // DarkMode
        darkPruneBG: '#703448',
        darkPrune: '#af4265',
        darkPruneLBG: '#4a1b2a',
        darkPruneLogo: '#61293a',
        // darkBackground: '#5c4e4f',
        darkBackground: '#153C24',
        // darkBackgroundLight: '#9a7b7b',
        darkBackgroundLight: '#235537',
        darkBackgroundLightHover: '#2E6C47',
        darkText: '#e5e5e5',
        darkTextLight: '#f0f0f0',
        darkBackgroundRosy: '#ba8b8b',
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
