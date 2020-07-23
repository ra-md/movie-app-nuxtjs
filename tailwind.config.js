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
        '64': '16rem'
      },
      maxHeight: {
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
      }
    }
  },
  variants: {
    padding: ['first', 'responsive']
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
