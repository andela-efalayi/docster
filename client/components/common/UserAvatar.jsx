import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import { orange500 } from 'material-ui/styles/colors';

// User avatar [ displays user's image (represented as the first 
// letter in user's full name) and user's username]
const UserAvatar = ({ user }) => (
  <ListItem
    className="user-avatar"
    disabled
    leftAvatar={
      <Avatar
        className="user-letter"
        color={orange500}
        size={35}
      >
        {user[0].charAt(0)}
      </Avatar>
    }
  >
    {user[1]}
  </ListItem>
);

// Set UserAvatar proptypes
UserAvatar.propTypes = {
  user: PropTypes.array.isRequired
}
export default UserAvatar;