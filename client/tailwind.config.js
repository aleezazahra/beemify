export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        marigold: '#F7A325',
        blossom: '#E87A90',
        mint: '#63B880',
        pistachio: '#C1F7C1',
      },
      fontFamily: {
        display: ['Baloo 2', 'sans-serif'],
        chrome: ['Silkscreen', 'monospace'],
        body: ['Quicksand', 'sans-serif'],
      },
      backgroundImage: {
        'dusk-gradient': 'linear-gradient(180deg, #fce7f3 0%, #e9d5ff 50%, #f3e8ff 100%)',
      },
    },
  },
  plugins: [],
}
