/* eslint no-unused-vars: ['warn'] */
// const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const config = {
    // entry: ['./src/scripts/index.js'],
    // entry: ['./src/scripts/index.js', './src/styles/styles.scss'],
    entry: ['./src/scripts/index.ts', './src/styles/styles.scss'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './scripts/index.js',
        publicPath: './dist',
    },
    devServer: {
        overlay: true,
        historyApiFallback: {disableDotRule: true},
        contentBase: './dist',
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
                use: [
                    {loader: 'babel-loader'},
                    {loader: 'eslint-loader'},
                    {loader: 'astroturf/loader'},
                ],
                exclude: '/node_modules/',
            },
            {
                test: /\.tsx?$/,
                use: [
                    {loader: 'ts-loader', options: {transpileOnly: true}},
                    {loader: 'astroturf/loader'},
                ],
                exclude: '/node_modules/',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                // include: path.resolve(__dirname, 'src'),
                include: path.resolve(__dirname, 'src/styles'),
                use: [
                    // {loader: 'style-loader'},
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {url: false, importLoaders: 2}},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader'},
                ],
                exclude: '/node_modules/',
            },
            {
                // test: /\.(sa|sc|c)ss$/,
                // exclude: '/node_modules/',
                // use: [
                //     {loader: 'style-loader'},
                //     {loader: 'css-loader'},
                //     {loader: 'sass-loader'}
                // ],
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: [
                //         {loader: 'css-loader'},
                //         {loader: 'postcss-loader'},
                //         {loader: 'sass-loader'}
                //     ]
                // })
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/i,
                include: path.resolve(__dirname, 'src/scripts/components'),
                use: [
                    {loader: 'url-loader', options: {limit: 25000}},
                ],
                exclude: '/node_modules/',
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    plugins: [
        // new ExtractTextPlugin({filename: 'styles.css', disable: false, allChunks: true}),
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
        new CopyWebpackPlugin([
            {
                // context: path.resolve(__dirname, ''),
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
        ], {copyUnmodified: false}),
        new WriteFilePlugin(),
        new ForkTsCheckerWebpackPlugin({async: false}),
        // new WebpackMd5Hash(),
        // new CleanWebpackPlugin('dist',{}),
    ],
    stats: {
        warningsFilter: /export .* was not found in/,
    },
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
        config.plugins.push(new CleanWebpackPlugin('dist', {}));
    } else {
        config.devtool = 'eval-sourcemap';
    }
    // config.devtool = (option.mode === 'production') ? 'source-map' : 'eval-sourcemap';
    return config;
};
