import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import HeaderItems from '../common/HeaderItems.jsx';
import muiTheme from '../../muiTheme';

// Header component
const Header = ({ currentUser, logoutUser }) => (
  <div>
    <div className="bg-purple" />
    <MuiThemeProvider muiTheme={muiTheme}>
      <AppBar
        className="main-header"
        title="Docster"
      >
        <HeaderItems currentUser={currentUser} logoutUser={logoutUser} />
      </AppBar>
    </MuiThemeProvider>
  </div>
);

// Set proptypes
Header.propTypes = {
  currentUser: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

export default Header;
