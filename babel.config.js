module.exports = {
  presets: [
    [
      "@babel/env",
      { useBuiltIns: "usage", corejs: require("core-js/package.json").version },
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
