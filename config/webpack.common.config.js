const path = require("path");
const APP_DIR = path.resolve(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../dist');


module.exports = {
    entry: APP_DIR + "/index.ts",
    output: {
        path: BUILD_DIR,
        publicPath: "/",
        chunkFilename: "[name].[hash].js",
        filename: "[name].[hash].js"
    },
    bail: true,
    optimization: {
        moduleIds: "hashed",
        usedExports: true,
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                include: APP_DIR,
                use: "vue-loader"
            },
            {
                test: /\.(js|tsx?)$/,
                include: APP_DIR,
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                enforce: "pre",
                test: /\.(js|tsx?|vue)$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{ loader: "file-loader" }],
            },
        ]
    },
    resolve: {
        extensions: [".vue", ".ts", ".js", ".css", ".json"]
    },
};
