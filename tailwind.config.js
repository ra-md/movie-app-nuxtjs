/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      minHeight: {
        '48': '12rem',
        '64': '16rem',
        '76': '19rem',
        '3/5': '60%'
      },
      maxHeight: {
        '40': '10rem',
        '64': '16rem'
      },
      height: {
        '3/5': '60%'
      },
      inset: {
        '1/2': '50%'
      },
      colors: {
        'primary': '#007bff'
      },
      spacing: {
        '84': '21rem',
        '124': '31rem'
      }
    }
  },
  variants: {
    padding: ['first', 'responsive'],
    borderColor: ['responsive', 'hover', 'focus','focus-within']
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
