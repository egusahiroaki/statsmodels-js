module.exports = {
    env: {
        node: true
    },
    plugins: ["prettier"],
    extends: [
        "plugin:prettier/recommended"
    ],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    },
};