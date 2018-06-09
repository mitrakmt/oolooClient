module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  rules: {
    'react/jsx-filename-extension': 0,
    'no-use-before-define': 2,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        tabWidth: 2,
        useTabs: false,
        semi: false,
      },
    ],
  },
  plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
  globals: {
    fetch: false,
  },
}
