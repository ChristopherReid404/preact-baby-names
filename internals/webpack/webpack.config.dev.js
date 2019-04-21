/*
 * Development Webpack Config
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = require('./webpack.config.base')({
	mode: 'development',
	devtool: 'cheap-module-source-map',
	output: {
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
	},
	devServer: {
		port: 8000,
		historyApiFallback: true,
		disableHostCheck: true,
	},
	optimization: {
		minimize: false,
		splitChunks: false,
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerHost: 'localhost',
			analyzerPort: 8050,
			openAnalyzer: false,
			defaultSizes: 'gzip',
		}),
	],
})
