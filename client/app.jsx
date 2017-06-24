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
import setAuthorisationToken from './utils/SetAuthorisationToken';
import { loginUserSuccess } from './actions/Authenticate';

injectTapEventPlugin();

const store = configureStore();

if (localStorage.docsterToken) {
  setAuthorisationToken(localStorage.docsterToken);
  store.dispatch(loginUserSuccess(JSON
    .parse(localStorage.getItem('currentUser'))));
}

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'));
