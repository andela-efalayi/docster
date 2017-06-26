import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiTheme1 } from '../../muiTheme';

const SearchForm = () => (
  <form action="">
    <div className="row">
      <div className="six columns">
        <input 
          type="text" 
          className="u-full-width" 
          placeholder="Document name or title" 
        />
      </div>
      <div className="three columns">
        <MuiThemeProvider muiTheme={muiTheme1}> 
          <RaisedButton label="Search" primary />
        </MuiThemeProvider>
      </div>
    </div>
  </form>
);

export default SearchForm;
