const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); // from webpack
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

/** @type {(env: typeof process.env, argv: { mode?: string }) => import("webpack").Configuration} */
module.exports = (env, { mode }) => {
  const dev = mode !== "production";
  return {
    // see https://github.com/webpack/webpack-dev-server/issues/1327
    mode: "development",
    entry: "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ["style-loader", `css-loader?sourceMap=${dev}`]
        }
      ]
    },
    plugins: [
      new CopyPlugin([{ from: "gh-pages" }]),
      new HtmlWebpackPlugin({
        template: "src/index.ejs",
        title: "DCC Report"
      })
    ],
    resolve: { extensions: [".ts", ".tsx", ".js", ".jsx"] },
    optimization: {
      minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()]
    },
    devtool: dev ? "inline-source-map" : false,
    devServer: {
      contentBase: "./dist",
      // host: "0.0.0.0", // for debugging on mobile devices
      overlay: true,
      watchContentBase: true
    }
  };
};
