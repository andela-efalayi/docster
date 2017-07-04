import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

// Header navigation list
const HeaderNavList = (props) => {
  const { logoutUser, roleId, ...style} = props;
  return(
    <IconMenu
      {...style}
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      className="header-nav-list"
    >
      <MenuItem 
        primaryText="Public Documents"
        containerElement={<Link to={{
            pathname: `/app/public-documents`
          }}
        />}
      />
      <MenuItem 
        primaryText="Role Documents"
        containerElement={<Link to={{
            pathname: `/app/role-documents`,
          }}
        />}
      />
      {
        roleId === 1 &&
        <div>
          <MenuItem 
            primaryText="Role Documents"
            containerElement={<Link to='/profile' />}
          />
          <MenuItem 
            primaryText="Roles"
            containerElement={<Link to='/allroles' />}
          />
          <MenuItem 
            primaryText="Users"
            containerElement={<Link to='/allusers' />}
          />
        </div>
      }
      <Divider />
      <MenuItem 
        primaryText="Profile"
        containerElement={<Link to='/profile' />}
      />
      <MenuItem primaryText="Log out" onClick={logoutUser} />
    </IconMenu>
  );
};

// Set HeaderNavList proptypes
HeaderNavList.propTypes = {
  roleId: PropTypes.number.isRequired,
  logoutUser: PropTypes.func.isRequired
}

export default HeaderNavList;
