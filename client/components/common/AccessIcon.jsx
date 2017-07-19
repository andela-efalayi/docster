import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import People from 'material-ui/svg-icons/social/people';
import Lock from 'material-ui/svg-icons/action/lock';
import Public from 'material-ui/svg-icons/social/public';
import { deepPurple200 } from 'material-ui/styles/colors';
import { muiTheme1 } from '../../muiTheme';

/*
  AccessIcon Component
  Displays an access icon [ public/private/role ]
*/
const AccessIcon = ({ accessType }) => {
  return(
    <MuiThemeProvider muiTheme={muiTheme1}>
      <IconButton
        className="access-icon"
        tooltip={accessType}
        tooltipPosition="bottom-center"
      >
        { accessType === 'role' &&
        <People color={deepPurple200} />
        }
        { accessType === 'public' &&
        <Public color={deepPurple200} />
        }
        { accessType === 'private' &&
        <Lock color={deepPurple200} />
        }
      </IconButton>
    </MuiThemeProvider>
  );
}

AccessIcon.propTypes = {
  accessType: PropTypes.string.isRequired
}

export default AccessIcon;