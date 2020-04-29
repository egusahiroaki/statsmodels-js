module.exports = {
    env: {
        node: true,
        browser : true,
        jest: true,
    },
    plugins: [
        "prettier",
        "jest"
    ],
    extends: [
        "eslint:recommended",
        "plugin:prettier/recommended"
    ],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    },
};