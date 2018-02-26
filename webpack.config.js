var HTMLWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/src/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: {
		app: __dirname + '/src/index.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'react']
				}
			}
		]
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/build'
	},
	plugins: [
		HTMLWebpackPluginConfig,
		// CopyWebpackPluginConfig
	],
	devtool: 'source-map'
};
