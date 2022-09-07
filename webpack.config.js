const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { alias } = require('commander');
// const CopyWebpackPlugin = require('copy-webpack-plugin'); // для копирования файлов

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const pathResult = () => {
	if (isDev) {
		return path.resolve(__dirname, './dev')
	} else {
		return path.resolve(__dirname, './dist')
	}
}

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all',
		}
	}
	if (isProd) {
		config.minimizer = [
			new CssMinimizerPlugin(),
			new TerserWebpackPlugin()
		]
	}
	return config
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
		alias: {
			"@": path.resolve(__dirname, 'src')
		}
	},
	devServer: {
		port: 3000,
		hot: isDev,
		historyApiFallback: true,
		open: true
	},
	devtool: isDev ? 'source-map' : false,
	optimization: optimization(),
	entry: './index.jsx',
	output: {
		path: pathResult(),
		filename: filename('js'),
		publicPath: 'auto'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd
			},
		}),
		new CleanWebpackPlugin(),
		// new CopyWebpackPlugin({
		//   patterns: [
		//   {
		//     from: path.resolve(__dirname, 'src/components/layout/outletComponents/header/backet.png'),
		//     to: path.resolve(__dirname, 'dist')
		//   }
		// ]}),
		new MiniCssExtractPlugin({
			filename: filename('css')
		}),
		new ReactRefreshWebpackPlugin()
	],
	stats: {
		children: true
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				use: ['file-loader']
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
				use: ['file-loader']
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: "defaults" }]
						]
					}
				}
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: "defaults" }, '@babel/preset-typescript']
						],
						plugins: ["@babel/plugin-transform-typescript"]
					}
				}
			}
		]
	}
};