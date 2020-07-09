module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'semi': ['error', 'always'],
    'no-tabs': 'off',
    'vue/html-indent': 'off',
    'indent': 'off',
    'space-before-function-paren': 'off',
    'no-console': 'off',
    'dot-notation': 'off'
  }
}
