import React from 'react';
import PropTyes from 'prop-types';
import { ListItem} from 'material-ui/List';
import UserAvatar from '../common/UserAvatar.jsx';
import HeaderNavList from '../common/HeaderNavList.jsx';

/**
 * HeaderItems Component
 * Displays items in the header
 * @param {object} currentUser
 * @param {func} logoutUser
 * @returns {object} react-component
 */
const HeaderItems = ({ currentUser, logoutUser }) => (
  <ListItem 
    className="header-items"
    leftAvatar={
      <UserAvatar 
        user={[currentUser.fullName, currentUser.userName]}
      />
    }
    rightIcon={<HeaderNavList 
      roleId={currentUser.roleId}
      logoutUser={logoutUser} 
    />}
  />
);

// Set HeaderItems proptypes
HeaderItems.propTypes = {
  currentUser: PropTyes.object.isRequired,
  logoutUser: PropTyes.func.isRequired
}

export default HeaderItems;
