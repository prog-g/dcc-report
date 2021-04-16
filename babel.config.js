module.exports = {
  presets: [
    [
      "@babel/env",
      {
        bugfixes: true,
        useBuiltIns: "usage",
        corejs: require("core-js/package.json").version,
      },
    ],
    ["@babel/react", { runtime: "automatic" }],
    "@babel/typescript",
  ],
  plugins: [
    [
      "@babel/transform-runtime",
      { version: require("@babel/runtime/package.json").version },
    ],
  ],
};
