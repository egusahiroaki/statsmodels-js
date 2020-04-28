module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3,
      },
    ],
  ],
  env: {
    // exec when env is test
    test: {
      presets: [["@babel/preset-env", { targets: { node: "current" } }]],
    },
  },
};
