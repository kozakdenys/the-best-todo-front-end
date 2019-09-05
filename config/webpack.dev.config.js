const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: APP_DIR,
        open: true,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: APP_DIR + "/index.html",
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ]
};
