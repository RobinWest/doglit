var HTMLWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
	devtool: 'inline-source-map',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						'react',
						['env', {
							targets: {
								browsers: ['last 2 versions', 'ie >= 11']
							}
						}],
						'stage-0'
					]
				}
			}, {
				test: [/\.less$/i, /\.css$/i],
				use: ExtractTextPlugin.extract({
					use: [{
						loader: "css-loader",
						options: { sourceMap: true }
					}, {
						loader: "less-loader",
						options: { sourceMap: true }
					}]
				})
			}
		]
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/build'
	},
	plugins: [
		HTMLWebpackPluginConfig,
		new ExtractTextPlugin('./assets/css/style.css')
		// CopyWebpackPluginConfig
	]
};
