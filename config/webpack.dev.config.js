const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

const devWebpackConfig = merge(baseWebpackConfig,{
    output: {
        publicPath: '/'
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,
        port: 8080,
        overlay: true,
        host: '192.168.0.105',
        useLocalIp: true,
        disableHostCheck: true,
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
        })
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
});