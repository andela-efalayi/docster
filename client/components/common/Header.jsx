import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AppIcon from 'material-ui/svg-icons/image/center-focus-strong';

import HeaderItems from '../common/HeaderItems.jsx';
import {muiTheme1} from '../../muiTheme';

/*
  Header Component
  Displays app header
*/
const Header = ({ currentUser, logoutUser }) => (
  <div>
    <div className="bg-purple" />
    <MuiThemeProvider muiTheme={muiTheme1}>
      <AppBar
        className="main-header"
        title="Docster"
        iconElementLeft={
          <IconButton><AppIcon viewBox='0 2 21 21' /></IconButton>}
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
