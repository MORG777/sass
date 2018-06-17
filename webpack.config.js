const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: "[id].css"
      }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
          }),
          new CopyWebpackPlugin([
            {from:'src/img',to:'img'} 
          ]),
          // fontawesome
          new CopyWebpackPlugin([
            {from:'src/css/webfonts',to:'styles/webfonts'} 
          ]), 
          new CopyWebpackPlugin([
            {from:'src/css/css',to:'styles/css'} 
          ]),
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            'sass-loader',

          ]
        }, {
          test: /\.(png|jpg)$/i,
          loader: 'file-loader?name=[path][name].[ext]!extract-loader!html-loader',
          include: path.resolve(__dirname, 'src/img')
        },
      ]
    },
};