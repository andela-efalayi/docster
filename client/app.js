import React from 'react';
import { render } from 'react-dom';
import '../bower_components/materialize/dist/css/materialize.css';
import '../bower_components/jquery/dist/jquery';
import '../bower_components/materialize/dist/js/materialize';
import Index from './components/Index.jsx';

render(<Index />, document.getElementById('app'));
