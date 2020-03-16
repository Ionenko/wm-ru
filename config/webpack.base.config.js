const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: ['@babel/polyfill', PATHS.src]
    },
    output: {
        filename: `${PATHS.assets}js/[name].[Chunkhash].js`,
        path: PATHS.dist
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    chunks: 'all',
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true
                },
                default: {
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.pug$/i,
                loader: "pug-loader",
                options: {
                    pretty: true
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
                loader: "file-loader",
                options: {
                    name: './[name].[ext]'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            },
        ]
    },
    resolve: {
        alias: {
            '~': 'src',
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[Contenthash].css`,
        }),
        new CopyWebpackPlugin([
            {
                from: `${PATHS.src}/${PATHS.assets}/img`,
                to: `${PATHS.assets}img`,
            },
            {
                from: `${PATHS.src}/${PATHS.assets}/fonts`,
                to: `${PATHS.assets}fonts`,
            },
            {
                from: `${PATHS.src}/static`,
                to: '',
            }
        ]),
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`,
            minify: false
        }))
    ],
};