module.exports = {
    "extends": ["airbnb", "prettier", "prettier/react"],
    "parser": "babel-eslint",
    "env": {
      "jest": true,
    },
    "rules": {
      "react/jsx-filename-extension": 0,
      "no-use-before-define": 0,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true, 
          trailingComma: 'all',
        },
      ]
    },
    "plugins": [
       "react",
       "jsx-a11y",
       "import",
       "prettier"
    ]
};