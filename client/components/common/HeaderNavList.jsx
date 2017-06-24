import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// Header navigation list
const HeaderNavList = (props) => {
  const { logoutUser, ...style} = props;
  return(
    <IconMenu
      {...style}
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
    >
      <MenuItem primaryText="View Profile" />
      <MenuItem primaryText="Log out" onClick={logoutUser} />
    </IconMenu>
  );
};

// Set HeaderNavList proptypes
HeaderNavList.propTypes = {
  logoutUser: PropTypes.func.isRequired
}

export default HeaderNavList;
