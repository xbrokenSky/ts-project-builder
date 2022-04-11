module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
    },
    plugins: ['react', '@typescript-eslint', 'import', 'react-hooks', 'prettier'],
    settings: {
        react: { version: 'detect' },
        'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
        'import/resolver': { typescript: { alwaysTryTypes: true, project: './tsconfig.json' } },
    },
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
        mocha: true,
        jasmine: true,
        jquery: true,
        worker: true,
        serviceworker: true,
    },
    rules: {
        'prettier/prettier': 'error',
        'no-console': 'off',
        'no-debugger': 'off',
        'no-restricted-globals': [
            'error',
            {
                name: 'event',
                message: 'Use local parameter instead.',
            },
            {
                name: 'fdescribe',
                message: 'Do not commit fdescribe. Use describe instead.',
            },
        ],
        '@typescript-eslint/no-unused-vars': ['warn', { args: 'after-used' }],
        'no-multi-assign': [1],
        indent: ['off', 4, { SwitchCase: 1 }],
        quotes: [
            'warn',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        'jsx-quotes': ['warn', 'prefer-double'],
        'comma-dangle': ['warn', 'always-multiline'],
        'max-len': [1, 120, 2, { ignoreComments: true }],
        'linebreak-style': ['off', 'windows'],
        'object-curly-spacing': ['warn', 'always'],
        'arrow-body-style': ['warn', 'as-needed', { requireReturnForObjectLiteral: true }],
        'arrow-parens': [1, 'always'],
        'object-curly-newline': [
            'warn',
            {
                ObjectExpression: {
                    multiline: true,
                    minProperties: 2,
                },
                ObjectPattern: {
                    multiline: true,
                    minProperties: 4,
                },
                ImportDeclaration: {
                    multiline: true,
                    minProperties: 3,
                },
                ExportDeclaration: {
                    multiline: true,
                    minProperties: 5,
                },
            },
        ],
        'array-bracket-newline': [
            1,
            {
                multiline: true,
                minItems: 3,
            },
        ],
        'array-element-newline': [
            1,
            {
                ArrayExpression: {
                    multiline: true,
                    minItems: 3,
                },
                ArrayPattern: {
                    multiline: true,
                    minItems: 3,
                },
            },
        ],
        'class-methods-use-this': [0],
        'no-underscore-dangle': [
            'error',
            {
                allowAfterThis: true,
                allowAfterSuper: true,
            },
        ],
        'import/extensions': [
            2,
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/prefer-default-export': ['off'],
        'import/no-unresolved': 'error',
        'react/function-component-definition': [
            2,
            {
                namedComponents: ['function-expression', 'arrow-function'],
                unnamedComponents: ['function-expression', 'arrow-function'],
            },
        ],
        'react/jsx-filename-extension': ['off'],
        'react/jsx-indent': [1, 4],
        'react/prefer-stateless-function': [0, { ignorePureComponents: true }],
        'react/prop-types': [1, { skipUndeclared: true }],
        'react/jsx-one-expression-per-line': [0, { allow: 'single-child' }],
        'react/destructuring-assignment': [0, 'always', { ignoreClassFields: false }],
        'react/forbid-prop-types': [
            1,
            {
                forbid: ['any'],
                checkContextTypes: true,
                checkChildContextTypes: true,
            },
        ],
        'react/jsx-indent-props': [1, 4],
        'react/no-multi-comp': [0, { ignoreStateless: true }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'jsx-a11y/interactive-supports-focus': [0],
        'jsx-a11y/click-events-have-key-events': [0],
        'implicit-arrow-linebreak': ['off'],
        'no-use-before-define': [0],
        'no-shadow': [1],
    },
    extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
};
