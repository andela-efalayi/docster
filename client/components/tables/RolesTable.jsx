import React from 'react';
import PropTypes from 'prop-types';
import getDate from '../../utils/GetDate';

const RolesTable = ({ roles }) => {
  return(
    <table className="u-full-width">
      <thead>
        <tr>
          <th>ID</th>
          <th>Role Type</th>
          <th>Created At</th>
          <th>Update At</th>
        </tr>
      </thead>
      <tbody>
        {
          roles.map(role => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.roleType}</td>
              <td>{getDate(role.updatedAt)}</td>
              <td>{getDate(`${role.updatedAt}`)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

RolesTable.propTypes = {
  roles: PropTypes.array.isRequired
}

export default RolesTable;