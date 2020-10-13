const path = require("path");

module.exports = {
  entry: "./assets/js/index.js",
  output: {
    filename: "js/app.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "/css", name: "styles.css" },
          },
          "sass-loader",
        ],
      },
    ],
  },
};
