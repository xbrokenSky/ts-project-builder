const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, option) => {
    const isDevelopment = option.mode !== 'production';

    return {
        entry: ['./src/scripts/index.ts', './src/styles/styles.scss'],
        target: ['web', 'es5'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: './scripts/index.js',
            publicPath: '/',
        },
        devServer: {
            historyApiFallback: true,
            hot: true,
            compress: true,
            firewall: false,
            static: path.join(__dirname, './dist'),
            client: {
                overlay: {
                    errors: true,
                },
            },
            watchFiles: path.resolve(__dirname, 'src/index.html'),
        },
        cache: {
            type: 'filesystem',
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
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheCompression: false,
                                cacheDirectory: true,
                            },
                        },
                    ],
                    exclude: '/node_modules/',
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                            },
                        },
                    ],
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
            new CopyWebpackPlugin({
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
            }),
            new ForkTsCheckerWebpackPlugin({ async: false }),
            new ESLintPlugin({
                extensions: ['js', 'jsx', 'ts', 'tsx'],
                cache: true,
                cacheLocation: './node_modules/.cache/eslint/.eslintcache',
            }),
            // new WebpackMd5Hash(),
            isDevelopment && new webpack.HotModuleReplacementPlugin(),
            !isDevelopment && new CleanWebpackPlugin(),
        ].filter(Boolean),
        devtool: isDevelopment ? 'eval-source-map' : 'source-map',
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
    };
};
