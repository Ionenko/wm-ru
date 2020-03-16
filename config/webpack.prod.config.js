const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

const prodWebpackConfig = merge(baseWebpackConfig,{
    output: {
        publicPath: './'
    },
    mode: 'production',
    plugins: []
});

module.exports = new Promise((resolve, reject) => {
    resolve(prodWebpackConfig);
});