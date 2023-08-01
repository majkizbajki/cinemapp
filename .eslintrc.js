module.exports = {
    env: {
        "es2021": true,
        "node": true,
        "jest": true
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:react/jsx-runtime",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    overrides: [
    ],
    ignorePatterns: ['.eslintrc.js'],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
    plugins: [
        "react",
        "react-hooks",
        "@typescript-eslint",
        "prettier",
        "simple-import-sort",
        "jest"
    ],
    rules: {
      'simple-import-sort/imports': [
        2,
        {
          groups: [
            [
              '^react', // Packages. `react` related packages come first.
              '^@?\\w', // packages from node_modules
              '^\\u0000', // Side effect imports.
              '^src/(hooks|contexts|pages|routes|utils)(/.*|$)',
              '^src/(components)(/.*|$)',
              '^\\.', // relative imports. Anything that starts with a dot.
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$', // Parent imports. Put `..` last.
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)", "^\\./?$', // Other relative imports. Put same-folder imports and `.` last.
              '^.+\\.s?css$' // Style imports.
            ]
          ]
        }
      ],
      'arrow-body-style': 0,
      'curly': [2, "all"],
      'prettier/prettier': [2, { endOfLine: 'auto' }],
      'jsx-quotes': [2, 'prefer-single'],
      'max-classes-per-file': 2,
      'max-len': [1, 120],
      'no-console': [2, { allow: ['debug', 'error', 'info', 'warn'] }],
      'sort-imports': 0,
      'no-plusplus': 0,
      'no-prototype-builtins': 1,
      'no-confusing-arrow': 0,
      'import/no-extraneous-dependencies': 0,
      'import/extensions': 0,
      'import/prefer-default-export': 0,
      'import/order': 0,
      'react/button-has-type': 0,
      'react/destructuring-assignment': 0,
      'react/jsx-props-no-spreading': 0,
      'react/jsx-uses-react': 2,
      'react/react-in-jsx-scope': 0,
      'react/display-name': 0,
      'react/function-component-definition': 0,
      'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx', '.js', '.jsx'] }],
      'react/jsx-no-useless-fragment': 2,
      'react/require-default-props': [1, { ignoreFunctionalComponents: true, forbidDefaultForRequired: false }],
      'react-hooks/rules-of-hooks': 2,
      "react-hooks/exhaustive-deps": 1,
      '@typescript-eslint/member-ordering': [2, { default: ['field'] }],
      '@typescript-eslint/no-empty-interface': 0,
      '@typescript-eslint/no-explicit-any': 2,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-shadow': 0,
      '@typescript-eslint/no-unused-vars': [
        1,
        { ignoreRestSiblings: true, varsIgnorePattern: '^h$', argsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/no-use-before-define': 0,
      'jest/no-focused-tests': 2
    },
    settings: {
      react: {
        version: "detect"
      }
    }
}
