import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'source-map',
  entry: './client/App.jsx',
  output: {
    path: path.resolve(__dirname, 'build/public'), // Path of output file
    publicPath: '/',
    filename: 'app.js',
  },
  resolve: {
    alias: {
      jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js')
    }
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    }),
    new ExtractTextPlugin('static/css/main.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      minimize: true,
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'client/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  node: {
    net: 'empty',
    dns: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'client'),
        loaders: ['babel']
      },
      {
        test: /(\.css)$/,
        loaders: ExtractTextPlugin.extract({
          fallback: ['style'],
          use: 'css?sourceMap!sass'
        })
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url',
        options: {
          limit: 25000,
        },
      }, 
    ]
  }
};
 