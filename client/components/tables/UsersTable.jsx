import React from 'react';
import PropTypes from 'prop-types';
import orderBy  from 'lodash/orderBy';
import setRoleType from '../../utils/SetRoleType';

const UsersTable = ({ users }) => {
  const orderedUsersList = orderBy(users, ['id'], ['asc']);
  return(
    <table className="u-full-width">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>UserId</th>          
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {
          orderedUsersList.map(user => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.id}</td>              
              <td>{setRoleType(user.roleId)}</td>
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