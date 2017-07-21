/* eslint-disable no-console*/
import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import colors from 'colors';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack-dev.config';
import routes from './routes';

dotenv.config(); // dotenv

const app = express();
const webpackCompiler = webpack(webpackConfig);
const secret = process.env.API_SECRET;
const PORT = process.env.PORT || 2700;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('superSecret', secret);

routes(app);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
} else {
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

app.listen(PORT, () => {
  console.log(colors.rainbow(`Docster is running on localhost:${PORT}`));
});

module.exports = app;
