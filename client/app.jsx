import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { BrowserRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/ConfigureStore';
import './css/normalize.css';
import './css/skeleton.css';
import './css/main.css';

import Routes from './routes';

injectTapEventPlugin();

const store = configureStore();

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'));
