var path = require('path');
var webpack = require('webpack');

var APP_DIR  = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'public');

var config = {
   entry: ['whatwg-fetch', 'babel-polyfill', APP_DIR + '/index.jsx'],
	
   output: {
      path: BUILD_DIR,
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react', 'stage-0'],
                    plugins: [
                        'babel-plugin-transform-react-jsx',
                        'transform-decorators-legacy'
                    ]
                } 
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test   : /\.(ttf|eot|png|woff|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader : 'file-loader'
            }
        ]
    }
}

module.exports = config;