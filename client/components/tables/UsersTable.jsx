import React from 'react';
import PropTypes from 'prop-types';
import orderBy  from 'lodash/orderBy';
import EditRole from '../common/EditRole.jsx';

const UsersTable = ({ users }) => {
  const orderedUsersList = orderBy(users, ['id'], ['asc']);
  return(
    <table className="u-full-width">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>         
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {
          orderedUsersList.map(user => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td><EditRole user={[user.id, user.roleId]} /></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
}


export default UsersTable;