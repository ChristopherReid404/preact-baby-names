/*
 * Base Webpack Config
 */
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = (options) => ({
	mode: options.mode,
	entry: path.join(process.cwd(), 'src/index.tsx'),
	target: 'web',
	devtool: options.devtool,
	optimization: {
		...options.optimization,
	},
	devServer: {
		...options.devServer
	},
	output: {
		path: path.resolve(process.cwd(), 'dist'),
		publicPath: '/',
		...options.output,
	},
	stats: 'none',
	resolve: {
		modules: ['node_modules', 'src'],
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		...options.resolve,
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
				},
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader', options: { sourceMap: true } },
				],
			},
			{
				// Preprocess 3rd party .css files located in node_modules
				test: /\.css$/,
				include: /node_modules/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-url-loader',
						options: {
							// Inline files smaller than 10 kB
							limit: 10 * 1024,
							noquotes: true,
						},
					},
				],
			},
			{
				test: /\.(jpg|jpeg|gif|png)$/,
				exclude: /node_modules/,
				loader: 'url-loader?limit=1024&name=assets/[name].[ext]'
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				exclude: /node_modules/,
				loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
			},
			{
				test: /\.html$/,
				use: 'html-loader',
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin(['assets/**'], {
			force: true,
		}),
		new ManifestPlugin({
			fileName: 'manifest.json',
			writeToFileEmit: true,
			seed: {
				name: "Preact Baby Names",
				version: JSON.stringify(require('../../package.json').version) || '-',
				short_name: JSON.stringify(require('../../package.json').short_name) || '-',
				description: JSON.stringify(require('../../package.json').description) || '-',
				theme_color: '#F34E85',
				background_color: '#FFFFFF',
				start_url: '/',
				display: 'standalone',
				orientation: 'portrait',
				icons: [
					{
						src: 'assets/logo_512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'assets/logo_192.png',
						sizes: '192x192',
						type: 'image/png',
					},
				],
			},
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				VERSION: JSON.stringify(require('../../package.json').version),
				BUILT: `${Date.now()}`,
			},
		}),
		new HtmlWebpackPlugin({
			template: path.join(process.cwd(), 'src/index.html'),
			favicon: path.join(process.cwd(), 'src/favicon.ico'),
			minify: {
				...options.minify,
			},
			inject: true,
		}),
		...options.plugins,
	],
	node: {
		fs: 'empty',
	},
})
