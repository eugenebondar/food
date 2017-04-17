const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    // context: __dirname + '/src',

    entry: {
        main: './react/Main.jsx'
    },

    output: {
        filename: './dist/[name].js',
        publicPath: '/',
        path: './dist'
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    devtool: 'cheap-inline-module-source-map',

    plugins: [
        new webpack.ProvidePlugin({
            'React': 'react',
            'ReactDOM': 'react-dom'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body'
        }),
        new ExtractTextWebpackPlugin("[name].css", { allChunks: true })
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /\/node_modules\//,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.jade$/,
                loader: 'jade'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.styl$/,
                loader: ExtractTextWebpackPlugin.extract('css!postcss!stylus?resolve url')
            },
            // {
            //     test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            //     loader: 'file'
            // }
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'file?hash=sha512&digest=hex&name=dist/images/[name].[ext]?[hash:6]'
            },
        ]
    },

    eslint: {
        emitWarning: false
    },

    devServer: {
        contentBase: __dirname + '/react'
    }
};