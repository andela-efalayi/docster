import React from 'react';
import PropTyes from 'prop-types';
import { ListItem} from 'material-ui/List';
import UserAvatar from '../common/UserAvatar.jsx';
import HeaderNavList from '../common/HeaderNavList.jsx';

// Items displayed in Header
const HeaderItems = ({ currentUser, logoutUser }) => (
  <ListItem 
    className="header-item"
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
