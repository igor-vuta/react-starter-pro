import babelParser from '@babel/eslint-parser'
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import reactPlugin from 'eslint-plugin-react'

export default [
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off', // for React 17+
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
    },
  },
]
