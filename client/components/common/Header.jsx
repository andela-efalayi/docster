import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import muiTheme from '../../muiTheme';

const Header = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <AppBar
      title="Title"
      className="blue-text"
    />
  </MuiThemeProvider>
);

export default Header;
