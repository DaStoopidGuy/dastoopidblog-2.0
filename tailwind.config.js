/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#009900',
        'background': '#000000',
      },
      boxShadow: {
        'custom': '0 0 10px 1px'
      }
    },
  },
  plugins: [],
}