module.exports = {
    roots: ['<rootDir>/__tests__'],
    // transform: {
    //     "^.+\\.tsx?$": "ts-jest"
    // },
    setupFiles: [
        '<rootDir>/__tests__/global.js',
        // '<rootDir>/setupTests.js',
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    modulePathIgnorePatterns: ['global.js'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|styl|scss|sass)$': 'identity-obj-proxy',
    },
    verbose: true,
    notify: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/scripts/**'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};
