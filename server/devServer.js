import logger from 'morgan';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack-dev.config';

const webpackCompiler = webpack(webpackConfig);

module.exports = (app) => {
  app.use(webpackMiddleware(webpackCompiler, {
    hot: true,
    colors: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(webpackCompiler, {
    log: false
  }));
  app.use(logger('dev'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/public/index.html'));
  });
}