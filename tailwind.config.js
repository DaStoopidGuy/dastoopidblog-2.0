/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#008800',
        'background': '#000000',
      },
      boxShadow: {
        'custom': '0 0 10px 1px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // color: theme('colors.primary'),
            '*': { color: theme('colors.primary') },
            'strong': {
              // 'text-decoration-line': 'underline'
              // 'text-decoration': 'underline',
            },
          }
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}