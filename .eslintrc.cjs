
/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },

  extends: ['@remix-run/eslint-config', 'eslint:recommended', 'plugin:storybook/recommended'],

  overrides: [
    {
      files: [ '**/*.{ts,tsx}' ],
      plugins: [ 'react', 'jsx-a11y' ],
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        formComponents: [ 'Form' ],
        linkComponents: [
          { name: 'Link', linkAttribute: 'to' },
          { name: 'NavLink', linkAttribute: 'to' },
        ],
        'import/resolver': {
          typescript: {},
        },
      },
    },

    {
      files: [ '**/*.{ts,tsx}' ],
      plugins: [
        '@typescript-eslint',
        'import',
      ],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/internal-regex': '^~/',
        'import/resolver': {
          node: {
            extensions: [ '.ts', '.tsx' ],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
    },

    {
      files: [ '.eslintrc.cjs' ],
      env: {
        node: true,
      },
    },
  ],
}