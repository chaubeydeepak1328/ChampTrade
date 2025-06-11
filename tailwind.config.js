// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#facc15', // Yellow-400
        'secondary': '#f59e0b', // Amber-500
        'dark': '#0f0f0f',
        'gold': '#FFD700', // Gold color for accents
        'dark-green': '#1a1f1c',
        'dark-green-light': '#22271f',
        'dark-green-dark': '#151a17',
        'golden': '#ffd700',
        'golden-dark': '#ccac00',
        'golden-white': '#fff5cc',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'pulse-rgb': 'pulse-rgb 2s infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        'pulse-rgb': {
          '0%': { transform: 'scale(1)', filter: 'brightness(1.2)' },
          '50%': { transform: 'scale(1.1)', filter: 'brightness(1.5)' },
          '100%': { transform: 'scale(1)', filter: 'brightness(1.2)' },
        },
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'conic-gradient': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

