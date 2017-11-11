import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { BrowserRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/ConfigureStore';
import '../node_modules/jquery/dist/jquery.js';
import '../node_modules/toastr/build/toastr.min.js';
import '../node_modules/toastr/build/toastr.css';
import '../node_modules/react-quill/dist/quill.snow.css';
import './styles/normalize.scss';
import './styles/skeleton.scss';
import './styles/main.scss';

import Routes from './Routes.jsx';
import setAuthorisationToken from './utils/SetAuthorisationToken';
import { loginUserSuccess } from './actions/Authenticate';
import Header from './components/common/Header.jsx';

injectTapEventPlugin();

const store = configureStore();

if (localStorage.docsterToken) {
  const token = localStorage.getItem('docsterToken');
  setAuthorisationToken(token);
  store.dispatch(loginUserSuccess(jwt.decode(token).data));
}

const App = () => {
  return(
    <main>
      <Provider store={store} >
        <BrowserRouter>
          <div>
            <Header />
            <Routes />
          </div>
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
