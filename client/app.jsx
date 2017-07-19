import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { BrowserRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/ConfigureStore';
import './css/normalize.css';
import './css/skeleton.css';
import './css/main.css';

import Routes from './Routes.jsx';
import setAuthorisationToken from './utils/SetAuthorisationToken';
import { loginUserSuccess } from './actions/Authenticate';

injectTapEventPlugin();

const store = configureStore();

if (localStorage.docsterToken) {
  setAuthorisationToken(localStorage.getItem('docsterToken'));
  store.dispatch(loginUserSuccess(JSON
    .parse(localStorage.getItem('currentUser'))));
}

const App = () => {
  return(
    <main>
      <Provider store={store} >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
      <footer className="container center">
        <span>&copy; 2017 | 
          <a href="https://github.com/andela-efalayi/">
            Esther Falayi | Andela, Nigeria
          </a>
        </span>
      </footer>
    </main>
  )
};

ReactDOM.render(<App />,
  document.getElementById('app'));
