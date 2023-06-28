const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production';

	return {
		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].bundle.js',
		},
		module: {
			rules: [
				{
					test: /\.(scss|css)$/,
					use: [
						isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
						isProduction
							? {
									loader: 'css-loader',
									options: {
										importLoaders: 2,
										sourceMap: false,
									},
							  }
							: 'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: !isProduction,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									includePaths: [path.join(__dirname, './node_modules/@nciocpl/ncids-css/packages'), path.join(__dirname, './node_modules/@nciocpl/ncids-css/uswds-packages')],
								},
								sourceMap: !isProduction,
							},
						},
					],
				},
				{
					test: /\.svg/,
					type: 'asset/inline',
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				inject: 'head',
				minify: false,
				meta: {
					charset: { charset: 'UTF-8' },
				},
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[id].css',
			}),
		],
		optimization: isProduction
			? {
					minimize: true,
					minimizer: [new CssMinimizerPlugin(), '...'],
					runtimeChunk: {
						name: 'runtime',
					},
			  }
			: {},
	};
};
