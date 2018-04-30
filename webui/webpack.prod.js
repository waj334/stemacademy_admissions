const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const APP_DIR  = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'public');

module.exports = {
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['env', 'react', 'stage-0'],
					plugins: ['babel-plugin-transform-react-jsx', 'transform-decorators-legacy']
				}
			},
			{
				test: /\.css$/,

				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',

						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test   : /\.(ttf|eot|png|woff|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader : 'file-loader'
		    	}
		]
	},

	plugins: [
		new UglifyJSPlugin(),
		new MiniCssExtractPlugin({ filename: 'style.css' })
	],
	entry: ['whatwg-fetch', 'babel-polyfill', 'abortcontroller-polyfill', APP_DIR + '/index.jsx'],

	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	mode: 'production'
};
