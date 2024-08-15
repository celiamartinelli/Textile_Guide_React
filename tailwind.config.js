const { light } = require('@mui/material/styles/createPalette');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        lightsage: '#d8e2dc',
        sage: '#adc9b8',
        darkSage: '#6b937a',
        cream: '#ffe5d9',
        lightPink: '#ffcad4',
        pink: '#f4acb8',
        brown: '#9e8189',
        darkBrown: '#6d6875',
        rosyBrown: '#ba8b8b',
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
        lightPrune: '#936975',
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
      backgroundImage: {
        'custom-bg': "url('/assets/bg.png')",
        'custom-bg-dark': "url('/assets/bg-dark.png')",
      },
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        press: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        'background-fade': {
          '0%': { backgroundColor: 'rgba(0,0,0,0)' },
          '100%': { backgroundColor: 'rgba(255,255,255,0.75)' },
        },
      },
      animation: {
        fade: 'fade 0.5s ease-in-out',
        'background-fade': 'background-fade 0.5s ease-in-out',

        press: 'press 0.5s ease-in-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 0.3) infinite',
      },
      transitionProperty: {
        bg: 'background-color',
        text: 'color',
        shadow: 'box-shadow',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
