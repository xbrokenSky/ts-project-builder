// const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const config = {
    entry: ['./src/scripts/index.ts', './src/styles/styles.scss'],
    target: ['web', 'es5'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './scripts/index.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        compress: true,
        client: {
            overlay: {
                stats: 'errors-only',
            },
        },
        watchFiles: path.resolve(__dirname, './src/index.html'),
    },
    module: {
        // sideEffects: [
        //     '*.css',
        //     '*.scss',
        // ],
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src/scripts'),
                use: [{ loader: 'babel-loader' }, { loader: 'astroturf/loader' }],
                exclude: '/node_modules/',
            },
            {
                test: /\.tsx?$/,
                use: [{ loader: 'ts-loader', options: { transpileOnly: true } }, { loader: 'astroturf/loader' }],
                exclude: '/node_modules/',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(__dirname, 'src'),
                // include: path.resolve(__dirname, 'src/styles'),
                use: [
                    // {loader: 'style-loader'},
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, importLoaders: 2 } },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' },
                ],
                exclude: '/node_modules/',
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/i,
                include: path.resolve(__dirname, 'src/scripts/components'),
                use: [{ loader: 'url-loader', options: { limit: 25000 } }],
                exclude: '/node_modules/',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './styles/styles.css',
            // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CopyWebpackPlugin(
            {
                patterns: [
                    {
                        from: './src/fonts',
                        to: './fonts',
                    },
                    {
                        from: './src/favicon',
                        to: './favicon',
                    },
                    {
                        from: './src/images',
                        to: './images',
                    },
                    {
                        from: './src/assets',
                        to: './assets',
                    },
                ],
                options: { concurrency: 100 },
            }
        ),
        new ForkTsCheckerWebpackPlugin({ async: false }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
        // new WebpackMd5Hash(),
    ],
    // stats: {
    //     warningsFilter: /export .* was not found in/,
    // },
    // optimization: {
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             cache: true,
    //             parallel: true,
    //             sourceMap: true // set to true if you want JS source maps
    //         }),
    //         new OptimizeCSSAssetsPlugin({}),
    //     ],
    // },
    // devtool: 'eval-sourcemap',
};

module.exports = (env, option) => {
    if (option.mode === 'production') {
        config.devtool = 'source-map';
        config.plugins.push(new CleanWebpackPlugin());
    } else {
        config.devtool = 'eval-source-map';
    }
    // config.devtool = (option.mode === 'production') ? 'source-map' : 'eval-sourcemap';
    return config;
};
