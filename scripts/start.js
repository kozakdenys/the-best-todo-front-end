const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const merge = require("webpack-merge");

const commonConfig = require("../config/webpack.common.config.js");
const devConfig = require("../config/webpack.dev.config.js");

const config = merge(commonConfig, devConfig);
const port = 8080;
const options = config && config.devServer;
const server = new WebpackDevServer(webpack(config), options);

server.listen(port, "localhost", err => {
    if (err) {
        console.log((err) + "\n");
        process.exit(1);
    }
    console.log("WebpackDevServer listening at localhost:", port);
});