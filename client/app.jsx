import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './css/normalize.css';
import './css/skeleton.css';
import './css/main.css';

import Routes from './routes';

injectTapEventPlugin();

ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById('app'));
