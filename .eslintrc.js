module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'simple-import-sort',
    'unused-imports',
    'prettier',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      globalReturn: false,
    },
  },
  env: {
    es6: true,
    node: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: './tsconfig.json',
    },
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    `**/${'node'}_modules`,
    'build',
    '.eslintrc.js',
    'lint-staged.*.js',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'import/default': 'off',
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'no-console': 'warn',
    'prettier/prettier': [
      'warn',
      {
        bracketSpacing: true,
        jsxBracketSameLine: false,
        jsxSingleQuote: false,
        printWidth: 80,
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: 'es5',
      },
    ],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    '@typescript-eslint/require-await': 'warn',
    '@typescript-eslint/no-floating-promises': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: ['*.{jsx,tsx}'],
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      rules: {
        'react/no-unknown-property': ['error', { ignore: ['css'] }],
        'react/no-unescaped-entities': ['error', { forbid: ['>'] }],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: ['function'],
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'parameter',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
        ],
      },
    },
    {
      files: ['**/request.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['objectLiteralProperty'],
            format: ['camelCase'],
            filter: {
              regex: '^([a-zA-Z][a-z0-9]*)(-[a-zA-Z0-9]+)*$',
              match: false,
            },
          },
        ],
      },
    },
  ],
};
