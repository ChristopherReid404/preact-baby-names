/*
 * Production Webpack Config
 */
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = require('./webpack.config.base')({
	mode: 'production',
	devtool: 'source-map',
	output: {
		filename: '[name].[contenthash].js',
	},
	optimization: {
		minimizer: [new TerserPlugin({
			terserOptions: {
				warnings: false,
				compress: {
					comparisons: false,
				},
				parse: {},
				mangle: true,
				output: {
					comments: false,
					ascii_only: true,
				},
			},
			parallel: true,
			cache: true,
			sourceMap: false,
		})],
		minimize: true,
		sideEffects: true,
		concatenateModules: false,
		// runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			minSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					minSize: 0,
					name(module) {
						const pName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
						// npm package names are URL-safe, but some servers don't like @ symbols
						return `npm.${pName.replace('@', '')}`
					},
				},
				main: {
					chunks: 'all',
					minChunks: 4,
					reuseExistingChunk: true,
					enforce: true,
				},
			},
		},
	},
	minify: {
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		removeEmptyAttributes: true,
		minifyJS: true,
		minifyCSS: true,
	},
	plugins: [
		new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
		new CompressionPlugin({
			algorithm: 'gzip',
			test: /\.(js|css|ttf|svg|eot)$/,
			threshold: 10240,
		}),
		new OfflinePlugin({
			relativePaths: false,
			publicPath: '/',
			appShell: '/',
			caches: 'all',
			// Removes warning for about `additional` section usage
			safeToUseOptionalCaches: true,
			// AppCache: false,
			autoUpdate: true,
			updateStrategy: 'all'
		}),
		new webpack.HashedModuleIdsPlugin({
			hashFunction: 'sha256',
			hashDigest: 'hex',
			hashDigestLength: 20,
		}),
		new BundleAnalyzerPlugin({
			openAnalyzer: false,
			analyzerMode: 'disabled',
			defaultSizes: 'gzip',
			generateStatsFile: true
		}),
	],
})
