/* eslint-disable no-console*/

import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import colors from 'colors';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack-dev.config';
import routes from './routes';

const app = express();
const webpackCompiler = webpack(webpackConfig);

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});


app.listen(3000, () => {
  console.log(colors
  .bgGreen('Docster is running on localhost:3000'));
  // console.log(colors.blue(Role.createRole()));
});

module.exports = app;
