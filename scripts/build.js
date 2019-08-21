const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("../config/webpack.common.config.js");
const prodConfig = require("../config/webpack.prod.config.js");

const config = merge(commonConfig, prodConfig);

webpack(config, (err, stats) => {
    const info = stats.toJson();

    if (err || stats.hasErrors()) {
        console.log((err || info.errors) + "\n");
        process.exit(1);
    }
    console.log("The build is successfully created");
});