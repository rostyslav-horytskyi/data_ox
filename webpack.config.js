// const path = require("path")

// module.exports = (env) => {
//     const modules = {
//         js: {
//             test: /\.ts(x?)$/,
//             exclude: /node_modules/,
//             use: [
//                 {
//                     loader: "ts-loader",
//                 },
//             ],
//         },
//     }

//     const resolve = {
//         extensions: [".ts", ".tsx", ".js", ".jsx"],
//         alias: { // Тут тот же момент, что и в tsconfig.json, чтобы Webpack смог понять ссылки на директории
//             App: path.resolve(__dirname, 'src/App/'),
//             Pages: path.resolve(__dirname, 'src/Pages/'),
//         },
//     }

//     return {
//         modules,
//         resolve,
//     }
// }

// "build": "webpack --config webpack.client.js --mode production",


const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ["ts-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
};
